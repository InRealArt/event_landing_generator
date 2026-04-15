'use server'

import { z } from 'zod'
import { createBrevoContact } from '@/actions/emailActions'
import { verifyRecaptchaToken } from '@/lib/recaptcha'

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
  listId: z.coerce.number().int().positive(),
})

export type NewsletterState = {
  success: boolean
  message: string
  errors?: {
    email?: string[]
    firstName?: string[]
  }
}

export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const recaptchaToken = formData.get('recaptchaToken') as string | null

  if (!recaptchaToken) {
    return {
      success: false,
      message: 'Vérification anti-spam échouée. Veuillez réessayer.',
    }
  }

  const isHuman = await verifyRecaptchaToken(recaptchaToken)
  if (!isHuman) {
    return {
      success: false,
      message: 'Vérification anti-spam échouée. Veuillez réessayer.',
    }
  }

  const raw = {
    email: formData.get('email') as string,
    firstName: (formData.get('firstName') as string) || undefined,
    listId: formData.get('listId') as string,
  }

  const result = schema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      message: 'Veuillez corriger les erreurs ci-dessous.',
      errors: result.error.flatten().fieldErrors as NewsletterState['errors'],
    }
  }

  const contactResult = await createBrevoContact({
    email: result.data.email,
    firstName: result.data.firstName,
    listId: result.data.listId,
  })

  if (!contactResult.success) {
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    }
  }

  return {
    success: true,
    message: 'Merci\u00a0! Vous êtes bien inscrit(e) à notre newsletter.',
  }
}
