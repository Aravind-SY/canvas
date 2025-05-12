
import { Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function NotFoundPage() {
  const { themeClasses } = useTheme();

  return (
    <div className={`min-h-screen ${themeClasses} canvas-bg flex items-center justify-center p-4`}>
      <div className="sketch-card p-10 max-w-md w-full text-center">
        <h1 className="text-7xl font-caveat font-bold mb-4">404</h1>
        <p className="text-xl mb-6">This canvas is still blank</p>
        <p className="text-muted-foreground mb-8">The page you're looking for hasn't been sketched yet.</p>
        <Link 
          to="/" 
          className="brush-btn inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md"
        >
          Return to Gallery
        </Link>

        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="drip" 
            style={{ 
              left: `${15 + i * 15}%`, 
              height: `${5 + Math.random() * 15}px`,
              animationDelay: `${i * 0.2}s` 
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default function NotFoundWithTheme() {
  return (
    <ThemeProvider>
      <NotFoundPage />
    </ThemeProvider>
  );
}
