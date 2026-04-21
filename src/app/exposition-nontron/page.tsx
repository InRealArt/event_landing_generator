import type { Metadata } from 'next'
import NontronNav from '@/components/exposition-nontron/NontronNav'
import NontronHero from '@/components/exposition-nontron/NontronHero'
import NontronEdito from '@/components/exposition-nontron/NontronEdito'
import NontronGuest from '@/components/exposition-nontron/NontronGuest'
import NontronArtistsGrid from '@/components/exposition-nontron/NontronArtistsGrid'
import NontronArtists from '@/components/exposition-nontron/NontronArtists'
import NontronMedias from '@/components/exposition-nontron/NontronMedias'
import NontronStats from '@/components/exposition-nontron/NontronStats'
import NontronInfo from '@/components/exposition-nontron/NontronInfo'
import NontronFooter from '@/components/exposition-nontron/NontronFooter'
import NontronContacts from '@/components/exposition-nontron/NontronContacts'
import Newsletter from '@/components/shared/Newsletter'
import PoweredBy from '@/components/shared/PoweredBy'

// TODO: replace with the actual Brevo list ID for Nontron newsletter
const NONTRON_NEWSLETTER_LIST_ID = 65

export const metadata: Metadata = {
  title: "Exposition d'Art Contemporain — LJ Gallery & InRealArt | Nontron",
  description:
    "Exposition d'art contemporain à la LJ Gallery de Nontron, du 1er mai au 1er avril 2026. Anny Duperey, Alain Pontecorvo, Jean-Paul Boyer, Marie De Saint Germain.",
}

export default function ExpositionNontronPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-montserrat text-gray-800">
      <NontronNav />
      <NontronHero />
      <NontronEdito />
      <NontronGuest />
      <NontronArtistsGrid />
      {/* <NontronArtists /> */}
      <NontronMedias />
      <NontronStats />
      <NontronInfo />
      <NontronContacts />
      <Newsletter
        listId={NONTRON_NEWSLETTER_LIST_ID}
        heading="Restez au cœur de l'art"
        subtext="Recevez en avant-première les actualités de l'exposition, les portraits d'artistes et les invitations aux prochains vernissages."
        privacyNote="Vos données sont traitées par LJ Gallery & InRealArt conformément au RGPD. Désinscription possible à tout moment."
      />
      <PoweredBy />
      <NontronFooter />
    </main>
  )
}
