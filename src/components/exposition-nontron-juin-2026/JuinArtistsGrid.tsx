'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

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
    name: 'Marie de Saint Germain',
    title: 'Plasticienne — Mixed média',
    imageSrc: '/images/exposition-nontron-juin-2026/Marie De Saint Germain.webp',
    imageAlt: 'Marie de Saint Germain — Artiste plasticienne',
    label: 'Plasticienne — Mixed média',
    bio: [
      "Marie de Saint Germain est une artiste plasticienne autodidacte dont l'œuvre se déploie essentiellement à travers le Mixed média, moyen d'expression privilégié pour incarner un imaginaire poétique et subtil.",
      "Son travail, profondément onirique et symbolique, explore les méandres de l'identité, les tensions du mental et les zones floues de la mémoire. Mêlant papier, photographie, peinture acrylique, encre, ficelles, elle compose des images troublantes, à la frontière du rêve et de l'éveil.",
      "Son univers visuel, habité par des figures fragmentées, des regards suspendus et des corps en métamorphose, interroge l'invisible, l'enfoui, et ce qui persiste au-delà de la faille. Entre apparition et disparition, ses œuvres ouvrent un espace de poésie viscérale, où le visible vacille et où l'intime dialogue avec l'étrange.",
      "Marie de Saint Germain ne cherche pas simplement à représenter : elle tisse un langage visuel, presque cryptique, dans lequel le spectateur est appelé à interpréter, à ressentir. Sa pratique artistique s'inscrit dans une démarche sincère et intérieure : elle mêle introspection et ouverture au monde, transformant des fragments perçus comme anodins en récits visuels puissants.",
    ],
  },
  {
    name: 'Younes Farhi',
    title: 'Photographie documentaire & plasticienne',
    imageSrc: '/images/exposition-nontron-juin-2026/Younes FARHI.webp',
    imageAlt: 'Younes Farhi — Photographe',
    label: 'Photographie documentaire & plasticienne',
    bio: [
      "Je suis né et j'ai grandi à Toulouse. Mon parcours s'est construit entre des espaces différents : quartier populaire, périphérie pavillonnaire, campagne ; et entre deux héritages culturels distincts, français et marocain, que j'ai appris à faire cohabiter sans cadre ni mode d'emploi.",
      "Avant la photographie, l'écriture et le rap ont occupé une place centrale. Cette pratique m'a formé au rythme, à l'exposition de soi, au rapport au collectif et à la désillusion. Elle m'a surtout appris à regarder le monde et à m'y situer.",
      "La photographie est arrivée sans stratégie. Comme un déplacement. Là où la musique me plaçait au centre, l'image m'a permis de me tenir à côté. De regarder sans performer. De rester.",
      "J'ai commencé par la rue, les amis, les concerts, les bars, les fins de nuit. Je photographiais parce que j'étais là, sans attente, sans pression. L'appareil a pris la place du carnet. Un voyage solitaire au Pérou a confirmé cette évidence : photographier était l'endroit juste.",
      "Depuis, je travaille par immersion et par projets au long cours. Mon écriture oscille entre documentaire et recherche plastique, entre netteté et altération. Je photographie depuis l'intérieur, au contact du réel et de moi-même.",
    ],
  },
]

interface ArtistPanelProps {
  artist: ArtistData | null
  onClose: () => void
}

function ArtistPanel({ artist, onClose }: ArtistPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = artist !== null

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-400',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

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
        <div className="absolute top-4 right-4 z-10">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fermer la fiche artiste"
            className="flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {artist && (
          <>
            <div className="relative h-64 w-full flex-shrink-0 overflow-hidden">
              <Image
                src={artist.imageSrc}
                alt={artist.imageAlt}
                fill
                className="object-cover object-top grayscale-[0.3]"
                sizes="512px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
            </div>

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
                  <p key={index} className="text-gray-400 font-light font-montserrat text-sm leading-relaxed">
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

export default function JuinArtistsGrid() {
  const [selectedArtist, setSelectedArtist] = useState<ArtistData | null>(null)

  return (
    <>
      <section id="artistes-exposes" className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-4xl mb-16 italic font-bricolage">Artistes Exposés</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
