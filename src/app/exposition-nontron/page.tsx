import type { Metadata } from 'next'
import NontronNav from '@/components/exposition-nontron/NontronNav'
import NontronHero from '@/components/exposition-nontron/NontronHero'
import NontronEdito from '@/components/exposition-nontron/NontronEdito'
import NontronGuest from '@/components/exposition-nontron/NontronGuest'
import NontronArtistsGrid from '@/components/exposition-nontron/NontronArtistsGrid'
import NontronArtists from '@/components/exposition-nontron/NontronArtists'
import NontronStats from '@/components/exposition-nontron/NontronStats'
import NontronInfo from '@/components/exposition-nontron/NontronInfo'
import NontronFooter from '@/components/exposition-nontron/NontronFooter'

export const metadata: Metadata = {
  title: "Exposition d'Art Contemporain — LJ Gallery & InRealArt | Nontron",
  description:
    "Exposition d'art contemporain à la LJ Gallery de Nontron, du 1er mai au 1er avril 2026. Anny Duperey, Alain Pontecorvo, Jean-Paul Boyer, Marie De Saint Germain.",
}

export default function ExpositionNontronPage() {
  return (
    <main className="min-h-screen bg-white font-montserrat text-gray-800">
      <NontronNav />
      <NontronHero />
      <NontronEdito />
      <NontronGuest />
      <NontronArtistsGrid />
      {/* <NontronArtists /> */}
      <NontronStats />
      <NontronInfo />
      <NontronFooter />
    </main>
  )
}
