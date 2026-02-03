import Image from 'next/image'
import Link from 'next/link'
import ArtistBlock from '@/components/inrealart-artcapital2026/PresentationBlock'
import ParticipateBlock from '@/components/inrealart-artcapital2026/ParticipateBlock'
import RegistrationBlock from '@/components/inrealart-artcapital2026/RegistrationBlock'
import Footer from '@/components/inrealart-artcapital2026/Footer'
import GoogleCaptchaWrapper from '@/components/captcha/googleCaptchaWrapper'
import type { Metadata } from 'next'
import HeroSection from '@/components/inrealart-artcapital2026/HeroSection'

export const metadata: Metadata = {
  title: 'Art Capital 2026 — Jeu concours InRealArt',
  description: 'Tentez de remporter une toile unique. Jeu concours Art Capital 2026 en partenariat avec InRealArt.',
  keywords: 'Art Capital 2026, jeu concours, InRealArt, Grand Palais, œuvre d\'art'
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
      <HeroSection />
      <ArtistBlock />
      <section id="participer" className="scroll-mt-0">
        <ParticipateBlock />
      </section>
      <GoogleCaptchaWrapper>
        <RegistrationBlock />
      </GoogleCaptchaWrapper>

      <Footer />
    </main>
  )
}
