import React from 'react';
import { useApp } from '../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen, setActiveTab } = useApp();

  if (!isNotificationOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Technician Assigned',
      desc: 'Rajesh Kumar (Raj Electrical Services) accepted your service request.',
      time: '10 mins ago',
      icon: 'bolt',
      unread: true,
    },
    {
      id: '2',
      title: 'Discount Voucher Active',
      desc: 'Use promo code FIRST50 for ₹50 off your first electrician or plumbing fix.',
      time: '1 hour ago',
      icon: 'local_offer',
      unread: false,
    },
    {
      id: '3',
      title: 'Monsoon Safety Advisory',
      desc: 'Bengaluru Bescom advisory: Ensure your earth leakage circuit breaker (ELCB) is tested.',
      time: 'Yesterday',
      icon: 'shield',
      unread: false,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="w-full max-w-sm bg-surface-container-lowest h-full shadow-2xl p-4 flex flex-col space-y-3 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">notifications</span>
            <h3 className="text-sm font-bold text-on-surface">Notifications</h3>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border text-xs space-y-1 cursor-pointer transition-colors ${
                n.unread
                  ? 'bg-secondary-container/15 border-secondary/30'
                  : 'bg-surface-container-low border-surface-container-high'
              }`}
              onClick={() => {
                setIsNotificationOpen(false);
                setActiveTab('bookings');
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">{n.icon}</span>
                  {n.title}
                </span>
                <span className="text-[10px] text-outline">{n.time}</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
