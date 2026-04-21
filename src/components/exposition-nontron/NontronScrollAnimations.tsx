'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

/**
 * NontronScrollAnimations
 *
 * Orchestrates all GSAP ScrollTrigger animations for the Nontron exposition page.
 * Mounted once at page level — reads existing DOM nodes via selectors.
 * All animations use transform + opacity only (GPU-accelerated, no reflow).
 * Respects prefers-reduced-motion.
 */
export default function NontronScrollAnimations() {
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // -------------------------------------------------------------------------
    // Shared easing — elegant, slightly weighted feel for fine art context
    // -------------------------------------------------------------------------
    const ease = 'power3.out'
    const easeSlow = 'power2.out'

    // -------------------------------------------------------------------------
    // HERO — staggered entrance of text elements
    // -------------------------------------------------------------------------
    const heroSection = document.querySelector('#accueil')
    if (heroSection) {
      const heroContent = heroSection.querySelector('.relative.z-10')
      if (heroContent) {
        const heroChildren = Array.from(heroContent.children)
        gsap.fromTo(
          heroChildren,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease,
            delay: 0.2,
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // EDITO — dark section: header, then image + text side by side
    // -------------------------------------------------------------------------
    const editoSection = document.querySelector('#edito')
    if (editoSection) {
      // Section header (supertitle + h2 + divider)
      const editoHeader = editoSection.querySelector('.text-center')
      if (editoHeader) {
        gsap.fromTo(
          Array.from(editoHeader.children),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease,
            scrollTrigger: { trigger: editoHeader, start: 'top 85%', once: true },
          }
        )
      }

      // Image + text layout — slide from opposite sides
      const editoImage = editoSection.querySelector('.aspect-\\[3\\/2\\]')
      const editoText = editoSection.querySelector('.md\\:w-1\\/2.text-white')

      if (editoImage) {
        gsap.fromTo(
          editoImage,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease,
            scrollTrigger: { trigger: editoImage, start: 'top 85%', once: true },
          }
        )
      }
      if (editoText) {
        gsap.fromTo(
          editoText,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease,
            scrollTrigger: { trigger: editoText, start: 'top 85%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // EDITO light section (La Galerie / À propos)
    // -------------------------------------------------------------------------
    const allSections = Array.from(document.querySelectorAll('section'))
    // The light "À propos" section is the one with bg-white after #edito
    const aboutSection = allSections.find(
      (s) => !s.id && s.classList.contains('py-24') && s.classList.contains('bg-white')
    )
    if (aboutSection) {
      const aboutLeft = aboutSection.querySelector('.md\\:w-1\\/2:first-child, [class*="md:w-1/2"]:first-child')
      const aboutRight = aboutSection.querySelector('.aspect-\\[4\\/5\\]')

      if (aboutLeft) {
        gsap.fromTo(
          aboutLeft,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease,
            scrollTrigger: { trigger: aboutLeft, start: 'top 85%', once: true },
          }
        )
      }
      if (aboutRight) {
        gsap.fromTo(
          aboutRight,
          { opacity: 0, x: 30, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease,
            scrollTrigger: { trigger: aboutRight, start: 'top 85%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // GUEST (Invité Spécial) — text left, image right
    // -------------------------------------------------------------------------
    const guestSection = document.querySelector('#invitee')
    if (guestSection) {
      const guestText = guestSection.querySelector('.order-2')
      const guestImage = guestSection.querySelector('.order-1')

      if (guestText) {
        const guestTextChildren = Array.from(guestText.children)
        gsap.fromTo(
          guestTextChildren,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease,
            scrollTrigger: { trigger: guestText, start: 'top 85%', once: true },
          }
        )
      }
      if (guestImage) {
        gsap.fromTo(
          guestImage,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: easeSlow,
            scrollTrigger: { trigger: guestImage, start: 'top 85%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // ARTISTS GRID — staggered cards
    // -------------------------------------------------------------------------
    const artistsSection = document.querySelector('#artistes-exposes')
    if (artistsSection) {
      // Section title
      const artistsTitle = artistsSection.querySelector('h2')
      if (artistsTitle) {
        gsap.fromTo(
          artistsTitle,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease,
            scrollTrigger: { trigger: artistsTitle, start: 'top 88%', once: true },
          }
        )
      }

      // Cards — staggered reveal
      const artistCards = gsap.utils.toArray<Element>(
        artistsSection.querySelectorAll('.grid > div')
      )
      if (artistCards.length) {
        gsap.fromTo(
          artistCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease,
            scrollTrigger: { trigger: artistCards[0], start: 'top 85%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // MEDIAS (dark section) — header then videos staggered
    // -------------------------------------------------------------------------
    const mediasSection = document.querySelector('#medias')
    if (mediasSection) {
      const mediasHeader = mediasSection.querySelector('.text-center')
      if (mediasHeader) {
        gsap.fromTo(
          Array.from(mediasHeader.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease,
            scrollTrigger: { trigger: mediasHeader, start: 'top 88%', once: true },
          }
        )
      }

      const videoItems = gsap.utils.toArray<Element>(
        mediasSection.querySelectorAll('.flex.flex-wrap > div')
      )
      if (videoItems.length) {
        gsap.fromTo(
          videoItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease,
            scrollTrigger: { trigger: videoItems[0], start: 'top 85%', once: true },
          }
        )
      }

      // Stats row
      const statItems = gsap.utils.toArray<Element>(
        mediasSection.querySelectorAll('.grid > div')
      )
      if (statItems.length) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease,
            scrollTrigger: { trigger: statItems[0], start: 'top 90%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // STATS section — big number count-up + checklist items
    // -------------------------------------------------------------------------
    const statsSection = document.querySelector('section.py-24.bg-\\[\\#faf8f4\\].px-6.border-t')
    if (statsSection) {
      // Section header
      const statsHeader = statsSection.querySelector('.border-l-4')
      if (statsHeader) {
        gsap.fromTo(
          statsHeader,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease,
            scrollTrigger: { trigger: statsHeader, start: 'top 85%', once: true },
          }
        )
      }

      // Big number — scale + fade
      const bigNumber = statsSection.querySelector('.text-7xl, .text-8xl')
      if (bigNumber) {
        gsap.fromTo(
          bigNumber,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: bigNumber, start: 'top 85%', once: true },
          }
        )
      }

      // Checklist items — staggered slide-in
      const checklistItems = gsap.utils.toArray<Element>(statsSection.querySelectorAll('li'))
      if (checklistItems.length) {
        gsap.fromTo(
          checklistItems,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease,
            scrollTrigger: { trigger: checklistItems[0], start: 'top 88%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // INFO section — two-column layout
    // -------------------------------------------------------------------------
    const infoSection = document.querySelector('#infos')
    if (infoSection) {
      const infoColumns = gsap.utils.toArray<Element>(
        infoSection.querySelectorAll('.grid > div, .grid > *')
      )
      if (infoColumns.length) {
        gsap.fromTo(
          infoColumns,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.18,
            ease,
            scrollTrigger: { trigger: infoColumns[0], start: 'top 85%', once: true },
          }
        )
      }

      // Practical info list items
      const infoItems = gsap.utils.toArray<Element>(infoSection.querySelectorAll('li'))
      if (infoItems.length) {
        gsap.fromTo(
          infoItems,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease,
            scrollTrigger: { trigger: infoItems[0], start: 'top 88%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // CONTACTS section — header + cards
    // -------------------------------------------------------------------------
    const contactsSection = infoSection
      ? infoSection.nextElementSibling
      : null

    // Fallback: find contacts section by its unique combination
    const contactsSectionEl =
      contactsSection ??
      Array.from(document.querySelectorAll('section')).find(
        (s) => s.classList.contains('bg-\\[\\#faf8f4\\]') || s.querySelector('h2')?.textContent?.includes('Contact')
      )

    if (contactsSectionEl) {
      const contactsHeader = contactsSectionEl.querySelector('.text-center')
      if (contactsHeader) {
        gsap.fromTo(
          Array.from(contactsHeader.children),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease,
            scrollTrigger: { trigger: contactsHeader, start: 'top 88%', once: true },
          }
        )
      }

      const contactCards = gsap.utils.toArray<Element>(
        contactsSectionEl.querySelectorAll('.grid > div')
      )
      if (contactCards.length) {
        gsap.fromTo(
          contactCards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15,
            ease,
            scrollTrigger: { trigger: contactCards[0], start: 'top 85%', once: true },
          }
        )
      }
    }

    // -------------------------------------------------------------------------
    // NEWSLETTER + POWERED BY + FOOTER — generic fade-up
    // -------------------------------------------------------------------------
    const bottomSections = Array.from(
      document.querySelectorAll('section:last-of-type, footer')
    )
    bottomSections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: easeSlow,
          scrollTrigger: { trigger: section, start: 'top 92%', once: true },
        }
      )
    })

    // -------------------------------------------------------------------------
    // GOLD DIVIDERS — reveal from center
    // -------------------------------------------------------------------------
    const goldDividers = gsap.utils.toArray<Element>(
      document.querySelectorAll('.bg-\\[\\#c5a059\\].mx-auto, .bg-\\[\\#c5a059\\].w-20')
    )
    goldDividers.forEach((divider) => {
      gsap.fromTo(
        divider,
        { scaleX: 0, transformOrigin: 'center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease,
          scrollTrigger: { trigger: divider, start: 'top 90%', once: true },
        }
      )
    })
  })

  // This component renders nothing — it's a pure animation side-effect
  return null
}
