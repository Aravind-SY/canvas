
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

function CreatePage() {
  const { themeClasses } = useTheme();

  return (
    <div className={`min-h-screen pt-16 pb-20 md:pb-0 md:pt-24 ${themeClasses} canvas-bg`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-caveat font-bold mb-8">Create New Sketch</h1>
        
        <Card className="sketch-card p-6 mb-8">
          <h2 className="text-2xl font-medium mb-4">Start a New Masterpiece</h2>
          <p className="text-muted-foreground mb-6">
            Express yourself through Sketches with rich content, multimedia, and interactive elements.
          </p>
          
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Sketch Title</label>
              <input 
                type="text" 
                placeholder="Give your sketch a name..." 
                className="w-full p-3 border rounded-md bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea 
                rows={5} 
                placeholder="Start sketching your thoughts..." 
                className="w-full p-3 border rounded-md bg-background"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3L21 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Media
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 8H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15L7 13L11 15L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Canvas Elements
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Art Filters
              </Button>
            </div>
            
            <div className="mt-4">
              <Button className="brush-btn bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                Create Sketch
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="sketch-card p-6">
          <h3 className="text-xl font-medium mb-4">Sketch Drafts</h3>
          <p className="text-muted-foreground text-center py-10">
            No drafts yet. Start creating your first sketch!
          </p>
        </div>
        
        {/* Decorative elements */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="drip" 
            style={{ 
              left: `${20 + i * 20}%`, 
              height: `${8 + Math.random() * 12}px`,
              animationDelay: `${i * 0.3}s` 
            }}
          />
        ))}
      </div>
      <Navbar />
    </div>
  );
}

export default function CreateWithTheme() {
  return (
    <ThemeProvider>
      <CreatePage />
    </ThemeProvider>
  );
}
