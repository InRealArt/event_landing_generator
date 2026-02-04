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
      <div className="p-4 sm:p-6 pb-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[260px] md:min-h-[320px] md:h-[450px] flex justify-center items-center">
        <div className="relative w-full max-w-full md:max-w-[280px] lg:max-w-[320px] md:h-full md:w-auto">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={350}
              height={350}
              className="w-full h-auto md:h-full md:w-auto md:min-w-0 object-contain rounded"
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 350px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
          {artwork.price && (
            <p className="text-sm font-semibold text-gray-900">
              {artwork.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
