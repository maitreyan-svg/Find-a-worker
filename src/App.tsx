/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { BookingsHubScreen } from './components/BookingsHubScreen';
import { ChatInboxScreen } from './components/ChatInboxScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PartnerDashboardScreen } from './components/PartnerDashboardScreen';
import { BookingCheckoutModal } from './components/BookingCheckoutModal';
import { ProProfileModal } from './components/ProProfileModal';
import { LocationSelectorModal } from './components/LocationSelectorModal';
import { AddNewAddressModal } from './components/AddNewAddressModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { Toast } from './components/Toast';
import { HelpinLogo } from './components/HelpinLogo';

const MainLayout: React.FC = () => {
  const { userMode, activeTab, isCheckoutOpen } = useApp();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md antialiased selection:bg-primary-fixed relative overflow-x-hidden">
      {/* Ambient Background Blended Logo Watermarks */}
      <div className="fixed top-28 -right-16 w-96 h-60 opacity-[0.035] pointer-events-none select-none -rotate-12 z-0 overflow-hidden">
        <HelpinLogo variant="watermark" />
      </div>
      <div className="fixed bottom-32 -left-20 w-80 h-52 opacity-[0.025] pointer-events-none select-none rotate-6 z-0 overflow-hidden">
        <HelpinLogo variant="watermark" />
      </div>

      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-surface pt-20 pb-20">
        {userMode === 'partner' ? (
          <PartnerDashboardScreen />
        ) : (
          <>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'services' && <ServicesScreen />}
            {activeTab === 'bookings' && <BookingsHubScreen />}
            {activeTab === 'messages' && <ChatInboxScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav />

      {/* Global Interactive Modals & Drawers */}
      {isCheckoutOpen && <BookingCheckoutModal />}
      <ProProfileModal />
      <LocationSelectorModal />
      <AddNewAddressModal />
      <NotificationDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
