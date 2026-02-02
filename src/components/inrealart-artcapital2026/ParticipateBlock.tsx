'use client'

import Image from 'next/image'

const PARTICIPATE_BLOCK = {
  title: 'Comment Participer',
  steps: [
    {
      number: 1,
      text: "Complétez le formulaire ci-dessous afin que notre équipe puisse vous recontacter rapidement et organiser votre visite."
    },
    {
      number: 2,
      text: "Inscrivez-vous à notre newsletter pour recevoir votre invitation. "
    }
  ],
  image: '/images/ira_artCapital2026/artCapital2026.webp',
  imageAlt: 'Œuvre à gagner - Art Capital 2026'
}

export default function ParticipateBlock () {
  return (
    <div className="participate-block">
      <section className="py-12 md:py-20 px-4 bg-gray-900 text-center">
        <div className="max-w-[80%] md:max-w-7xl mx-auto">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-12 md:mb-16"
          style={{ fontFamily: 'var(--font-bricolage)' }}
        >
          {PARTICIPATE_BLOCK.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-left">
          {/* Colonne gauche - étapes */}
          <div className="lg:col-span-6 space-y-6">
            {PARTICIPATE_BLOCK.steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-white/30 bg-gray-800/50 p-6 md:p-8"
              >
                <span
                  className="block text-5xl md:text-6xl font-bold text-white mb-4"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  {step.number}
                </span>
                <p
                  className="text-white text-base md:text-lg font-normal leading-relaxed"
                  style={{ fontFamily: 'var(--font-bricolage)' }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Colonne droite - image (œuvre sur étagère) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="rounded-lg overflow-hidden border border-white/20 bg-gray-800/30 p-4">
                <div className="relative aspect-[4/3] rounded overflow-hidden">
                  <Image
                    src={PARTICIPATE_BLOCK.image}
                    alt={PARTICIPATE_BLOCK.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}
