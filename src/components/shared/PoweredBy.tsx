import Image from 'next/image'
import Link from 'next/link'

export interface PoweredByProps {
  /** Label displayed above the logo. Default: "Powered by" */
  label?: string
  /** Path to the logo image (from /public). Default: InRealArt logo */
  logoSrc?: string
  /** Alt text for the logo */
  logoAlt?: string
  /** Logo width in px */
  logoWidth?: number
  /** Logo height in px */
  logoHeight?: number
  /** URL the logo links to */
  href?: string
}

export default function PoweredBy({
  label = 'Powered by',
  logoSrc = '/images/Logo_noir_4K_IRA.webp',
  logoAlt = 'InRealArt',
  logoWidth = 500,
  logoHeight = 125,
  href = 'https://inrealart.com',
}: PoweredByProps) {
  return (
    <section className="bg-black py-8 w-full">
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-[10px] uppercase text-gray-500 font-montserrat"
          style={{ animation: 'labelReveal 0.8s ease-out 0.3s both' }}
        >
          {label}
        </span>

        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity duration-500"
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            style={{
              animation:
                'logoReveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both, glowPulse 2.5s ease-in-out 1.8s infinite',
              willChange: 'filter',
            }}
          />
        </Link>
      </div>
    </section>
  )
}
