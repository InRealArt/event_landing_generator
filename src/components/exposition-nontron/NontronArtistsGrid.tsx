'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface ArtistData {
  name: string
  title: string
  imageSrc: string
  imageAlt: string
  label: string
  bio: string[]
}

const artistsData: ArtistData[] = [
  {
    name: 'Florence Autelin',
    title: "Photographie et peinture",
    imageSrc: '/images/exposition-nontron/Florence AUTELIN.webp',
    imageAlt: 'Florence Autelin — Peintre',
    label: "Photographie et peinture",
    bio: [
      "Florence est une artiste reconnue pour ses œuvres impressionnantes et expressives, empreintes d'un style unique. Grâce à une technique singulière qui fusionne couleurs vibrantes et coups de pinceaux audacieux, elle donne vie avec maestria à ses sujets sur des toiles d'une ampleur saisissante.",
      "L'approche de Florence, qui mêle différentes techniques, combine peinture acrylique, aérosol, pigments, stylo doré, photographies, graffiti, calligraphie et résine.",
      "Chaque œuvre est minutieusement réalisée sur aluminium brossé ou toile – souvent rehaussée d'une finition laquée ou résineuse – et présentée dans d'élégants cadres noirs épurés, prête à être accrochée. Ce choix raffiné de matériaux amplifie la profondeur, la texture et l'intensité émotionnelle de son travail.",
    ],
  },
  {
    name: 'Alain Pontecorvo',
    title: 'Peintre du réalisme constructiviste',
    imageSrc: '/images/exposition-nontron/alain_pontecorvo.webp',
    imageAlt: 'Alain Pontecorvo — Peintre',
    label: 'Peintre du réalisme constructiviste',
    bio: [
      'Figure majeure de la peinture française contemporaine, Alain Pontecorvo est reconnu pour son univers unique, où lumière, géométrie et émotion se rencontrent.',
      "Né à Paris en 1936 et formé aux Arts décoratifs puis à l'École Estienne, il débute sa carrière comme directeur artistique avant de revenir à sa passion première : la peinture. Depuis sa première exposition en 1978, son travail a été salué par la critique et exposé dans de nombreuses galeries et salons internationaux.",
      "Son œuvre navigue entre figuration et abstraction, donnant naissance à ce que certains appellent un réalisme constructiviste. Figures, nus, intérieurs, paysages et natures mortes se transforment sous son regard en compositions où chaque lumière et chaque ombre racontent une histoire.",
    ],
  },
  {
    name: 'Jean-Paul Boyer',
    title: 'Sculpteur du vide',
    imageSrc: '/images/exposition-nontron/jp-boyer.webp',
    imageAlt: 'Jean-Paul Boyer — Sculpteur',
    label: 'Sculpteur du vide',
    bio: [
      "Jean-Paul Boyer est un sculpteur dont le travail explore la modularité et l'interaction avec l'espace. Après une production classique en bois, il développe en 1989 ses Sculptures Modulables, des œuvres où chaque élément, libéré et recomposable, permet au spectateur de modifier l'espace autour de la sculpture.",
      "Travaillant divers matériaux – bois, marbre, bronze, verre et résines – Boyer invite ainsi le public à interagir et à faire évoluer l'œuvre, plaçant l'air et l'espace comme parties intégrantes de sa création. À ce jour, il a réalisé près d'un millier de ces sculptures uniques, exposées dans des galeries et salons en France et à l'international.",
    ],
  },
  {
    name: 'Stéphane Illand',
    title: 'Peintre à la cire d\'abeille',
    imageSrc: '/images/exposition-nontron/Stephane illand.webp',
    imageAlt: 'Stéphane Illand — Peintre',
    label: 'Peintre à la cire d\'abeille',
    bio: [
      "Stéphane ILLAND puise au cœur du vivant pour révéler l'éclatante fragilité de la vie sauvage. Par son art, il interroge l'empreinte de nos modes de vie, mettant en lumière la manière dont le consumérisme érode l'équilibre des écosystèmes.",
      "Porté par une conscience écologique exigeante, il privilégie désormais la peinture à la cire d'abeille, un médium noble et naturel. Cette démarche, à la fois esthétique et éthique, témoigne de son respect profond pour la Terre et de l'urgence de préserver la biodiversité.",
      "Son engagement transcende la toile : fidèle à ses convictions, il reverse 10 % du fruit de ses ventes à des organisations telles que Jiboiana, Akatia, Sea Shepherd France, AVES France et la LPO, contribuant ainsi activement à la sauvegarde de l'Amazonie, des océans et de la faune sauvage.",
    ],
  },
]

// ---------------------------------------------------------------------------
// ArtistPanel — slide-over drawer
// ---------------------------------------------------------------------------

interface ArtistPanelProps {
  artist: ArtistData | null
  onClose: () => void
}

function ArtistPanel({ artist, onClose }: ArtistPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = artist !== null

  // Focus trap: focus the close button when panel opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  // Body scroll lock
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

  // Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
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
        aria-label="Fiche artiste"
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
            aria-label="Fermer la fiche artiste"
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

        {artist && (
          <>
            {/* Artist image */}
            <div className="relative h-64 w-full flex-shrink-0 overflow-hidden">
              <Image
                src={artist.imageSrc}
                alt={artist.imageAlt}
                fill
                className="object-cover object-top grayscale-[0.3]"
                sizes="512px"
              />
              {/* Bottom gradient fade into panel bg */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            </div>

            {/* Scrollable text content */}
            <div className="flex-1 overflow-y-auto px-8 pb-12 pt-6">
              <p className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-montserrat font-semibold mb-3">
                {artist.label}
              </p>

              <h2 className="text-3xl font-bricolage italic text-white mb-3 leading-tight">
                {artist.name}
              </h2>

              <div className="w-12 h-px bg-[#c5a059] mb-6" aria-hidden="true" />

              <div className="space-y-4">
                {artist.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-400 font-light font-montserrat text-sm leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// ArtistCard
// ---------------------------------------------------------------------------

interface ArtistCardProps {
  artist: ArtistData
  onLearnMore: (artist: ArtistData) => void
}

function ArtistCard({ artist, onLearnMore }: ArtistCardProps) {
  return (
    <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col">
      <div className="mb-6 overflow-hidden h-[400px] relative">
        <Image
          src={artist.imageSrc}
          alt={artist.imageAlt}
          fill
          className="object-cover object-top grayscale"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <h3 className="text-xl mb-2 uppercase tracking-tighter font-bold font-bricolage">
        {artist.name}
      </h3>
      <p className="text-[#c5a059] mb-6 font-semibold font-montserrat text-sm flex-1">{artist.title}</p>

      <button
        onClick={() => onLearnMore(artist)}
        className="text-xs uppercase font-bold font-montserrat border-b border-black pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 self-center"
      >
        En savoir plus
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// NontronArtistsGrid
// ---------------------------------------------------------------------------

export default function NontronArtistsGrid() {
  const [selectedArtist, setSelectedArtist] = useState<ArtistData | null>(null)

  return (
    <>
      <section id="artistes-exposes" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl mb-16 italic font-bricolage">Artistes Exposés</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {artistsData.map((artist) => (
              <ArtistCard
                key={artist.name}
                artist={artist}
                onLearnMore={setSelectedArtist}
              />
            ))}
          </div>
        </div>
      </section>

      <ArtistPanel
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
      />
    </>
  )
}
