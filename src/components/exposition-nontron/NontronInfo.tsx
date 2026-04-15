'use client'

import Link from 'next/link'

const practicalRows = [
  {
    label: 'LIEU',
    content: '4 rue de Verdun, Nontron, France, 24300',
  },
  {
    label: 'DATES',
    content: 'Du 1 mai au 1 avril 2026',
  },
  {
    label: 'HORAIRES',
    content: 'Ouvert tous les jours de 11h à 18h',
  },
  {
    label: 'ACCÈS',
    content: 'Parking, entrée libre et gratuite pour tous les publics',
  },
]

export default function NontronInfo() {
  return (
    <>
      {/* Section claire — Informations Pratiques */}
      <section id="infos" className="py-24 bg-[#faf8f4] px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          {/* Titre section avec barre gauche */}
          <div className="border-l-4 border-[#c5a059] pl-4 mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold font-montserrat text-[#c5a059] mb-1">
              Où &amp; Quand
            </h2>
            <h3 className="text-3xl font-bricolage font-bold text-gray-900">
              Informations Pratiques
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-hidden border border-gray-200">
            {/* Table header */}
            <div className="bg-[#c5a059] px-8 py-4 grid grid-cols-3 gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white font-montserrat">
                Rubrique
              </span>
              <span className="col-span-2 text-xs font-bold uppercase tracking-widest text-white font-montserrat">
                Détail
              </span>
            </div>

            {/* Table rows */}
            {practicalRows.map((row, i) => (
              <div
                key={row.label}
                className={`px-8 py-5 grid grid-cols-3 gap-4 border-t border-gray-100 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <span className="text-[#c5a059] font-bold font-montserrat text-xs uppercase tracking-widest self-start pt-0.5">
                  {row.label}
                </span>
                <span className="col-span-2 text-gray-700 font-montserrat font-light text-sm leading-relaxed">
                  {row.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section sombre — Contact Presse */}
      <section
        className="py-24 px-6"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Label */}
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-xs mb-6">
            Presse &amp; Médias
          </p>

          {/* Titre */}
          <h2 className="text-4xl md:text-5xl font-bricolage italic font-bold mb-8">
            Contact Presse
          </h2>

          {/* Divider */}
          <div className="w-20 h-0.5 bg-[#c5a059] mx-auto mb-12" />

          {/* Contact card */}
          <div className="inline-block text-left bg-white/5 border border-white/10 px-10 py-8 backdrop-blur-sm">
            <p className="text-white font-bold font-montserrat text-lg mb-2">Lucile Julien</p>
            <p className="text-gray-400 font-light font-montserrat text-sm mb-4">
              Responsable presse — LJ Gallery &amp; InRealArt
            </p>
            <Link
              href="mailto:Teaminrealart@gmail.com"
              className="text-[#c5a059] font-montserrat font-semibold text-sm hover:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              Teaminrealart@gmail.com
            </Link>
          </div>

          {/* Print button */}
          {/* <div className="mt-12">
            <button
              onClick={() => window.print()}
              className="text-xs font-bold uppercase font-montserrat flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-200 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              aria-label="Imprimer cette page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 10-4 0v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 10-4 0v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Imprimer cette page
            </button>
          </div> */}
        </div>
      </section>
    </>
  )
}
