import Newsletter from '@/components/shared/Newsletter'

const BIENNALE_NEWSLETTER_LIST_ID = 63

export default function BiennaleNewsletter() {
  return (
    <Newsletter
      listId={BIENNALE_NEWSLETTER_LIST_ID}
      heading="Restez au cœur de l'art"
      subtext="Recevez en avant-première les actualités de la Biennale, les portraits d'artistes et les invitations aux prochains vernissages."
      privacyNote="Vos données sont traitées par La Biennale Versaillaise conformément au RGPD. Désinscription possible à tout moment."
    />
  )
}
