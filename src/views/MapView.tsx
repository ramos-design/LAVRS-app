import { useState } from 'react';
import { Search, MapPin, Filter, Star, Bell, User, Plus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MOCK_SHOPS, CATEGORIES, CITIES } from '../data';
import { ViewState } from '../types';

interface MapViewProps {
  onNavigate: (view: ViewState, shopId?: string) => void;
}

const createCustomIcon = (name: string) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="flex flex-col items-center justify-center -ml-[50%] -mt-[100%] w-max">
        <div class="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-red-600/30 mb-1 z-10 hover:scale-110 transition-transform cursor-pointer">
          ${name}
        </div>
        <div class="w-3 h-3 bg-red-600 transform rotate-45 -mt-2.5 shadow-sm"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

export function MapView({ onNavigate }: MapViewProps) {
  const [activeCategory, setActiveCategory] = useState('Vše');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = MOCK_SHOPS.filter(shop => {
    const matchCat = activeCategory === 'Vše' || shop.categories.includes(activeCategory);
    const matchSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        shop.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-hidden relative">
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
                placeholder="Hledat obchody, města nebo události..." 
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
                const scrollCats = CATEGORIES.filter(cat => cat !== 'Vše');
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

      {/* Map Area */}
      <div className="flex-1 relative bg-[#e5e3df] w-full z-0">
        <MapContainer 
          center={[49.8, 15.4]} 
          zoom={7} 
          zoomControl={false}
          className="absolute inset-0 w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {filteredShops.map((shop) => (
            <Marker 
              key={shop.id} 
              position={[shop.lat, shop.lng]}
              icon={createCustomIcon(shop.name)}
              eventHandlers={{
                click: () => onNavigate('shop_detail', shop.id),
              }}
            />
          ))}
        </MapContainer>

        {/* Bottom Sheet List */}
        <div className="absolute bottom-24 left-0 right-0 z-20 px-4 pointer-events-none">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar pointer-events-auto">
            {filteredShops.map(shop => (
              <div 
                key={`card-${shop.id}`}
                onClick={() => onNavigate('shop_detail', shop.id)}
                className="snap-center shrink-0 w-[280px] bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex gap-3 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-bold text-gray-900 text-sm truncate mb-0.5">{shop.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-0.5 text-xs font-bold text-red-600">
                      <Star size={12} className="fill-red-600" /> {shop.rating}
                    </span>
                    <span className="text-xs text-gray-500 font-medium truncate flex-1">
                      {shop.categories[0]}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1 truncate">
                    <MapPin size={12} /> {shop.address}, {shop.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
