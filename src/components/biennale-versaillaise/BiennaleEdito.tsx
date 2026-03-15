import Image from 'next/image'
import Link from 'next/link'

export default function BiennaleEdito() {
  return (
    <section id="commissaire" className="py-24 bg-white px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Portrait */}
        <div className="md:w-1/2 relative w-full aspect-[4/5]">
          <Image
            src="/images/biennale-versaillaise-2026/LuciaMamosMoreaux.webp"
            alt="Lucia Mamos-Moreaux, commissaire de la Biennale Versaillaise"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2">
          <h3 className="text-3xl mb-6 italic font-bricolage leading-snug">
            &ldquo;L&apos;art est lié à la contemplation du beau, du sublime.&rdquo;
          </h3>

          <h4 className="text-sm uppercase tracking-widest font-bold text-[#c5a059] font-montserrat mb-4">
            Le Mot de la Commissaire
          </h4>

          <div className="space-y-4 text-gray-600 leading-relaxed font-light font-montserrat">
            <p>
              La 7e édition de la Biennale Versaillaise est heureuse de présenter ses artistes, avec Alain Bonnefoit
              et YBAH comme invités d&apos;honneur, accompagnés de 82 autres artistes talentueux. Depuis la préhistoire,
              l&apos;art accompagne l&apos;humanité et nourrit la réflexion des philosophes, de Socrate et Platon à Nietzsche,
              qui ont cherché à comprendre son lien avec la beauté, la vérité et la société.
            </p>
            <p>
              Aujourd&apos;hui, l&apos;art dépasse la simple recherche du beau : il devient un espace de liberté, de réflexion
              et de création. La Biennale réunira plus de 140 œuvres au Carré à la Farine à Versailles, du 31 mars
              au 5 avril 2026 (11h–18h), offrant au public l&apos;occasion de découvrir les œuvres et de rencontrer
              les artistes.
            </p>
          </div>

          <p className="mt-8 font-semibold font-montserrat">— Lucia Mamos-Moreaux</p>

          <Link
            href="https://biennale-versaillaise.fr/les-editions/la-biennale-2026/le-mot-du-commissaire-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-xs uppercase tracking-widest font-bold font-montserrat border-b border-[#c5a059] text-[#c5a059] pb-1 hover:text-black hover:border-black transition-colors duration-300"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  )
}
