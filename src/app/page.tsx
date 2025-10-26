'use client'

import { getAllArtists } from '@/lib/artistDataManager'
import type { ArtistConfig } from '@/lib/artistDataManager'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import type React from 'react'

// Fonction pour catégoriser les événements
function categorizeEvents(artists: ArtistConfig[]) {
  const now = new Date()
  const past: ArtistConfig[] = []
  const current: ArtistConfig[] = []
  const upcoming: ArtistConfig[] = []

  artists.forEach(artist => {
    if (!artist.data.content.eventInfo) return

    // Extraire les dates de quand (format: "du 19 au 21 Septembre 2025")
    const quand = artist.data.content.eventInfo.quand
    const dateMatch = quand.match(/du (\d+) au (\d+) (\w+) (\d+)/)
    
    if (dateMatch) {
      const [, startDay, endDay, monthName, year] = dateMatch
      const monthMap: { [key: string]: string } = {
        'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
        'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
        'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
      }
      const month = monthMap[monthName.toLowerCase()]
      const startDate = new Date(`${year}-${month}-${startDay}`)
      const endDate = new Date(`${year}-${month}-${endDay}`)
      
      if (endDate < now) {
        past.push(artist)
      } else if (startDate <= now && endDate >= now) {
        current.push(artist)
      } else {
        upcoming.push(artist)
      }
    } else {
      // Si on ne peut pas parser, mettre dans "à venir" par défaut
      upcoming.push(artist)
    }
  })

  return { past, current, upcoming }
}

export default function Home() {
  const [artists, setArtists] = useState<ArtistConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadLoading, setDownloadLoading] = useState(false)

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const artistsData = await getAllArtists()
        setArtists(artistsData)
      } catch (error) {
        console.error('Erreur lors du chargement des artistes:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadArtists()
  }, [])

  const { past, current, upcoming } = categorizeEvents(artists)

  // Fonction pour télécharger le fichier Excel
  const handleDownloadEvents = async () => {
    try {
      setDownloadLoading(true)
      
      const response = await fetch('/api/download-events')
      
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement')
      }

      // Récupérer le nom du fichier depuis les headers
      const contentDisposition = response.headers.get('content-disposition')
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/)
      const filename = filenameMatch ? filenameMatch[1] : 'evenements-inrealart.xlsx'

      // Créer un blob et déclencher le téléchargement
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      alert('Erreur lors du téléchargement du fichier')
    } finally {
      setDownloadLoading(false)
    }
  }

  // Fonction pour rendre une carte d'événement
  const renderEventCard = (artist: ArtistConfig): React.ReactElement | null => {
    const eventInfo = artist.data.content.eventInfo
    if (!eventInfo) return null
    const posterImage = artist.data.posterImage || artist.data.profileImage

    return (
      <Link
        key={artist.slug}
        href={`/${artist.slug}`}
        className="group"
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col border border-gray-100">
          {/* Poster Image */}
          <div className="relative h-56 md:h-64 overflow-hidden bg-gray-800">
            {posterImage && (
              <Image
                src={posterImage}
                alt={eventInfo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Event Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bricolage font-bold text-white mb-2">
                {eventInfo.title}
              </h2>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-4 md:p-6 space-y-3 flex-1 flex flex-col">
            {/* Artist Name */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6052FF] rounded-full"></div>
              <span className="text-[#6052FF] font-semibold font-montserrat text-sm">
                {artist.data.fullName}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[#6052FF] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 font-montserrat text-sm">
                {eventInfo.quand}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[#6052FF] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-gray-600 font-montserrat text-sm">
                {eventInfo.ou}
              </p>
            </div>

            {/* See More Link */}
            <div className="pt-2 border-t border-gray-200 mt-auto">
              <span className="text-[#6052FF] font-semibold font-montserrat text-sm group-hover:underline">
                Voir plus →
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-[80%] md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Image
                  src="/images/Logo.webp"
                  alt="IRA Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto invert"
                  quality={90}
                  priority
                  sizes="120px"
                />
              </div>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <button 
                onClick={handleDownloadEvents}
                disabled={downloadLoading}
                className="bg-[#6052FF] text-white px-6 py-2 rounded-lg hover:bg-[#4a3bcc] transition-colors font-montserrat flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadLoading ? (
                  <>
                    <span>Téléchargement...</span>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Télécharger les events</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={handleDownloadEvents}
                disabled={downloadLoading}
                className="bg-[#6052FF] text-white px-4 py-2 rounded-lg hover:bg-[#4a3bcc] transition-colors font-montserrat flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloadLoading ? (
                  <>
                    <span className="text-sm">Chargement...</span>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Télécharger</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacing for fixed header */}
      <div className="h-16"></div>

      <div className="max-w-[80%] md:max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bricolage font-bold mb-4 text-gray-900">
            Événements InRealArt
          </h1>
          <p className="text-base md:text-lg font-montserrat text-gray-600">
            Découvrez nos expositions et salons d&apos;art
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 animate-spin text-[#6052FF]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600 font-montserrat">Chargement des événements...</span>
            </div>
          </div>
        )}

        {/* Events Content */}
        {!loading && (
          <>
            {/* Événements en cours */}
            {current.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <h2 className="text-2xl md:text-3xl font-bricolage font-bold text-gray-900">
                    Événements en cours
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {current.map((artist) => renderEventCard(artist))}
                </div>
              </div>
            )}

            {/* Événements à venir */}
            {upcoming.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <h2 className="text-2xl md:text-3xl font-bricolage font-bold text-gray-900">
                    Événements à venir
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcoming.map((artist) => renderEventCard(artist))}
                </div>
              </div>
            )}

            {/* Événements passés */}
            {past.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-3"></div>
                  <h2 className="text-2xl md:text-3xl font-bricolage font-bold text-gray-900">
                    Événements passés
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {past.map((artist) => renderEventCard(artist))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {current.length === 0 && upcoming.length === 0 && past.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 font-montserrat">
                  Aucun événement disponible pour le moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-[80%] md:max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* InRealArt Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4 text-white font-bricolage">
                Événements InRealArt
              </h3>
              <p className="text-gray-300 text-sm font-montserrat mb-4">
                Découvrez tous nos événements artistiques et expositions
              </p>
            </div>

            {/* InRealArt Stats */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-white font-bricolage">
                InRealArt
              </h3>
              <p className="text-gray-300 text-sm font-montserrat mb-4">
                Catalyseur d&apos;art, de Culture & de Patrimoine
              </p>
              <div className="space-y-2 text-gray-400 text-sm font-montserrat">
                <p>15+ Artistes sélectionnés</p>
                <p>Le catalogue c&apos;est 200+ oeuvres soigneusement choisies...</p>
                <p>100% De nos artistes satisfaits de leurs accompagnements</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4 text-white font-bricolage">
                Contact
              </h3>
              <div className="flex flex-col gap-3 space-y-3 text-gray-300 text-sm font-montserrat">
                <div className="flex justify-center md:justify-end space-x-4">
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/company/inrealart/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/InRealArt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a
                    href="https://pinterest.com/teaminrealart/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/inrealartgallery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    href="https://calendly.com/teaminrealart/plus-de-visibilite-plus-de-ventes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-montserrat"
                  >
                    <span>Prendre RDV</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm font-montserrat">
                © 2025 InRealArt. Tous droits réservés.
              </p>
              <div className="flex space-x-6 text-gray-400 text-sm font-montserrat">
                <a href="https://policies.google.com/privacy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </a>
                <a href="https://www.inrealart.com/terms" className="hover:text-white transition-colors">
                  Conditions d&apos;utilisation
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}