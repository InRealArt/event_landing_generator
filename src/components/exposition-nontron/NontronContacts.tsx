import Link from 'next/link'

interface ContactCardProps {
  name: string
  title: string
  role: string
  email: string
  phone: string
}

function ContactCard({ name, title, role, email, phone }: ContactCardProps) {
  return (
    <div className="group relative border border-gray-100 bg-white p-10 hover:border-[#c5a059]/40 transition-colors duration-300">
      {/* Gold accent top bar */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#c5a059] transition-all duration-500 group-hover:w-full" />

      {/* Role label */}
      <p className="text-[#c5a059] uppercase tracking-[0.25em] font-semibold font-montserrat text-xs mb-5">
        {role}
      </p>

      {/* Name */}
      <h3 className="text-2xl font-bricolage font-bold text-gray-900 mb-1">{name}</h3>

      {/* Title */}
      <p className="text-sm text-gray-400 font-montserrat font-light mb-8">{title}</p>

      {/* Divider */}
      <div className="w-8 h-px bg-[#c5a059]/40 mb-8" />

      {/* Contact info */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#c5a059]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <Link
            href={`mailto:${email}`}
            className="text-sm font-montserrat text-gray-600 hover:text-[#c5a059] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2"
          >
            {email}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-100 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#c5a059]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </span>
          <Link
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="text-sm font-montserrat text-gray-600 hover:text-[#c5a059] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:ring-offset-2"
          >
            {phone}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function NontronContacts() {
  return (
    <section className="py-24 bg-[#faf8f4] px-6 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#c5a059] uppercase tracking-[0.3em] font-semibold font-montserrat text-xs mb-4">
            Organisation
          </p>
          <h2 className="text-4xl md:text-5xl font-bricolage italic font-bold text-gray-900 mb-4">
            Contacts
          </h2>
          <div className="w-16 h-px bg-[#c5a059] mx-auto" />
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <ContactCard
            name="Lucile Julien"
            title="Directrice de la LJ Galerie"
            role=""
            email="ljgallery.nontron@gmail.com"
            phone="+33 6 59 52 72 29"
          />
          <ContactCard
            name="Ania Chrusciany"
            title="Responsable de l'exposition"
            role=""
            email="teaminrealart@gmail.com"
            phone="+33 6 14 58 35 64"
          />
        </div>
      </div>
    </section>
  )
}
