'use client'

import { useActionState, useEffect, useRef, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import { subscribeToBiennaleNewsletter } from '@/actions/biennaleNewsletterActions'
import type { BiennaleNewsletterState } from '@/actions/biennaleNewsletterActions'
import { loadRecaptchaScript, executeRecaptcha } from '@/lib/recaptcha'

const initialState: BiennaleNewsletterState = {
  success: false,
  message: '',
}

// ---------------------------------------------------------------------------
// Submit button — reads pending state from the surrounding <form> via
// useFormStatus, so it must live in its own component.
// An extra `externalPending` prop covers the reCAPTCHA token fetch that
// happens before the server action is dispatched.
// ---------------------------------------------------------------------------
function SubmitButton({ externalPending }: { externalPending: boolean }) {
  const { pending } = useFormStatus()
  const isDisabled = pending || externalPending

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className="
        shrink-0 h-12 px-8
        bg-[#c5a059] hover:bg-[#b8924a] active:bg-[#a8833e]
        text-white font-montserrat font-semibold text-sm uppercase tracking-widest
        rounded-none
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {isDisabled ? 'Envoi\u2026' : "S'inscrire"}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Success state — fade in with a CSS animation, no Framer Motion needed here.
// ---------------------------------------------------------------------------
function SuccessMessage() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 animate-[fadeInUp_0.5s_ease-out_both]"
    >
      {/* Gold checkmark */}
      <svg
        className="w-12 h-12 text-[#c5a059]"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 24.5l7 7 13-13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-2xl font-bricolage italic text-white tracking-tight">
        Vous êtes inscrit(e)&nbsp;!
      </p>
      <p className="font-montserrat font-light text-gray-400 text-sm max-w-xs text-center leading-relaxed">
        Nous avons bien enregistré votre adresse. Vous recevrez nos prochaines
        actualités en avant-première.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function BiennaleNewsletter() {
  const [state, formAction] = useActionState(
    subscribeToBiennaleNewsletter,
    initialState
  )
  const formRef = useRef<HTMLFormElement>(null)
  const [isRecaptchaLoading, startTransition] = useTransition()

  // Load the reCAPTCHA v3 script as soon as the component mounts.
  useEffect(() => {
    loadRecaptchaScript().catch((err) =>
      console.error('Erreur de chargement reCAPTCHA:', err)
    )
  }, [])

  // Show toast on state change, but only when a message is present
  // (skip the initial empty state).
  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
    } else if (state.errors || state.message) {
      toast.error(state.message || 'Une erreur est survenue.')
    }
  }, [state])

  // Intercept the native form submit so we can inject the reCAPTCHA token
  // into FormData before dispatching the server action.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = formRef.current
    if (!form) return

    let token: string
    try {
      token = await executeRecaptcha()
    } catch {
      toast.error('Vérification anti-spam échouée. Veuillez réessayer.')
      return
    }

    const formData = new FormData(form)
    formData.set('recaptchaToken', token)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden bg-black py-24 px-6"
    >

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Ornamental divider */}
        <div aria-hidden="true" className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px w-16 bg-[#c5a059]/40" />
          <span className="text-[#c5a059] text-sm select-none">✦</span>
          <div className="h-px w-16 bg-[#c5a059]/40" />
        </div>

        {/* Heading */}
        <h2
          id="newsletter-heading"
          className="text-4xl sm:text-5xl font-bricolage italic text-white tracking-tight mb-4"
        >
          Restez au cœur de l&apos;art
        </h2>

        {/* Subtext */}
        <p className="font-montserrat font-light text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Recevez en avant-première les actualités de la Biennale, les portraits
          d&apos;artistes et les invitations aux prochains vernissages.
        </p>

        {/* Form or success state */}
        {state.success ? (
          <SuccessMessage />
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row items-stretch gap-0 max-w-2xl mx-auto"
          >
            {/* First name — optional */}
            <div className="flex flex-col flex-1 min-w-0">
              <label htmlFor="newsletter-firstname" className="sr-only">
                Prénom (optionnel)
              </label>
              <input
                id="newsletter-firstname"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Prénom (optionnel)"
                maxLength={100}
                aria-invalid={!!state.errors?.firstName}
                aria-describedby={
                  state.errors?.firstName
                    ? 'newsletter-firstname-error'
                    : undefined
                }
                className="
                  h-12 px-4
                  bg-white/5 border border-white/10 border-r-0
                  text-white placeholder:text-gray-600
                  font-montserrat font-light text-sm
                  focus:outline-none focus:border-[#c5a059]/60 focus:bg-white/8
                  transition-colors duration-150
                  aria-[invalid=true]:border-red-500/60
                "
              />
              {state.errors?.firstName && (
                <p
                  id="newsletter-firstname-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-400 font-montserrat text-left"
                >
                  {state.errors.firstName[0]}
                </p>
              )}
            </div>

            {/* Email — required */}
            <div className="flex flex-col flex-[2] min-w-0">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Votre adresse email"
                maxLength={255}
                aria-invalid={!!state.errors?.email}
                aria-describedby={
                  state.errors?.email ? 'newsletter-email-error' : undefined
                }
                className="
                  h-12 px-4
                  bg-white/5 border border-white/10
                  text-white placeholder:text-gray-600
                  font-montserrat font-light text-sm
                  focus:outline-none focus:border-[#c5a059]/60 focus:bg-white/8
                  transition-colors duration-150
                  aria-[invalid=true]:border-red-500/60
                "
              />
              {state.errors?.email && (
                <p
                  id="newsletter-email-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-400 font-montserrat text-left"
                >
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <SubmitButton externalPending={isRecaptchaLoading} />
          </form>
        )}

        {/* General error (non-field) */}
        {!state.success && state.message && !state.errors && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-400 font-montserrat"
          >
            {state.message}
          </p>
        )}

        {/* Privacy note */}
        <p className="mt-8 text-xs text-gray-600 font-montserrat font-light max-w-sm mx-auto leading-relaxed">
          Vos données sont traitées par La Biennale Versaillaise conformément au
          RGPD. Désinscription possible à tout moment.
        </p>
      </div>
    </section>
  )
}
