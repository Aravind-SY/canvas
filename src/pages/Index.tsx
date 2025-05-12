
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SketchCard from '@/components/SketchCard';
import StudioCard from '@/components/StudioCard';
import ThemeSwitch from '@/components/ThemeSwitch';
import CreateSketchButton from '@/components/CreateSketchButton';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { sketches, studios, trendingTags, featuredArtists } from '@/services/mockData';
import { Search } from 'lucide-react';

function HomePage() {
  const { currentTheme, setTheme, themeClasses } = useTheme();
  const [activeTab, setActiveTab] = useState<'feed' | 'studios'>('feed');

  return (
    <div className={`min-h-screen ${themeClasses} canvas-bg pb-16 md:pb-4 pt-2 md:pt-16`}>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6 pt-2">
          <div className="md:hidden">
            <h1 className="text-2xl font-caveat font-bold text-primary">Canvas</h1>
          </div>
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sketches, studios, artists..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-muted bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>
          <div className="hidden md:block">
            <ThemeSwitch currentTheme={currentTheme} onChange={setTheme} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <main className="w-full md:w-2/3">
            <div className="flex justify-center md:justify-start mb-6 border-b">
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'feed' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('feed')}
              >
                Your Feed
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'studios' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('studios')}
              >
                Studios
              </button>
            </div>

            {activeTab === 'feed' && (
              <div>
                {sketches.map((sketch) => (
                  <SketchCard key={sketch.id} {...sketch} />
                ))}
              </div>
            )}

            {activeTab === 'studios' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studios.map((studio) => (
                  <StudioCard key={studio.id} {...studio} />
                ))}
              </div>
            )}
          </main>

          <aside className="hidden md:block w-1/3 space-y-6">
            <div className="sketch-card p-4">
              <h3 className="text-lg font-caveat font-bold mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <a
                    key={tag.id}
                    href={`#${tag.name}`}
                    className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs transition-colors"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="sketch-card p-4">
              <h3 className="text-lg font-caveat font-bold mb-4">Featured Artists</h3>
              <div className="space-y-4">
                {featuredArtists.map((artist) => (
                  <a key={artist.id} href={`/gallery/${artist.id}`} className="flex items-center p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                    <img 
                      src={artist.avatar} 
                      alt={artist.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" 
                    />
                    <div className="ml-3">
                      <p className="font-medium">{artist.name}</p>
                      <p className="text-xs text-muted-foreground">{artist.specialty}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <CreateSketchButton />
      <Navbar />
    </div>
  );
}

// Wrap the page with ThemeProvider
export default function IndexWithTheme() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
