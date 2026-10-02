import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';
import { HelpinLogo } from './HelpinLogo';

export const Header: React.FC = () => {
  const {
    userMode,
    setUserMode,
    currentLocation,
    setIsLocationModalOpen,
    setActiveTab,
    isNotificationOpen,
    setIsNotificationOpen
  } = useApp();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm max-w-4xl mx-auto">
        {/* Brand mark & Location */}
        <div className="flex items-center gap-space-sm min-w-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 cursor-pointer flex-shrink-0 focus:outline-none hover:opacity-90 transition-opacity"
            type="button"
            aria-label="helpin Home"
          >
            <HelpinLogo size="md" className="h-8" />
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container tracking-wider">
              PRO
            </span>
          </button>
          <div className="flex flex-col min-w-0">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-0.5 text-left text-on-surface-variant hover:text-primary transition-colors min-h-[20px]"
              type="button"
            >
              <span className="text-xs truncate max-w-[130px] font-semibold text-primary">
                {currentLocation}
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary">keyboard_arrow_down</span>
            </button>
          </div>
        </div>

        {/* Client / Partner Switcher & Actions */}
        <div className="flex items-center gap-space-xs">
          {/* Client / Partner Mode Switcher */}
          <div className="flex items-center bg-surface-container-high rounded-full p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => setUserMode('client')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                userMode === 'client'
                  ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setUserMode('partner')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                userMode === 'partner'
                  ? 'bg-surface-container-lowest text-primary shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Partner
            </button>
          </div>

          {/* Notifications Trigger */}
          <button
            aria-label="Notifications"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
          </button>

          {/* User Profile Avatar */}
          <button
            aria-label="Profile"
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
            type="button"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={userMode === 'client' ? ASSETS.userAvatar : ASSETS.rajPartnerAvatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
