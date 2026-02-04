'use client'

import Image from 'next/image'
import { useActionState, useEffect, useRef, startTransition, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import PhoneInput from 'react-phone-number-input'
import { ArtistData } from '@/lib/artistData'
import PartnershipLabel from './PartnershipLabel'
import { requestCatalog, type CatalogFormState } from '@/actions/catalogContactActions'
import 'react-phone-number-input/style.css'

interface CatalogSectionProps {
  artistData: ArtistData
  slug: string
}

const initialState: CatalogFormState = {
  success: false,
  message: ''
}

export default function CatalogSection({ artistData, slug }: CatalogSectionProps) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [state, formAction, pending] = useActionState(requestCatalog, initialState)
  const [phone, setPhone] = useState<string>('')
  const errorsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).some((k) => (state.errors as Record<string, string[] | undefined>)[k]?.length)) {
      errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [state.errors])

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let recaptchaToken = ''
    if (executeRecaptcha) {
      try {
        recaptchaToken = await executeRecaptcha('catalog_request')
      } catch (err) {
        console.error('reCAPTCHA error:', err)
      }
    }
    if (recaptchaToken) {
      formData.set('recaptchaToken', recaptchaToken)
    }
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-[80%] md:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Catalog Image */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md mb-6">
              <Image
                src={artistData.posterImage}
                alt={`Catalogue ${artistData.fullName}`}
                width={400}
                height={600}
                className="object-cover rounded-lg shadow-lg"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            {/* Partnership Label */}
            {artistData.partnershipLabel && (
              <PartnershipLabel label={artistData.partnershipLabel} />
            )}
          </div>

          {/* Right Section - Catalog Request Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-bricolage mb-4">
                {artistData.content.catalogTitle}
              </h2>
              <p className="text-gray-700 font-montserrat">
                {artistData.content.catalogDescription}
              </p>
            </div>

            {state.success ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-800 rounded-lg font-montserrat">
                <p className="font-semibold">{state.message}</p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="slug" value={slug} />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 font-montserrat mb-2">
                  {artistData.content.catalogForm.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={artistData.content.catalogForm.namePlaceholder}
                  required
                  className={`w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-montserrat ${state.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {state.errors?.name && (
                  <p className="text-red-600 text-sm mt-1 font-montserrat font-medium" role="alert">{state.errors.name[0]}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 font-montserrat mb-2">
                  {artistData.content.catalogForm.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={artistData.content.catalogForm.emailPlaceholder}
                  required
                  className={`w-full px-4 py-3 bg-gray-100 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-montserrat ${state.errors?.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {state.errors?.email && (
                  <p className="text-red-600 text-sm mt-1 font-montserrat font-medium" role="alert">{state.errors.email[0]}</p>
                )}
              </div>

              {/* Mobile Field (optionnel) - E.164 pour Brevo */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 font-montserrat mb-2">
                  {artistData.content.catalogForm.mobileLabel} <span className="text-gray-500 font-normal">(optionnel)</span>
                </label>
                <div className={`phone-input-catalog ${state.errors?.mobile ? 'phone-error' : ''}`}>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="FR"
                    value={phone}
                    onChange={(value) => setPhone(value || '')}
                    className="w-full font-montserrat"
                  />
                  <input type="hidden" name="mobile" value={phone} />
                </div>
                {state.errors?.mobile && (
                  <p className="text-red-600 text-sm mt-1 font-montserrat font-medium" role="alert">{state.errors.mobile[0]}</p>
                )}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700 font-montserrat">
                  {artistData.content.catalogForm.privacyText}
                </label>
              </div>

              {/* Message d'erreur général + liste des champs en erreur */}
              {state.message && !state.success && (
                <div
                  ref={errorsRef}
                  id="catalog-form-errors"
                  role="alert"
                  className="p-4 bg-red-50 border-2 border-red-400 text-red-800 rounded-lg font-montserrat"
                  aria-live="polite"
                >
                  <p className="font-semibold mb-2">{state.message}</p>
                  {state.errors && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {state.errors.name?.map((msg, i) => (
                        <li key={`name-${i}`}>
                          <span className="font-medium">{artistData.content.catalogForm.nameLabel.replace('*', '').trim()}</span> : {msg}
                        </li>
                      ))}
                      {state.errors.email?.map((msg, i) => (
                        <li key={`email-${i}`}>
                          <span className="font-medium">{artistData.content.catalogForm.emailLabel.replace('*', '').trim()}</span> : {msg}
                        </li>
                      ))}
                      {state.errors.mobile?.map((msg, i) => (
                        <li key={`mobile-${i}`}>
                          <span className="font-medium">{artistData.content.catalogForm.mobileLabel.replace('*', '').trim()}</span> : {msg}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={pending}
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-medium font-montserrat hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? 'Envoi en cours...' : artistData.content.catalogForm.buttonText}
              </button>

            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
