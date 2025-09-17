import { ArtistData } from '../artistData'

export const salontavernyNadineLeprinceData: ArtistData = {
    name: "Nadine",
    fullName: "Nadine Leprince",
    title: "Artiste contemporaine française",
    tagline: "Contemporary French Artist",
    bio: "Artiste passionnée par l'expression artistique contemporaine, Nadine Leprince explore les frontières entre tradition et modernité à travers ses créations uniques. Son travail reflète une sensibilité particulière pour les textures et les formes organiques.",
    location: "Salon de Taverny : 19 au 28 septembre",

    profileImage: "/images/salontaverny/nadine-leprince/artist.webp",
    aboutImage: "/images/salontaverny/nadine-leprince/artist-1.webp",
    backgroundImage: "/images/salontaverny/nadine-leprince/artist-background.webp",
    posterImage: "/images/salontaverny/nadine-leprince/affiche.webp",
    partnershipLabel: "",

    email: "teaminrealart@gmail.com",
    phone: "+33 6 12 34 56 78",
    website: "www.nadineleprince.com",
    brevoListId: 29, // ID de la liste Brevo #29
    socialMedia: {
        instagram: "@inrealartgallery/",
        linkedin: "company/inrealart/posts/?feedView=all",
        facebook: "InRealArt/",
        pinterest: "teaminrealart/",
    },

    artworks: [
        {
            id: "artwork-1",
            title: "Sur la rivière Nam (ou Laos)",
            year: 2024,
            medium: "Acrylique sur toile",
            dimensions: "65cm x 54cm",
            image: "/images/salontaverny/nadine-leprince/artwork-1.webp",
            description: "Cette peinture captivante s'inspire des premières explorations de l'artiste en Chine, un pays qui a profondément influencé son parcours créatif. La rivière Li, avec ses imposantes montagnes karstiques et sa végétation luxuriante qui borde ses rives, est au cœur de cette œuvre d'art. Les bateaux de pêche traditionnels, accompagnés de cormorans, et les vieux bateaux à moteur glissant sur les eaux calmes, créent une scène débordante de vitalité. Les teintes bleues des montagnes se fondent avec le vert luxuriant de la flore et les reflets argentés de l'eau, capturant une image qui reste indélébile. Cette œuvre transporte les spectateurs dans un lieu où la nature et l'humanité coexistent en harmonie, offrant un aperçu de la beauté tranquille et intemporelle de la rivière Li.",
            price: "€1,800",
            available: true,
        }
    ],

    featuredArtworks: ["artwork-1"],

    specialties: [
        "Art Abstrait",
        "Techniques Mixtes",
        "Composition Géométrique",
        "Expression Contemporaine",
        "Exploration des Textures"
    ],

    achievements: [
        "Exposée à la Galerie Contemporaine, Salon-de-Provence",
        "Lauréate du Prix d'Art Contemporain 2023",
        "Exposée dans plus de 10 galeries à travers la France",
        "Professeure d'art contemporain pendant 8 ans"
    ],

    exhibitions: [
        "Exposition Solo - Galerie Contemporaine, Salon-de-Provence (2024)",
        "Exposition Collective - Salon des Artistes, Aix-en-Provence (2023)",
        "Foire d'Art - Foire d'Art Contemporain, Marseille (2023)"
    ],

    content: {
        // Hero Section
        heroBadge: "Peintre",
        heroTitle: "Artiste contemporaine française",
        heroSubtitle: "Nadine Leprince",

        // Event Info Section
        eventInfo: {
            quand: "du 19 au 28 Septembre 2025",
            ou: "au Théâtre Madeleine-Renaud, à Taverny"
        },
        
        // About Section
        aboutBirthInfo: "Née en 1942 - France",
        aboutDescription: "L'artiste Nadine Leprince fait partie de la communauté InRealArt est une artiste côtée I-CAC",
        aboutQuestion: "",
        aboutQuote: "À travers InRealArt, j’ancre aujourd’hui mon art traditionnel du trompe-l’œil dans l’avenir.",
        aboutQuoteAuthor: "- Nadine Leprince",
        aboutTags: ["Artiste", "Peinture"],

        // Portrait Section
        portraitTitle: "Portrait de Nadine Leprince",
        portraitDescription: "Nadine, née à Paris, provient d'une illustre lignée d'artistes depuis le XVIe siècle, dont Jean-Baptiste Le Prince, ami de Diderot et peintre à la Cour de Russie au XVIIIe siècle. Présentant très jeune un talent remarquable pour le dessin, elle se passionne pour la peinture à l'huile, réalisant natures mortes, paysages, et portraits. Exposant dès 17 ans, elle intègre le groupe des Peintres de la Réalité. Inspirée par le XVIIe siècle, elle modernise cette influence par la composition et le choix des sujets, se divisant entre la France et l'Inde où elle explore le contraste des civilisations. Sa peinture, offrant une réalité en trois dimensions et une réflexion profonde, est un mélange d'émotions, de spiritualité, et de questionnements, servant à la fois de miroir et de fenêtre sur le monde.",
        awards: [
            "2020: Prix Rotary - Paris, France",
            "2016: Médaille d’Or de la Ville de Sainte-Maure-de-Touraine, France",
            "2015: Prix, Fondation Taylor (Madeleine Couderc) - Paris, France",
            "2008: Prix & Médaille de la Ville - Quincy sous Senart, France",
            "2006: Médaille de la Ville - Chantilly, France"
        ],
        soloExhibitions: [
    
        ],
        publications: [

        ],

        // Gallery Section
        galleryMainTitle: "Salon de Taverny 2024",
        gallerySubtitle: "& Nadine Leprince",
        galleryDescription: "Découvrez les œuvres exposées par Nadine au Salon de Taverny",

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
        catalogTitle: "Catalogue Salon de Taverny & Nadine Leprince",
        catalogDescription: "Explorez une collection unique d'œuvres exposées au Salon de Taverny du 19 au 28 septembre 2024.",
        catalogForm: {
            nameLabel: "Nom*",
            namePlaceholder: "Entrer votre nom",
            emailLabel: "Adresse mail*",
            emailPlaceholder: "Adresse@gmail.com",
            mobileLabel: "Mobile",
            mobilePlaceholder: "+33 6 12 34 56 78",
            privacyText: "Vous acceptez notre politique de confidentialité.",
            buttonText: "Recevoir le catalogue",
            successMessage: "Votre catalogue vous sera envoyé très prochainement ! Vérifiez votre boîte mail.",
            errorMessage: "Erreur lors de l'envoi. Veuillez réessayer."
        },

        // Footer
        footer: {
            artistDescription: "Artiste contemporaine française spécialisée dans l'art du trompe l'oeil.",
            inrealArtDescription: "Catalyseur d'art, de Culture & de Patrimoine",
            contactLabels: {
                email: "Email",
                phone: "Téléphone",
                location: "Localisation"
            },
            copyright: "© 2025 Nadine Leprince & InRealArt. Tous droits réservés.",
            legalLinks: {
                privacy: "Politique de confidentialité",
                terms: "Conditions d'utilisation"
            }
        }
    },

    seo: {
        title: "Nadine Leprince - Contemporary French Artist | Abstract Art",
        description: "Discover the contemporary abstract artworks of Nadine Leprince, a French artist specializing in mixed media and geometric compositions.",
        keywords: ["Nadine Leprince", "French artist", "abstract art", "contemporary art", "mixed media", "geometric composition", "Salon-de-Provence"]
    }
}
