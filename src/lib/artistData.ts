export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  image: string;
  description?: string;
  price?: string;
  available: boolean;
}

export interface ArtistData {
  // Basic Info
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  
  // Images
  profileImage: string;
  aboutImage: string;
  backgroundImage: string;
  
  // Contact
  email: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    linkedin?: string;
  };
  
  // Artworks
  artworks: Artwork[];
  featuredArtworks: string[]; // Array of artwork IDs
  
  // About section
  specialties: string[];
  achievements: string[];
  exhibitions?: string[];
  
  // Text Content
  content: {
    // Hero Section
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    
    // About Section
    aboutBirthInfo: string;
    aboutDescription: string;
    aboutQuestion: string;
    aboutQuote: string;
    aboutQuoteAuthor: string;
    aboutTags: string[];
    
    // Portrait Section
    portraitTitle: string;
    portraitDescription: string;
    awards: string[];
    soloExhibitions: string[];
    publications: string[];
    
    // Gallery Section
    galleryMainTitle: string;
    gallerySubtitle: string;
    galleryDescription: string;
    
    // Stats Section
    statsTitle: string;
    stats: {
      number: string;
      description: string;
    }[];
    
    // Catalog Section
    catalogTitle: string;
    catalogDescription: string;
    catalogForm: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      mobileLabel: string;
      mobilePlaceholder: string;
      privacyText: string;
      buttonText: string;
      successMessage: string;
      errorMessage: string;
    };
    
    // Footer
    footer: {
      artistDescription: string;
      inrealArtDescription: string;
      contactLabels: {
        email: string;
        phone: string;
        location: string;
      };
      copyright: string;
      legalLinks: {
        privacy: string;
        terms: string;
      };
    };
  };
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// Default artist data - this can be easily modified for different artists
export const defaultArtistData: ArtistData = {
  name: "Monique",
  fullName: "Monique Laville",
  title: "Artiste contemporaine française",
  tagline: "Contemporary French Artist",
  bio: "Passionate about capturing the beauty of nature through impressionistic landscapes, Monique Laville brings decades of artistic experience to every piece. Her work explores the relationship between light, color, and emotion in rural French landscapes.",
  location: "Provence, France",
  
  profileImage: "/images/art3f/laville/artist.webp",
  aboutImage: "/images/art3f/laville/artist-1.webp",
  backgroundImage: "/images/art3f/laville/artist-background.webp",
  
  email: "teaminrealart@gmail.com",
  phone: "+33 6 12 34 56 78",
  website: "www.moniquelaville.com",
  socialMedia: {
    instagram: "@inrealartgallery/",
    linkedin: "company/inrealart/posts/?feedView=all",
    facebook: "InRealArt/",
    pinterest: "teaminrealart/",
  },
  
  artworks: [
    {
      id: "artwork-1",
      title: "Champs de Lavande de Provence",
      year: 2024,
      medium: "Huile sur toile",
      dimensions: "60cm x 80cm",
      image: "/images/art3f/laville/artwork-1.webp",
      description: "Une peinture impressionniste vibrante capturant l'essence des célèbres champs de lavande de Provence pendant la saison de floraison.",
      price: "€2,500",
      available: true,
    },
    {
      id: "artwork-2",
      title: "Vallée des Tournesols",
      year: 2024,
      medium: "Huile sur toile",
      dimensions: "50cm x 70cm",
      image: "/images/art3f/laville/artwork-2.webp",
      description: "Une composition énergique mettant en scène des tournesols dorés se balançant dans la brise estivale, avec une ferme rustique au loin.",
      price: "€2,200",
      available: true,
    },
  ],
  
  featuredArtworks: ["artwork-1", "artwork-2"],
  
  specialties: [
    "Paysages Impressionnistes",
    "Études de Nature",
    "Scènes Rurales Françaises",
    "Peinture à l'Huile",
    "Théorie des Couleurs"
  ],
  
  achievements: [
    "Exposée à la Galerie des Beaux-Arts, Paris",
    "Lauréate du Festival d'Art de Provence 2023",
    "Exposée dans plus de 15 galeries à travers la France",
    "Professeure d'art pendant plus de 10 ans"
  ],
  
  exhibitions: [
    "Exposition Solo - Galerie Provence, Aix-en-Provence (2024)",
    "Exposition Collective - Salon des Artistes, Paris (2023)",
    "Foire d'Art - Foire d'Art Contemporain, Nice (2023)"
  ],
  
  content: {
    // Hero Section
    heroBadge: "Peintre",
    heroTitle: "Artiste contemporaine française",
    heroSubtitle: "Monique Laville",
    
    // About Section
    aboutBirthInfo: "Né en 1950 - France",
    aboutDescription: "L'artiste Monique Laville fait partie de la communauté InRealArt est une artiste côtée I-CAC & ARTPRICE",
    aboutQuestion: "Ton atelier : laboratoire, refuge, chaos ?",
    aboutQuote: "Mon atelier est le refuge où je peux m'exprimer librement sur ma peinture, mais pas uniquement. Je retrace \"en écriture\" ma vie depuis mon enfance d'aussi loin que remontent mes souvenirs.",
    aboutQuoteAuthor: "- Monique Laville , Interview pour InRealArt Juin 2025",
    aboutTags: ["Peintre", "Peinture au couteau"],
    
    // Portrait Section
    portraitTitle: "Portrait de Monique Laville",
    portraitDescription: "Monique Laville est une artiste française dont les œuvres ont été exposées nationalement et internationalement dans des pays tels que le Canada, la Chine, l'Italie, le Portugal, l'Autriche, Monaco, le Brésil, les États-Unis et le Royaume-Uni. Ses œuvres ont également été présentées dans des publications prestigieuses comme Nice Matin, Magazine Marianne Maison, et ART EN VOYAGE. Ses tableaux sont souvent impressionnistes, principalement à l'huile sur toile, créés au couteau pour leur donner une texture et une expressivité uniques.",
    awards: [
      "2022: BIENNALE INTERNAZIONALE - Nominé- Monte Carlo, Monaco",
      "2022: Award Palma d'Oro per l'Arte - Nominé- SAN REMO, Italie",
      "2022: Art Museum V° Biennale - Nominé- VENISE, Italie",
      "2019: ART SHOW PARIS II Art et Design - Nominé- PARIS, France",
      "2019: CULTURA IDENTIA- Plaquette 3ième Prix du Jury- LA SPEZIA, Italie",
      "2017: INTERNATIONAL CONTEMPORARY ART SALON - Nominé- VIENNE, Autriche",
      "2015: FEDERATION NATIONALE DE LA CULTURE FRANCAISE - Nominé- Lauréat- PARIS, France",
      "2014: ArtMajeur Awards - Nominé- CLAPIERS, France",
      "2014: Exposition d'Art Contemporain- Plaquette- FLORENCE, Italie",
      "2014: LA PALME D'OR POUR L'ART - Nominé- MONTE CARLO, Monaco"
    ],
    soloExhibitions: [
      "2017: TABLINUM / VILLA CARLOTTA - LAC DE COME, Italie",
      "2016: Galleria La Pigna / GALERIE DU VATICAN - ROME, Italie",
      "2015: Mostra personale / CAFFE IL GIUBBE ROSSO - FLORENCE, Italie",
      "2011: ATELIER DU 2 / GALERIE - ESSOYES, France",
      "2010: EXCEPTIONNAL EUROPEAN ART EXHIBITION / WALDORF PALACE - LONDRES, Royaume-Uni",
      "2009: ART EN VOYAGE / Museum de TIANJIN - TIANJIN, Chine",
      "2009: CONTEMPORY INTERNATIONAL ART II / Museum de MIAMI FLORIDE - MIAMI, États-Unis",
      "2008: GALERIE STYL'ART / GALERIE - GAILLON HAUTE NORMANDIE, France",
      "2006: Galerie Camila Klein / Galerie - CURITIBA, Brésil"
    ],
    publications: [
      "2019: ASSOCIATION LORD THOMAS- Article",
      "2019: ART SHOW PARIS- Article",
      "2018: Editions R.E.G.A.R.D.S. Encyclopédie- Article",
      "2017: WINTER SALON- Article",
      "2017: Salon Artistique Le Puy-En-Velay- Article",
      "2015: LES SALONS D'OPEL- Article",
      "2015: Nice Matin- Article",
      "2015: RAI 3 ROME- Interview"
    ],
    
    // Gallery Section
    galleryMainTitle: "Catalogue InReal Art 2025",
    gallerySubtitle: "& Monique Laville",
    galleryDescription: "Découvrez les œuvres exposées lors de art3f Monaco",
    
    // Stats Section
    statsTitle: "Le catalogue InRealArt c'est",
    stats: [
      {
        number: "15 +",
        description: "Artistes sélectionnés dans notre catalogue global"
      },
      {
        number: "200+",
        description: "Œuvres soigneusement choisies pour embellir votre collection."
      },
      {
        number: "100%",
        description: "De nos artistes satisfaits de leurs accompagnements"
      }
    ],
    
    // Catalog Section
    catalogTitle: "Catalogue art3f MONACO",
    catalogDescription: "Explorez une collection unique d'œuvres toutes plus originales les unes que les autres.",
    catalogForm: {
      nameLabel: "Nom*",
      namePlaceholder: "Entrer votre nom",
      emailLabel: "Adresse mail*",
      emailPlaceholder: "Adresse@gmail.com",
      mobileLabel: "Mobile",
      mobilePlaceholder: "+33 6 12 34 56 78",
      privacyText: "Vous acceptez notre politique de confidentialité.",
      buttonText: "Recevoir le catalogue",
      successMessage: "Catalogue envoyé avec succès ! Vérifiez votre boîte mail.",
      errorMessage: "Erreur lors de l'envoi. Veuillez réessayer."
    },
    
    // Footer
    footer: {
      artistDescription: "Artiste contemporaine française spécialisée dans les paysages impressionnistes de Provence.",
      inrealArtDescription: "Catalyseur d'art, de Culture & de Patrimoine",
      contactLabels: {
        email: "Email",
        phone: "Téléphone",
        location: "Localisation"
      },
      copyright: "© 2025 Monique Laville & InRealArt. Tous droits réservés.",
      legalLinks: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation"
      }
    }
  },
  
  seo: {
    title: "Monique Laville - Contemporary French Artist | Impressionistic Landscapes",
    description: "Discover the beautiful impressionistic landscapes of Monique Laville, a contemporary French artist specializing in oil paintings of Provence's natural beauty.",
    keywords: ["Monique Laville", "French artist", "impressionistic paintings", "Provence landscapes", "contemporary art", "oil paintings", "French countryside"]
  }
};
