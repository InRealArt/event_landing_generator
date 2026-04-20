import Image from 'next/image'

interface ArtistCardProps {
  name: string
  lastName: string
  firstName: string
  label: string
  bio: string
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

function ArtistCard({
  lastName,
  firstName,
  label,
  bio,
  imageSrc,
  imageAlt,
  reverse = false,
}: ArtistCardProps) {
  return (
    <div className="py-20 border-b border-gray-100 last:border-none">
      <div
        className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image */}
        <div className="md:w-2/5 relative w-full aspect-[3/4] overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover shadow-xl transition-all duration-700 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Text */}
        <div className="md:w-3/5">
          {/* Titre avec barre gauche */}
          <div className="border-l-4 border-[#c5a059] pl-4 mb-6">
            <h3 className="text-3xl md:text-4xl font-bricolage font-bold text-gray-900">
              {lastName}{' '}
              <span className="font-light italic">{firstName}</span>
            </h3>
          </div>

          {/* Label doré */}
          <p className="text-[#c5a059] uppercase tracking-[0.25em] font-semibold font-montserrat text-xs italic mb-6">
            {label}
          </p>

          {/* Bio */}
          <p className="text-gray-600 leading-relaxed font-light font-montserrat text-sm">
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function NontronArtists() {
  return (
    <section id="artistes">
      {/* Header doré — fond plein */}
      <div className="bg-[#c5a059] py-24 px-6 text-center">
        <p className="text-black/60 uppercase tracking-[0.3em] font-semibold font-montserrat text-xs mb-6">
          Maîtres de la peinture &amp; de la sculpture
        </p>
        <h2 className="text-5xl md:text-6xl font-bricolage italic font-bold text-white">
          Les Artistes
        </h2>
        <div className="w-20 h-0.5 bg-white/50 mx-auto mt-8" />
      </div>

      {/* Fiches artistes */}
      <div className="bg-white">
        {/* Alain Pontecorvo */}
        <ArtistCard
          name="Alain Pontecorvo"
          lastName="Pontecorvo"
          firstName="Alain"
          label="Peintre du réalisme constructivisme"
          imageSrc="/images/exposition-nontron/alain_pontecorvo.webp"
          imageAlt="Alain Pontecorvo — Peintre"
          bio="Figure majeure de la peinture française contemporaine, Alain Pontecorvo est reconnu pour son univers unique, où lumière, géométrie et émotion se rencontrent. Né à Paris en 1936 et formé aux Arts décoratifs puis à l'École Estienne, il débute sa carrière comme directeur artistique avant de revenir à sa passion première : la peinture. Depuis sa première exposition en 1978, son travail a été salué par la critique et exposé dans de nombreuses galeries et salons internationaux. Son œuvre navigue entre figuration et abstraction, donnant naissance à ce que certains appellent un réalisme constructiviste. Figures, nus, intérieurs, paysages et natures mortes se transforment sous son regard."
        />

        {/* Jean-Paul Boyer */}
        <ArtistCard
          name="Jean-Paul Boyer"
          lastName="Jean-Paul"
          firstName="Boyer"
          label="Sculpteur du vide"
          imageSrc="/images/exposition-nontron/jp-boyer.webp"
          imageAlt="Jean-Paul Boyer — Sculpteur"
          reverse={true}
          bio="Jean-Paul Boyer est un sculpteur dont le travail explore la modularité et l'interaction avec l'espace. Après une production classique en bois, il développe en 1989 ses Sculptures Modulables, des œuvres où chaque élément, libéré et recomposable, permet au spectateur de modifier l'espace autour de la sculpture. Travaillant divers matériaux – bois, marbre, bronze, verre et résines – Boyer invite ainsi le public à interagir et à faire évoluer l'œuvre, plaçant l'air et l'espace comme parties intégrantes de sa création. À ce jour, il a réalisé près d'un millier de ces sculptures uniques."
        />

        {/* Florence Autelin */}
        <ArtistCard
          name="Florence Autelin"
          lastName="Autelin"
          firstName="Florence"
          label="Photographie et peinture"
          imageSrc="/images/exposition-nontron/Florence AUTELIN.webp"
          imageAlt="Florence Autelin — Peintre"
          bio="Florence Autelin est une peintre française dont l'œuvre plonge dans les territoires de l'intime et du silence. Formée aux Beaux-Arts, elle développe un langage pictural personnel où la lumière joue un rôle central : elle sculpte, révèle, efface. Ses toiles, souvent habitées de figures féminines et de paysages intérieurs, oscillent entre réalisme sensible et poésie abstraite. À travers une palette de tons doux et profonds, elle interroge la mémoire, la présence et la fugacité du temps. Son travail a été exposé dans de nombreuses galeries régionales et nationales, lui valant une reconnaissance croissante dans le milieu de l'art contemporain français."
        />

        {/* Stéphane Illand */}
        <ArtistCard
          name="Stéphane Illand"
          lastName="Illand"
          firstName="Stéphane"
          label="Peintre de la matière et du geste"
          imageSrc="/images/exposition-nontron/Stephane illand.webp"
          imageAlt="Stéphane Illand — Peintre"
          reverse={true}
          bio="Stéphane Illand est un peintre dont la pratique s'articule autour du geste, de la matière et de l'instinct créateur. Autodidacte dans l'âme, il forge son style à travers des années d'expérimentation, mêlant huile, acrylique et techniques mixtes pour créer des surfaces à la fois brutes et raffinées. Ses œuvres, souvent de grand format, capturent une énergie contenue : chaque coup de pinceau témoigne d'une tension entre maîtrise et abandon. Inspiré par les paysages du Périgord et les grandes traditions de la peinture expressionniste, son travail s'inscrit dans une démarche résolument contemporaine tout en restant profondément ancré dans le sensible."
        />
      </div>
    </section>
  )
}
