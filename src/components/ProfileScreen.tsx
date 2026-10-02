import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';
import { HelpinLogo } from './HelpinLogo';

export const ProfileScreen: React.FC = () => {
  const {
    userMode,
    setUserMode,
    addresses,
    setIsAddAddressModalOpen,
    showToast,
    setIsLocationModalOpen,
    currentLocation,
  } = useApp();

  return (
    <div className="flex flex-col w-full px-margin pb-28 max-w-2xl mx-auto space-y-4">
      {/* Profile Card Header */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high mt-space-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userMode === 'client' ? ASSETS.userAvatar : ASSETS.rajPartnerAvatar}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-on-surface">
                {userMode === 'client' ? 'Ananya Sharma' : 'Rajesh Kumar'}
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold uppercase">
                {userMode === 'client' ? 'Plus Member' : 'Master Pro'}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              {userMode === 'client' ? '+91 98450 77123' : '+91 98450 12891'}
            </p>
            <p className="text-xs text-primary font-medium">{currentLocation}</p>
          </div>
        </div>

        <button
          onClick={() => {
            const nextMode = userMode === 'client' ? 'partner' : 'client';
            setUserMode(nextMode);
            showToast(`Switched to ${nextMode === 'client' ? 'Client' : 'Partner'} Mode`);
          }}
          className="px-3 py-1.5 rounded-xl bg-surface-container-high text-xs font-bold text-primary hover:bg-surface-container-highest transition-colors active:scale-95"
          type="button"
        >
          {userMode === 'client' ? 'Partner Mode' : 'Customer Mode'}
        </button>
      </div>

      {/* Helpin Plus Membership Card */}
      {userMode === 'client' && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-4 text-on-primary shadow-md">
          {/* Subtle Blended Logo Watermark */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-48 h-28 opacity-15 pointer-events-none select-none mix-blend-overlay rotate-[-8deg]">
            <HelpinLogo variant="watermark" />
          </div>
          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md">
                Helpin Plus Protection
              </span>
              <span className="text-xs font-bold text-secondary-fixed">ACTIVE</span>
            </div>
            <h3 className="text-base font-bold">Zero Inspection Fee on all Electrical Fixes</h3>
            <p className="text-xs text-on-primary/80">
              Includes 30-day rework warranty, genuine spare parts guarantee, and priority dispatch.
            </p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
        </div>
      )}

      {/* Saved Addresses Section */}
      <section className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wide text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
            Saved Addresses ({addresses.length})
          </h2>
          <button
            onClick={() => setIsAddAddressModalOpen(true)}
            className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">add</span>
            Add New
          </button>
        </div>

        <div className="space-y-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-2.5 rounded-xl bg-surface-container-low flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-on-surface">{addr.title}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] px-1 rounded bg-secondary-container text-on-secondary-container font-bold">
                      DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface truncate">{addr.line1}</p>
                <p className="text-xs text-on-surface-variant truncate">{addr.line2}</p>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-xs text-primary font-semibold hover:underline"
                type="button"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wide text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-secondary">payments</span>
          Payment & Escrow Methods
        </h2>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">account_balance_wallet</span>
              <span className="font-semibold">UPI AutoPay / GPay / PhonePe</span>
            </div>
            <span className="text-secondary font-bold">Linked ✔</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-outline">credit_card</span>
              <span className="font-semibold">HDFC Bank Debit Card ending in 4108</span>
            </div>
            <span className="text-outline font-medium">Saved</span>
          </div>
        </div>
      </section>

      {/* Emergency Electrical & Home Safety Protocol */}
      <section className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-high space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wide text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
          Emergency Safety Tips
        </h2>
        <div className="space-y-1.5 text-xs text-on-surface-variant">
          <p className="p-2 rounded-lg bg-surface-container-low">
            ⚡ <strong>Main Breaker Tripping:</strong> Turn off all air conditioners and geysers before resetting the residual circuit breaker (RCCB).
          </p>
          <p className="p-2 rounded-lg bg-surface-container-low">
            🔥 <strong>Burning Plastic Odor:</strong> Cut off mains supply immediately and do not touch warm wall switchboards.
          </p>
        </div>
      </section>

      {/* Support & Hotline */}
      <div className="p-4 rounded-2xl bg-surface-container flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-on-surface">Helpin Safety Support</h4>
          <p className="text-[11px] text-on-surface-variant">24/7 dedicated dispatch resolution</p>
        </div>
        <a
          href="tel:1800-435-746"
          className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1.5 active:scale-95"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          1800-HELP-IN
        </a>
      </div>
    </div>
  );
};
