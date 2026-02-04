'use client';

import { ArtistData, INREALART_DEFAULT_STATS, INREALART_DEFAULT_STATS_TITLE } from '@/lib/artistData';

interface InRealArtStatsProps {
  artistData: ArtistData;
}

export default function InRealArtStats({ artistData }: InRealArtStatsProps) {
  const statsTitle = artistData.content.statsTitle ?? INREALART_DEFAULT_STATS_TITLE
  const stats = artistData.content.stats ?? INREALART_DEFAULT_STATS

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-[80%] md:max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-bricolage mb-12">
          {statsTitle}
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg p-6 text-center shadow-lg">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 font-bricolage mb-3">
                {stat.number}
              </div>
              <p className="text-gray-700 text-sm font-montserrat">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
