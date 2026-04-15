export default function NontronStats() {
  return (
    <>
      {/* Section — L'Exposition en chiffres */}
      <section className="py-24 bg-[#faf8f4] px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Titre section avec barre gauche */}
          <div className="border-l-4 border-[#c5a059] pl-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
              Chiffres clés
            </h2>
            <h3 className="text-3xl font-bricolage font-bold text-gray-900">
              L&apos;Exposition en Chiffres
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Grande stat dorée */}
            <div className="md:w-1/3 text-center md:text-left">
              <p className="text-7xl md:text-8xl font-bricolage font-bold text-[#c5a059] leading-none">
                4
              </p>
              <p className="text-2xl font-bricolage italic text-gray-800 mt-2">Artistes</p>
            </div>

            {/* Texte + checklist */}
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bricolage font-bold text-gray-900 mb-4">
                Une édition mémorable
              </h3>
              <p className="text-gray-600 font-light font-montserrat leading-relaxed mb-8">
                Réunissant des talents venant des quatre coins de la France, cette exposition
                propose un panorama riche et varié de la création contemporaine.
              </p>

              <ul className="space-y-3">
                {[
                  "Plus de 25 œuvres d'exception",
                  '2 disciplines majeures',
                  "30 jours d'exposition",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-montserrat text-sm font-semibold text-gray-800"
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

      {/* Section — Disciplines à l'honneur */}
      {/* <section className="py-24 bg-white px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-4 border-[#c5a059] pl-4 mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
              Programme
            </h2>
            <h3 className="text-3xl font-bricolage font-bold text-gray-900">
              Disciplines à l&apos;Honneur
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#faf8f4] p-10 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-4xl mb-6" aria-hidden="true">
                🎨
              </div>
              <h4 className="text-xl font-bricolage font-bold text-gray-900 mb-3 uppercase tracking-tight">
                Peinture
              </h4>
              <div className="w-8 h-0.5 bg-[#c5a059] mb-4" />
              <p className="text-gray-600 font-light font-montserrat text-sm leading-relaxed">
                Des techniques classiques aux expressions les plus contemporaines, la peinture
                occupe une place centrale dans cette exposition.
              </p>
            </div>

            <div className="bg-[#faf8f4] p-10 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-4xl mb-6" aria-hidden="true">
                🏛️
              </div>
              <h4 className="text-xl font-bricolage font-bold text-gray-900 mb-3 uppercase tracking-tight">
                Sculpture
              </h4>
              <div className="w-8 h-0.5 bg-[#c5a059] mb-4" />
              <p className="text-gray-600 font-light font-montserrat text-sm leading-relaxed">
                L&apos;exploration du volume et de la matière à travers des œuvres en bronze, bois,
                verre et résines.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}
