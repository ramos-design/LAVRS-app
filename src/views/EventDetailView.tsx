import { ChevronLeft, Share2, Heart, MapPin, Calendar, Clock, Info, ExternalLink } from 'lucide-react';
import { MOCK_EVENTS } from '../data';
import { ViewState } from '../types';
import { useState } from 'react';

interface EventDetailViewProps {
  eventId: string;
  onNavigate: (view: ViewState) => void;
  onBack: () => void;
}

export function EventDetailView({ eventId, onNavigate, onBack }: EventDetailViewProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const event = MOCK_EVENTS.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="flex flex-col h-full bg-[#fcfcfc] items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Událost nenalezena</h2>
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl mt-4"
        >
          Zpět
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-[#fcfcfc] overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto pb-28 hide-scrollbar">
        {/* Hero Image & Nav */}
        <div className="relative h-[300px] w-full shrink-0">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 px-4 pt-safe pb-4 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <Heart size={20} className={isFavorite ? "fill-current text-red-500" : ""} />
            </button>
          </div>
        </div>

        {/* Event Tags Overlay */}
        {event.tags && (
          <div className="absolute bottom-10 left-6 right-6 flex gap-2 flex-wrap z-10">
            {event.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 rounded-full text-xs font-bold shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6 bg-[#fcfcfc] relative -mt-6 rounded-t-3xl flex-1 flex flex-col z-20">
        <h1 className="text-2xl font-black text-gray-900 leading-tight mb-4">
          {event.title}
        </h1>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Kdy</p>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{event.date}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Kde</p>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{event.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Info size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Vstupné a organizátor</p>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{event.price || 'Neuvedeno'} • {event.organizer || 'LAVRS'}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">O události</h2>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {event.description || 'Pro tuto událost není k dispozici žádný podrobný popis. Přijďte se podívat a zažít atmosféru na vlastní kůži!'}
          </p>
        </div>
      </div>
      </div>

      {/* Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pt-4 pb-8 bg-white border-t border-gray-100 z-50 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <button className="flex-1 bg-red-600 text-white font-bold text-center py-4 rounded-2xl active:scale-95 transition-transform">
          Chci se zúčastnit
        </button>
        <button className="w-14 h-14 shrink-0 bg-gray-100 text-gray-900 flex justify-center items-center rounded-2xl active:scale-95 transition-transform">
          <ExternalLink size={24} />
        </button>
      </div>
    </div>
  );
}
