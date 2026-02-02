'use client'

import Image from 'next/image'

const ARTIST_BLOCK = {
  logo: '/images/ira_artCapital2026/Logo_IRA.avif',
  title: "",
  logoLine: 'ARTCAPITAL',
  line2: "Une visite exceptionnelle ne pas manquer !",
  line3: "Réservez dès maintenant votre visite",
  image: '/images/ira_artCapital2026/Anna.webp',
  name: '',
  paragraphs: [
    "Je suis heureuse de vous inviter à découvrir les artistes InRealArt et  leurs œuvres lors d’Art Capital 2026, au Grand Palais du 13 au 15 janvier 2026.",
    "À travers ce jeu concours, je vous ouvre les portes de mon univers et vous offre une expérience artistique unique, au cœur de l’un des événements majeurs de la scène contemporaine.",
    " Les places sont strictement limitées : participez dès maintenant. Il me tarde de vous retrouver pour vivre ensemble un moment d’art, d’émotion et de rencontre au Grand Palais."
  ]
}

export default function PresentationBlock () {
  return (
    <div className="artist-block">
      {/* Titre du bloc - fond blanc, centré */}
      <section className="py-12 md:py-16 px-4 bg-white text-center">
        <div className="max-w-[80%] md:max-w-7xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl font-bold text-gray-900 font-bricolage">
            {ARTIST_BLOCK.title}
          </h2>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 bg-gray-800/80 backdrop-blur-md rounded-2xl px-6 py-4 md:px-8 md:py-5">
            <Image
              src={ARTIST_BLOCK.logo}
              alt="IRA"
              width={80}
              height={40}
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="text-3xl md:text-6xl text-primary font-unbounded" aria-hidden>×</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-bricolage">
              {ARTIST_BLOCK.logoLine}
            </span>
          </div>
          <p className="text-gray-700 font-bricolage font-normal text-base md:text-lg max-w-2xl">
            {ARTIST_BLOCK.line2}
          </p>
          <p className="text-gray-700 font-bricolage font-normal text-base md:text-lg max-w-2xl">
            {ARTIST_BLOCK.line3}
          </p>
        </div>
      </section>

      {/* Contenu artiste - fond blanc */}
      <section id="artist-content" className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-[80%] md:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Colonne gauche - image circulaire avec cadre violet */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 rounded-full p-2 border-4 border-[#6052FF] shadow-lg shadow-[#6052FF]/25 ring-4 ring-[#6052FF]/10">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={ARTIST_BLOCK.image}
                  alt={ARTIST_BLOCK.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </div>

          {/* Colonne droite - titre et paragraphes */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-bricolage text-left">
              {ARTIST_BLOCK.name}
            </h2>
            <div className="space-y-5 text-left">
              {ARTIST_BLOCK.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 font-bricolage font-normal text-base md:text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-gray-900 font-bricolage font-semibold text-lg md:text-xl">
                Anna Chrusciany
              </p>
              <p className="text-gray-600 font-bricolage text-base md:text-lg" style={{ fontStyle: 'italic' }}>
                Art Advisor – InRealArt
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
