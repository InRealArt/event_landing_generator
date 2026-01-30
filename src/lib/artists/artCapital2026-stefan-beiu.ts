import { ArtistData } from '../artistData'

const IMAGE_BASE = '/images/artCapital2026/stefan-beiu'
const ARTWORKS_BASE = `${IMAGE_BASE}/artworks`

export const artCapital2026StefanBeiuData: ArtistData = {
  name: 'Stefan',
  fullName: 'Stefan Beiu',
  title: 'Artiste contemporain',
  tagline: 'Contemporary Artist',
  bio: "Artiste passionné par l'expression artistique contemporaine, Stefan Beiu explore les frontières entre tradition et modernité à travers ses créations uniques.",
  location: 'Art Capital 2026 : 13 au 15 février 2026',

  profileImage: `${IMAGE_BASE}/Stefan%20Beiu.webp`,
  aboutImage: `${IMAGE_BASE}/Stefan%20Beiu.webp`,
  backgroundImage: `${ARTWORKS_BASE}/les-jeux-olympiques.webp`,
  posterImage: `${IMAGE_BASE}/artCapital2026.webp`,
  partnershipLabel: '',

  email: 'teaminrealart@gmail.com',
  phone: '+33 6 12 34 56 78',
  website: '',
  brevoListId: 54,
  socialMedia: {
    instagram: '@inrealartgallery/',
    linkedin: 'company/inrealart/posts/?feedView=all',
    facebook: 'InRealArt/',
    pinterest: 'teaminrealart/'
  },

  artworks: [
    {
      id: 'artwork-1',
      title: 'Prélude choral en fa mineur',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '150 x 150 cm',
      image: `${ARTWORKS_BASE}/choral-prelude-in-f-minor.webp`,
      description: '',
      price: '9000€',
      available: true
    },
    {
      id: 'artwork-2',
      title: 'Diogène cherche un homme',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '180 x 130 cm',
      image: `${ARTWORKS_BASE}/diogene-cherche-homme.webp`,
      description: '',
      price: '11000€',
      available: true
    },
    {
      id: 'artwork-3',
      title: 'Jolie histoire',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '208 x 300 cm',
      image: `${ARTWORKS_BASE}/jolie-histoire.webp`,
      description: '',
      price: '32000€',
      available: true
    },
    {
      id: 'artwork-4',
      title: 'Le baiser dans la grange',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '200 x 180 cm',
      image: `${ARTWORKS_BASE}/le-baiser-dans-la-grange.webp`,
      description: '',
      price: '18000€',
      available: true
    },
    {
      id: 'artwork-5',
      title: "Modèle dans l'atelier",
      year: null,
      medium: 'Huile sur toile',
      dimensions: '110 x 110 cm',
      image: `${ARTWORKS_BASE}/modele-dans-l-atelier.webp`,
      description: '',
      price: '4700€',
      available: true
    },
    {
      id: 'artwork-6',
      title: 'Vanité',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '200 x 180 cm',
      image: `${ARTWORKS_BASE}/vanite.webp`,
      description: '',
      price: '18000€',
      available: true
    }
  ],

  specialties: [
    'Art Contemporain',
    'Peinture',
    'Expression Contemporaine'
  ],

  achievements: [],

  exhibitions: [],

  content: {
    heroBadge: 'Artiste',
    heroTitle: 'Artiste contemporain',
    heroSubtitle: 'Stefan Beiu',

    eventInfo: {
      title: 'Art Capital 2026',
      quand: 'du 13 février au 15 février 2026',
      ou: 'Grand Palais - Paris, France'
    },

    aboutBirthInfo: '',
    aboutDescription: "L'artiste Stefan Beiu fait partie de la communauté InRealArt.",
    aboutQuestion: '',
    aboutQuote: 'Dans mes toiles, je joue avec le temps et l’imaginaire : d’un côté, je construis des mondes foisonnants où le quotidien se mêle à la fantaisie ; de l’autre, je réinvente les maîtres anciens pour leur offrir une vie nouvelle, où chaque détail devient un énigme moderne',
    aboutQuoteAuthor: '- Stefan Beiu',
    aboutTags: ['Artiste', 'Art contemporain'],

    portraitTitle: 'Portrait de Stefan Beiu',
    portraitDescription: 'Né en 1960 dans un village de Moldavie, Beiu grandit au milieu des récits, des traditions et d’une réalité où l’imaginaire tient souvent lieu d’échappatoire. Très jeune, il comprend que peindre n’est pas seulement représenter : c’est raconter. Après le Collège des Beaux Arts de Chisinau, puis l’exigeante Académie Vassily Surikov de Moscou, d’où il sort diplômé avec mention Excellence, l’artiste forge une signature rare : des tableaux récits, où chaque fragment d’image en dissimule un autre.',
    awards: [],
    soloExhibitions: [],
    publications: [],

    galleryMainTitle: 'Art Capital 2026',
    gallerySubtitle: '& Stefan Beiu',
    galleryDescription: 'Découvrez les œuvres exposées par Stefan au Art Capital 2026',

    statsTitle: 'Le catalogue InRealArt c\'est',
    stats: [
      { number: '15 +', description: 'Artistes sélectionnés dans notre catalogue global' },
      { number: '200+', description: 'Œuvres soigneusement choisies pour embellir votre collection.' },
      { number: '100%', description: 'De nos artistes satisfaits de leurs accompagnements' }
    ],

    catalogTitle: 'Catalogue Stefan Beiu & InRealArt',
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
      artistDescription: 'Artiste contemporain.',
      inrealArtDescription: 'Catalyseur d\'art, de Culture & de Patrimoine',
      contactLabels: {
        email: 'Email',
        phone: 'Téléphone',
        location: 'Localisation'
      },
      copyright: '© 2025 Stefan Beiu & InRealArt. Tous droits réservés.',
      legalLinks: {
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },

  seo: {
    title: 'Stefan Beiu - Artiste contemporain | Art Capital 2026',
    description: 'Découvrez les œuvres de Stefan Beiu, artiste contemporain, exposé au Art Capital 2026',
    keywords: ['Stefan Beiu', 'artiste', 'art contemporain', 'Art Capital 2026']
  }
}
