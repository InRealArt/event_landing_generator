'use server'

import { z } from 'zod'
import { createBrevoContact } from '@/actions/emailActions'

// IDs des listes Brevo : Newsletter FR (14), Prospect ArtCapital 2026 (57)
const BREVO_LIST_IDS = [14, 57] as const

// Schéma de validation Zod
const contestSchema = z.object({
  firstName: z.string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string()
    .email('Adresse email invalide')
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z.string()
    .min(8, 'Numéro de téléphone invalide')
    .max(20, 'Numéro de téléphone trop long'),
  acceptNewsletter: z.boolean()
    .refine(val => val === true, "Vous devez accepter de vous inscrire à la newsletter")
})

export type ContestFormState = {
  success: boolean
  message: string
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    phone?: string[]
    acceptNewsletter?: string[]
  }
}

export async function registerToContest(
  prevState: ContestFormState,
  formData: FormData
): Promise<ContestFormState> {
  try {
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      acceptNewsletter: formData.get('acceptNewsletter') === 'on'
    }

    // Validation avec Zod
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
          acceptNewsletter: fieldErrors.acceptNewsletter
        }
      }
    }

    const { firstName, lastName, email, phone } = validationResult.data

    // Créer le contact dans Brevo (listes Newsletter FR + Prospect ArtCapital 2026)
    const contactResult = await createBrevoContact({
      email,
      firstName,
      lastName,
      phone,
      listIds: [...BREVO_LIST_IDS]
    })

    if (!contactResult.success) {
      console.error('❌ Contest registration failed:', contactResult.message)
      return {
        success: false,
        message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
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
