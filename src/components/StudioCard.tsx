
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StudioCardProps {
  id: string;
  name: string;
  description: string;
  bannerUrl: string;
  memberCount: number;
  sketchCount: number;
  theme: 'impressionist' | 'surrealist' | 'popart';
}

export function StudioCard({
  id,
  name, 
  description, 
  bannerUrl, 
  memberCount, 
  sketchCount,
  theme
}: StudioCardProps) {
  const [hover, setHover] = useState(false);

  const themeStyles = {
    impressionist: "bg-impressionist-gradient before:bg-canvas-purple-light",
    surrealist: "bg-surrealist-gradient before:bg-canvas-purple",
    popart: "bg-popart-gradient before:bg-canvas-peach"
  };

  return (
    <Link
      to={`/studio/${id}`}
      className={cn(
        "block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 relative",
        hover && "transform-gpu"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div 
        className={cn(
          "h-32 relative overflow-hidden",
          themeStyles[theme]
        )}
      >
        <img 
          src={bannerUrl} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500 mix-blend-multiply",
            hover ? "opacity-70" : "opacity-90"
          )}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-xl font-caveat font-bold drop-shadow-md">{name}</h3>
        </div>

        {hover && [...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "absolute w-1 rounded-b-full bg-white/30 animate-paint-drip",
            )}
            style={{ 
              left: `${10 + i * 20}%`, 
              top: 0,
              animationDelay: `${i * 0.1}s`,
              height: `${10 + Math.random() * 20}px`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{memberCount} members</span>
          <span>{sketchCount} sketches</span>
        </div>
      </div>
    </Link>
  );
}

export default StudioCard;
