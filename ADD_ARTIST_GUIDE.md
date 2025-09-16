# Guide : Comment ajouter un nouvel artiste

Ce guide vous explique comment ajouter facilement un nouvel artiste à votre site avec des pages dynamiques par slug.

## 🎯 Vue d'ensemble

Le système utilise des routes dynamiques Next.js avec le pattern `[slug]` pour créer des pages uniques pour chaque artiste. Chaque artiste a son propre slug suivant la convention "event-nom-artiste" (ex: `/art3f-monique-laville`, `/art3f-jean-dubois`).

## 📁 Structure des fichiers

```
src/
├── app/
│   ├── [slug]/
│   │   └── page.tsx          # Page dynamique pour chaque artiste
│   ├── artistes/
│   │   └── page.tsx          # Liste de tous les artistes
│   └── page.tsx              # Redirige vers l'artiste par défaut
├── lib/
│   ├── artistData.ts         # Interface et données par défaut
│   ├── artistDataManager.ts  # Gestionnaire des données d'artistes
│   └── artists/
│       ├── index.ts              # Système de découverte des artistes
│       ├── _template.ts          # Template pour nouveaux artistes
│       ├── art3f-monique-laville.ts # Données de Monique Laville
│       ├── art3f-jean-dubois.ts  # Données de Jean Dubois
│       └── ...                   # Un fichier par artiste
└── components/
    └── ArtistNavigation.tsx  # Navigation entre artistes
```

## 🚀 Étapes pour ajouter un nouvel artiste

### 1. Créer les données de l'artiste

Créez un nouveau fichier dans `/src/lib/artists/` avec le nom du slug de l'artiste :

**Fichier :** `/src/lib/artists/art3f-nouvel-artiste.ts`

```typescript
import { ArtistData } from "../artistData";

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

  specialties: ["Spécialité 1", "Spécialité 2", "Spécialité 3"],

  achievements: ["Récompense 1", "Récompense 2", "Récompense 3"],

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
        description: "Artistes sélectionnés dans notre catalogue global",
      },
      {
        number: "200+",
        description:
          "Œuvres soigneusement choisies pour embellir votre collection.",
      },
      {
        number: "100%",
        description: "De nos artistes satisfaits de leurs accompagnements",
      },
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
      successMessage:
        "Votre catalogue vous sera envoyé très prochainement ! Vérifiez votre boîte mail.",
      errorMessage: "Erreur lors de l'envoi. Veuillez réessayer.",
    },

    // Footer
    footer: {
      artistDescription: "Description courte de l'artiste pour le footer.",
      inrealArtDescription: "Catalyseur d'art, de Culture & de Patrimoine",
      contactLabels: {
        email: "Email",
        phone: "Téléphone",
        location: "Localisation",
      },
      copyright: "© 2025 Nom Artiste & InRealArt. Tous droits réservés.",
      legalLinks: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
      },
    },
  },

  seo: {
    title: "Nom Artiste - Titre | Description",
    description: "Description pour les moteurs de recherche...",
    keywords: ["mot-clé1", "mot-clé2", "mot-clé3", "art", "contemporain"],
  },
};
```

### 2. Ajouter l'artiste à la liste des artistes connus

Dans `/src/lib/artists/index.ts`, ajoutez le slug de l'artiste à la liste `knownArtists` :

```typescript
const knownArtists = [
  "art3f-monique-laville",
  "art3f-jean-dubois",
  "art3f-nouvel-artiste", // Ajoutez le slug ici
];
```

**C'est tout !** Le système découvrira automatiquement l'artiste et chargera ses données.

### 3. Ajouter les images

Placez les images de l'artiste dans le dossier `/public/images/artistes/art3f-nouvel-artiste/` :

- `artist.webp` - Photo de profil de l'artiste
- `artist-1.webp` - Photo alternative de l'artiste
- `artist-background.webp` - Image de fond pour la section hero
- `artwork-1.webp`, `artwork-2.webp`, etc. - Images des œuvres

### 4. Générer le slug

Le slug doit être :

- En minuscules
- Sans accents
- Avec des tirets à la place des espaces
- Unique

Exemple : "Marie-Claire Dubois" → "art3f-marie-claire-dubois"

Vous pouvez utiliser la fonction `generateSlug()` du gestionnaire :

```typescript
import { generateSlug } from "@/lib/artistDataManager";

const slug = "art3f-" + generateSlug("Marie-Claire Dubois");
// Résultat : "art3f-marie-claire-dubois"
```

### 5. Utiliser le template

Pour faciliter la création, copiez le fichier `/src/lib/artists/_template.ts` et renommez-le avec le slug de l'artiste. Puis remplacez toutes les valeurs par celles de l'artiste.

## 🔧 Fonctionnalités disponibles

### Navigation automatique

- Le composant `ArtistNavigation` permet de naviguer entre les artistes
- Il s'affiche automatiquement dans le header
- Il liste tous les artistes disponibles

### Pages dynamiques

- Chaque artiste a sa propre URL : `/art3f-monique-laville`, `/art3f-jean-dubois`, etc.
- Les métadonnées SEO sont générées automatiquement
- Le contenu est entièrement personnalisable

### Liste des artistes

- Page `/artistes` qui liste tous les artistes
- Cartes avec photos, descriptions et liens

## 📝 Bonnes pratiques

### Images

- Utilisez le format WebP pour de meilleures performances
- Optimisez les images avant de les ajouter
- Respectez les dimensions recommandées :
  - Photo de profil : 400x400px minimum
  - Image de fond : 1920x1080px minimum
  - Œuvres : 800x600px minimum

### Contenu

- Rédigez des descriptions engageantes
- Utilisez des mots-clés pertinents pour le SEO
- Vérifiez l'orthographe et la grammaire
- Adaptez le contenu à l'artiste

### SEO

- Choisissez un titre unique et descriptif
- Rédigez une meta description attractive
- Utilisez des mots-clés pertinents
- Vérifiez que le slug est SEO-friendly

## 🚀 Déploiement

Après avoir ajouté un nouvel artiste :

1. Testez la page : `http://localhost:3000/nouvel-artiste`
2. Vérifiez que la navigation fonctionne
3. Testez la page de liste : `http://localhost:3000/artistes`
4. Déployez sur votre plateforme

## 🔍 Dépannage

### L'artiste n'apparaît pas

- Vérifiez que l'artiste est bien ajouté dans `artistDataManager.ts`
- Vérifiez que le slug est correct
- Redémarrez le serveur de développement

### Images ne s'affichent pas

- Vérifiez les chemins des images
- Vérifiez que les fichiers existent dans `/public/images/`
- Vérifiez les permissions des fichiers

### Erreurs de compilation

- Vérifiez la syntaxe TypeScript
- Vérifiez que tous les champs requis sont remplis
- Vérifiez les imports

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :

1. La console du navigateur pour les erreurs
2. Les logs du serveur de développement
3. La documentation Next.js pour les routes dynamiques

Le système est conçu pour être simple et extensible. N'hésitez pas à personnaliser selon vos besoins !
