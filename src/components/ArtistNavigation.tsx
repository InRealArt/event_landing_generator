'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getAllArtists } from '@/lib/artistDataManager'
import type { ArtistConfig } from '@/lib/artistDataManager'

interface ArtistNavigationProps {
  currentSlug: string
}

export default function ArtistNavigation({ currentSlug }: ArtistNavigationProps) {
  const [artists, setArtists] = useState<ArtistConfig[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Charger la liste des artistes côté client
    getAllArtists().then(setArtists)
  }, [])

  const currentArtist = artists.find(artist => artist.slug === currentSlug)
  const otherArtists = artists.filter(artist => artist.slug !== currentSlug)

  if (artists.length <= 1) {
    return null // Ne pas afficher la navigation s'il n'y a qu'un seul artiste
  }

  return (
    <div className="relative">
      {/* Bouton de navigation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 font-montserrat">
          {currentArtist?.data.name || 'Artiste'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {/* Artiste actuel */}
            <div className="px-4 py-2 bg-purple-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={currentArtist?.data.profileImage}
                  alt={currentArtist?.data.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 font-bricolage">
                    {currentArtist?.data.fullName}
                  </p>
                  <p className="text-xs text-gray-500 font-montserrat">
                    Page actuelle
                  </p>
                </div>
              </div>
            </div>

            {/* Autres artistes */}
            <div className="py-1">
              {otherArtists.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/${artist.slug}`}
                  className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={artist.data.profileImage}
                    alt={artist.data.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 font-bricolage">
                      {artist.data.fullName}
                    </p>
                    <p className="text-xs text-gray-500 font-montserrat">
                      {artist.data.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Lien vers la liste complète */}
            <div className="border-t border-gray-200 pt-2">
              <Link
                href="/artistes"
                className="flex items-center space-x-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 transition-colors font-montserrat"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Voir tous les artistes</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
