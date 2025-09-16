import { ArtistData } from '../artistData'

export const art3fJeanDuboisData: ArtistData = {
    name: "Jean",
    fullName: "Jean Dubois",
    title: "Sculpteur contemporain",
    tagline: "Contemporary Sculptor",
    bio: "Jean Dubois explore les formes abstraites et les textures dans ses sculptures en bronze et en marbre. Son travail questionne la relation entre l'espace et la matière.",
    location: "Paris, France",

    profileImage: "/images/artists/jean-dubois/artist.webp",
    aboutImage: "/images/artists/jean-dubois/artist-1.webp",
    backgroundImage: "/images/artists/jean-dubois/artist-background.webp",
    posterImage: "/images/artists/jean-dubois/poster.webp",
    partnershipLabel: "En partenariat avec Biancoscuro",

    email: "jean.dubois@email.com",
    phone: "+33 6 98 76 54 32",
    website: "www.jeandubois-sculpteur.com",
    brevoListId: 28, // ID de la liste Brevo #28
    socialMedia: {
        instagram: "@jeandubois_sculpteur",
        facebook: "JeanDuboisSculpteur",
        linkedin: "in/jean-dubois-sculpteur",
    },

    artworks: [
        {
            id: "sculpture-1",
            title: "Formes Abstraites",
            year: 2024,
            medium: "Bronze",
            dimensions: "80cm x 60cm x 40cm",
            image: "/images/artists/jean-dubois/sculpture-1.webp",
            description: "Une sculpture en bronze explorant les formes géométriques et les jeux de lumière.",
            price: "€4,500",
            available: true,
        },
        {
            id: "sculpture-2",
            title: "Mouvement Éternel",
            year: 2024,
            medium: "Marbre blanc",
            dimensions: "120cm x 50cm x 30cm",
            image: "/images/artists/jean-dubois/sculpture-2.webp",
            description: "Une œuvre en marbre blanc capturant l'essence du mouvement dans la pierre.",
            price: "€6,200",
            available: true,
        },
    ],

    featuredArtworks: ["sculpture-1", "sculpture-2"],

    specialties: [
        "Sculpture Abstraite",
        "Bronze",
        "Marbre",
        "Formes Géométriques",
        "Installations"
    ],

    achievements: [
        "Prix de Sculpture Contemporaine 2023",
        "Exposition au Centre Pompidou, Paris",
        "Collection permanente du Musée d'Art Moderne",
        "Plus de 20 ans d'expérience"
    ],

    exhibitions: [
        "Exposition Solo - Galerie Modern Art, Paris (2024)",
        "Exposition Collective - Biennale de Sculpture, Lyon (2023)",
        "Foire d'Art - Art Paris, Grand Palais (2023)"
    ],

    content: {
        // Hero Section
        heroBadge: "Sculpteur",
        heroTitle: "Sculpteur contemporain",
        heroSubtitle: "Jean Dubois",

        // About Section
        aboutBirthInfo: "Né en 1970 - France",
        aboutDescription: "Jean Dubois est un sculpteur contemporain reconnu pour ses œuvres abstraites en bronze et marbre.",
        aboutQuestion: "Qu'est-ce qui inspire votre art ?",
        aboutQuote: "La matière me parle, je l'écoute et je la transforme. Chaque sculpture raconte une histoire unique.",
        aboutQuoteAuthor: "- Jean Dubois, Interview pour InRealArt 2024",
        aboutTags: ["Sculpteur", "Bronze", "Marbre"],

        // Portrait Section
        portraitTitle: "Portrait de Jean Dubois",
        portraitDescription: "Jean Dubois est un sculpteur français contemporain dont les œuvres explorent les relations entre forme, espace et matière. Ses sculptures en bronze et marbre sont exposées dans de nombreuses galeries et musées à travers l'Europe.",
        awards: [
            "2023: Prix de Sculpture Contemporaine - Paris, France",
            "2022: Biennale de Sculpture - Lauréat - Lyon, France",
            "2021: Art Paris - Mention Spéciale - Paris, France",
            "2020: Salon des Artistes - Premier Prix - Nice, France"
        ],
        soloExhibitions: [
            "2024: Galerie Modern Art - Paris, France",
            "2023: Centre Culturel - Lyon, France",
            "2022: Galerie d'Art Contemporain - Marseille, France",
            "2021: Espace Culturel - Toulouse, France"
        ],
        publications: [
            "2024: Art & Sculpture Magazine - Article",
            "2023: Contemporary Art Review - Interview",
            "2022: Sculpture Today - Portfolio",
            "2021: Art Press - Critique"
        ],

        // Gallery Section
        galleryMainTitle: "Catalogue InReal Art 2025",
        gallerySubtitle: "& Jean Dubois",
        galleryDescription: "Découvrez les sculptures exposées lors de art3f Monaco",

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
        catalogTitle: "Catalogue art3f BORDEAUX",
        catalogDescription: "Explorez une collection unique d'œuvres toutes plus originales les unes que les autres.",
        catalogForm: {
            nameLabel: "Nom*",
            namePlaceholder: "Entrer votre nom",
            emailLabel: "Adresse mail*",
            emailPlaceholder: "Adresse@gmail.com",
            mobileLabel: "Mobile",
            mobilePlaceholder: "+33 6 98 76 54 32",
            privacyText: "Vous acceptez notre politique de confidentialité.",
            buttonText: "Recevoir le catalogue",
            successMessage: "Votre catalogue vous sera envoyé très prochainement ! Vérifiez votre boîte mail.",
            errorMessage: "Erreur lors de l'envoi. Veuillez réessayer."
        },

        // Footer
        footer: {
            artistDescription: "Sculpteur contemporain spécialisé dans les œuvres abstraites en bronze et marbre.",
            inrealArtDescription: "Catalyseur d'art, de Culture & de Patrimoine",
            contactLabels: {
                email: "Email",
                phone: "Téléphone",
                location: "Localisation"
            },
            copyright: "© 2025 Jean Dubois & InRealArt. Tous droits réservés.",
            legalLinks: {
                privacy: "Politique de confidentialité",
                terms: "Conditions d'utilisation"
            }
        }
    },

    seo: {
        title: "Jean Dubois - Contemporary Sculptor | Abstract Bronze & Marble Art",
        description: "Discover the abstract sculptures of Jean Dubois, a contemporary French sculptor specializing in bronze and marble works that explore form and space.",
        keywords: ["Jean Dubois", "sculptor", "contemporary art", "bronze sculpture", "marble art", "abstract art", "French sculptor"]
    }
}
