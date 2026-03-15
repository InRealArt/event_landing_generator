import Link from 'next/link'

const stats = [
  '82 Artistes',
  '140+ Œuvres',
  'Peinture & Sculpture',
  'Entrée Libre',
]

export default function BiennaleArtists() {
  return (
    <section id="artistes" className="py-24 bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-6 font-bricolage italic">
            L&apos;Effervescence de la Création
          </h2>
          <p className="text-gray-400 font-light font-montserrat max-w-2xl mx-auto">
            Retrouvez les 82 artistes peintres, sculpteurs et graveurs venant des 4 coins de France
            pour cette édition mémorable.
          </p>
        </div>

        {/* YouTube Video */}
        <div className="aspect-video w-full mb-12 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/XcSgU01EGgU"
            title="Vidéo des artistes - La Biennale Versaillaise"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm font-light uppercase tracking-tighter font-montserrat">
          {stats.map((stat) => (
            <div
              key={stat}
              className="p-4 border border-zinc-800 hover:border-[#c5a059] transition-colors duration-200"
            >
              {stat}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="https://biennale-versaillaise.fr/les-editions/la-biennale-2026/les-artistes-de-la-7eme-biennale"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white px-8 py-3 text-xs uppercase font-bold tracking-widest font-montserrat hover:bg-white hover:text-black transition-all duration-200"
          >
            Consulter la liste complète
          </Link>
        </div>
      </div>
    </section>
  )
}
