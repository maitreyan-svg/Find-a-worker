import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, bookings, chatMessages } = useApp();

  const activeBookingsCount = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled').length;
  const unreadMessagesCount = chatMessages.filter((m) => m.sender !== 'user').length > 0 ? 1 : 0;

  const navItems: { tab: NavigationTab; label: string; icon: string; badge?: number }[] = [
    { tab: 'home', label: 'Home', icon: 'home' },
    { tab: 'bookings', label: 'Bookings', icon: 'calendar_today', badge: activeBookingsCount },
    { tab: 'services', label: 'Services', icon: 'search' },
    { tab: 'messages', label: 'Messages', icon: 'forum', badge: unreadMessagesCount },
    { tab: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,23,42,0.06)] border-t border-surface-container-high/40">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[11px] mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
