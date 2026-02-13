import type { Metadata } from "next"
import Script from 'next/script'
import { Toaster } from 'sonner'
import "./globals.css"

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? 'df377442-13ac-4250-8711-79bb8ad9c6b9'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://event.inrealart.com' 
    : 'http://localhost:3000'
  ),
  title: 'Événements InRealArt — Expositions et salons d’art',
  description: 'Découvrez tous les événements InRealArt : expositions, salons, dates et lieux. Classement en cours, à venir et passés.',
  keywords: 'InRealArt, événements, expositions, salons d’art, artistes, art, catalogue',
  authors: [{ name: 'InRealArt' }],
  openGraph: {
    title: 'Événements InRealArt — Expositions et salons d’art',
    description: 'Découvrez tous les événements InRealArt : expositions, salons, dates et lieux. Classement en cours, à venir et passés.',
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Événements InRealArt — Expositions et salons d’art',
    description: 'Découvrez tous les événements InRealArt : expositions, salons, dates et lieux. Classement en cours, à venir et passés.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Unbounded:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-backgroundColor text-textColor">
        {children}
        <Toaster position="top-center" richColors closeButton />
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}