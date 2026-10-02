import React from 'react';
import { useApp } from '../context/AppContext';

export const LocationSelectorModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    currentLocation,
    setCurrentLocation,
    showToast,
  } = useApp();

  if (!isLocationModalOpen) return null;

  const popularLocations = [
    { name: 'Indiranagar, Bengaluru', sub: '100ft Rd, Defense Colony, HAL 2nd Stage', availablePros: 18 },
    { name: 'Koramangala, Bengaluru', sub: '4th Block, 5th Block, Sony World Signal', availablePros: 24 },
    { name: 'HSR Layout, Bengaluru', sub: 'Sector 1 to Sector 7, 27th Main', availablePros: 16 },
    { name: 'Bellandur, Bengaluru', sub: 'Green Glen Layout, EcoSpace, Outer Ring Rd', availablePros: 19 },
    { name: 'Whitefield, Bengaluru', sub: 'ITPL Main Rd, Hope Farm, EPIP Zone', availablePros: 22 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-xl border border-surface-container-high overflow-hidden p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
            <h3 className="text-sm font-bold text-on-surface">Select Service Location</h3>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="space-y-1.5">
          {popularLocations.map((loc) => {
            const isSelected = currentLocation.includes(loc.name.split(',')[0]);
            return (
              <button
                key={loc.name}
                onClick={() => {
                  setCurrentLocation(loc.name);
                  setIsLocationModalOpen(false);
                  showToast(`Location updated to ${loc.name}`);
                }}
                className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary/5 border-primary/40 text-primary'
                    : 'bg-surface-container-low border-surface-container-high text-on-surface hover:bg-surface-container'
                }`}
                type="button"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs font-bold block truncate">{loc.name}</span>
                  <span className="text-[10px] text-on-surface-variant block truncate">{loc.sub}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex-shrink-0">
                  {loc.availablePros} Pros
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            setIsLocationModalOpen(false);
            showToast('Detected GPS Location: Indiranagar, Bengaluru (Accuracy: 12m)');
          }}
          className="w-full py-2.5 rounded-xl bg-surface-container-high text-primary text-xs font-bold flex items-center justify-center gap-1 hover:bg-surface-container-highest transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">my_location</span>
          Use Current GPS Location
        </button>
      </div>
    </div>
  );
};
