import { ArtistData } from '../artistData'

// Template pour créer un nouvel artiste
// Copiez ce fichier et renommez-le avec le slug de l'artiste (ex: art3f-monique-laville.ts)
// Remplacez toutes les valeurs par celles de l'artiste

export const art3fNouvelartisteData: ArtistData = {
    name: "Prénom",
    fullName: "Prénom Nom Complet",
    title: "Titre de l'artiste",
    tagline: "Tagline en anglais",
    bio: "Biographie de l'artiste...",
    location: "Ville, Pays",

    profileImage: "/images/artistes/nouvel-artiste/artist.webp",
    aboutImage: "/images/artistes/nouvel-artiste/artist-1.webp",
    backgroundImage: "/images/artistes/nouvel-artiste/artist-background.webp",
    posterImage: "/images/artistes/nouvel-artiste/affiche.webp",
    partnershipLabel: "Biancoscuro partenaire de Art3f",

    email: "email@example.com",
    phone: "+33 6 12 34 56 78",
    website: "www.site-artiste.com",
    socialMedia: {
        instagram: "@handle_instagram",
        facebook: "PageFacebook",
        linkedin: "in/nom-artiste",
        pinterest: "pinterest_handle",
    },

    artworks: [
        {
            id: "artwork-1",
            title: "Titre de l'œuvre",
            year: 2024,
            medium: "Médium utilisé",
            dimensions: "Largeur x Hauteur",
            image: "/images/artistes/nouvel-artiste/artwork-1.webp",
            description: "Description de l'œuvre...",
            price: "€2,500",
            available: true,
        },
        // Ajoutez d'autres œuvres...
    ],

    featuredArtworks: ["artwork-1", "artwork-2"],

    specialties: [
        "Spécialité 1",
        "Spécialité 2",
        "Spécialité 3",
    ],

    achievements: [
        "Récompense 1",
        "Récompense 2",
        "Récompense 3",
    ],

    exhibitions: [
        "Exposition 1 - Lieu, Ville (Année)",
        "Exposition 2 - Lieu, Ville (Année)",
    ],

    content: {
        // Hero Section
        heroBadge: "Type d'artiste",
        heroTitle: "Titre principal",
        heroSubtitle: "Nom de l'artiste",

        // About Section
        aboutBirthInfo: "Né en 19XX - Pays",
        aboutDescription: "Description de l'artiste...",
        aboutQuestion: "Question pour l'artiste ?",
        aboutQuote: "Citation de l'artiste...",
        aboutQuoteAuthor: "- Nom Artiste, Source",
        aboutTags: ["Tag1", "Tag2"],

        // Portrait Section
        portraitTitle: "Portrait de Nom Artiste",
        portraitDescription: "Description détaillée de l'artiste...",
        awards: [
            "Année: Prix - Lieu, Pays",
            // Ajoutez d'autres récompenses...
        ],
        soloExhibitions: [
            "Année: Titre - Lieu, Ville",
            // Ajoutez d'autres expositions...
        ],
        publications: [
            "Année: Publication - Source",
            // Ajoutez d'autres publications...
        ],

        // Gallery Section
        galleryMainTitle: "Catalogue InReal Art 2025",
        gallerySubtitle: "& Nom Artiste",
        galleryDescription: "Description de la galerie...",

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
        catalogDescription: "Description du catalogue...",
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
            artistDescription: "Description courte de l'artiste pour le footer.",
            inrealArtDescription: "Catalyseur d'art, de Culture & de Patrimoine",
            contactLabels: {
                email: "Email",
                phone: "Téléphone",
                location: "Localisation"
            },
            copyright: "© 2025 Nom Artiste & InRealArt. Tous droits réservés.",
            legalLinks: {
                privacy: "Politique de confidentialité",
                terms: "Conditions d'utilisation"
            }
        }
    },

    seo: {
        title: "Nom Artiste - Titre | Description",
        description: "Description pour les moteurs de recherche...",
        keywords: ["mot-clé1", "mot-clé2", "mot-clé3", "art", "contemporain"]
    }
}
