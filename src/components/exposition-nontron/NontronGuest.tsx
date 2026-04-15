'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Panel — slide-over drawer (même pattern que NontronArtistsGrid)
// ---------------------------------------------------------------------------

interface GuestPanelProps {
  isOpen: boolean
  onClose: () => void
}

function GuestPanel({ isOpen, onClose }: GuestPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-400',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Fiche invitée spéciale"
        className={[
          'fixed top-0 right-0 z-50 h-full w-full max-w-lg bg-[#0a0a0a] flex flex-col',
          'transition-transform duration-400 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fermer la fiche invitée"
            className="flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Artist image */}
        <div className="relative h-64 w-full flex-shrink-0 overflow-hidden">
          <Image
            src="/images/exposition-nontron/Anny Duperey.webp"
            alt="Anny Duperey — Invitée Spéciale"
            fill
            className="object-cover object-top grayscale-[0.3]"
            sizes="512px"
          />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Scrollable text content */}
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-6">
          <p className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-montserrat font-semibold mb-3">
            Invitée Spéciale
          </p>

          <h2 className="text-3xl font-bricolage italic text-white mb-3 leading-tight">
            Anny Duperey
          </h2>

          <div className="w-12 h-px bg-[#c5a059] mb-6" aria-hidden="true" />

          <div className="space-y-4">
            <p className="text-gray-400 font-light font-montserrat text-sm leading-relaxed">
              Icône de la culture française, Anny Duperey apporte son regard sensible et sa passion
              pour cette exposition. Sa présence souligne son engagement pour l&apos;art, la culture
              et le patrimoine.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// NontronGuest
// ---------------------------------------------------------------------------

export default function NontronGuest() {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <>
      <section id="invitee" className="py-24 bg-[#faf8f4] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Texte */}
          <div className="md:w-1/2 order-2 md:order-1">
            {/* Label doré */}
            <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-xs mb-4">
              Invitée Spéciale
            </p>

            {/* Nom */}
            <h2 className="text-4xl md:text-5xl font-bricolage font-bold italic text-gray-900 mb-6">
              Anny Duperey
            </h2>

            {/* Divider doré court */}
            <div className="w-12 h-0.5 bg-[#c5a059] mb-8" />

            {/* Bio */}
            <p className="text-gray-600 leading-relaxed font-light font-montserrat text-base">
              Icône de la culture française, Anny Duperey apporte son regard sensible et sa passion
              pour cette exposition. Sa présence souligne son engagement pour l&apos;art, la culture
              et le patrimoine.
            </p>

            {/* Lien — ouvre le panel */}
            <button
              onClick={() => setPanelOpen(true)}
              className="inline-block mt-8 text-xs uppercase tracking-widest font-bold font-montserrat border-b border-[#c5a059] text-[#c5a059] pb-1 hover:text-black hover:border-black transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2"
            >
              En savoir plus
            </button>
          </div>

          {/* Image — plein bord */}
          <div className="md:w-1/2 order-1 md:order-2 relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src="/images/exposition-nontron/Anny Duperey.webp"
              alt="Anny Duperey — Invitée Spéciale"
              fill
              className="object-cover object-top shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <GuestPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  )
}
