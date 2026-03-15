import Image from 'next/image'
import Link from 'next/link'

export default function BiennnalePoweredBy() {
  return (
    <section className="bg-black py-8 w-full">
      <div className="flex flex-col items-center gap-2">
        {/*
          labelReveal: opacity 0→1 + letter-spacing 0.1em→0.25em
          delay 0.3s so it lands just before the logo, feeling cinematic
          `both` fill mode holds opacity:0 before the animation starts
        */}
        <span
          className="text-[10px] uppercase text-gray-500 font-montserrat"
          style={{ animation: 'labelReveal 0.8s ease-out 0.3s both' }}
        >
          Powered by
        </span>

        {/*
          The Link keeps its hover:opacity-100 override.
          Base opacity is driven by the logoReveal animation end state (0.7),
          so we don't set an explicit opacity class here — `both` fill mode
          handles the initial hidden state cleanly.
        */}
        <Link
          href="https://inrealart.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 transition-opacity duration-500"
        >
          {/*
            Two animations chained on the same element:
            1. logoReveal  — 1s, once, settles at opacity 0.7 + translateY(0)
            2. glowPulse   — 3s infinite, starts after the reveal lands (1.8s delay)
               invert(1) lives inside glowPulse so className="invert" is removed.
            will-change: filter avoids repaints during the glow cycle.
          */}
          <Image
            src="/images/Logo_noir_4K_IRA.webp"
            alt="InRealArt"
            width={500}
            height={125}
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
