import { Link } from '@tanstack/react-router';
import { Sparkles, Code2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewProject?: () => void;
}

export default function Header({ onNewProject }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg border-b border-purple-400/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="text-violet-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">
              Lovable Clone
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-white/90 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <Code2 size={18} />
              Projects
            </Link>
            <Button 
              onClick={onNewProject}
              className="bg-white text-violet-600 hover:bg-violet-50 font-semibold flex items-center gap-2"
            >
              <Plus size={18} />
              New Project
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}