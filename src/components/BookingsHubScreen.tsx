import React from 'react';
import { useApp } from '../context/AppContext';

export const BookingsHubScreen: React.FC = () => {
  const { bookings, setActiveTab, showToast, startBookingFlow } = useApp();

  const activeBookings = bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  return (
    <div className="flex flex-col w-full px-margin pb-28 max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="pt-space-md">
        <h1 className="text-2xl font-bold text-on-surface">Bookings Hub</h1>
        <p className="text-xs text-on-surface-variant">Track ongoing dispatches and past service history</p>
      </div>

      {/* Active Bookings Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-on-surface uppercase tracking-wide">
            Active Dispatches ({activeBookings.length})
          </h2>
          <span className="text-xs text-secondary font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Live Updates
          </span>
        </div>

        {activeBookings.length > 0 ? (
          activeBookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high space-y-3"
            >
              {/* Top Bar: Code, Status & Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs bg-surface-container-high font-mono font-bold text-on-surface">
                    {bk.bookingCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-secondary-container text-on-secondary-container flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                    Technician on the way
                  </span>
                </div>
                <span className="text-base font-bold text-primary">₹{bk.totalAmount}</span>
              </div>

              {/* Technician Info */}
              <div className="flex items-start gap-3 pt-1">
                <img
                  src={bk.proAvatar}
                  alt={bk.technicianName}
                  className="w-14 h-14 rounded-xl object-cover shadow-inner flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-on-surface truncate">{bk.companyName}</h3>
                  <p className="text-xs text-on-surface-variant">{bk.technicianName} (Master Electrician)</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">
                    Arriving in ~{bk.etaMinutes || 14} mins • 1.4 km away
                  </p>
                </div>
                {/* OTP Box */}
                <div className="bg-surface-container-low p-2 rounded-xl text-center border border-surface-container-high">
                  <span className="text-[10px] text-outline font-semibold uppercase block">Start OTP</span>
                  <span className="text-sm font-mono font-bold text-primary">{bk.otp}</span>
                </div>
              </div>

              {/* Service details */}
              <div className="p-2.5 rounded-xl bg-surface-container-low text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">bolt</span>
                  <span>{bk.serviceTitle}</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  <span>{bk.date} • {bk.slot}</span>
                </div>
                <div className="flex items-start gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px] flex-shrink-0">location_on</span>
                  <span className="truncate">{bk.address.line1}, {bk.address.line2}</span>
                </div>
              </div>

              {/* Actions row */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-surface-container-high/40">
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className="py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Chat with Pro</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Calling technician Rajesh Kumar (+91 98450 12891)...')}
                  className="py-2.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Call Technician</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 rounded-2xl bg-surface-container-lowest text-center space-y-3 border border-surface-container-high">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-primary">
              <span className="material-symbols-outlined text-[24px]">event_available</span>
            </div>
            <p className="text-sm font-semibold text-on-surface">No active dispatches</p>
            <p className="text-xs text-on-surface-variant">Need quick electrical or plumbing help?</p>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold"
            >
              Explore Services
            </button>
          </div>
        )}
      </section>

      {/* Past Bookings Section */}
      <section className="space-y-3 pt-4">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-wide">
          Past Bookings
        </h2>

        {pastBookings.length > 0 ? (
          pastBookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border border-surface-container-high flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-on-surface">{bk.serviceTitle}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {bk.companyName} • ₹{bk.totalAmount}
                </p>
              </div>
              <button
                type="button"
                onClick={() => startBookingFlow()}
                className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-bold text-primary hover:bg-surface-container-highest"
              >
                Book Again
              </button>
            </div>
          ))
        ) : (
          <div className="bg-surface-container-lowest rounded-xl p-4 text-xs text-on-surface-variant border border-surface-container-high text-center">
            Completed service receipts and warranties will show here.
          </div>
        )}
      </section>
    </div>
  );
};
