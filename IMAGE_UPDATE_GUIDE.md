# Guide de Mise à Jour des Images avec Cache Busting

Ce guide explique comment mettre à jour une image avec le même nom en utilisant différentes stratégies de cache busting.

## 🎯 Problème

Quand vous remplacez une image par une nouvelle avec le même nom, les navigateurs et CDN peuvent continuer à servir l'ancienne version à cause du cache. Il faut forcer le rechargement.

## 🛠️ Solutions Disponibles

### 1. Cache Busting Stable (Recommandé pour la production)

```typescript
import { addCacheBusting } from "@/lib/cacheBusting";

// Utilise la version du build ou '1.0.0' par défaut
const imageUrl = addCacheBusting("/images/artist.webp");
// Résultat: /images/artist.webp?v=1.0.0
```

### 2. Cache Busting avec Version Personnalisée

```typescript
import { addCustomCacheBusting } from "@/lib/cacheBusting";

// Pour forcer une mise à jour spécifique
const imageUrl = addCustomCacheBusting("/images/artist.webp", "v2");
// Résultat: /images/artist.webp?v=v2

// Ou avec une date
const imageUrl = addCustomCacheBusting("/images/artist.webp", "2024-01-15");
// Résultat: /images/artist.webp?v=2024-01-15
```

### 3. Cache Busting avec Hash de Fichier

```typescript
import { addHashBasedCacheBusting } from "@/lib/cacheBusting";

// Utilise le hash du fichier pour détecter les changements
const imageUrl = addHashBasedCacheBusting("/images/artist.webp", "a1b2c3d4");
// Résultat: /images/artist.webp?hash=a1b2c3d4
```

### 4. Force Update (Attention: peut causer des erreurs d'hydratation)

```typescript
import { forceImageUpdate } from "@/lib/cacheBusting";

// Force le rechargement immédiat (à éviter en production)
const imageUrl = forceImageUpdate("/images/artist.webp");
// Résultat: /images/artist.webp?force=1704067200000
```

## 📝 Exemples d'Utilisation

### Dans un Composant React

```typescript
import Image from "next/image";
import { addCustomCacheBusting } from "@/lib/cacheBusting";

export default function ArtistImage({ imagePath, version = "v1" }) {
  return (
    <Image
      src={addCustomCacheBusting(imagePath, version)}
      alt="Artiste"
      width={400}
      height={300}
    />
  );
}
```

### Avec le Hook Personnalisé

```typescript
import { useImageUpdate } from "@/components/ImageUpdateExample";

export default function MyComponent() {
  const { updateImageVersion } = useImageUpdate();

  const handleImageUpdate = () => {
    const newImageUrl = updateImageVersion("/images/artist.webp", "v2");
    // Utiliser la nouvelle URL
  };

  return <button onClick={handleImageUpdate}>Mettre à jour l'image</button>;
}
```

## 🚀 Workflow Recommandé

### 1. Mise à Jour Manuelle

1. Remplacez l'image dans le dossier `public/images/`
2. Mettez à jour la version dans votre code :

   ```typescript
   // Avant
   src={addCustomCacheBusting('/images/artist.webp', 'v1')}

   // Après
   src={addCustomCacheBusting('/images/artist.webp', 'v2')}
   ```

### 2. Mise à Jour Automatique avec Build

1. Définissez `NEXT_PUBLIC_BUILD_VERSION` dans votre `.env.local` :
   ```bash
   NEXT_PUBLIC_BUILD_VERSION=1.2.3
   ```
2. Utilisez `addCacheBusting()` qui utilisera automatiquement cette version

### 3. Mise à Jour avec Hash de Fichier

1. Calculez le hash de votre fichier (MD5, SHA1, etc.)
2. Utilisez `addHashBasedCacheBusting()` avec ce hash

## ⚠️ Bonnes Pratiques

### ✅ À Faire

- Utilisez `addCustomCacheBusting()` pour les mises à jour manuelles
- Utilisez `addCacheBusting()` pour la production (stable)
- Testez toujours après une mise à jour d'image
- Documentez les versions d'images importantes

### ❌ À Éviter

- N'utilisez pas `forceImageUpdate()` en production (erreurs d'hydratation)
- Ne changez pas la version à chaque rechargement de page
- N'oubliez pas de mettre à jour la version après avoir changé l'image

## 🔧 Configuration Avancée

### Variable d'Environnement

```bash
# .env.local
NEXT_PUBLIC_BUILD_VERSION=1.2.3
```

### Script de Build Personnalisé

```json
{
  "scripts": {
    "build": "NEXT_PUBLIC_BUILD_VERSION=$(date +%s) next build"
  }
}
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    minimumCacheTTL: 60, // 1 minute
    formats: ["image/webp"],
  },
};
```

## 🐛 Dépannage

### Erreur d'Hydratation

Si vous voyez une erreur d'hydratation, utilisez `addCacheBusting()` au lieu de `forceImageUpdate()`.

### Image Ne Se Met Pas À Jour

1. Vérifiez que la version a bien changé
2. Videz le cache du navigateur (Ctrl+F5)
3. Vérifiez les en-têtes de cache du serveur

### Performance

- Utilisez des versions stables en production
- Évitez les changements de version trop fréquents
- Configurez `minimumCacheTTL` dans Next.js
