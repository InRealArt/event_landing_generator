/**
 * Utilitaire pour la gestion de Google reCAPTCHA v3
 */

const RECAPTCHA_VERIFY_TIMEOUT_MS = 10000
const RECAPTCHA_RETRY_DELAY_MS = 2000

async function verifyRecaptchaOnce(token: string, signal: AbortSignal): Promise<boolean> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: 'POST', signal }
  )
  const data = await response.json()
  return Boolean(data.success && data.score >= 0.5)
}

function isNetworkError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : ''
  const code = (error as { cause?: { code?: string } })?.cause?.code
  return msg.includes('abort') || code === 'ETIMEDOUT' || code === 'ECONNRESET' || msg.includes('fetch failed')
}

// Vérifie si un token reCAPTCHA est valide (avec timeout et 1 retry en cas d'erreur réseau)
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error('La clé secrète reCAPTCHA n\'est pas configurée')
    return false
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), RECAPTCHA_VERIFY_TIMEOUT_MS)

    try {
      const ok = await verifyRecaptchaOnce(token, controller.signal)
      clearTimeout(timeoutId)
      return ok
    } catch (error) {
      clearTimeout(timeoutId)
      const shouldRetry = attempt === 0 && isNetworkError(error)
      if (shouldRetry) {
        await new Promise(resolve => setTimeout(resolve, RECAPTCHA_RETRY_DELAY_MS))
        continue
      }
      console.error(
        'Erreur lors de la vérification du token reCAPTCHA:',
        isNetworkError(error) ? 'timeout ou réseau' : (error instanceof Error ? error.message : error),
        error
      )
      return false
    }
  }

  return false
}

// Hook client pour exécuter reCAPTCHA
export const executeRecaptcha = async (): Promise<string> => {
  // Vérifier si l'API reCAPTCHA est chargée
  if (typeof window === 'undefined' || !window.grecaptcha || !window.grecaptcha.execute) {
      throw new Error('reCAPTCHA n\'est pas chargé')
  }

  try {
      // Clé site reCAPTCHA (à récupérer depuis les variables d'environnement côté client)
      const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

      if (!recaptchaSiteKey) {
          throw new Error('La clé site reCAPTCHA n\'est pas configurée')
      }

      // Exécuter reCAPTCHA et récupérer le token
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'newsletter_subscribe' })
      return token
  } catch (error) {
      console.error('Erreur lors de l\'exécution de reCAPTCHA:', error)
      throw error
  }
}

// Fonction pour charger le script reCAPTCHA v3
export const loadRecaptchaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
      // Vérifier si le script est déjà chargé
      if (typeof window !== 'undefined' && window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => resolve())
          return
      }

      try {
          // Clé site reCAPTCHA
          const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

          if (!recaptchaSiteKey) {
              reject(new Error('La clé site reCAPTCHA n\'est pas configurée'))
              return
          }

          // Créer un élément script
          const script = document.createElement('script')
          script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`
          script.async = true
          script.defer = true

          // Gérer les événements pour résoudre ou rejeter la promesse
          script.onload = () => {
              if (window.grecaptcha) {
                  window.grecaptcha.ready(() => resolve())
              } else {
                  reject(new Error('reCAPTCHA n\'a pas pu être chargé'))
              }
          }
          script.onerror = () => reject(new Error('Erreur lors du chargement de reCAPTCHA'))

          // Ajouter le script à la page
          document.head.appendChild(script)
      } catch (error) {
          reject(error)
      }
  })
}

// Ajout du type pour l'objet window pour TypeScript
declare global {
  interface Window {
      grecaptcha: {
          ready: (callback: () => void) => void
          execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
  }
} 