'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const checklistItems = [
  "Plus de 25 œuvres d'exception",
  '3 disciplines majeures',
  "30 jours d'exposition",
]

export default function NontronStats() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ease = 'power3.out'
    const el = containerRef.current
    if (!el) return

    // Header avec barre gauche — slide depuis la gauche
    const header = el.querySelector('.stats-header')
    if (header) {
      gsap.from(header, {
        opacity: 0, x: -20, duration: 0.8, ease,
        scrollTrigger: { trigger: header, start: 'top 85%', once: true },
      })
    }

    // Grand chiffre "4" — scale + fade
    const bigStat = el.querySelector('.stats-big')
    if (bigStat) {
      gsap.from(bigStat, {
        opacity: 0, scale: 0.7, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: bigStat, start: 'top 85%', once: true },
      })
    }

    // Bloc texte droite — fade + slide up
    const textBlock = el.querySelector('.stats-text')
    if (textBlock) {
      gsap.from(Array.from(textBlock.children), {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease,
        scrollTrigger: { trigger: textBlock, start: 'top 85%', once: true },
      })
    }

    // Items checklist — slide depuis la droite en stagger
    const items = el.querySelectorAll('.stats-item')
    if (items.length) {
      gsap.from(Array.from(items), {
        opacity: 0, x: 20, duration: 0.6, stagger: 0.12, ease,
        scrollTrigger: { trigger: items[0], start: 'top 88%', once: true },
      })
    }
  }, { scope: containerRef })

  return (
    <>
      <section ref={containerRef} className="py-24 bg-[#faf8f4] px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Titre section avec barre gauche */}
          <div className="stats-header border-l-4 border-[#c5a059] pl-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
              Chiffres clés
            </h2>
            <h3 className="text-3xl font-bricolage font-bold text-gray-900">
              L&apos;Exposition en Chiffres
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Grande stat dorée */}
            <div className="stats-big md:w-1/3 text-center md:text-left">
              <p className="text-7xl md:text-8xl font-bricolage font-bold text-[#c5a059] leading-none">
                4
              </p>
              <p className="text-2xl font-bricolage italic text-gray-800 mt-2">Artistes</p>
            </div>

            {/* Texte + checklist */}
            <div className="md:w-2/3">
              <div className="stats-text">
                <h3 className="text-2xl font-bricolage font-bold text-gray-900 mb-4">
                  Une édition mémorable
                </h3>
                <p className="text-gray-600 font-light font-montserrat leading-relaxed mb-8">
                  Réunissant des talents venant des quatre coins de la France, cette exposition
                  propose un panorama riche et varié de la création contemporaine.
                </p>
              </div>

              <ul className="space-y-3">
                {checklistItems.map((item) => (
                  <li
                    key={item}
                    className="stats-item flex items-center gap-3 font-montserrat text-sm font-semibold text-gray-800"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#c5a059] flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
