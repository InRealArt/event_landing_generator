/**
 * Fonction utilitaire pour ajouter du cache busting aux URLs d'images
 * @param imageUrl - L'URL de l'image
 * @returns L'URL avec un paramètre de timestamp pour forcer le rechargement
 */
export function addCacheBusting(imageUrl: string): string {
    if (!imageUrl) return imageUrl

    // Ajouter un paramètre de timestamp pour forcer le rechargement
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${Date.now()}`
}

/**
 * Fonction pour ajouter du cache busting basé sur la version du build
 * Plus stable que Date.now() pour la production
 * @param imageUrl - L'URL de l'image
 * @returns L'URL avec un paramètre de version
 */
export function addVersionCacheBusting(imageUrl: string): string {
    if (!imageUrl) return imageUrl

    // Utiliser la version du package.json ou un timestamp de build
    const version = process.env.NEXT_PUBLIC_BUILD_VERSION || Date.now().toString()
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${version}`
}
