
import { useState } from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SketchCardProps {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  creator: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

export function SketchCard({
  id,
  title,
  content,
  imageUrl,
  creator,
  likes,
  comments,
  createdAt
}: SketchCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showSplash, setShowSplash] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    
    if (!liked) {
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 700);
    }
  };

  return (
    <div className="sketch-card animate-fade-in mb-6 max-w-lg mx-auto">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="relative mr-3">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" 
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <p className="font-medium">{creator.name}</p>
            <p className="text-xs text-muted-foreground">{createdAt}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <h3 className="text-xl font-caveat mb-2">{title}</h3>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>

        {imageUrl && (
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105" 
            />
            {showSplash && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-16 h-16 bg-red-500/20 rounded-full animate-splatter"></div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
          <button 
            onClick={handleLike} 
            className={cn(
              "flex items-center space-x-1 text-sm transition-colors duration-300",
              liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <Heart 
              size={18} 
              className={cn(liked && "fill-red-500")} 
            />
            <span>{likeCount}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            <MessageSquare size={18} />
            <span>{comments}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="drip" 
          style={{ 
            left: `${10 + i * 30}%`, 
            height: `${5 + Math.random() * 15}px`, 
            animationDelay: `${i * 0.2}s` 
          }}
        ></div>
      ))}
    </div>
  );
}

export default SketchCard;
