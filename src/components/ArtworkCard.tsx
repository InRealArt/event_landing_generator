'use client';

import Image from 'next/image';
import { Artwork } from '@/lib/artistData';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
    <div
      className="cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Artwork Image */}
      <div className="p-6 pb-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-[450px] flex justify-center items-center">
        <div className="relative">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={350}
              height={0}
              className="max-w-[250px] w-full h-auto object-contain rounded"
              style={{ height: 'auto' }}
            />
        </div>
      </div>

      {/* Text Content */}
      <div className="py-6">
        {/* Artwork Title */}
        <h3 className="text-xl font-bold text-gray-900 font-bricolage mb-3">
          {artwork.title}
        </h3>
        
        {/* Artwork Details */}
        <div className="space-y-1 text-gray-700 font-montserrat">
          <p className="text-sm">
            {artwork.medium}
          </p>
          <p className="text-sm">
            {artwork.dimensions}
          </p>
          {artwork.year && (
            <p className="text-sm">
              {artwork.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
