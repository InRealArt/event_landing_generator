import { ArtistData } from '../artistData'

// Interface pour la configuration d'un artiste
export interface ArtistConfig {
    slug: string
    data: ArtistData
}

// Fonction pour charger dynamiquement les données d'un artiste
export async function loadArtistData(slug: string): Promise<ArtistData | null> {
    try {
        // Import dynamique basé sur le slug
        const artistModule = await import(`./${slug}`)

        // Chercher l'export qui correspond au pattern {slug}Data
        // Convertir le slug en camelCase pour correspondre aux exports
        const dataKey = slug
            .split('-')
            .map((word, index) =>
                index === 0
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('') + 'Data'
        const artistData = artistModule[dataKey]

        if (!artistData) {
            console.error(`Aucune donnée trouvée pour l'artiste ${slug}. Export attendu: ${dataKey}`)
            return null
        }

        return artistData
    } catch (error) {
        console.error(`Erreur lors du chargement des données pour ${slug}:`, error)
        return null
    }
}

// Fonction pour découvrir tous les artistes disponibles
export async function discoverAllArtists(): Promise<string[]> {
    try {
        // En production, vous pourriez utiliser fs pour lire le dossier
        // Pour l'instant, on retourne une liste statique des artistes connus
        const knownArtists = [
            'vernissage-bercy-2026-catherine-senechal',
            'art3f-monique-laville',
            'salon-rambouillet-2025-nadine-leprince',
            'salon-taverny-2025-nadine-leprince',
            'exposition-trompe-oeil-viroflay-2025-nadine-leprince',
            'salon-automne-2025-nadine-leprince',
            'salon-automne-2025-catherine-senechal',
            'businessArtFair-2025-monique-laville',
            'salon-luneville-2025-nadine-leprince',
        ]

        // Vérifier que chaque artiste peut être chargé
        const validArtists: string[] = []

        for (const slug of knownArtists) {
            try {
                const data = await loadArtistData(slug)
                if (data) {
                    validArtists.push(slug)
                }
            } catch (error) {
                console.warn(`Artiste ${slug} non disponible:`, error)
            }
        }

        return validArtists
    } catch (error) {
        console.error('Erreur lors de la découverte des artistes:', error)
        return []
    }
}

// Fonction pour charger tous les artistes avec leurs données
export async function loadAllArtists(): Promise<ArtistConfig[]> {
    const slugs = await discoverAllArtists()
    const artists: ArtistConfig[] = []

    for (const slug of slugs) {
        const data = await loadArtistData(slug)
        if (data) {
            artists.push({ slug, data })
        }
    }

    return artists
}

// Fonction utilitaire pour valider un slug d'artiste
export function isValidArtistSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9-]+$/
    return slugRegex.test(slug) && slug.length > 0 && !slug.startsWith('-') && !slug.endsWith('-')
}

// Fonction pour générer un slug à partir d'un nom
export function generateArtistSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
        .replace(/[^a-z0-9\s-]/g, '') // Garder seulement lettres, chiffres, espaces et tirets
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .replace(/-+/g, '-') // Remplacer les tirets multiples par un seul
        .trim()
}
