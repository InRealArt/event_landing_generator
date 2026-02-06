'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface HeroSectionContent {
  title: string
  description?: string
  infoBox: {
    date: string
    lieu: string
  }
  ctaLabel: string
  ctaHref?: string
  backgroundImage: string
  backgroundImageAlt?: string
  artworkImage: string
  artworkImageAlt?: string
  artworkFallbackLabel?: string
  /** Dimensions optionnelles de l'image œuvre (droite). Par défaut 280×480. */
  artworkImageWidth?: number
  artworkImageHeight?: number
}

const DEFAULT_HERO: HeroSectionContent = {
  title: "Ne manquez pas l’occasion de découvrir nos artistes et de leurs œuvres lors d’Art Capital 2026 au Grand Palais. ",
  description: '',
  infoBox: {
    date: 'du 13 au 15 février',
    lieu: 'Grand Palais - Paris'
  },
  ctaLabel: 'Participer',
  ctaHref: '#participer',
  backgroundImage: '/images/ira_artCapital2026/grand_palais.webp',
  backgroundImageAlt: 'Grand Palais - Art Capital 2026',
  artworkImage: '/images/ira_artCapital2026/artCapital2026.webp',
  artworkImageAlt: 'Affiche Art Capital 2026',
  artworkFallbackLabel: 'Affiche Art Capital 2026'
}

interface HeroSectionProps {
  content?: Partial<HeroSectionContent>
}

export default function HeroSection ({ content: contentOverride }: HeroSectionProps) {
  const [artworkError, setArtworkError] = useState(false)
  const content: HeroSectionContent = {
    ...DEFAULT_HERO,
    ...contentOverride
  }
  const ctaHref = content.ctaHref ?? '#participer'
  const showDescription = content.description != null && content.description !== ''
  const artworkWidth = content.artworkImageWidth ?? 280
  const artworkHeight = content.artworkImageHeight ?? 480

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt={content.backgroundImageAlt ?? 'Grand Palais - Art Capital 2026'}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Overlay sombre pour lisibilité */}
      <div
        className="absolute inset-0 bg-black/60"
        aria-hidden
      />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-[80%] md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Bloc texte (gauche) - aligné sur le screenshot */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-bricolage leading-tight text-left max-w-2xl">
              {content.title}
            </h1>
            {showDescription && (
              <p className="text-white text-base md:text-lg font-bricolage font-normal max-w-2xl text-left">
                {content.description}
              </p>
            )}

            {/* Encadré d'information - style glass avec pastilles animées */}
            <div className="space-y-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 max-w-2xl">
              <p className="text-xl font-semibold flex items-center gap-2 text-white font-bricolage">
                <span className="w-2 h-2 bg-[#6052FF] rounded-full animate-pulse shrink-0" aria-hidden />
                Date: {content.infoBox.date}
              </p>
              <p className="text-xl flex items-center gap-2 text-white font-bricolage">
                <span className="w-2 h-2 bg-[#6052FF] rounded-full animate-pulse shrink-0" aria-hidden />
                Lieu: {content.infoBox.lieu}
              </p>
            </div>

            <a
              href={ctaHref}
              className="flex w-full max-w-2xl items-center justify-center px-8 py-3 bg-[#6052FF] text-white font-medium rounded-lg border-2 border-white hover:bg-[#4a3bcc] focus:outline-none focus:ring-2 focus:ring-[#6052FF] focus:ring-offset-2 transition-colors mt-4 font-bricolage"
            >
              {content.ctaLabel}
            </a>
          </div>

          {/* Image œuvre (droite) - ~30-40% */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            {artworkError ? (
              <span className="text-gray-500 font-bricolage text-sm text-center px-4">
                {content.artworkFallbackLabel ?? 'Affiche Art Capital 2026'}
              </span>
            ) : (
              <Image
                src={content.artworkImage}
                alt={content.artworkImageAlt ?? 'Affiche Art Capital 2026'}
                width={artworkWidth}
                height={artworkHeight}
                className="w-full max-w-sm h-auto object-contain"
                unoptimized
                onError={() => setArtworkError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
