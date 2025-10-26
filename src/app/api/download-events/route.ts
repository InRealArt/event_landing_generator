import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { getAllArtists } from '@/lib/artistDataManager'
import type { ArtistConfig } from '@/lib/artistDataManager'

// Fonction pour catégoriser les événements
type CategorizedArtist = ArtistConfig & {
    category: 'Passé' | 'En cours' | 'À venir'
    startDate: Date | null
    endDate: Date | null
}

function categorizeEvents(artists: ArtistConfig[]): CategorizedArtist[] {
    const now = new Date()
    const past: CategorizedArtist[] = []
    const current: CategorizedArtist[] = []
    const upcoming: CategorizedArtist[] = []

    artists.forEach(artist => {
        if (!artist.data.content.eventInfo) return

        // Extraire les dates de quand (format: "du 19 au 21 Septembre 2025")
        const quand = artist.data.content.eventInfo.quand
        const dateMatch = quand.match(/du (\d+) au (\d+) (\w+) (\d+)/)

        let category: CategorizedArtist['category'] = 'À venir' // Par défaut
        let startDate: Date | null = null
        let endDate: Date | null = null

        if (dateMatch) {
            const [, startDay, endDay, monthName, year] = dateMatch
            const monthMap: { [key: string]: string } = {
                'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
                'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
                'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
            }
            const month = monthMap[monthName.toLowerCase()]
            startDate = new Date(`${year}-${month}-${startDay}`)
            endDate = new Date(`${year}-${month}-${endDay}`)

            if (endDate < now) {
                category = 'Passé'
                past.push({ ...artist, category, startDate, endDate })
            } else if (startDate <= now && endDate >= now) {
                category = 'En cours'
                current.push({ ...artist, category, startDate, endDate })
            } else {
                category = 'À venir'
                upcoming.push({ ...artist, category, startDate, endDate })
            }
        } else {
            // Si on ne peut pas parser, mettre dans "à venir" par défaut
            upcoming.push({ ...artist, category, startDate, endDate })
        }
    })

    return [...current, ...upcoming, ...past]
}

export async function GET() {
    try {
        // Récupérer tous les artistes avec leurs événements
        const artists = await getAllArtists()
        const events = categorizeEvents(artists)

        // Préparer les données pour Excel
        const excelData = events.map((artist) => {
            const eventInfo = artist.data.content.eventInfo
            if (!eventInfo) return null

            return {
                'Événement': eventInfo.title,
                'Artiste': artist.data.fullName,
                'Statut': artist.category,
                'Dates': eventInfo.quand,
                'Lieu': eventInfo.ou,
                'Nombre d\'œuvres': artist.data.artworks.length
            }
        }).filter(Boolean) // Retirer les entrées nulles

        // Créer le workbook Excel
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(excelData)

        // Ajuster la largeur des colonnes
        const colWidths = [
            { wch: 30 }, // Événement
            { wch: 20 }, // Artiste
            { wch: 12 }, // Statut
            { wch: 25 }, // Dates
            { wch: 40 }, // Lieu
            { wch: 18 }  // Nombre d'œuvres
        ]
        ws['!cols'] = colWidths

        // Ajouter la feuille au classeur
        XLSX.utils.book_append_sheet(wb, ws, 'Événements InRealArt')

        // Générer le fichier Excel en buffer
        const excelBuffer = XLSX.write(wb, {
            type: 'buffer',
            bookType: 'xlsx',
            compression: true
        })

        // Créer le nom du fichier avec la date
        const now = new Date()
        const dateStr = now.toISOString().split('T')[0] // Format YYYY-MM-DD
        const filename = `evenements-inrealart-${dateStr}.xlsx`

        // Retourner le fichier avec les bons headers
        return new NextResponse(excelBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': excelBuffer.length.toString()
            }
        })

    } catch (error) {
        console.error('Erreur lors de la génération du fichier Excel:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la génération du fichier Excel' },
            { status: 500 }
        )
    }
}
