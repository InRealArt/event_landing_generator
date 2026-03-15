'use client'

import Link from 'next/link'

export default function BiennaleHero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center pt-20 px-6"
      style={{
        background:
          "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1972&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl text-center">
        <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat mb-4 animate-pulse text-sm">
          Dossier de Presse
        </p>

        <h1 className="text-5xl md:text-7xl mb-6 leading-tight font-bricolage font-bold">
          7ème Biennale d&apos;Art Contemporain de Versailles
        </h1>

        <p className="text-xl md:text-2xl italic font-light font-bricolage mb-8">
          Invitée Spéciale : <span className="font-bold">Anny DUPEREY</span>
        </p>

        {/* Gold divider */}
        <div className="w-20 h-0.5 bg-[#c5a059] mx-auto my-8" />

        <p className="text-lg tracking-wide uppercase font-semibold font-montserrat mb-10">
          31 Mars — 05 Avril 2026 • Carré à la Farine
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#artistes"
            onClick={(e) => handleScroll(e, '#artistes')}
            className="bg-[#c5a059] text-white px-8 py-4 rounded-sm uppercase text-xs font-bold tracking-widest font-montserrat transition-all duration-300 hover:bg-[#a88746] hover:scale-105"
          >
            Découvrir les Artistes
          </a>
          <Link
            href="https://fr.wikipedia.org/wiki/Anny_Duperey"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-4 rounded-sm uppercase text-xs font-bold tracking-widest font-montserrat transition-all duration-300 hover:bg-gray-800"
          >
            Portrait Anny Duperey
          </Link>
        </div>
      </div>
    </section>
  )
}
