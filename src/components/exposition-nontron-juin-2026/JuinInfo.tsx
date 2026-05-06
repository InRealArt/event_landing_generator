'use client'

import Link from 'next/link'

const practicalInfo = [
  {
    label: 'LIEU',
    content: (
      <>
        LJ Gallery
        <br />
        4 rue de Verdun
        <br />
        24300 Nontron
      </>
    ),
  },
  {
    label: 'DATES',
    content: (
      <>
        Juin 2026
        <br />
        Ouvert tous les jours de 10h à 18h30
      </>
    ),
  },
  {
    label: 'ACCÈS',
    content: <>Parking, entrée libre et gratuite pour tous les publics</>,
  },
]

export default function JuinInfo() {
  return (
    <section id="infos" className="py-24 bg-white px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bricolage italic mb-8">Informations Pratiques</h2>
            <ul className="space-y-6">
              {practicalInfo.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <span className="text-[#c5a059] font-bold font-montserrat text-sm shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-gray-600 font-montserrat font-light leading-relaxed">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-10 border-l-4 border-[#c5a059]">
            <h2 className="text-xl font-bold uppercase font-montserrat mb-6">Contact Presse</h2>
            <p className="text-sm text-gray-600 font-montserrat font-light mb-8 leading-relaxed">
              Pour toute demande d&apos;interview, de visuels HD ou de dossier de presse complet
              au format PDF, merci de contacter l&apos;organisation.
            </p>
            <div className="space-y-2 text-sm font-semibold font-montserrat">
              <p>Lucile Julien</p>
              <Link
                href="mailto:teaminrealart@gmail.com"
                className="text-[#c5a059] hover:underline"
              >
                teaminrealart@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
