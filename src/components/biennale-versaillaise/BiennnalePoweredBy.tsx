import Image from 'next/image'
import Link from 'next/link'

export default function BiennnalePoweredBy() {
  return (
    <section className="bg-black py-8 w-full">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-montserrat">
          Powered by
        </span>
        <Link
          href="https://inrealart.com"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <Image
            src="/images/Logo_noir_4K_IRA.webp"
            alt="InRealArt"
            width={500}
            height={125}
            className="invert"
          />
        </Link>
      </div>
    </section>
  )
}
