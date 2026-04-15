import Image from 'next/image'

export default function NontronEdito() {
  return (
    <>
      {/* Section sombre — L'Édito */}
      <section
        id="edito"
        className="py-24 px-6"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Label doré */}
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-sm mb-6">
            Le Mot de la Galerie
          </p>

          {/* Titre */}
          <h2 className="text-4xl md:text-5xl font-bricolage italic mb-8">
            L&apos;Édito
          </h2>

          {/* Divider */}
          <div className="w-20 h-0.5 bg-[#c5a059] mx-auto mb-12" />

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl font-bricolage italic font-light text-gray-300 leading-relaxed max-w-3xl mx-auto">
            &ldquo;Découvrez une exposition saisissante au cœur de notre galerie.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Section claire — La Galerie */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Texte */}
          <div className="md:w-1/2">
            {/* Section title avec barre gauche */}
            <div className="border-l-4 border-[#c5a059] pl-4 mb-8">
              <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
                À propos
              </h2>
              <h3 className="text-3xl font-bricolage font-bold text-gray-900">
                La Galerie
              </h3>
            </div>

            <div className="space-y-5 text-gray-600 leading-relaxed font-light font-montserrat">
              <p>
                L&apos;art ne devrait pas se limiter à Paris. La galerie défend une vision ouverte
                du patrimoine et de la création à travers une exposition exceptionnelle du
                1er avril au 1er mai 2026.
              </p>
              <p>
                Quatre artistes y sont réunis :{' '}
                <strong className="text-gray-800 font-semibold">Anny Duperey</strong>, entre scène
                et peinture,{' '}
                <strong className="text-gray-800 font-semibold">Alain Pontecorvo</strong>, figure
                majeure de la peinture et de la publicité,{' '}
                <strong className="text-gray-800 font-semibold">Jean-Paul Boyer</strong>, dont les
                sculptures se réinventent dans l&apos;espace, et{' '}
                <strong className="text-gray-800 font-semibold">Marie de Saint Germain</strong>, qui
                explore un langage mixte et contemporain.
              </p>
              <p>
                Une exposition manifeste, entre diversité des pratiques et liberté de création.
              </p>
            </div>

            <p className="mt-8 font-semibold font-montserrat text-[#c5a059]">— Lucile Julien</p>
          </div>

          {/* Image de la galerie */}
          <div className="md:w-1/2 relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src="https://placehold.co/980x640/e8e0d0/1a1a1a?text=LJ+Gallery"
              alt="LJ Gallery — Nontron"
              fill
              className="object-cover shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  )
}
