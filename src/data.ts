import { Shop, NewsItem, Review, ShopEvent } from './types';

export const MOCK_REVIEWS: Record<string, Review[]> = {
  'shop-1': [
    {
      id: 'rev-1',
      userId: 'u1',
      userName: 'Anna N.',
      rating: 5,
      comment: 'Úžasný výběr vintage oblečení a velmi příjemná obsluha. Určitě se vrátím!',
      date: '2023-10-15',
    },
    {
      id: 'rev-2',
      userId: 'u2',
      userName: 'Petr K.',
      rating: 4,
      comment: 'Dobré ceny, ale občas je potřeba hledat, aby člověk našel ty nejlepší kousky.',
      date: '2023-09-22',
    }
  ],
  'shop-2': [
    {
      id: 'rev-3',
      userId: 'u3',
      userName: 'Lucie D.',
      rating: 5,
      comment: 'Krásné prostředí a skvělý výběr knih. Dala jsem si i výbornou kávu.',
      date: '2023-10-18',
    }
  ]
};

export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: 'Vintage Hub Praha',
    categories: ['Vintage', 'Streetwear', 'Doplňky'],
    address: 'Karlova 15',
    city: 'Praha',
    rating: 4.8,
    reviewsCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1489987707023-af614c226f58?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Nejlepší vintage kousky v srdci Prahy. Specializujeme se na módu 80. a 90. let, pečlivě vybíráme ty nejzajímavější a nejkvalitnější kousky ze všech koutů světa.',
    openingHours: {
      'Po-Pá': '10:00 - 19:00',
      'So': '11:00 - 18:00',
      'Ne': 'Zavřeno'
    },
    contact: {
      phone: '+420 123 456 789',
      email: 'info@vintagehub.cz',
      website: 'www.vintagehub.cz'
    },
    social: {
      instagram: '@vintagehubpraha',
      facebook: 'VintageHubPraha'
    },
    lat: 50.0864,
    lng: 14.4158,
    isFavorite: true
  },
  {
    id: 'shop-2',
    name: 'Druhá Stránka',
    categories: ['Y2K', 'Tenisky', 'Doplňky'],
    address: 'Veveří 45',
    city: 'Brno',
    rating: 4.9,
    reviewsCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Útulný antikvariát spojený s kavárnou. Ideální místo pro odpolední relaxaci s dobrou knihou v ruce.',
    openingHours: {
      'Po-Pá': '09:00 - 20:00',
      'So-Ne': '10:00 - 18:00'
    },
    contact: {
      phone: '+420 987 654 321'
    },
    social: {
      instagram: '@druhastrankabrno'
    },
    lat: 49.2014,
    lng: 16.6025,
    isFavorite: false
  },
  {
    id: 'shop-3',
    name: 'Retro Nábytek Ostrava',
    categories: ['Vintage', 'Upcyklované'],
    address: 'Nádražní 120',
    city: 'Ostrava',
    rating: 4.2,
    reviewsCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Repasovaný i původní nábytek z období československého designu. Dáváme věcem druhý život.',
    openingHours: {
      'Út-Pá': '13:00 - 18:00',
      'So': '09:00 - 13:00',
      'Po, Ne': 'Zavřeno'
    },
    contact: {
      phone: '+420 555 444 333'
    },
    social: {
      facebook: 'RetroNabytekOVA'
    },
    lat: 49.8398,
    lng: 18.2831,
    isFavorite: true
  },
  {
    id: 'shop-4',
    name: 'Second Hand 1981',
    categories: ['Vintage', 'Luxusní', 'Slevy'],
    address: 'Kopečná 14',
    city: 'Brno',
    rating: 4.6,
    reviewsCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    galleryUrls: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80'],
    description: 'Stylový vintage shop s kurátorovaným výběrem značkového oblečení z 80. a 90. let.',
    openingHours: { 'Po-Pá': '10:00 - 18:00' },
    contact: {},
    social: {},
    lat: 49.1910,
    lng: 16.6050,
    isFavorite: false
  },
  {
    id: 'shop-5',
    name: 'Hrabárna u babičky',
    categories: ['Streetwear', 'Slevy'],
    address: 'Smetanova 5',
    city: 'Olomouc',
    rating: 4.1,
    reviewsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80',
    galleryUrls: ['https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80'],
    description: 'Tradiční hrabárna, kde najdete skvosty za pár korun. Ideální pro lovce pokladů.',
    openingHours: { 'Po-Pá': '08:00 - 17:00' },
    contact: {},
    social: {},
    lat: 49.5938,
    lng: 17.2509,
    isFavorite: false
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    shopId: 'shop-1',
    shopName: 'Vintage Hub Praha',
    title: 'Nová kolekce jarních kabátů',
    description: 'Právě jsme naskladnili úžasné jarní kabáty a trenčkoty! Přijďte se podívat, dokud jsou k dispozici.',
    date: 'Dnes, 10:30',
    imageUrl: 'https://images.unsplash.com/photo-1434389678232-03f169f9e1e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-2',
    shopId: 'shop-2',
    shopName: 'Druhá Stránka',
    title: 'Víkendová sleva na všechny knihy',
    description: 'Tento víkend máme 20% slevu na všechny romány a poezii. Těšíme se na vás!',
    date: 'Včera, 15:45'
  }
];

