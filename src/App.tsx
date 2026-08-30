/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ViewState } from './types';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { MapView } from './views/MapView';
import { ShopDetailView } from './views/ShopDetailView';

import { EventsView } from './views/EventsView';
import { EventDetailView } from './views/EventDetailView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState, shopId?: string) => {
    setCurrentView(view);
    if (shopId) {
      setSelectedShopId(shopId);
    }
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView('event_detail');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'map':
        return <MapView onNavigate={handleNavigate} />;
      case 'shop_detail':
        return selectedShopId ? <ShopDetailView shopId={selectedShopId} onNavigate={handleNavigate} /> : <HomeView onNavigate={handleNavigate} />;
      case 'event_detail':
        return selectedEventId ? <EventDetailView eventId={selectedEventId} onNavigate={handleNavigate} onBack={() => setCurrentView('events')} /> : <EventsView onNavigate={handleNavigate} onEventClick={handleEventClick} />;
      case 'favorites':
        return (
          <div className="flex flex-col h-full bg-[#fcfcfc] items-center justify-center p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Oblíbené prodejny</h2>
            <p className="text-sm text-gray-500">Zde najdete vaše uložené secondhandy.</p>
          </div>
        );
      case 'events':
        return <EventsView onNavigate={handleNavigate} onEventClick={handleEventClick} />;
      case 'profile':
        return (
          <div className="flex flex-col h-full bg-[#fcfcfc] items-center justify-center p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Můj profil</h2>
            <p className="text-sm text-gray-500">Správa účtu, recenzí a nastavení.</p>
          </div>
        );
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  const hideNav = currentView === 'shop_detail' || currentView === 'event_detail';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center sm:p-4">
      {/* Mobile Shell Container */}
      <div className="w-full h-[100dvh] sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] bg-black sm:shadow-[0_0_0_12px_#111,0_0_0_14px_#333,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative border-[8px] border-black">
        
        {/* View Content */}
        <div className="w-full h-full relative bg-white overflow-hidden">
          {renderView()}
          
          {/* Navigation */}
          {!hideNav && (
            <BottomNav currentView={currentView} onChangeView={handleNavigate} />
          )}
        </div>

        {/* Dynamic Island / Notch Mock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50 pointer-events-none"></div>
      </div>
    </div>
  );
}
