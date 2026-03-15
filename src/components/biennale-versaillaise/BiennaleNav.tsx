'use client'

import Link from 'next/link'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#commissaire', label: 'Édito' },
  { href: '#invites', label: "Invités d'honneur" },
  { href: '#artistes', label: 'Les Artistes' },
  { href: '#infos', label: 'Pratique' },
]

export default function BiennaleNav() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter uppercase font-bricolage">
          La Biennale <span className="text-[#c5a059]">Versaillaise</span>
        </div>

        <div className="hidden md:flex space-x-8 text-xs font-semibold uppercase tracking-widest font-montserrat">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="relative after:content-[''] after:absolute after:w-0 after:h-px after:bottom-[-2px] after:left-0 after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link
          href="https://biennale-versaillaise.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs border border-gray-300 px-4 py-2 hover:bg-black hover:text-white transition-all duration-200 font-montserrat"
        >
          Site Officiel
        </Link>
      </div>
    </nav>
  )
}
