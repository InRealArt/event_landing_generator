'use client'

export default function NontronHero() {
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
          "linear-gradient(rgba(255,255,255,0.82), rgba(250,248,244,0.92)), url('https://images.unsplash.com/photo-1531913764164-f85c52e6e654?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl text-center">
        {/* Surtitle */}
        <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat mb-4 text-sm">
          Dossier de Presse
        </p>

        {/* Main title */}
        <h1 className="text-5xl md:text-7xl mb-6 leading-tight font-bricolage font-bold">
          Exposition d&apos;Art Contemporain
        </h1>

        {/* Subtitle partnership */}
        <p className="text-xl md:text-2xl italic font-light font-bricolage mb-4 text-gray-700">
          <span className="font-bold">LJ gallery</span> &amp;{' '}
          <span className="font-bold">InRealArt</span>
        </p>

        {/* Gold divider */}
        <div className="w-20 h-0.5 bg-[#c5a059] mx-auto my-8" />

        {/* Dates */}
        <p className="text-lg tracking-wide uppercase font-semibold font-montserrat mb-4">
          1 Mai — 1 Avril 2026 · Nontron
        </p>

        {/* Artists line */}
        <p className="text-sm text-gray-500 font-montserrat tracking-widest uppercase mb-10">
          Anny Duperey &middot; Alain Pontecorvo &middot; Jean-Paul Boyer &middot; Marie De Saint Germain
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#artistes"
            onClick={(e) => handleScroll(e, '#artistes')}
            className="bg-[#c5a059] text-white px-8 py-4 rounded-sm uppercase text-xs font-bold tracking-widest font-montserrat transition-all duration-300 hover:bg-[#a88746] hover:scale-105"
          >
            Découvrir les Artistes
          </a>
          <a
            href="#infos"
            onClick={(e) => handleScroll(e, '#infos')}
            className="bg-black text-white px-8 py-4 rounded-sm uppercase text-xs font-bold tracking-widest font-montserrat transition-all duration-300 hover:bg-gray-800"
          >
            Informations Pratiques
          </a>
        </div>
      </div>
    </section>
  )
}
