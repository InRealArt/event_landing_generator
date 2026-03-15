'use server'

import { z } from 'zod'
import { createBrevoContact } from '@/actions/emailActions'

const BIENNALE_NEWSLETTER_LIST_ID = 999

const schema = z.object({
  email: z
    .string()
    .email('Adresse email invalide')
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  firstName: z
    .string()
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s'-]*$/, 'Le prénom contient des caractères invalides')
    .optional()
    .transform((v) => (v?.trim() === '' ? undefined : v?.trim())),
})

export type BiennaleNewsletterState = {
  success: boolean
  message: string
  errors?: {
    email?: string[]
    firstName?: string[]
  }
}

export async function subscribeToBiennaleNewsletter(
  prevState: BiennaleNewsletterState,
  formData: FormData
): Promise<BiennaleNewsletterState> {
  const raw = {
    email: formData.get('email') as string,
    firstName: (formData.get('firstName') as string) || undefined,
  }

  const result = schema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      message: 'Veuillez corriger les erreurs ci-dessous.',
      errors: result.error.flatten().fieldErrors,
    }
  }

  const contactResult = await createBrevoContact({
    email: result.data.email,
    firstName: result.data.firstName,
    listId: BIENNALE_NEWSLETTER_LIST_ID,
  })

  if (!contactResult.success) {
    return {
      success: false,
      message: "Une erreur est survenue. Veuillez réessayer.",
    }
  }

  return {
    success: true,
    message: 'Merci\u00a0! Vous êtes bien inscrit(e) à notre newsletter.',
  }
}
