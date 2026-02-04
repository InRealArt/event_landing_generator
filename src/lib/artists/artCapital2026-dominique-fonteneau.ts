import { ArtistData } from '../artistData'

const IMAGE_BASE = '/images/artCapital2026/dominique-fonteneau'
const ARTWORKS_BASE = `${IMAGE_BASE}/artworks`

export const artCapital2026DominiqueFonteneauData: ArtistData = {
  name: 'Dominique',
  fullName: 'Dominique Fonteneau',
  title: 'Artiste contemporain français',
  tagline: 'Contemporary French Artist',
  bio: "Artiste passionné par l'expression artistique contemporaine, Dominique Fonteneau explore les frontières entre tradition et modernité à travers ses créations uniques.",
  location: 'Art Capital 2026 : 13 au 15 février 2026',

  profileImage: `${IMAGE_BASE}/Dominique_Fonteneau.webp`,
  aboutImage: `${IMAGE_BASE}/Dominique_Fonteneau.webp`,
  backgroundImage: `${ARTWORKS_BASE}/expression_01m24.webp`,
  posterImage: `${IMAGE_BASE}/artCapital2026.webp`,
  partnershipLabel: '',

  email: 'teaminrealart@gmail.com',
  phone: '+33 6 12 34 56 78',
  website: '',
  brevoListId: 58,
  socialMedia: {
    instagram: '@inrealartgallery/',
    linkedin: 'company/inrealart/posts/?feedView=all',
    facebook: 'InRealArt/',
    pinterest: 'teaminrealart/'
  },

  artworks: [
    {
      id: 'artwork-1',
      title: 'Expression 01 AT25',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '150 x 120 cm',
      image: `${ARTWORKS_BASE}/expression_01at25.webp`,
      description: '',
      price: '6500€',
      available: true
    },
    {
      id: 'artwork-2',
      title: 'Expression 01 D 24',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '150 x 120 cm',
      image: `${ARTWORKS_BASE}/expression_01d24.webp`,
      description: '',
      price: '6500€',
      available: true
    },
    {
      id: 'artwork-3',
      title: 'Expression 01 M 25',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '150 x 120 cm',
      image: `${ARTWORKS_BASE}/expression_01m25.webp`,
      description: '',
      price: '6300€',
      available: true
    },
    {
      id: 'artwork-4',
      title: 'Expression 02 A 22',
      year: null,
      medium: 'Huile sur toile',
      dimensions: '80 x 80 cm',
      image: `${ARTWORKS_BASE}/expression_02a22.webp`,
      description: '',
      price: '2200€',
      available: true
    }
  ],

  specialties: [
    'Art Contemporain',
    'Expression Contemporaine'
  ],

  achievements: [],

  exhibitions: [],

  content: {
    heroBadge: 'Artiste',
    heroTitle: 'Artiste contemporain français',
    heroSubtitle: 'Dominique Fonteneau',

    eventInfo: {
      title: 'Art Capital 2026',
      quand: 'du 13 février au 15 février 2026',
      ou: 'Grand Palais - Paris, France'
    },

    aboutBirthInfo: '',
    aboutDescription: "L'artiste Dominique Fonteneau fait partie de la communauté InRealArt.",
    aboutQuestion: '',
    aboutQuote: '',
    aboutQuoteAuthor: '',
    aboutTags: ['Artiste', 'Art contemporain'],

    portraitTitle: 'Portrait de Dominique Fonteneau',
    portraitDescription: `A partir de l'âge de 10 ans, en 1966, j'ai reçu une initiation à différents modes d'expression comme les Beaux-Arts et l'art du Vitrail.

En 1973 je suis admis à l'école supérieure des Beaux-Arts d'Angers. En 1976 je rejoins l'atelier de vitraux d'art Barthe et Bordereau à Angers en qualité de maquettiste, peintre sur verre et me perfectionne aux différents postes de travail constituant la réalisation d'un vitrail. En 1989 je m'inscris au registre des professions libérales à la Maison des Artistes. En 1994 je quitte Angers et rentre à l'Atelier du Vitrail à Limoges en qualité de chef d'atelier. Je réalise toutes les maquettes et créations. Je travaille parallèlement sur des recherches d'expressions picturales, peinture à l'huile, acrylique, aquarelle, crayon, etc. En 2017 je quitte l'Atelier du Vitrail et je me consacre essentiellement à la peinture et à la sculpture.

Mon travail est une quête perpétuelle et addictive de l'inaccessible étoile : " Le sentiment originel ". A travers mes œuvres j'invite le spectateur à une exploration profonde et introspective de l'intersubjectivité. Mon processus créatif est une recherche incessante de quelque chose de fondamental et primordial, que j'appelle : Le sentiment originel. Ce concept mystérieux et énigmatique représente une étoile inatteignable, un objectif éternellement hors de portée mais toujours présent dans mes aspirations artistiques. Cette quête symbolise une poursuite de la pureté émotionnelle et de la vérité intérieure.

Le regard est un moment crucial où l'expérience de notre intersubjectivité devient tangible. Dans mes tableaux le regard n'est pas simplement un acte visuel mais une interaction profonde entre l'artiste et le spectateur. C'est à travers ce regard que nous percevons et partageons des émotions, des expériences et des réalités subjectives. Cette dimension intersubjective crée une connexion intime entre l'œuvre et l'observateur, rendant chaque interaction unique et personnelle.`,
    awards: [],
    soloExhibitions: [],
    publications: [],

    galleryMainTitle: 'Art Capital 2026',
    gallerySubtitle: '& Dominique Fonteneau',
    galleryDescription: 'Découvrez les œuvres exposées par Dominique au Art Capital 2026',

    catalogTitle: 'Catalogue Dominique Fonteneau & InRealArt',
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
      copyright: '© 2025 Dominique Fonteneau & InRealArt. Tous droits réservés.',
      legalLinks: {
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation'
      }
    }
  },

  seo: {
    title: 'Dominique Fonteneau - Artiste contemporain | Art Capital 2026',
    description: 'Découvrez les œuvres de Dominique Fonteneau, artiste contemporain français, exposé au Art Capital 2026',
    keywords: ['Dominique Fonteneau', 'artiste français', 'art contemporain', 'Art Capital 2026']
  }
}
