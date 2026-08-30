import { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight, Bell, Plus, User, Filter } from 'lucide-react';
import { MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface EventsViewProps {
  onNavigate: (view: ViewState, shopId?: string) => void;
  onEventClick: (eventId: string) => void;
}

export function EventsView({ onNavigate, onEventClick }: EventsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = MOCK_EVENTS.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="px-6 pt-4 pb-2 z-20">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all shadow-sm font-medium"
              placeholder="Hledat události..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3.5 bg-white border border-gray-100 rounded-2xl text-gray-900 hover:bg-gray-50 transition-colors shadow-sm shrink-0">
            <Filter size={20} />
          </button>
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
