import { ArtistData } from '../artistData'

const IMAGE_BASE = '/images/artCapital2026/adelaide-leferme'
const ARTWORKS_BASE = `${IMAGE_BASE}/artworks`

export const artCapital2026AdelaideLefermeData: ArtistData = {
  name: 'Adelaide',
  fullName: 'Adélaïde Leferme',
  title: 'Artiste contemporaine française',
  tagline: 'Contemporary French Artist',
  bio: "Artiste passionnée par l'expression artistique contemporaine, Adélaïde Leferme explore les frontières entre tradition et modernité à travers ses créations uniques. Son travail reflète une sensibilité particulière pour les couleurs et les formes.",
  location: 'Art Capital 2026 : 13 au 15 février 2026',

  profileImage: `${IMAGE_BASE}/adelaide_leferme.webp`,
  aboutImage: `${IMAGE_BASE}/adelaide_leferme.webp`,
  backgroundImage: `${ARTWORKS_BASE}/voyages-immobiles-gandhi-elephant.webp`,
  posterImage: `${IMAGE_BASE}/artCapital2026.webp`,
  partnershipLabel: '',

  email: 'teaminrealart@gmail.com',
  phone: '+33 6 12 34 56 78',
  website: '',
  brevoListId: 53,
  socialMedia: {
    instagram: '@inrealartgallery/',
    linkedin: 'company/inrealart/posts/?feedView=all',
    facebook: 'InRealArt/',
    pinterest: 'teaminrealart/'
  },

  artworks: [
    {
      id: 'artwork-1',
      title: 'Coral Reef',
      year: null,
      medium: 'Technique mixte',
      dimensions: '',
      image: `${ARTWORKS_BASE}/coral-reef.webp`,
      description: '100 x 100 cm',
      price: '3500€',
      available: true
    },
    {
      id: 'artwork-2',
      title: 'Fifth Dimension',
      year: null,
      medium: 'Technique mixte sur Like mirror ',
      dimensions: '200 x 240 cm',
      image: `${ARTWORKS_BASE}/fifth-dimension.webp`,
      description: '',
      price: 'Sur demande',
      available: true
    },
    {
      id: 'artwork-3',
      title: 'Klimt Spirit Duo',
      year: null,
      medium: '2 disques de 60 cm de diamètre chacun Fibres réfléchissantes fusionnées, pigments précieux et or 24 carats - 5 kg - 2023',
      dimensions: '60 x 120 cm',
      image: `${ARTWORKS_BASE}/klimt-spirit-duo.webp`,
      description: '',
      price: 'Sur demande',
      available: true
    },
    {
      id: 'artwork-4',
      title: 'Quatro Stagioni',
      year: null,
      medium: 'Technique fibres réfléchissantes fusionnées et pigments précieux, or 24 carats ',
      dimensions: '',
      image: `${ARTWORKS_BASE}/quatro-stagioni.webp`,
      description: '200 x 200 cm',
      price: '',
      available: true
    },
    {
      id: 'artwork-5',
      title: 'Souffle du dragon',
      year: null,
      medium: 'Toile fibre fusion extra légère or et pigments or et rouge, effet miroir',
      dimensions: '100 x 100 cm',
      image: `${ARTWORKS_BASE}/souffle-du-dragon.webp`,
      description: '',
      price: '3500€',
      available: true
    },
    {
      id: 'artwork-6',
      title: 'Totem Klimt',
      year: null,
      medium: 'Technique mixte et or sur miroir en film tendu sur cadre',
      dimensions: '80 x 200 cm',
      image: `${ARTWORKS_BASE}/totem-klimt.webp`,
      description: '',
      price: 'Sur demande',
      available: true
    }
  ],

  specialties: [
    'Art Contemporain',
    'Techniques Mixtes',
    'Composition',
    'Expression Contemporaine'
  ],

  achievements: [],

  exhibitions: [],

  content: {
    heroBadge: 'Artiste',
    heroTitle: 'Artiste contemporaine française',
    heroSubtitle: 'Adélaïde Leferme',

    eventInfo: {
      title: 'Art Capital 2026',
      quand: 'du 13 février au 15 février 2026',
      ou: 'Grand Palais - Paris, France'
    },

    aboutBirthInfo: '',
    aboutDescription: "L'artiste Adélaïde Leferme fait partie de la communauté InRealArt.",
    aboutQuestion: '',
    aboutQuote: '',
    aboutQuoteAuthor: '',
    aboutTags: ['Artiste', 'Art contemporain'],

    portraitTitle: 'Portrait d\'Adélaïde Leferme',
    portraitDescription: 'Artiste peintre et plasticienne, Adélaïde Leferme est née en 1983 au Havre, France.Elle vit et travaille entre Maisons-Laffitte et la Normandie.Artiste plasticienne diplômée des Beaux-Arts du Havre (France), Adelaïde Leferme crée un univers singulier qui intrigue autant qu’il interroge. Mêlant peinture, pigments naturels ou encore feuilles d’or, son travail revisite le classique, tant dans ses mythes que dans ses formes, ajoutant ainsi une touche de mystique au réel et au contemporain.',
    awards: [],
    soloExhibitions: [],
    publications: [],

    galleryMainTitle: 'Art Capital 2026',
    gallerySubtitle: '& Adélaïde Leferme',
    galleryDescription: "Découvrez les œuvres exposées par Adélaïde au Art Capital 2026",

    statsTitle: 'Le catalogue InRealArt c\'est',
    stats: [
      { number: '15 +', description: 'Artistes sélectionnés dans notre catalogue global' },
      { number: '200+', description: 'Œuvres soigneusement choisies pour embellir votre collection.' },
      { number: '100%', description: 'De nos artistes satisfaits de leurs accompagnements' }
    ],

    catalogTitle: 'Catalogue Adélaïde Leferme & InRealArt',
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
      artistDescription: 'Artiste contemporaine française.',
      inrealArtDescription: 'Catalyseur d\'art, de Culture & de Patrimoine',
      contactLabels: {
        email: 'Email',
        phone: 'Téléphone',
        location: 'Localisation'
      },
      copyright: '© 2025 Adélaïde Leferme & InRealArt. Tous droits réservés.',
      legalLinks: {
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },

  seo: {
    title: 'Adélaïde Leferme - Artiste contemporaine | Art Capital 2026',
    description: "Découvrez les œuvres d'Adélaïde Leferme, artiste contemporaine française, exposée au Art Capital 2026",
    keywords: ['Adélaïde Leferme', 'artiste française', 'art contemporain', 'Art Capital 2026']
  }
}