export const MOCK_EVENTS: ShopEvent[] = [
  {
    id: 'ev-1',
    title: 'Velký Vintage Swap',
    date: 'Tuto sobotu • 10:00 - 17:00',
    location: 'Vnitroblock, Praha',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
    description: 'Přineste kousky, které už nenosíte, a odneste si nové! Obrovský vintage swap zaměřený na udržitelnost. Na místě bude káva, DJ a super atmoška.',
    price: 'Vstup: 150 Kč',
    organizer: 'LAVRS & Vnitroblock',
    tags: ['Swap', 'Udržitelnost', 'Hudba']
  },
  {
    id: 'ev-2',
    title: 'Bleší trh Náplavka',
    date: 'Neděle 24.11. • 08:00 - 14:00',
    location: 'Náplavka, Praha',
    imageUrl: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    description: 'Tradiční bleší trh na břehu Vltavy. Antik, vintage kousky, vinyly, knihy a spousta kuriozit z druhé ruky.',
    price: 'Vstup zdarma',
    organizer: 'Pražské trhy',
    tags: ['Blešák', 'Antik', 'Vinyly']
  },
  {
    id: 'ev-3',
    title: 'Kilo Sale - Oblečení na váhu',
    date: 'Pátek 29.11. • 12:00 - 19:00',
    location: 'Fleda, Brno',
    imageUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=800&q=80',
    description: 'Nakupujte vintage oblečení na váhu! Cenu určuje ručička na váze, 1 kg = 500 Kč. Značkové kousky z 80. a 90. let.',
    price: '500 Kč / 1 kg',
    organizer: 'Vintage Kilo Sale',
    tags: ['Y2K', 'Streetwear', 'Kilo Sale']
  },
  {
    id: 'ev-4',
    title: 'Upcycling Workshop',
    date: 'Úterý 3.12. • 17:00 - 20:00',
    location: 'Kreativní HUB, Ostrava',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Naučte se přešít své staré oblečení a dát mu nový život. Lektorka vás provede základy šití na stroji a ručního vyšívání.',
    price: 'Vstup: 300 Kč (materiál v ceně)',
    organizer: 'Šicí dílna Ostrava',
    tags: ['Workshop', 'Upcycling', 'DIY']
  }
];

export const CITIES = ['Praha', 'Brno', 'Ostrava', 'Plzeň', 'Olomouc'];
export const CITIES_DATA = [
  { name: 'Praha' },
  { name: 'Brno' },
  { name: 'Ostrava' },
  { name: 'Olomouc' },
  { name: 'Plzeň' },
];
export const CATEGORIES = ['Vše', 'Vintage', 'Y2K', 'Streetwear', 'Luxusní', 'Tenisky', 'Doplňky', 'Upcyklované', 'Slevy'];
