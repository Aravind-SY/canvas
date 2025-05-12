
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Theme = 'impressionist' | 'surrealist' | 'popart';

interface ThemeSwitchProps {
  currentTheme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeSwitch({ currentTheme, onChange }: ThemeSwitchProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'impressionist', name: 'Impressionist Dawn', color: 'bg-theme-impressionist' },
    { id: 'surrealist', name: 'Surrealist Dream', color: 'bg-theme-surrealist' },
    { id: 'popart', name: 'Pop Art Burst', color: 'bg-theme-popart' },
  ];

  const handleToggle = () => setIsOpen(!isOpen);
  
  const handleThemeChange = (theme: Theme) => {
    onChange(theme);
    setIsOpen(false);
  };

  const getCurrentTheme = () => themes.find(theme => theme.id === currentTheme);

  return (
    <div className="relative">
      <button 
        onClick={handleToggle}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-border hover:bg-secondary/50 transition-colors"
      >
        <div className={cn("w-4 h-4 rounded-full", getCurrentTheme()?.color)} />
        <span className="text-sm font-medium">{getCurrentTheme()?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {themes.map((theme) => (
              <button
                key={theme.id}
                className={cn(
                  "flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                  currentTheme === theme.id && "bg-secondary"
                )}
                role="menuitem"
                onClick={() => handleThemeChange(theme.id)}
              >
                <div className={cn("w-3 h-3 rounded-full mr-3", theme.color)} />
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitch;
