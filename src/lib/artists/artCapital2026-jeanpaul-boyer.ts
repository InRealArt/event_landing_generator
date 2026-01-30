import { ArtistData } from '../artistData'

const IMAGE_BASE = '/images/artCapital2026/jeanpaul-boyer'
const ARTWORKS_BASE = `${IMAGE_BASE}/artworks`

export const artCapital2026JeanpaulBoyerData: ArtistData = {
  name: 'Jean-Paul',
  fullName: 'Jean-Paul Boyer',
  title: 'Sculpteur contemporain français',
  tagline: 'Contemporary French Sculptor',
  bio: "Sculpteur passionné par l'expression artistique contemporaine, Jean-Paul Boyer explore les frontières entre tradition et modernité à travers ses créations uniques.",
  location: 'Art Capital 2026 : 13 au 15 février 2026',

  profileImage: `${IMAGE_BASE}/Jean-Paul%20Boyer.webp`,
  aboutImage: `${IMAGE_BASE}/Jean-Paul%20Boyer.webp`,
  backgroundImage: `${ARTWORKS_BASE}/sm-596-le-grand-poisson-des-mers-du-sud.webp`,
  posterImage: `${IMAGE_BASE}/artCapital2026.webp`,
  partnershipLabel: '',

  email: 'teaminrealart@gmail.com',
  phone: '+33 6 12 34 56 78',
  website: '',
  brevoListId: 55,
  socialMedia: {
    instagram: '@inrealartgallery/',
    linkedin: 'company/inrealart/posts/?feedView=all',
    facebook: 'InRealArt/',
    pinterest: 'teaminrealart/'
  },

  artworks: [
    {
      id: 'artwork-1',
      title: 'dole IX',
      year: null,
      medium: 'Sculpture en bois',
      dimensions: '38 x 67 cm',
      image: `${ARTWORKS_BASE}/sm-539-idole-ix.webp`,
      description: '',
      price: '3000€',
      available: true
    },
    {
      id: 'artwork-2',
      title: 'Petit ovoïde horizontal',
      year: null,
      medium: 'Sculpture en bois',
      dimensions: '31 x 40 cm',
      image: `${ARTWORKS_BASE}/sm-606-petit-ovoide-horizontal.avif`,
      description: '',
      price: '1800€',
      available: true
    },
    {
      id: 'artwork-3',
      title: 'Piqué X',
      year: null,
      medium: 'Sculpture en bois',
      dimensions: '40 x 65 cm',
      image: `${ARTWORKS_BASE}/sm-746-pique-x.webp`,
      description: '',
      price: '4000',
      available: true
    },
    {
      id: 'artwork-4',
      title: 'Ovoïde noir et blanc',
      year: null,
      medium: 'Sculpture modulable',
      dimensions: '60 x 90 cm',
      image: `${ARTWORKS_BASE}/sm-820-ovoide-noir-et-blanc-peintpar-fragola-de-la-vega-sreet-artiste.webp`,
      description: 'Peint par Fragola de la Vega, street artiste',
      price: '6000€',
      available: true
    },
    {
      id: 'artwork-5',
      title: "Volutes d'acier laqué",
      year: null,
      medium: 'Sculpture en lames d\'acier',
      dimensions: ' 70 x 71 cm',
      image: `${ARTWORKS_BASE}/sm733-volutes-d-acier-laque.avif`,
      description: '',
      price: '3500',
      available: true
    },
    {
      id: 'artwork-6',
      title: 'Le vieux mur',
      year: null,
      medium: 'Sculpture en PVC expansé',
      dimensions: '100 x 80 cm',
      image: `${ARTWORKS_BASE}/sm821-le-vieux-mur-peint-par-louyz-street-artiste.webp`,
      description: 'Peint par Louyz, street artiste',
      price: '9000€',
      available: true
    }
  ],

  specialties: [
    'Art Contemporain',
    'Sculpture',
    'Street Art',
    'Expression Contemporaine'
  ],

  achievements: [],

  exhibitions: [],

  content: {
    heroBadge: 'Sculpteur',
    heroTitle: 'Sculpteur contemporain français',
    heroSubtitle: 'Jean-Paul Boyer',

    eventInfo: {
      title: 'Art Capital 2026',
      quand: 'du 13 février au 15 février 2026',
      ou: 'Grand Palais - Paris, France'
    },

    aboutBirthInfo: '',
    aboutDescription: "L'artiste Jean-Paul Boyer fait partie de la communauté InRealArt.",
    aboutQuestion: '',
    aboutQuote: 'Je conçois des œuvres qui se transforment au gré des mains qui les touchent, redéfinissant l’expérience artistique dans un monde en mouvement.',
    aboutQuoteAuthor: '- Jean-Paul Boyer',
    aboutTags: ['Artiste', 'Art contemporain'],

    portraitTitle: 'Portrait de Jean-Paul Boyer',
    portraitDescription: 'Jean-Paul Boyer est un sculpteur dont le travail explore la modularité et l’interaction avec l’espace. Après une production classique en bois, il développe en 1989 ses Sculptures Modulables, des œuvres où chaque élément, libéré et recomposable, permet au spectateur de modifier l’espace autour de la sculpture. Travaillant divers matériaux – bois, marbre, bronze, verre et résines – Boyer invite ainsi le public à interagir et à faire évoluer l’œuvre, plaçant l’air et l’espace comme parties intégrantes de sa création. À ce jour, il a réalisé près d’un millier de ces sculptures uniques, exposées dans des galeries et salons en France et à l’international.',
    awards: [],
    soloExhibitions: [],
    publications: [],

    galleryMainTitle: 'Art Capital 2026',
    gallerySubtitle: '& Jean-Paul Boyer',
    galleryDescription: 'Découvrez les œuvres exposées par Jean-Paul au Art Capital 2026',

    statsTitle: 'Le catalogue InRealArt c\'est',
    stats: [
      { number: '15 +', description: 'Artistes sélectionnés dans notre catalogue global' },
      { number: '200+', description: 'Œuvres soigneusement choisies pour embellir votre collection.' },
      { number: '100%', description: 'De nos artistes satisfaits de leurs accompagnements' }
    ],

    catalogTitle: 'Catalogue Jean-Paul Boyer & InRealArt',
    catalogDescription: 'Explorez une collection unique d\'œuvres exposées au Art Capital 2026 du 13 au 15 février 2026.',
    catalogForm: {
      nameLabel: 'Nom*',
      namePlaceholder: 'Entrer votre nom',
      emailLabel: 'Adresse mail*',
      emailPlaceholder: 'Adresse@gmail.com',
      mobileLabel: 'Mobile',
      mobilePlaceholder: '+33 6 12 34 56 78',
      privacyText: 'Vous acceptez notre politique de confidentialité.',
      buttonText: 'Recevoir le catalogue',
      successMessage: 'Votre catalogue vous sera envoyé très prochainement ! Vérifiez votre boîte mail.',
      errorMessage: 'Erreur lors de l\'envoi. Veuillez réessayer.'
    },

    footer: {
      artistDescription: 'Artiste contemporain français.',
      inrealArtDescription: 'Catalyseur d\'art, de Culture & de Patrimoine',
      contactLabels: {
        email: 'Email',
        phone: 'Téléphone',
        location: 'Localisation'
      },
      copyright: '© 2025 Jean-Paul Boyer & InRealArt. Tous droits réservés.',
      legalLinks: {
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },

  seo: {
    title: 'Jean-Paul Boyer - Artiste contemporain | Art Capital 2026',
    description: 'Découvrez les œuvres de Jean-Paul Boyer, artiste contemporain français, exposé au Art Capital 2026',
    keywords: ['Jean-Paul Boyer', 'artiste français', 'art contemporain', 'Art Capital 2026']
  }
}
