export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Shop {
  id: string;
  name: string;
  categories: string[];
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  openingHours: Record<string, string>;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
  };
  lat: number;
  lng: number;
  isFavorite?: boolean;
}

export interface ShopEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description?: string;
  price?: string;
  organizer?: string;
  tags?: string[];
}

export interface NewsItem {
  id: string;
  shopId: string;
  shopName: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export type ViewState = 'home' | 'map' | 'favorites' | 'profile' | 'shop_detail' | 'events' | 'event_detail';
