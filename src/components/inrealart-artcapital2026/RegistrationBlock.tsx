'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import PhoneInput from 'react-phone-number-input'
import { toast } from 'sonner'
import { registerToContest, ContestFormState } from '@/actions/invitationArtCapital2026Actions'
import 'react-phone-number-input/style.css'

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
  'Stefan Beiu'
] as const

const initialState: ContestFormState = {
  success: false,
  message: ''
}

export default function RegistrationBlock () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [state, formAction, pending] = useActionState(registerToContest, initialState)
  const [phone, setPhone] = useState('')
  const [acceptNewsletter, setAcceptNewsletter] = useState(false)
  const lastToastedMessage = useRef('')

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
          Inscrivez-vous pour participer
        </h1>

        <div className="rounded-xl border-2 border-gray-900 bg-gray-900 p-6 md:p-8">
        {state.success ? (
          <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/30">
            <p
              className="text-green-400 font-semibold text-lg"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              {state.message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Email */}
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

            {/* Téléphone */}
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

            {/* Profession */}
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

            {/* Lieu de résidence */}
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

            {/* Artiste préféré */}
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

            {/* Checkbox Newsletter */}
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
                  J&apos;accepte de m&apos;inscrire à la newsletter <span className="text-red-400">*</span>
                </span>
              </label>
              {state.errors?.acceptNewsletter && (
                <p className="text-red-400 text-sm mt-1">{state.errors.acceptNewsletter[0]}</p>
              )}
            </div>

            {/* Message d'erreur général */}
            {state.message && !state.success && (
              <p className="text-red-400 text-sm text-center">{state.message}</p>
            )}

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={pending || !acceptNewsletter}
              className="w-full py-4 px-6 bg-[#6052FF] text-white font-semibold rounded-lg hover:bg-[#4a3bcc] focus:outline-none focus:ring-2 focus:ring-[#6052FF] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-bricolage)' }}
            >
              {pending ? 'Inscription en cours...' : "S'inscrire Maintenant"}
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
