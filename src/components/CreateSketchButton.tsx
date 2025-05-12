
import { PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CreateSketchButton() {
  return (
    <Link 
      to="/create" 
      className="fixed bottom-20 md:bottom-10 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-40 group"
    >
      <PlusSquare 
        size={24} 
        className="text-white transition-transform group-hover:scale-110 duration-300" 
      />
      
      <div className="absolute opacity-0 group-hover:opacity-100 -top-10 right-0 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-300">
        New Sketch
      </div>

      <div className="absolute inset-0 rounded-full bg-primary/50 animate-ping opacity-75 group-hover:opacity-100"></div>
    </Link>
  );
}

export default CreateSketchButton;
