import Image from 'next/image'
import Link from 'next/link'

interface GuestCardProps {
  imageSrc: string
  imageAlt: string
  name: string
  title: string
  quote: string
  linkHref: string
  linkLabel: string
}

function GuestCard({ imageSrc, imageAlt, name, title, quote, linkHref, linkLabel }: GuestCardProps) {
  return (
    <div className="bg-white p-8 border border-gray-100 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]">
      <div className="mb-6 overflow-hidden h-[500px] relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <h3 className="text-2xl mb-2 uppercase tracking-tighter font-bold font-bricolage">
        {name}
      </h3>
      <p className="text-[#c5a059] mb-6 font-semibold font-montserrat text-sm">{title}</p>
      <p className="text-gray-600 mb-8 font-light italic font-bricolage">{quote}</p>

      <Link
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs uppercase font-bold font-montserrat border-b border-black pb-1 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors duration-200"
      >
        {linkLabel}
      </Link>
    </div>
  )
}

export default function BiennaleHonorGuests() {
  return (
    <section id="invites" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl mb-16 italic font-bricolage">
          Les Invités d&apos;Honneur
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <GuestCard
            imageSrc="/images/biennale-versaillaise-2026/AlainBonnefoit.webp"
            imageAlt="Alain Bonnefoit"
            name="Alain Bonnefoit"
            title="Artiste Peintre Sensuel"
            quote={"« Il capture l'essence de la féminité à travers des traits d'une précision poétique, mêlant l'influence de l'Asie à la tradition française. »"}
            linkHref="https://biennale-versaillaise.fr/les-editions/la-biennale-2026/alain-bonnefoit"
            linkLabel="Découvrir son portrait"
          />
          <GuestCard
            imageSrc="/images/biennale-versaillaise-2026/Ybah.webp"
            imageAlt="Ybah"
            name="YBAH"
            title="Sculptrice de l'âme"
            quote={"« Une invitation à entrer dans des moments d'intimité où l'art, comme une respiration, nous rappelle que être vivant est un dialogue avec le monde. »"}
            linkHref="https://biennale-versaillaise.fr/les-editions/la-biennale-2026/ybah"
            linkLabel="Explorer son univers"
          />
        </div>
      </div>
    </section>
  )
}
