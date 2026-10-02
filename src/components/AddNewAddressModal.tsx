import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AddNewAddressModal: React.FC = () => {
  const { isAddAddressModalOpen, setIsAddAddressModalOpen, addAddress } = useApp();

  const [addressType, setAddressType] = useState<'home' | 'office' | 'other'>('home');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  if (!isAddAddressModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!line1.trim() || !line2.trim()) return;

    addAddress({
      type: addressType,
      title: addressType === 'home' ? 'Home' : addressType === 'office' ? 'Office' : 'Other',
      line1: line1.trim(),
      line2: line2.trim(),
      isDefault: false,
    });

    setIsAddAddressModalOpen(false);
    setLine1('');
    setLine2('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-xl border border-surface-container-high overflow-hidden p-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-primary">add_location_alt</span>
            <h3 className="text-sm font-bold text-on-surface">Add Service Address</h3>
          </div>
          <button
            onClick={() => setIsAddAddressModalOpen(false)}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Address Tag Selection */}
          <div className="flex gap-2">
            {(['home', 'office', 'other'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setAddressType(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize border ${
                  addressType === t
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-low text-on-surface border-surface-container-high'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-on-surface-variant block">
              Flat / House No. & Building
            </label>
            <input
              type="text"
              required
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="e.g. Flat 602, Orchid Woods"
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-on-surface-variant block">
              Street, Area & Pincode
            </label>
            <input
              type="text"
              required
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="e.g. 12th Main, HAL 2nd Stage, Bengaluru 560008"
              className="w-full h-10 px-3 rounded-xl bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow hover:bg-primary-container transition-all active:scale-95"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};
