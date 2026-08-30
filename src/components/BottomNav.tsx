import { Home, Map, Heart, Calendar } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export function BottomNav({ currentView, onChangeView }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Domů', icon: Home },
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'events', label: 'Akce', icon: Calendar },
    { id: 'favorites', label: 'Líbí', icon: Heart },
  ] as const;

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 bg-red-600 rounded-t-3xl pb-safe shadow-[0_-10px_40px_rgba(220,38,38,0.2)]">
      <ul className="flex items-center justify-between px-2 h-16">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <li key={item.id} className={`${isActive ? 'flex-[1.5]' : 'flex-1'} flex justify-center transition-all duration-300`}>
              <button
                onClick={() => onChangeView(item.id)}
                className={`flex items-center justify-center h-11 rounded-full transition-all duration-300 ease-out overflow-hidden ${
                  isActive 
                    ? 'bg-white text-red-600 px-5 gap-2 shadow-sm' 
                    : 'bg-transparent text-white/80 hover:text-white w-12'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                {isActive && (
                  <span className="text-xs font-bold tracking-wide whitespace-nowrap animate-in fade-in zoom-in duration-200">
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
