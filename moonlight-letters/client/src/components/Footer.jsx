import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-rose/10">
      <div className="flex items-center justify-center gap-2 text-mauve/50 text-sm">
        <span>Made with</span>
        <Heart className="w-3.5 h-3.5 text-rose animate-pulse-soft" fill="#f4a6b5" />
        <span>for Mimi, under moonlight</span>
      </div>
    </footer>
  );
}
