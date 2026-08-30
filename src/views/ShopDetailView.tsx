import { ArrowLeft, MapPin, Star, Clock, Phone, Mail, Globe, Instagram, Facebook, Heart } from 'lucide-react';
import { MOCK_SHOPS, MOCK_REVIEWS } from '../data';
import { ViewState } from '../types';

interface ShopDetailViewProps {
  shopId: string;
  onNavigate: (view: ViewState) => void;
}

export function ShopDetailView({ shopId, onNavigate }: ShopDetailViewProps) {
  const shop = MOCK_SHOPS.find(s => s.id === shopId);
  const reviews = MOCK_REVIEWS[shopId] || [];

  if (!shop) return null;

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-safe hide-scrollbar">
      {/* Image Gallery Header */}
      <div className="relative h-[45vh] bg-gray-100 shrink-0">
        <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-12 pb-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Heart size={20} className={shop.isFavorite ? "fill-red-500 text-red-500" : ""} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory h-full hide-scrollbar">
          {shop.galleryUrls.map((url, i) => (
            <div key={i} className="w-full h-full shrink-0 snap-center">
              <img src={url} alt={`${shop.name} - ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 right-6 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide">
          1 / {shop.galleryUrls.length}
        </div>
      </div>

      <div className="px-6 py-6 rounded-t-3xl -mt-6 bg-white relative z-20 flex-1">
        {/* Title & Rating */}
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-black text-gray-900 leading-tight pr-4">{shop.name}</h1>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-bold shadow-sm shadow-red-600/20">
              <Star size={14} className="fill-white" />
              {shop.rating}
            </div>
            <span className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wide">
              {shop.reviewsCount} recenzí
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mb-4">
          <MapPin size={14} /> {shop.address}, {shop.city}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {shop.categories.map(cat => (
            <span key={cat} className="text-xs font-bold tracking-wide uppercase px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          {shop.description}
        </p>

        <hr className="border-gray-100 mb-8" />

        {/* Info Grid */}
        <div className="grid gap-6 mb-8">
          {/* Hours */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={16} /> Otevírací doba
            </h3>
            <div className="space-y-2">
              {Object.entries(shop.openingHours).map(([days, hours]) => (
                <div key={days} className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">{days}</span>
                  <span className="text-gray-900 font-semibold">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Phone size={16} /> Kontakt
            </h3>
            <div className="space-y-3">
              {shop.contact.phone && (
                <a href={`tel:${shop.contact.phone}`} className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-black">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Phone size={14} /></div>
                  {shop.contact.phone}
                </a>
              )}
              {shop.contact.website && (
                <a href={`https://${shop.contact.website}`} className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-black">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Globe size={14} /></div>
                  {shop.contact.website}
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Reviews */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-lg font-bold text-gray-900">Hodnocení zákazníků</h2>
            <button className="text-sm font-bold text-red-600 hover:text-red-700">Napsat recenzi</button>
          </div>
          
          <div className="space-y-5">
            {reviews.map(review => (
              <div key={review.id} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-gray-900 text-sm block">{review.userName}</span>
                    <span className="text-xs text-gray-500 font-medium">{review.date}</span>
                  </div>
                  <div className="flex text-red-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "fill-red-500 text-red-500" : "fill-gray-200 text-gray-200"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
              </div>
            ))}
            
            {reviews.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">Zatím žádné recenze. Buďte první!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
