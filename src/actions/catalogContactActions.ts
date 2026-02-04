'use server'

import { z } from 'zod'
import { createBrevoContact } from '@/actions/emailActions'
import { getArtistData } from '@/lib/artistDataManager'
import { verifyRecaptchaToken } from '@/lib/recaptcha'

/** Normalise un numéro français vers E.164 pour Brevo (ex. 06 12 34 56 78 → +33612345678). */
function toE164 (raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 9 && digits.startsWith('6')) {
    return '+33' + digits
  }
  if (digits.length === 10 && digits.startsWith('0')) {
    return '+33' + digits.slice(1)
  }
  if (digits.length === 11 && digits.startsWith('33')) {
    return '+' + digits
  }
  return raw
}

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  email: z.string()
    .email('Adresse email invalide')
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  mobile: z
    .optional(z.string())
    .transform((val) => (val === undefined || (typeof val === 'string' && val.trim() === '') ? undefined : val))
    .refine(
      (val) => {
        if (val === undefined) return true
        const digits = val.replace(/\D/g, '')
        return (digits.length === 10 && digits.startsWith('0')) || (digits.length === 9 && digits.startsWith('6')) || (digits.length === 11 && digits.startsWith('33'))
      },
      'Numéro de mobile français invalide'
    ),
  slug: z.string()
    .min(1, 'Le slug est requis')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-Z0-9-]+$/, 'Slug invalide'),
  recaptchaToken: z.string().optional()
})

export type CatalogFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    mobile?: string[]
  }
}

export async function requestCatalog(
  prevState: CatalogFormState,
  formData: FormData
): Promise<CatalogFormState> {
  try {
    const recaptchaToken = (formData.get('recaptchaToken') as string) || ''

    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return {
          success: false,
          message: 'Vérification de sécurité manquante. Veuillez réessayer.'
        }
      }
      const isValidRecaptcha = await verifyRecaptchaToken(recaptchaToken)
      if (!isValidRecaptcha) {
        return {
          success: false,
          message: 'Vérification de sécurité échouée. Veuillez réessayer.'
        }
      }
    }

    const mobileRaw = ((formData.get('mobile') as string) || '').trim()
    const rawData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      mobile: mobileRaw === '' ? undefined : mobileRaw,
      slug: (formData.get('slug') as string) || '',
      recaptchaToken
    }

    const validationResult = contactSchema.safeParse(rawData)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      return {
        success: false,
        message: 'Veuillez corriger les erreurs dans le formulaire',
        errors: {
          name: fieldErrors.name,
          email: fieldErrors.email,
          mobile: fieldErrors.mobile
        }
      }
    }

    const { name, email, mobile, slug } = validationResult.data

    const artistData = await getArtistData(slug)

    if (!artistData) {
      return {
        success: false,
        message: 'Artiste non trouvé.'
      }
    }

    if (!artistData.brevoListId) {
      return {
        success: false,
        message: 'Configuration manquante pour cet artiste.'
      }
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const phoneForBrevo = mobile ? toE164(mobile) : undefined

    const contactResult = await createBrevoContact({
      email,
      firstName,
      lastName,
      phone: phoneForBrevo,
      listId: artistData.brevoListId
    })

    if (!contactResult.success) {
      return {
        success: false,
        message: contactResult.message || 'Erreur lors de la création du contact.'
      }
    }

    return {
      success: true,
      message: 'Votre catalogue vous sera envoyé très prochainement ! Vérifiez votre boîte mail.'
    }
  } catch (error) {
    console.error('❌ Catalog request error:', error)
    return {
      success: false,
      message: "Une erreur inattendue s'est produite. Veuillez réessayer."
    }
  }
}
