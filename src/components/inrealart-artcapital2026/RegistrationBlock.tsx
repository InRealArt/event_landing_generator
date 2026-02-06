'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import PhoneInput from 'react-phone-number-input'
import { toast } from 'sonner'
import { registerToContest } from '@/actions/invitationArtCapital2026Actions'
import {
  REGISTRATION_FIELD_NAMES,
  type ContestFormState,
  type RegistrationFieldName
} from '@/lib/registrationForm'
import 'react-phone-number-input/style.css'

export interface RegistrationBlockContent {
  title: string
  fields: RegistrationFieldName[]
  brevoListIds: number[]
  newsletterLabel?: string
  submitLabel?: string
  submitPendingLabel?: string
  /** Message affiché après validation du formulaire (sinon message serveur). */
  successMessage?: string
  /** Libellé du bouton affiché après succès (ex. "Télécharger le catalogue PDF"). */
  successButtonLabel?: string
  /** URL du bouton après succès (ex. lien vers un PDF). Ouvre dans un nouvel onglet si fourni. */
  successButtonUrl?: string
}

const DEFAULT_CONTENT: RegistrationBlockContent = {
  title: 'Inscrivez-vous pour participer',
  fields: [...REGISTRATION_FIELD_NAMES],
  brevoListIds: [14, 57],
  newsletterLabel: "J'accepte de m'inscrire à la newsletter pour recevoir mon invitation",
  submitLabel: "S'inscrire Maintenant",
  submitPendingLabel: 'Inscription en cours...'
}

interface RegistrationBlockProps {
  content?: Partial<RegistrationBlockContent>
}

const FRENCH_REGIONS = [
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Guadeloupe',
  'Guyane',
  'Hauts-de-France',
  'Île-de-France',
  'Martinique',
  'Mayotte',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  'Pays de la Loire',
  'Provence-Alpes-Côte d\'Azur',
  'La Réunion'
] as const

const PREFERRED_ARTISTS = [
  'Catherine Sénéchal',
  'Adélaïde Leferme',
  'Jean-Paul Boyer',
  'Nadine Leprince',
  'Stefan Beiu',
  'Dominique Fonteneau'
] as const

const initialState: ContestFormState = {
  success: false,
  message: ''
}

function hasField (fields: RegistrationFieldName[], name: RegistrationFieldName): boolean {
  return fields.includes(name)
}

