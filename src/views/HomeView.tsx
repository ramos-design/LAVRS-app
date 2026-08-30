import { MapPin, Star, Sparkles, Castle, Building2, Factory, Landmark, Map, Calendar, ChevronRight, Bell, User, Search, Instagram, Facebook, Twitter, Globe, Zap, Plus } from 'lucide-react';
import { MOCK_SHOPS, CITIES_DATA, MOCK_EVENTS } from '../data';
import { ViewState, Shop } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewState, shopId?: string) => void;
}

const getCityIcon = (cityName: string) => {
  switch(cityName) {
    case 'Praha': return Castle;
    case 'Brno': return Building2;
    case 'Ostrava': return Factory;
    case 'Olomouc': return Landmark;
    case 'Plzeň': return Map;
    default: return MapPin;
  }
};

export function HomeView({ onNavigate }: HomeViewProps) {
  const trendingShops = [...MOCK_SHOPS].slice(0, 5);
  const newShops = [...MOCK_SHOPS].reverse().slice(0, 5);
  const mostReviewedShops = [...MOCK_SHOPS].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 5);

  const renderShopCard = (shop: Shop) => (
    <div 
      key={shop.id}
      onClick={() => onNavigate('shop_detail', shop.id)}
      className="shrink-0 w-[220px] text-left group flex flex-col cursor-pointer"
    >
      <div className="relative w-full h-[160px] rounded-[24px] overflow-hidden bg-gray-100 mb-3 shadow-sm border border-gray-100">
        <img 
          src={shop.imageUrl} 
          alt={shop.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        <div className="absolute top-3 right-3 bg-red-600/95 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm shadow-red-600/20">
          <Star size={10} className="fill-white" />
          {shop.rating}
        </div>
      </div>
      <div className="px-1">
        <h3 className="font-bold text-gray-900 text-base tracking-tight truncate">{shop.name}</h3>
        <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1.5">
          <MapPin size={12} className="text-red-500 shrink-0" /> <span className="truncate">{shop.city} • {shop.categories[0]}</span>
        </p>
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-6 mb-2 mt-4 flex justify-between items-end">
      <h2 className="text-xl font-black text-gray-900 tracking-tight">{title}</h2>
      <button className="text-red-600 text-sm font-bold flex items-center gap-0.5 hover:text-red-700">
        Více <ChevronRight size={16} />
      </button>
    </div>
  );

  return (
    <div className="block h-full w-full bg-[#fcfcfc] overflow-y-auto pb-32 hide-scrollbar">
      {/* Header */}
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

      {/* Search Bar */}
      <div className="px-6 pt-1 pb-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Hledat obchody, města nebo události..." 
            className="w-full bg-white border border-gray-100 text-gray-900 text-sm rounded-2xl focus:ring-red-500 focus:border-red-500 block pl-11 p-3.5 shadow-sm transition-all outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Infinite City Marquee */}
      <section className="pt-3 pb-4">
        <div className="w-full overflow-hidden flex relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee gap-4 px-6 hover:[animation-play-state:paused]">
            {[...CITIES_DATA, ...CITIES_DATA, ...CITIES_DATA].map((city, i) => {
              const Icon = getCityIcon(city.name);
              return (
                <div 
                  key={i} 
                  onClick={() => onNavigate('map')}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden shadow-sm border-2 border-white ring-1 ring-red-100 flex items-center justify-center bg-red-50 text-red-600">
                    <Icon size={24} strokeWidth={1.5} className="group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out" />
                  </div>
                  <span className="text-gray-900 font-bold text-[11px] tracking-tight">{city.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Právě letí */}
      <SectionHeader title="Právě letí" />
      <div className="flex overflow-x-auto gap-4 hide-scrollbar px-6 pb-2">
        {trendingShops.map(renderShopCard)}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* 2. Nově přidáno */}
      <SectionHeader title="Nově přidáno" />
      <div className="flex overflow-x-auto gap-4 hide-scrollbar px-6 pb-2">
        {newShops.map(renderShopCard)}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* Reklamní banner (Premium) */}
      <div className="px-6 py-2 pb-2">
        <div className="w-full bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-5 flex items-center justify-between shadow-md text-white">
          <div>
            <h3 className="font-black text-lg mb-0.5 tracking-tight">Získejte Premium</h3>
            <p className="text-red-100 text-xs font-medium">Exkluzivní slevy ve vašem okolí</p>
          </div>
          <button className="bg-white text-red-600 px-4 py-2 rounded-full font-bold text-xs shadow-sm hover:scale-105 transition-transform active:scale-95">
            Zjistit více
          </button>
        </div>
      </div>

      {/* 3. Události / Events */}
      <SectionHeader title="Akce a události" />
      <div className="flex overflow-x-auto gap-4 hide-scrollbar px-6 pb-4">
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="shrink-0 w-[260px] text-left group flex flex-col cursor-pointer">
            <div className="relative w-full h-[160px] rounded-[24px] overflow-hidden bg-gray-100 mb-3 shadow-sm border border-gray-100">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-red-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm shadow-black/5">
                <Calendar size={10} className="text-red-500" />
                {event.date.split('•')[0].trim()}
              </div>
            </div>
            <div className="px-1">
              <h3 className="font-bold text-gray-900 text-base tracking-tight truncate">{event.title}</h3>
              <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1.5">
                <MapPin size={12} className="text-red-500 shrink-0" /> <span className="truncate">{event.location}</span>
              </p>
            </div>
          </div>
        ))}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* Reklamní banner 2 (Brand / Obchod) */}
      <div className="px-6 pb-6 pt-2">
        <div className="w-full h-[220px] rounded-[24px] relative overflow-hidden group cursor-pointer shadow-lg shadow-red-900/10 border border-gray-100">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" alt="Brand Ad" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          
          {/* Action Badge */}
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 rotate-3 transform border border-red-500">
            -30% SLEVA
          </div>

          <div className="absolute inset-0 p-5 flex flex-col justify-center w-[85%]">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={14} className="text-red-500 fill-red-500" />
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">Sponzorováno</span>
            </div>
            <h3 className="text-white font-black text-3xl leading-none mb-2 uppercase italic tracking-tight">Urban<br/>Sneakers</h3>
            <p className="text-gray-300 text-xs font-medium mb-5 line-clamp-2">Nová kolekce běžecké obuvi je tu. Získejte svůj pár dřív, než zmizí z pultů.</p>
            <button className="bg-white text-gray-900 w-fit px-5 py-3 rounded-full font-black text-xs hover:bg-gray-100 transition-colors flex items-center gap-1.5 shadow-xl">
              Nakupovat Hned <ChevronRight size={14} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Nejvíce recenzí */}
      <SectionHeader title="Nejlépe hodnocené" />
      <div className="flex overflow-x-auto gap-4 hide-scrollbar px-6 pb-6">
        {mostReviewedShops.map(renderShopCard)}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* Social Media Footer */}
      <div className="mt-2 mx-6 mb-10 pt-8 border-t border-gray-100 flex flex-col items-center text-center pb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">LAVRS</h2>
        <p className="text-gray-500 text-xs mb-6 max-w-[250px] font-medium leading-relaxed">Sledujte nás na sítích a neuteče vám žádná novinka z vašeho okolí.</p>
        <div className="flex gap-4">
          <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors active:scale-95">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors active:scale-95">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors active:scale-95">
            <Twitter size={20} />
          </a>
          <a href="#" className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-colors active:scale-95">
            <Globe size={20} />
          </a>
        </div>
      </div>

    </div>
  );
}
