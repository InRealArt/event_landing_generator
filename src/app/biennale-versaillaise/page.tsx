import type { Metadata } from 'next'
import BiennaleNav from '@/components/biennale-versaillaise/BiennaleNav'
import BiennaleHero from '@/components/biennale-versaillaise/BiennaleHero'
import BiennaleEdito from '@/components/biennale-versaillaise/BiennaleEdito'
import BiennaleHonorGuests from '@/components/biennale-versaillaise/BiennaleHonorGuests'
import BiennaleArtists from '@/components/biennale-versaillaise/BiennaleArtists'
import BiennaleInfo from '@/components/biennale-versaillaise/BiennaleInfo'
import BiennaleFooter from '@/components/biennale-versaillaise/BiennaleFooter'

export const metadata: Metadata = {
  title: 'Dossier de Presse - La Biennale Versaillaise 7ème Édition',
  description:
    "Découvrez la 7ème Biennale d'Art Contemporain de Versailles — 82 artistes, 140+ œuvres, du 31 mars au 5 avril 2026 au Carré à la Farine.",
}

export default function BiennaleVersaillaisePage() {
  return (
    <main className="min-h-screen bg-white font-montserrat text-gray-800">
      <BiennaleNav />
      <BiennaleHero />
      <BiennaleEdito />
      <BiennaleHonorGuests />
      <BiennaleArtists />
      <BiennaleInfo />
      <BiennaleFooter />
    </main>
  )
}
