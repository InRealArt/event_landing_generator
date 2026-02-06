'use server'

import { z } from 'zod'
import { createBrevoContact } from '@/actions/emailActions'
import { verifyRecaptchaToken } from '@/lib/recaptcha'
import { REGISTRATION_FIELD_NAMES, type ContestFormState, type RegistrationFieldName } from '@/lib/registrationForm'

// IDs des listes Brevo par défaut : Newsletter FR (14), Prospect ArtCapital 2026 (57)
const DEFAULT_BREVO_LIST_IDS = [14, 57]

function parseListIds (raw: string | null): number[] {
  if (!raw || typeof raw !== 'string') return [...DEFAULT_BREVO_LIST_IDS]
  const ids = raw.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !Number.isNaN(n))
  return ids.length > 0 ? ids : [...DEFAULT_BREVO_LIST_IDS]
}

function parseEnabledFields (raw: string | null): RegistrationFieldName[] {
  if (!raw || typeof raw !== 'string') return [...REGISTRATION_FIELD_NAMES]
  const names = raw.split(',').map(s => s.trim() as RegistrationFieldName).filter(f => REGISTRATION_FIELD_NAMES.includes(f))
  return names.length > 0 ? names : [...REGISTRATION_FIELD_NAMES]
}

function buildContestSchema (enabledFields: RegistrationFieldName[]) {
  const has = (f: RegistrationFieldName) => enabledFields.includes(f)
  return z.object({
    firstName: has('firstName')
      ? z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne peut pas dépasser 50 caractères')
      : z.string().optional(),
    lastName: has('lastName')
      ? z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères')
      : z.string().optional(),
    email: has('email')
      ? z.string().email('Adresse email invalide').max(255, "L'email ne peut pas dépasser 255 caractères")
      : z.string().optional(),
    phone: has('phone')
      ? z.string().min(8, 'Numéro de téléphone invalide').max(20, 'Numéro de téléphone trop long')
      : z.string().optional(),
    acceptNewsletter: has('acceptNewsletter')
      ? z.boolean().refine(val => val === true, "Vous devez accepter pour continuer")
      : z.boolean().optional(),
    profession: has('profession')
      ? z.string().min(1, 'Veuillez indiquer votre profession').max(200, 'La profession ne peut pas dépasser 200 caractères')
      : z.string().optional(),
    residenceRegion: has('residenceRegion')
      ? z.string().min(1, 'Veuillez sélectionner votre lieu de résidence').max(100, 'Lieu de résidence invalide')
      : z.string().optional(),
    preferredArtist: z.string().max(100).optional()
  })
}

export async function registerToContest (
  prevState: ContestFormState,
  formData: FormData
): Promise<ContestFormState> {
  try {
    const recaptchaToken = formData.get('recaptchaToken') as string | null

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

    const brevoListIds = parseListIds(formData.get('brevoListIds') as string | null)
    const enabledFields = parseEnabledFields(formData.get('enabledFields') as string | null)
    const contestSchema = buildContestSchema(enabledFields)

    const rawData = {
      firstName: (formData.get('firstName') as string) ?? '',
      lastName: (formData.get('lastName') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      phone: (formData.get('phone') as string) ?? '',
      acceptNewsletter: formData.get('acceptNewsletter') === 'on',
      profession: (formData.get('profession') as string) || '',
      residenceRegion: (formData.get('residenceRegion') as string) || '',
      preferredArtist: (formData.get('preferredArtist') as string) || ''
    }

    const validationResult = contestSchema.safeParse(rawData)

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors
      return {
        success: false,
        message: 'Veuillez corriger les erreurs dans le formulaire',
        errors: {
          firstName: fieldErrors.firstName,
          lastName: fieldErrors.lastName,
          email: fieldErrors.email,
          phone: fieldErrors.phone,
          acceptNewsletter: fieldErrors.acceptNewsletter,
          profession: fieldErrors.profession,
          residenceRegion: fieldErrors.residenceRegion,
          preferredArtist: fieldErrors.preferredArtist
        }
      }
    }

    const data = validationResult.data
    const email = data.email || rawData.email
    if (!email) {
      return { success: false, message: 'Adresse email requise.' }
    }

    const contactResult = await createBrevoContact({
      email,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      phone: data.phone || undefined,
      listIds: brevoListIds,
      profession: data.profession || undefined,
      residenceRegion: data.residenceRegion || undefined,
      preferredArtist: data.preferredArtist || undefined
    })

    if (!contactResult.success) {
      console.error('❌ Contest registration failed:', contactResult.message)
      const userMessage = contactResult.message.includes('SMS is already associated')
        ? 'Ce numéro de téléphone est déjà associé à un autre compte. Veuillez utiliser un autre numéro ou nous contacter.'
        : contactResult.message
      return {
        success: false,
        message: userMessage
      }
    }

    return {
      success: true,
      message: 'Inscription réussie ! Vous recevrez bientôt un email de confirmation.'
    }
  } catch (error) {
    console.error('❌ Contest registration error:', error)
    return {
      success: false,
      message: "Une erreur inattendue s'est produite. Veuillez réessayer."
    }
  }
}
