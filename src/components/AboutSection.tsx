'use client';

import Image from 'next/image';
import { ArtistData } from '@/lib/artistData';

interface AboutSectionProps {
  artistData: ArtistData;
}

export default function AboutSection({ artistData }: AboutSectionProps) {
  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50" id="aboutArtist">
      <div className="max-w-[80%] md:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Section - Artist Information */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 font-montserrat mb-2">{artistData.content.aboutBirthInfo}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-bricolage mb-4">
                {artistData.fullName}
              </h2>
              <p className="text-gray-700 font-montserrat leading-relaxed">
                {artistData.content.aboutDescription}
              </p>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {artistData.content.aboutTags.map((tag, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-montserrat">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Middle Section - Artist Quote */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 font-bricolage">
              {artistData.content.aboutQuestion}
            </h3>
            <blockquote className="text-gray-700 font-montserrat font-bold leading-relaxed italic text-2xl">
              «{artistData.content.aboutQuote}»
            </blockquote>
            <p className="text-gray-700 font-montserrat font-bold leading-relaxed italic text-sm">
              {artistData.content.aboutQuoteAuthor}
            </p>
          </div>

          {/* Right Section - Artist Portrait */}
          <div className="flex justify-center h-full">
            <div className="relative w-full h-full">
              <Image
                src={artistData.aboutImage}
                alt={artistData.fullName}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
