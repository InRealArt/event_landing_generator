import Link from 'next/link'
import Image from 'next/image'
import { getAllArtists } from '@/lib/artistDataManager'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artistes - InRealArt',
  description: 'Découvrez tous nos artistes sélectionnés dans le catalogue InRealArt.',
}

export default async function ArtistesPage() {
  const artists = await getAllArtists()

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-bricolage mb-4">
            Nos Artistes
          </h1>
          <p className="text-xl text-gray-600 font-montserrat max-w-3xl mx-auto">
            Découvrez la sélection exclusive d&apos;artistes contemporains de notre catalogue InRealArt.
            Chaque artiste apporte sa vision unique et son talent exceptionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.slug}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-12">
                <Image
                  src={artist.data.profileImage}
                  alt={artist.data.fullName}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-bricolage mb-2">
                  {artist.data.fullName}
                </h2>
                
                <p className="text-lg text-purple-600 font-montserrat mb-3">
                  {artist.data.title}
                </p>
                
                <p className="text-gray-600 font-montserrat mb-4 line-clamp-3">
                  {artist.data.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.data.specialties.slice(0, 3).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-montserrat"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-montserrat">
                    {artist.data.location}
                  </span>
                  
                  <Link
                    href={`/${artist.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-montserrat"
                  >
                    Voir le profil
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-montserrat text-lg">
              Aucun artiste disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
