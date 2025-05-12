
import { createContext, useState, useContext, ReactNode } from 'react';

type Theme = 'impressionist' | 'surrealist' | 'popart';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themeClasses: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeMap = {
  impressionist: {
    bgClass: 'bg-impressionist-gradient',
    textClass: 'text-gray-800',
    accentClass: 'bg-theme-impressionist',
  },
  surrealist: {
    bgClass: 'bg-surrealist-gradient',
    textClass: 'text-purple-900',
    accentClass: 'bg-theme-surrealist',
  },
  popart: {
    bgClass: 'bg-popart-gradient',
    textClass: 'text-orange-900',
    accentClass: 'bg-theme-popart',
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('impressionist');
  
  const themeClasses = themeMap[currentTheme].bgClass;
  
  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    // Could also add code here to persist the theme choice
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
