'use client';

import Image from 'next/image';
import { ArtistData } from '@/lib/artistData';
import { addCacheBusting } from '@/lib/cacheBusting';
import ExpandableSection from './ExpandableSection';

interface PortraitSectionProps {
  artistData: ArtistData;
}

export default function PortraitSection({ artistData }: PortraitSectionProps) {
  // Récupérer la première œuvre d'art mise en avant
  const featuredArtworks = artistData.artworks.filter(artwork =>
    artistData.featuredArtworks.includes(artwork.id)
  );
  const firstFeaturedArtwork = featuredArtworks[0];

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-[80%] md:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Featured Artwork Image */}
          <div className="flex justify-center h-full">
            <div className="relative w-full max-w-md h-full">
              <Image
                src={firstFeaturedArtwork?.image || addCacheBusting(artistData.aboutImage)}
                alt={firstFeaturedArtwork?.title || `Portrait de ${artistData.fullName}`}
                fill
                className="object-cover rounded-lg shadow-lg"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>

          {/* Right Section - Artist Information */}
          <div className="space-y-8">
            {/* Portrait */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-bricolage mb-4">
                {artistData.content.portraitTitle}
              </h2>
              <p className="text-gray-700 font-montserrat leading-relaxed">
                {artistData.content.portraitDescription}
              </p>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              {/* Prix - Afficher seulement si le tableau awards n'est pas vide */}
              {artistData.content.awards && artistData.content.awards.length > 0 && (
                <ExpandableSection title="Prix">
                  <div className="space-y-2">
                    {artistData.content.awards.map((award, index) => (
                      <p key={index} className="text-gray-700 font-montserrat text-sm">{award}</p>
                    ))}
                  </div>
                </ExpandableSection>
              )}

              {/* Exposition solo - Afficher seulement si le tableau soloExhibitions n'est pas vide */}
              {artistData.content.soloExhibitions && artistData.content.soloExhibitions.length > 0 && (
                <ExpandableSection title="Exposition solo">
                  <div className="space-y-2">
                    {artistData.content.soloExhibitions.map((exhibition, index) => (
                      <p key={index} className="text-gray-700 font-montserrat text-sm">{exhibition}</p>
                    ))}
                  </div>
                </ExpandableSection>
              )}

              {/* Publications */}
              {/* <ExpandableSection title="Publications">
                <div className="space-y-2">
                  {artistData.content.publications.map((publication, index) => (
                    <p key={index} className="text-gray-700 font-montserrat text-sm">{publication}</p>
                  ))}
                </div>
              </ExpandableSection> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
