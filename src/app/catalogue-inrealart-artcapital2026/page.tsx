import Image from 'next/image'
import Link from 'next/link'
import ArtistBlock from '@/components/inrealart-artcapital2026/PresentationBlock'
import ParticipateBlock from '@/components/inrealart-artcapital2026/ParticipateBlock'
import RegistrationBlock from '@/components/inrealart-artcapital2026/RegistrationBlock'
import Footer from '@/components/inrealart-artcapital2026/Footer'
import GoogleCaptchaWrapper from '@/components/captcha/googleCaptchaWrapper'
import type { Metadata } from 'next'
import HeroSection from '@/components/inrealart-artcapital2026/HeroSection'
import PresentationBlock from '@/components/inrealart-artcapital2026/PresentationBlock'

export const metadata: Metadata = {
  title: 'Art Capital 2026 — Visite exceptionnelle InRealArt',
  description: 'Visite exceptionnelle Art Capital 2026 en partenariat avec InRealArt.',
  keywords: 'Art Capital 2026, visite exceptionnelle, InRealArt, Grand Palais, œuvre d\'art'
}

function _ArtCapital2026Nav () {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-[80%] md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo.webp"
              alt="InRealArt"
              width={120}
              height={40}
              className="h-8 w-auto invert"
              quality={90}
              priority
              sizes="120px"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function InrealartArtCapital2026Page () {
  return (
    <main className="min-h-screen bg-white">
      {/* <_ArtCapital2026Nav /> */}
      <HeroSection
        content={{
          title: 'Art Capital 2026 : le catalogue complet des œuvres à télécharger gratuitement',
          ctaLabel: 'Télécharger le catalogue'
        }}
      />
      <PresentationBlock
        content={{
          title: '',
          logo: '/images/ira_artCapital2026/Logo_IRA.avif',
          logoAlt: 'IRA',
          logoLine: 'ARTCAPITAL',
          line2: "Des oeuvres d'exception à découvrir !",
          line3: "Téléchargez dès maintenant votre catalogue",
          image: '/images/catalogue_ira_artCapital2026/Logo_InRealArt.webp',
          imageAlt: '',
          name: '',
          paragraphs: [
            "Découvrez les œuvres des artistes InRealArt lors d’Art Capital 2026, au Grand Palais du 13 au 15 février 2026.",
            "Téléchargez gratuitement le catalogue complet des œuvres à télécharger gratuitement.",
            "Feuilletez toutes les œuvres du salon Art Capital 2026 depuis chez vous."
          ],
          signatureName: 'InRealArt',
          signatureRole: 'La plateforme curatoriale qui rend l\'art, la culture et le patrimoine accessible, humain et éthique'
        }}
      />
      <section id="participer" className="scroll-mt-0">
        <ParticipateBlock
          content={{
            title: 'Récupérez le catalogue en 2 clics',
            steps: [
              {
                number: 1,
                text: 'Indiquez votre email ci-dessous, sans engagement, 100 % gratuit.'
              },
              {
                number: 2,
                text: 'Recevez immédiatement le lien de téléchargement et feuilletez toutes les œuvres du salon Art Capital 2026 depuis chez vous.'
              }
            ],
            image: '/images/ira_artCapital2026/artCapital2026.webp',
            imageAlt: 'InRealArt — Catalogue des œuvres Art Capital 2026'
          }}
        />
      </section>
      <GoogleCaptchaWrapper>
        <RegistrationBlock
          content={{
            title: "Télécharger gratuitement le catalogue d'œuvres d'exception",
            fields: ['firstName', 'lastName', 'email', 'phone', 'acceptNewsletter'],
            brevoListIds: [14, 59]
          }}
        />
      </GoogleCaptchaWrapper>

      <Footer />
    </main>
  )
}
