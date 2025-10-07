'use client'

import Image from 'next/image'
import { 
  addCacheBusting, 
  addVersionCacheBusting, 
  forceImageUpdate, 
  addCustomCacheBusting,
  addHashBasedCacheBusting 
} from '@/lib/cacheBusting'

interface ImageUpdateExampleProps {
  imageUrl: string
  alt: string
  updateType?: 'stable' | 'force' | 'custom' | 'hash' | 'version'
  customVersion?: string
  fileHash?: string
}

/**
 * Composant d'exemple montrant différentes méthodes de cache busting
 * pour mettre à jour une image avec le même nom
 */
export default function ImageUpdateExample({ 
  imageUrl, 
  alt, 
  updateType = 'stable',
  customVersion,
  fileHash 
}: ImageUpdateExampleProps) {
  
  // Fonction pour obtenir l'URL avec le bon type de cache busting
  const getImageUrl = () => {
    switch (updateType) {
      case 'force':
        // Force le rechargement immédiat (attention: peut causer des erreurs d'hydratation)
        return forceImageUpdate(imageUrl)
      
      case 'custom':
        // Utilise une version personnalisée (recommandé pour les mises à jour manuelles)
        return addCustomCacheBusting(imageUrl, customVersion || 'v2')
      
      case 'hash':
        // Utilise un hash basé sur le contenu du fichier
        return addHashBasedCacheBusting(imageUrl, fileHash)
      
      case 'version':
        // Utilise la version du build (stable)
        return addVersionCacheBusting(imageUrl)
      
      case 'stable':
      default:
        // Utilise la version stable par défaut (recommandé pour la production)
        return addCacheBusting(imageUrl)
    }
  }

  return (
    <div className="relative w-full h-64">
      <Image
        src={getImageUrl()}
        alt={alt}
        fill
        className="object-cover rounded-lg shadow-lg"
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  )
}

/**
 * Hook personnalisé pour gérer les mises à jour d'images
 */
export function useImageUpdate() {
  const updateImageVersion = (imageUrl: string, newVersion: string) => {
    return addCustomCacheBusting(imageUrl, newVersion)
  }

  const forceImageRefresh = (imageUrl: string) => {
    return forceImageUpdate(imageUrl)
  }

  const updateImageWithHash = (imageUrl: string, fileHash: string) => {
    return addHashBasedCacheBusting(imageUrl, fileHash)
  }

  return {
    updateImageVersion,
    forceImageRefresh,
    updateImageWithHash
  }
}
