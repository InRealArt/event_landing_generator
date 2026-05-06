'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function JuinEdito() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const defaults: gsap.TweenVars = { ease: 'power3.out', duration: 0.8 }
      const triggerDefaults = (trigger: string): ScrollTrigger.Vars => ({
        trigger,
        start: 'top 85%',
        once: true,
      })

      gsap.from('.juin-edito-supertitle', { ...defaults, opacity: 0, y: 24, scrollTrigger: triggerDefaults('.juin-edito-header') })
      gsap.from('.juin-edito-title', { ...defaults, opacity: 0, y: 24, delay: 0.12, scrollTrigger: triggerDefaults('.juin-edito-header') })
      gsap.from('.juin-edito-divider', { ...defaults, opacity: 0, y: 16, delay: 0.24, scrollTrigger: triggerDefaults('.juin-edito-header') })
      gsap.from('.juin-edito-image-left', { ...defaults, duration: 0.9, opacity: 0, x: -20, scrollTrigger: triggerDefaults('.juin-edito-image-left') })
      gsap.from('.juin-edito-text-right', { ...defaults, duration: 0.9, opacity: 0, x: 20, scrollTrigger: triggerDefaults('.juin-edito-text-right') })
      gsap.from('.juin-apropos-text', { ...defaults, duration: 0.9, opacity: 0, x: -20, scrollTrigger: triggerDefaults('.juin-apropos-text') })
      gsap.from('.juin-apropos-image', { ...defaults, duration: 1, opacity: 0, x: 20, scale: 0.97, transformOrigin: 'center center', scrollTrigger: triggerDefaults('.juin-apropos-image') })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef}>
      {/* Section sombre — L'Édito */}
      <section
        id="edito"
        className="py-24 px-6"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="juin-edito-header text-center text-white mb-16">
            <p className="juin-edito-supertitle text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-sm mb-6">
              Le Mot de la Galerie
            </p>
            <h2 className="juin-edito-title text-4xl md:text-5xl font-bricolage italic mb-8">
              L&apos;Édito
            </h2>
            <div className="juin-edito-divider w-20 h-0.5 bg-[#c5a059] mx-auto" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="juin-edito-image-left md:w-1/2 relative w-full aspect-[3/2] overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src="/images/exposition-nontron-juin-2026/galerie_nontron.webp"
                alt="La galerie de Nontron"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="juin-edito-text-right md:w-1/2 text-white">
              <blockquote className="text-xl md:text-2xl font-bricolage italic font-light text-gray-300 leading-relaxed mb-8">
                120 m² de bonheur au cœur du Périgord Vert
              </blockquote>
              <div className="space-y-4 text-base md:text-lg font-montserrat font-light text-gray-400 leading-relaxed">
                <p>
                  À l&apos;écart du tumulte, cette petite galerie de province déploie une sélection
                  pointue dans un écrin lumineux. Ici, l&apos;art se vit sans détour&nbsp;: des œuvres
                  fortes, une atmosphère simple et habitée, et ce luxe rare de prendre le temps.
                </p>
                <p>
                  Une parenthèse inspirée, loin des circuits attendus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section claire — L'exposition */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="juin-apropos-text md:w-1/2">
            <div className="border-l-4 border-[#c5a059] pl-4 mb-8">
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
                À propos
              </h2>
              <h3 className="text-3xl font-bricolage font-bold text-gray-900">
                L&apos;exposition
              </h3>
            </div>

            <div className="space-y-5 text-gray-600 leading-relaxed font-light font-montserrat">
              <p>
                Deux univers singuliers se retrouvent pour une édition de juin aux accents
                profondément humains. Entre la sensibilité picturale de{' '}
                <strong className="text-gray-800 font-semibold">Marie de Saint Germain</strong> et
                l&apos;énergie figurative de{' '}
                <strong className="text-gray-800 font-semibold">Younes Farhi</strong>, cette
                exposition explore la rencontre entre tradition et modernité.
              </p>
              <p>
                Un dialogue visuel rare, dans l&apos;écrin de la LJ Gallery au cœur du Périgord Vert.
              </p>
            </div>

            <p className="mt-8 font-semibold font-montserrat text-[#c5a059]">— Ania Chrusciany</p>
          </div>

          <div className="juin-apropos-image md:w-1/2 relative w-full aspect-[4/5] overflow-hidden">
            <Image
              src="/images/exposition-nontron-juin-2026/Anna.webp"
              alt="Ania Chrusciany"
              fill
              className="object-cover object-top shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
