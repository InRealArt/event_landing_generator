import type { Metadata } from 'next'
import JuinNav from '@/components/exposition-nontron-juin-2026/JuinNav'
import JuinHero from '@/components/exposition-nontron-juin-2026/JuinHero'
import JuinEdito from '@/components/exposition-nontron-juin-2026/JuinEdito'
import NontronEdito from '@/components/exposition-nontron/NontronEdito'
import JuinArtistsGrid from '@/components/exposition-nontron-juin-2026/JuinArtistsGrid'
import JuinStats from '@/components/exposition-nontron-juin-2026/JuinStats'
import JuinInfo from '@/components/exposition-nontron-juin-2026/JuinInfo'
import JuinContacts from '@/components/exposition-nontron-juin-2026/JuinContacts'
import Newsletter from '@/components/shared/Newsletter'
import PoweredBy from '@/components/shared/PoweredBy'
import JuinFooter from '@/components/exposition-nontron-juin-2026/JuinFooter'

// TODO: replace with the actual Brevo list ID for Nontron Juin newsletter
const NONTRON_JUIN_NEWSLETTER_LIST_ID = 65

export const metadata: Metadata = {
  title: "Exposition d'Art Contemporain — Juin 2026 — LJ Gallery & InRealArt | Nontron",
  description:
    "Exposition d'art contemporain à la LJ Gallery de Nontron, juin 2026. Marie de Saint Germain et Younes Farhi.",
}

export default function ExpositionNontronJuin2026Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-montserrat text-gray-800">
      <JuinNav />
      <JuinHero />
      <JuinEdito /> 
      <JuinArtistsGrid />
      <JuinStats />
      <JuinInfo />
      <JuinContacts />
      <Newsletter
        listId={NONTRON_JUIN_NEWSLETTER_LIST_ID}
        heading="Restez au cœur de l'art"
        subtext="Recevez en avant-première les actualités de l'exposition, les portraits d'artistes et les invitations aux prochains vernissages."
        privacyNote="Vos données sont traitées par LJ Gallery & InRealArt conformément au RGPD. Désinscription possible à tout moment."
      />
      <PoweredBy />
      <JuinFooter />
    </main>
  )
}
