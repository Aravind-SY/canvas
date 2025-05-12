import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SketchCard from '@/components/SketchCard';
import ThemeSwitch from '@/components/ThemeSwitch';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { sketches } from '@/services/mockData';
import { CircleUser, Settings, Image, GalleryVertical, Star, UserPlus } from 'lucide-react';

function GalleryPage() {
  const { currentTheme, setTheme, themeClasses } = useTheme();
  const [activeTab, setActiveTab] = useState('sketches');

  // Mock user data
  const user = {
    name: "Sofia Rodriguez",
    username: "@sofia_creates",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Digital artist exploring the intersection of traditional painting techniques and modern technology. Creating unique visual experiences one pixel at a time.",
    followers: 3240,
    following: 185,
    featuredSketch: sketches[2]
  };

  return (
    <div className={`min-h-screen ${themeClasses} canvas-bg pb-16 md:pb-4 pt-2 md:pt-16`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Profile Header */}
        <div className="sketch-card p-6 mb-6 relative overflow-visible">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/30 splash-effect">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                <CircleUser size={18} className="text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-muted-foreground mb-3">{user.username}</p>
              <p className="text-sm mb-4 max-w-lg">{user.bio}</p>
              
              <div className="flex justify-center md:justify-start gap-6 text-sm mb-4">
                <div>
                  <span className="font-bold">{user.followers}</span> Followers
                </div>
                <div>
                  <span className="font-bold">{user.following}</span> Following
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start gap-2">
                <button className="brush-btn bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2">
                  <UserPlus size={16} />
                  Follow
                </button>
                <button className="brush-btn bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md">
                  <Settings size={16} />
                </button>
                <div className="hidden md:block ml-auto">
                  <ThemeSwitch currentTheme={currentTheme} onChange={setTheme} />
                </div>
              </div>
            </div>
          </div>

          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="drip" 
              style={{ 
                left: `${20 + i * 20}%`, 
                height: `${8 + Math.random() * 12}px`,
                animationDelay: `${i * 0.3}s` 
              }}
            ></div>
          ))}
        </div>

        {/* Featured Work */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-caveat font-bold">Featured Sketch</h2>
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
          </div>
          <SketchCard {...user.featuredSketch} />
        </div>
        
        {/* Gallery Navigation */}
        <div className="flex justify-center mb-8 border-b">
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'sketches' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('sketches')}
          >
            <Image size={18} />
            Sketches
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'collections' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('collections')}
          >
            <GalleryVertical size={18} />
            Collections
          </button>
        </div>
        
        {/* Gallery Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sketches.map(sketch => (
            <SketchCard key={sketch.id} {...sketch} />
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default function GalleryWithTheme() {
  return (
    <ThemeProvider>
      <GalleryPage />
    </ThemeProvider>
  );
}
