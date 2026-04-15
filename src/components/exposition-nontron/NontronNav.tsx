'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#edito', label: 'Édito' },
  { href: '#invitee', label: 'Invitée Spéciale' },
  { href: '#artistes-exposes', label: 'Artistes Exposés' },
  { href: '#artistes', label: 'Les Artistes' },
  { href: '#infos', label: 'Pratique' },
]

export default function NontronNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <nav className="fixed w-full z-50">
      {/* Main bar */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tighter uppercase font-bricolage">
            LJ Gallery <span className="text-[#c5a059]">× InRealArt</span>
          </div>

          {/* Desktop nav links */}
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

          {/* Right side: desktop label + mobile hamburger */}
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex text-xs border border-[#c5a059] text-[#c5a059] px-4 py-2 font-montserrat uppercase tracking-widest">
              Nontron · 2026
            </span>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
            >
              <span
                className={`block h-px w-6 bg-gray-800 transition-all duration-300 origin-center ${
                  isOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-gray-800 transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-px w-6 bg-gray-800 transition-all duration-300 origin-center ${
                  isOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              tabIndex={isOpen ? 0 : -1}
              className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-none font-montserrat text-sm font-semibold uppercase tracking-widest text-gray-800 hover:text-[#c5a059] transition-colors duration-200"
              style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
            >
              {link.label}
              <span className="text-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">
                &#8594;
              </span>
            </a>
          ))}

          <div className="pt-6">
            <span className="inline-flex w-full justify-center text-xs border border-[#c5a059] text-[#c5a059] px-4 py-3 font-montserrat uppercase tracking-widest">
              Nontron · 2026
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
