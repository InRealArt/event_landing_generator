import { ArtistData } from './artistData'
import { defaultArtistData } from './artistData'
import { loadArtistData, loadAllArtists, discoverAllArtists, ArtistConfig } from './artists'

// Réexporter ArtistConfig pour les composants
export type { ArtistConfig }

// Cache pour les données des artistes
const artistCache = new Map<string, ArtistData>()

/**
 * Récupère les données d'un artiste par son slug
 * @param slug - Le slug de l'artiste
 * @returns Les données de l'artiste ou null si non trouvé
 */
export async function getArtistData(slug: string): Promise<ArtistData | null> {
    // Vérifier le cache d'abord
    if (artistCache.has(slug)) {
        return artistCache.get(slug)!
    }

    // Charger les données dynamiquement
    const artistData = await loadArtistData(slug)

    if (!artistData) {
        return null
    }

    // Mettre en cache et retourner
    artistCache.set(slug, artistData)
    return artistData
}

/**
 * Récupère tous les slugs d'artistes disponibles
 * @returns Array des slugs d'artistes
 */
export async function getAllArtistSlugs(): Promise<string[]> {
    return await discoverAllArtists()
}

/**
 * Récupère tous les artistes avec leurs données
 * @returns Array des configurations d'artistes
 */
export async function getAllArtists(): Promise<ArtistConfig[]> {
    return await loadAllArtists()
}

/**
 * Vérifie si un slug d'artiste existe
 * @param slug - Le slug à vérifier
 * @returns true si l'artiste existe, false sinon
 */
export async function artistExists(slug: string): Promise<boolean> {
    const data = await getArtistData(slug)
    return data !== null
}

/**
 * Génère un slug à partir d'un nom d'artiste
 * @param name - Le nom de l'artiste
 * @returns Le slug généré
 */
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
        .replace(/[^a-z0-9\s-]/g, '') // Garder seulement lettres, chiffres, espaces et tirets
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .replace(/-+/g, '-') // Remplacer les tirets multiples par un seul
        .trim()
}

/**
 * Valide un slug d'artiste
 * @param slug - Le slug à valider
 * @returns true si le slug est valide, false sinon
 */
export function isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9-]+$/
    return slugRegex.test(slug) && slug.length > 0 && !slug.startsWith('-') && !slug.endsWith('-')
}
