
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Image, User, PlusSquare, BellDot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [splashEffect, setSplashEffect] = useState<string | null>(null);
  const location = useLocation();

  const triggerSplash = (id: string) => {
    setSplashEffect(id);
    setTimeout(() => setSplashEffect(null), 600);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ to, icon, label, id }: { to: string; icon: React.ReactNode; label: string; id: string }) => (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center p-2 transition-colors duration-300 relative splash-effect",
        isActive(to) ? "text-primary" : "text-muted-foreground hover:text-primary",
        splashEffect === id && "after:animate-paint-splash"
      )}
      onClick={() => triggerSplash(id)}
    >
      <div className="relative">
        {icon}
        {id === 'notifications' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto bg-white dark:bg-gray-900 shadow-lg z-50 px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="md:flex items-center hidden">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-caveat font-bold text-primary">Canvas</h1>
          </Link>
        </div>
        
        <div className="flex justify-between md:justify-center w-full md:w-auto space-x-4">
          <NavItem to="/" icon={<Home size={24} />} label="Home" id="home" />
          <NavItem to="/explore" icon={<Search size={24} />} label="Explore" id="explore" />
          <NavItem to="/create" icon={<PlusSquare size={24} />} label="Create" id="create" />
          <NavItem to="/notifications" icon={<BellDot size={24} />} label="Alerts" id="notifications" />
          <NavItem to="/gallery" icon={<User size={24} />} label="Gallery" id="profile" />
        </div>

        <div className="hidden md:block">
          <button className="brush-btn bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