export default function RegistrationBlock ({ content: contentOverride }: RegistrationBlockProps) {
  const content: RegistrationBlockContent = {
    ...DEFAULT_CONTENT,
    ...contentOverride,
    fields: contentOverride?.fields ?? DEFAULT_CONTENT.fields,
    brevoListIds: contentOverride?.brevoListIds ?? DEFAULT_CONTENT.brevoListIds
  }
  const fields = content.fields
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [state, formAction, pending] = useActionState(registerToContest, initialState)
  const [phone, setPhone] = useState('')
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)
  const lastToastedMessage = useRef('')
  const mustAcceptNewsletter = hasField(fields, 'acceptNewsletter')
  const isSubmitDisabled = pending || (mustAcceptNewsletter && !acceptNewsletter)

  useEffect(() => {
    if (!state.success && state.message && state.message !== lastToastedMessage.current) {
      toast.error('Erreur d\'inscription', {
        description: state.message
      })
      lastToastedMessage.current = state.message
    }
  }, [state.success, state.message])

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let recaptchaToken = ''
    if (executeRecaptcha) {
      try {
        recaptchaToken = await executeRecaptcha('contest_registration')
      } catch (err) {
        console.error('reCAPTCHA error:', err)
      }
    }
    if (recaptchaToken) {
      formData.set('recaptchaToken', recaptchaToken)
    }
    formAction(formData)
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10"
          style={{ fontFamily: 'var(--font-bricolage)' }}
        >
          {content.title}
        </h1>

        <div className="rounded-xl border-2 border-gray-900 bg-gray-900 p-6 md:p-8">
        {state.success ? (
          <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30 space-y-4">
            <p
              className="text-green-400 font-semibold text-lg"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              {content.successMessage ?? state.message}
            </p>
            {content.successButtonLabel && content.successButtonUrl ? (
              <a
                href={content.successButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6052FF] text-white font-medium rounded-lg border-2 border-white hover:bg-[#4a3bcc] focus:outline-none focus:ring-2 focus:ring-[#6052FF] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors font-bricolage"
              >
                {content.successButtonLabel}
              </a>
            ) : null}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="enabledFields" value={fields.join(',')} />
            <input type="hidden" name="brevoListIds" value={content.brevoListIds.join(',')} />
            {/* Prénom et Nom */}
            {hasField(fields, 'firstName') || hasField(fields, 'lastName') ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hasField(fields, 'firstName') ? (
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  Prénom <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className={`w-full px-4 py-4 rounded-lg border-2 ${
                    state.errors?.firstName ? 'border-red-500' : 'border-gray-700'
                  } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white placeholder-gray-400`}
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                />
                {state.errors?.firstName && (
                  <p className="text-red-400 text-sm mt-1">{state.errors.firstName[0]}</p>
                )}
              </div>
              ) : null}
              {hasField(fields, 'lastName') ? (
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  Nom <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className={`w-full px-4 py-4 rounded-lg border-2 ${
                    state.errors?.lastName ? 'border-red-500' : 'border-gray-700'
                  } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white placeholder-gray-400`}
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                />
                {state.errors?.lastName && (
                  <p className="text-red-400 text-sm mt-1">{state.errors.lastName[0]}</p>
                )}
              </div>
              ) : null}
            </div>
            ) : null}

            {/* Email */}
            {hasField(fields, 'email') ? (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                Adresse Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full px-4 py-4 rounded-lg border-2 ${
                  state.errors?.email ? 'border-red-500' : 'border-gray-700'
                } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white placeholder-gray-400`}
                style={{ fontFamily: 'var(--font-bricolage)' }}
              />
              {state.errors?.email && (
                <p className="text-red-400 text-sm mt-1">{state.errors.email[0]}</p>
              )}
            </div>
            ) : null}

            {/* Téléphone */}
            {hasField(fields, 'phone') ? (
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                Numéro de Téléphone <span className="text-red-400">*</span>
              </label>
              <div className="phone-input-artcapital">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="FR"
                  value={phone}
                  onChange={(value) => setPhone(value || '')}
                  className={`w-full ${state.errors?.phone ? 'phone-error' : ''}`}
                />
                <input type="hidden" name="phone" value={phone} />
              </div>
              {state.errors?.phone && (
                <p className="text-red-400 text-sm mt-1">{state.errors.phone[0]}</p>
              )}
            </div>
            ) : null}

            {/* Profession */}
            {hasField(fields, 'profession') ? (
            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                Profession <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                required
                className={`w-full px-4 py-4 rounded-lg border-2 ${
                  state.errors?.profession ? 'border-red-500' : 'border-gray-700'
                } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white placeholder-gray-400`}
                style={{ fontFamily: 'var(--font-bricolage)' }}
                placeholder="Ex. peintre, sculpteur..."
              />
              {state.errors?.profession && (
                <p className="text-red-400 text-sm mt-1">{state.errors.profession[0]}</p>
              )}
            </div>
            ) : null}

            {/* Lieu de résidence */}
            {hasField(fields, 'residenceRegion') ? (
            <div>
              <label
                htmlFor="residenceRegion"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                Lieu de résidence <span className="text-red-400">*</span>
              </label>
              <select
                id="residenceRegion"
                name="residenceRegion"
                required
                className={`w-full px-4 py-4 rounded-lg border-2 ${
                  state.errors?.residenceRegion ? 'border-red-500' : 'border-gray-700'
                } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white`}
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                <option value="">Sélectionnez une région</option>
                {FRENCH_REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {state.errors?.residenceRegion && (
                <p className="text-red-400 text-sm mt-1">{state.errors.residenceRegion[0]}</p>
              )}
            </div>
            ) : null}

            {/* Artiste préféré */}
            {hasField(fields, 'preferredArtist') ? (
            <div>
              <label
                htmlFor="preferredArtist"
                className="block text-sm font-medium text-gray-300 mb-2"
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                Artiste préféré
              </label>
              <select
                id="preferredArtist"
                name="preferredArtist"
                className={`w-full px-4 py-4 rounded-lg border-2 ${
                  state.errors?.preferredArtist ? 'border-red-500' : 'border-gray-700'
                } bg-gray-800 focus:border-[#6052FF] focus:outline-none text-white`}
                style={{ fontFamily: 'var(--font-bricolage)' }}
              >
                <option value="">Sélectionnez un artiste</option>
                {PREFERRED_ARTISTS.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
              {state.errors?.preferredArtist && (
                <p className="text-red-400 text-sm mt-1">{state.errors.preferredArtist[0]}</p>
              )}
            </div>
            ) : null}

            {/* Checkbox Newsletter */}
            {hasField(fields, 'acceptNewsletter') ? (
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="acceptNewsletter"
                  checked={acceptNewsletter}
                  onChange={(e) => setAcceptNewsletter(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-gray-700 bg-gray-800 text-[#6052FF] focus:ring-2 focus:ring-[#6052FF]/50 cursor-pointer"
                />
                <span
                  className="text-sm text-gray-300 group-hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  {content.newsletterLabel ?? DEFAULT_CONTENT.newsletterLabel} <span className="text-red-400">*</span>
                </span>
              </label>
              {state.errors?.acceptNewsletter && (
                <p className="text-red-400 text-sm mt-1">{state.errors.acceptNewsletter[0]}</p>
              )}
            </div>
            ) : null}

            {/* Message d'erreur général */}
            {state.message && !state.success && (
              <p className="text-red-400 text-sm text-center">{state.message}</p>
            )}

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full py-4 px-6 bg-[#6052FF] text-white font-semibold rounded-lg hover:bg-[#4a3bcc] focus:outline-none focus:ring-2 focus:ring-[#6052FF] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              {pending ? (content.submitPendingLabel ?? DEFAULT_CONTENT.submitPendingLabel) : (content.submitLabel ?? DEFAULT_CONTENT.submitLabel)}
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
