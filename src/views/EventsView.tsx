import { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight, Bell, Plus, User, Filter } from 'lucide-react';
import { MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface EventsViewProps {
  onNavigate: (view: ViewState, shopId?: string) => void;
  onEventClick: (eventId: string) => void;
}

const EVENT_CATEGORIES = ['Vše', 'Swap', 'Blešák', 'Workshop', 'Kilo Sale', 'Market'];

export function EventsView({ onNavigate, onEventClick }: EventsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Vše');

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchCat = activeCategory === 'Vše' || (event.tags && event.tags.includes(activeCategory));
    const matchSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto pb-24 hide-scrollbar relative">
      {/* Header & Search */}
      <header className="px-6 pt-safe pb-3 bg-[#fcfcfc]/95 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center border-b border-gray-100/50">
        <h1 className="text-3xl font-black tracking-tighter text-red-600">LAVRS</h1>
        <div className="flex gap-1.5 items-center">
          <button className="p-1.5 text-gray-900 hover:text-red-600 transition-colors active:scale-95">
            <Plus size={20} strokeWidth={2.5} />
          </button>
          <button className="p-1.5 text-gray-900 hover:text-red-600 transition-colors active:scale-95">
            <div className="relative flex">
              <Bell size={20} strokeWidth={2.5} />
              <span className="absolute -top-0.5 right-0.5 w-2 h-2 bg-red-600 rounded-full border-2 border-[#fcfcfc] box-content"></span>
            </div>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="p-1.5 text-gray-900 hover:text-red-600 transition-colors active:scale-95"
          >
            <User size={20} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="bg-[#fcfcfc] z-20">
        <div className="px-6 pt-1 pb-1">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Hledat události, místa..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-100 text-gray-900 text-sm rounded-2xl focus:ring-red-500 focus:border-red-500 block pl-11 p-3.5 shadow-sm transition-all outline-none placeholder:text-gray-400"
              />
            </div>
            <button className="w-12 h-[50px] shrink-0 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-700 shadow-sm hover:text-red-600 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="w-full flex relative pt-2 pb-4 pl-6 items-center">
          <div className="relative z-20 bg-[#fcfcfc] pr-2">
            <button
              onClick={() => setActiveCategory('Vše')}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                activeCategory === 'Vše' 
                  ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Vše
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden relative h-full py-1">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex w-max animate-marquee-slow gap-2 pr-6 hover:[animation-play-state:paused]">
              {(() => {
                const scrollCats = EVENT_CATEGORIES.filter(cat => cat !== 'Vše');
                return [...scrollCats, ...scrollCats, ...scrollCats, ...scrollCats].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                      activeCategory === cat 
                        ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Nadcházející akce</h2>
        
        <div className="flex flex-col gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div 
                key={event.id}
                onClick={() => onEventClick(event.id)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="h-40 w-full relative">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {event.price && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900">
                      {event.price}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-3">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Calendar size={16} className="text-red-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <MapPin size={16} className="text-red-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {event.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500 font-medium">Zadaným kritériím neodpovídají žádné akce.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
