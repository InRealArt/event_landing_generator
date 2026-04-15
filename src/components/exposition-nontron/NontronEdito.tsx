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
        <div className="max-w-6xl mx-auto">
          {/* En-tête centré */}
          <div className="text-center text-white mb-16">
            <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-sm mb-6">
              Le Mot de la Galerie
            </p>
            <h2 className="text-4xl md:text-5xl font-bricolage italic mb-8">
              L&apos;Édito
            </h2>
            <div className="w-20 h-0.5 bg-[#c5a059] mx-auto" />
          </div>

          {/* Layout image gauche / texte droite */}
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Image à gauche */}
            <div className="md:w-1/2 relative w-full aspect-[3/2] overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src="/images/exposition-nontron/galerie_nontron.webp"
                alt="La galerie de Nontron"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Texte à droite */}
            <div className="md:w-1/2 text-white">
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
                L'exposition
              </h3>
            </div>

            <div className="space-y-5 text-gray-600 leading-relaxed font-light font-montserrat">
              <p>
                Et si quatre univers radicalement différents entraient en collision pour ne former
                qu&apos;un seul et même territoire d&apos;expression&nbsp;? Cette exposition est une
                invitation à franchir ce point de rencontre, là où les disciplines se mêlent, où
                les regards se croisent, et où la création s&apos;affranchit de toute frontière.
              </p>
              <p>
                Quatre artistes y sont réunis :{' '}
                <strong className="text-gray-800 font-semibold">Anny Duperey</strong>, entre scène
                et peinture&nbsp;;{' '}
                <strong className="text-gray-800 font-semibold">Alain Pontecorvo</strong>, figure
                majeure de la peinture et de la publicité&nbsp;;{' '}
                <strong className="text-gray-800 font-semibold">Jean-Paul Boyer</strong>, dont les
                sculptures se réinventent dans l&apos;espace&nbsp;; et{' '}
                <strong className="text-gray-800 font-semibold">Marie de Saint Germain</strong>, qui
                explore un langage mixte et contemporain.
              </p>
              <p>
                Une exposition manifeste, entre diversité des pratiques et liberté de création.
              </p>
            </div>

            <p className="mt-8 font-semibold font-montserrat text-[#c5a059]">— Annia Chrusciany</p>
          </div>

          {/* Image de la galerie */}
          <div className="md:w-1/2 relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src="/images/exposition-nontron/Anna_chrusciany.webp"
              alt="Annia Chrusciany"
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
