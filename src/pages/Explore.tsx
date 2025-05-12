
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import StudioCard from '@/components/StudioCard';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { studios } from '@/services/mockData';

function ExplorePage() {
  const { themeClasses } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'digital', label: 'Digital Art' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'mixed', label: 'Mixed Media' },
    { id: 'photography', label: 'Photography' },
  ];

  return (
    <div className={`min-h-screen ${themeClasses} canvas-bg pb-16 md:pb-4 pt-2 md:pt-16`}>
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-caveat font-bold mb-6 mt-4">Explore Studios</h1>
        
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeFilter === filter.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studios.map(studio => (
            <StudioCard key={studio.id} {...studio} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button className="brush-btn bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md">
            Discover More Studios
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default function ExploreWithTheme() {
  return (
    <ThemeProvider>
      <ExplorePage />
    </ThemeProvider>
  );
}
