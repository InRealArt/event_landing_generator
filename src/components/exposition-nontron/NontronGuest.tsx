import Image from 'next/image'

export default function NontronGuest() {
  return (
    <section id="invitee" className="py-24 bg-[#faf8f4] px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Texte */}
        <div className="md:w-1/2 order-2 md:order-1">
          {/* Label doré */}
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-xs mb-4">
            Invitée Spéciale
          </p>

          {/* Nom */}
          <h2 className="text-4xl md:text-5xl font-bricolage font-bold italic text-gray-900 mb-6">
            Anny Duperey
          </h2>

          {/* Divider doré court */}
          <div className="w-12 h-0.5 bg-[#c5a059] mb-8" />

          {/* Bio */}
          <p className="text-gray-600 leading-relaxed font-light font-montserrat text-base">
            Icône de la culture française, Anny Duperey apporte son regard sensible et sa passion
            pour cette exposition. Sa présence souligne son engagement pour l&apos;art, la culture
            et le patrimoine.
          </p>

          {/* Lien discret */}
          <a
            href="https://fr.wikipedia.org/wiki/Anny_Duperey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 text-xs uppercase tracking-widest font-bold font-montserrat border-b border-[#c5a059] text-[#c5a059] pb-1 hover:text-black hover:border-black transition-colors duration-300"
          >
            En savoir plus
          </a>
        </div>

        {/* Image — plein bord */}
        <div className="md:w-1/2 order-1 md:order-2 relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src="/images/exposition-nontron/Anny Duperey.webp"
            alt="Anny Duperey — Invitée Spéciale"
            fill
            className="object-cover object-top shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
