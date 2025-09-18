/**
 * Fonction utilitaire pour ajouter du cache busting aux URLs d'images
 * Utilise un timestamp stable pour éviter les erreurs d'hydratation
 * @param imageUrl - L'URL de l'image
 * @returns L'URL avec un paramètre de timestamp stable
 */
export function addCacheBusting(imageUrl: string): string {
    if (!imageUrl) return imageUrl

    // Utiliser un timestamp stable basé sur la version du build ou un timestamp fixe
    // pour éviter les erreurs d'hydratation entre serveur et client
    const version = process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0'
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${version}`
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
    const version = process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0'
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${version}`
}

/**
 * Fonction pour forcer le rechargement d'une image spécifique
 * Utilise un timestamp dynamique pour forcer la mise à jour
 * @param imageUrl - L'URL de l'image
 * @returns L'URL avec un paramètre de timestamp dynamique
 */
export function forceImageUpdate(imageUrl: string): string {
    if (!imageUrl) return imageUrl

    // Utiliser un timestamp dynamique pour forcer le rechargement
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}force=${Date.now()}`
}

/**
 * Fonction pour ajouter un cache busting basé sur la date de modification du fichier
 * Plus stable que Date.now() mais se met à jour quand le fichier change
 * @param imageUrl - L'URL de l'image
 * @param fileModificationTime - Timestamp de modification du fichier (optionnel)
 * @returns L'URL avec un paramètre de cache busting
 */
export function addFileBasedCacheBusting(imageUrl: string, fileModificationTime?: number): string {
    if (!imageUrl) return imageUrl

    // Utiliser le timestamp de modification du fichier ou la version du build
    const version = fileModificationTime
        ? fileModificationTime.toString()
        : process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0'

    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${version}`
}

/**
 * Fonction pour ajouter un cache busting manuel avec une version personnalisée
 * Utile pour forcer la mise à jour d'une image spécifique
 * @param imageUrl - L'URL de l'image
 * @param customVersion - Version personnalisée (ex: "v2", "2024-01-15", etc.)
 * @returns L'URL avec un paramètre de version personnalisée
 */
export function addCustomCacheBusting(imageUrl: string, customVersion: string): string {
    if (!imageUrl) return imageUrl

    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}v=${customVersion}`
}

/**
 * Fonction pour ajouter un cache busting basé sur le hash du contenu
 * Idéal pour détecter automatiquement les changements de fichier
 * @param imageUrl - L'URL de l'image
 * @param fileHash - Hash du fichier (optionnel)
 * @returns L'URL avec un paramètre de hash
 */
export function addHashBasedCacheBusting(imageUrl: string, fileHash?: string): string {
    if (!imageUrl) return imageUrl

    // Utiliser le hash fourni ou générer un hash basé sur l'URL
    const hash = fileHash || btoa(imageUrl).slice(0, 8)
    const separator = imageUrl.includes('?') ? '&' : '?'
    return `${imageUrl}${separator}hash=${hash}`
}
