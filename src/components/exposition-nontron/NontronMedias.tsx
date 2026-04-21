import Link from 'next/link'

const stats = [
  '4 Artistes',
  'Peinture & Sculpture',
  'Entrée Libre',
]

const videoItems = [
  // {
  //   label: 'Anny Duperey',
  //   embedSrc: 'https://www.youtube.com/embed/rX3Kiipajws?start=2423',
  //   title: 'Interview Anny Duperey — Exposition Nontron',
  // },
  {
    label: 'Alain Pontecorvo',
    embedSrc: 'https://www.youtube.com/embed/mDVfbV8TNUQ',
    title: 'Interview Alain Pontecorvo — Exposition Nontron',
  },
  {
    label: 'Jean-Paul Boyer',
    embedSrc: 'https://www.youtube.com/embed/rX3Kiipajws?start=1393',
    title: 'Interview Jean-Paul Boyer — Exposition Nontron',
  },
]

export default function NontronMedias() {
  return (
    <section id="medias" className="py-24 bg-black text-white px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-6 font-bricolage italic">
            Interviews de nos artistes
          </h2>
          <p className="text-gray-400 font-light font-montserrat max-w-2xl mx-auto">
            Découvrez les artistes de l&apos;exposition en vidéo et à travers leurs portraits exclusifs.
          </p>
        </div>

        {/* Videos & Articles — centrées */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">

          {/* Article card — Florence Autelin */}
          <div className="flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[400px]">
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold font-montserrat text-[10px] mb-3">
              Florence Autelin
            </p>
            <Link
              href="https://www.inrealart.com/blog/florence-autelin-entre-photographie-de-voyage-et-peinture-interieure"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex flex-col border border-zinc-800 hover:border-[#c5a059] transition-colors duration-300 p-6"
            >
              <p className="text-[10px] uppercase tracking-widest font-montserrat text-[#c5a059] mb-3">
                Article · InRealArt
              </p>
              <h3 className="text-sm font-bricolage italic text-white mb-3 leading-snug group-hover:text-[#c5a059] transition-colors duration-300 flex-1">
                Entre photographie de voyage et peinture intérieure
              </h3>
              <p className="text-gray-500 font-montserrat font-light text-xs leading-relaxed mb-6">
                Un univers suspendu entre le monde extérieur capturé et le monde intérieur ressenti, où chaque œuvre devient un fragment de mémoire vivante.
              </p>
              <span className="text-[10px] uppercase font-bold font-montserrat border-b border-zinc-600 pb-1 group-hover:text-[#c5a059] group-hover:border-[#c5a059] transition-colors duration-200 self-start">
                Lire le portrait →
              </span>
            </Link>
          </div>

          {/* Video items */}
          {videoItems.map((item) => (
            <div key={item.label} className="flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[400px]">
              <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold font-montserrat text-[10px] mb-3">
                {item.label}
              </p>
              <div className="aspect-video w-full overflow-hidden border border-zinc-800 hover:border-[#c5a059] transition-colors duration-300">
                <iframe
                  src={item.embedSrc}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}

          {/* Article card — Marie De Saint Germain */}
          {/* <div className="flex flex-col">
            <p className="text-[#c5a059] uppercase tracking-[0.2em] font-semibold font-montserrat text-[10px] mb-3">
              Marie De Saint Germain
            </p>
            <Link
              href="https://www.inrealart.com/blog/marie-de-saint-germain-une-traversee-surrealiste-de-lidentite-et-de-linvisible"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 flex flex-col border border-zinc-800 hover:border-[#c5a059] transition-colors duration-300 p-6"
            >
              <p className="text-[10px] uppercase tracking-widest font-montserrat text-[#c5a059] mb-3">
                Article · InRealArt
              </p>
              <h3 className="text-sm font-bricolage italic text-white mb-3 leading-snug group-hover:text-[#c5a059] transition-colors duration-300 flex-1">
                Une traversée surréaliste de l&apos;identité et de l&apos;invisible
              </h3>
              <p className="text-gray-500 font-montserrat font-light text-xs leading-relaxed mb-6">
                Mixed média, fragments visuels et mémoire se mêlent pour composer un langage artistique unique.
              </p>
              <span className="text-[10px] uppercase font-bold font-montserrat border-b border-zinc-600 pb-1 group-hover:text-[#c5a059] group-hover:border-[#c5a059] transition-colors duration-200 self-start">
                Lire le portrait →
              </span>
            </Link>
          </div> */}

        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm font-light uppercase tracking-tighter font-montserrat">
          {stats.map((stat) => (
            <div
              key={stat}
              className="p-4 border border-zinc-800 hover:border-[#c5a059] transition-colors duration-200"
            >
              {stat}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
