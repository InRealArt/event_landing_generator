'use client';

import { useState } from 'react';
import { ArtistData, Artwork } from '@/lib/artistData';
import ArtworkCard from './ArtworkCard';

interface ArtworkGalleryProps {
  artistData: ArtistData;
}

export default function ArtworkGallery({ artistData }: ArtworkGalleryProps) {
  const [_selectedArtwork, _setSelectedArtwork] = useState<Artwork | null>(null);

  const featuredArtworks = artistData.artworks.filter(artwork =>
    artistData.featuredArtworks.includes(artwork.id)
  );

  return (
    <>
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-[80%] md:max-w-7xl mx-auto">
                {/* Exhibition Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Box - Main Title */}
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-bricolage mb-2">
                      {artistData.content.galleryMainTitle}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-bricolage">
                      {artistData.content.gallerySubtitle}
                    </h3>
                  </div>

                  {/* Right Box - Event Details */}
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="space-y-3 text-gray-700 font-montserrat">
                      <p><span className="font-semibold">Quand:</span> du 19 au 21 Septembre 2025</p>
                      <p><span className="font-semibold">Où:</span> au Château de Fontvielle, à Monaco</p>
                    </div>
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="text-center p-8 border-t border-b border-gray-400 my-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-bricolage">
                    {artistData.content.galleryDescription}
                  </h2>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
