import React from 'react';
import { useApp } from '../context/AppContext';

export const ProProfileModal: React.FC = () => {
  const {
    selectedPro,
    isProProfileOpen,
    setIsProProfileOpen,
    startBookingFlow,
  } = useApp();

  if (!isProProfileOpen || !selectedPro) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-surface-container-high"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle / Close Bar */}
        <div className="p-space-md border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Verified Pro Profile
            </span>
          </div>
          <button
            onClick={() => setIsProProfileOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-space-md space-y-4">
          {/* Header Card */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={selectedPro.avatar}
                alt={selectedPro.altText}
                className="w-20 h-20 rounded-2xl object-cover shadow-inner"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-xs shadow">
                <span className="material-symbols-outlined text-[15px]">verified</span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-on-surface truncate">
                {selectedPro.companyName}
              </h2>
              <p className="text-sm text-on-surface-variant font-medium">
                {selectedPro.technicianName} ({selectedPro.title})
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <div className="flex items-center gap-0.5 text-tertiary font-bold">
                  <span
                    className="material-symbols-outlined text-[16px] text-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{selectedPro.rating}</span>
                  <span className="text-on-surface-variant font-normal">
                    ({selectedPro.jobsDone} jobs)
                  </span>
                </div>
                <span>•</span>
                <span className="text-primary font-semibold">{selectedPro.distanceKm} km away</span>
              </div>
            </div>
          </div>

          {/* Badges Strip */}
          <div className="flex flex-wrap gap-1.5">
            {selectedPro.badges.map((b, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">award_star</span>
                {b}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface">
              {selectedPro.experienceYears} Years Trade Experience
            </span>
          </div>

          {/* About Section */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline">About Pro</h3>
            <p className="text-xs text-on-surface leading-relaxed">{selectedPro.about}</p>
          </div>

          {/* Specialties */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline">
              Core Specialties
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedPro.specialties.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1 rounded-xl bg-surface-container text-xs font-semibold text-on-surface"
                >
                  ⚡ {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Scheduling Banner */}
          <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-high">
            <div>
              <span className="text-[11px] text-on-surface-variant">Standard Starting Rate</span>
              <p className="text-lg font-bold text-primary">₹{selectedPro.startingPrice}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-on-surface-variant">Next Slot Available</span>
              <p className="text-xs font-bold text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {selectedPro.nextSlot}
              </p>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-outline">
              Verified Client Reviews ({selectedPro.reviews.length})
            </h3>
            <div className="space-y-2">
              {selectedPro.reviews.map((rev, rIdx) => (
                <div
                  key={rIdx}
                  className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container-high space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">{rev.author}</span>
                    <span className="text-outline text-[11px]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-tertiary-container">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="text-on-surface-variant italic leading-relaxed">
                    “{rev.comment}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-space-md border-t border-surface-container-high bg-surface-container-lowest flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[11px] text-on-surface-variant">Estimated Total</span>
            <p className="text-lg font-bold text-on-surface">₹{selectedPro.startingPrice}</p>
          </div>
          <button
            onClick={() => {
              setIsProProfileOpen(false);
              startBookingFlow(selectedPro);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
