# Sitemap et Google Search Console

## Ce qui a été mis en place

- **Fichier** : `src/app/sitemap.ts`
- Next.js sert automatiquement un **sitemap XML** à l’URL : **`/sitemap.xml`**

Le sitemap inclut :

- La page d’accueil `/`
- `/artistes`
- `/catalogue-inrealart-artcapital2026` et `/inrealart-artcapital2026`
- Toutes les pages artistes `/[slug]` (générées à partir des données du projet)

## Configuration

### 1. URL du site (obligatoire en production)

Dans ton `.env` (ou variables d’environnement du déploiement), définis l’URL publique du sous-domaine :

```bash
NEXT_PUBLIC_SITE_URL=https://events.inrealart.com
```

(Remplace par l’URL réelle du sous-domaine.)

- Si **non défini** : en local Next.js utilisera `https://localhost:3000` ; sur Vercel, l’URL du déploiement sera utilisée via `VERCEL_URL`.
- Pour que Google indexe les bonnes URLs, **il faut définir `NEXT_PUBLIC_SITE_URL` en production**.

### 2. Vérifier que le sitemap répond

Après déploiement :

- Ouvre : `https://ton-sous-domaine.com/sitemap.xml`
- Tu dois voir un XML avec la liste des `<url>` / `<loc>`.

## Soumettre le sitemap dans Google Search Console

1. Va sur [Google Search Console](https://search.google.com/search-console).
2. Sélectionne la **propriété** qui correspond au sous-domaine (ex. `https://events.inrealart.com`). Si elle n’existe pas, ajoute-la (par préfixe d’URL ou domaine).
3. Dans le menu : **Sitemaps**.
4. Dans « Ajouter un sitemap », saisis : **`sitemap.xml`** (ou l’URL complète `https://ton-sous-domaine.com/sitemap.xml`).
5. Clique sur **Envoyer**.

Google va crawler le sitemap et mettre à jour l’index. L’indexation peut prendre quelques jours.

## Référence Next.js

- [Metadata Files - Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) (documentation officielle).
