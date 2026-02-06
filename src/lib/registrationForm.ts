/**
 * Types et constantes partagés pour le formulaire d'inscription Art Capital.
 * (Les "use server" ne peuvent exporter que des fonctions async, d'où ce fichier séparé.)
 */

export const REGISTRATION_FIELD_NAMES = ['firstName', 'lastName', 'email', 'phone', 'profession', 'residenceRegion', 'preferredArtist', 'acceptNewsletter'] as const
export type RegistrationFieldName = typeof REGISTRATION_FIELD_NAMES[number]

export type ContestFormState = {
  success: boolean
  message: string
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    phone?: string[]
    acceptNewsletter?: string[]
    profession?: string[]
    residenceRegion?: string[]
    preferredArtist?: string[]
  }
}
