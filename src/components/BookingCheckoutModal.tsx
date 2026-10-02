import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';
import { Booking } from '../types';

export const BookingCheckoutModal: React.FC = () => {
  const {
    checkoutPro,
    setIsCheckoutOpen,
    addresses,
    setIsAddAddressModalOpen,
    addBooking,
    showToast,
  } = useApp();

  // Pricing & calculation states
  const baseRate = checkoutPro.startingPrice === 299 ? 398 : checkoutPro.startingPrice;
  const [addonRegulator, setAddonRegulator] = useState(true);
  const [addonWiring, setAddonWiring] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('Afternoon');
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 'addr-home');
  const [problemNotes, setProblemNotes] = useState(
    'Fan is making clicking noise and regulator not functioning on speed 2 and 4.'
  );
  const [promoCode, setPromoCode] = useState('FIRST50');
  const [isPromoApplied, setIsPromoApplied] = useState(true);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceNoteRecorded, setVoiceNoteRecorded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate totals
  const addonsTotal = (addonRegulator ? 99 : 0) + (addonWiring ? 49 : 0);
  const subtotal = baseRate + addonsTotal;
  const safetyFee = 29;
  const tax = Math.round(subtotal * 0.09); // Approx GST
  const discount = isPromoApplied ? 50 : 0;
  const finalTotal = subtotal + safetyFee + tax - discount;

  const dateOptions = [
    { label: 'TODAY', day: '23', month: 'Oct' },
    { label: 'TOMORROW', day: '24', month: 'Oct' },
    { label: 'WED', day: '25', month: 'Oct' },
    { label: 'THU', day: '26', month: 'Oct' },
    { label: 'FRI', day: '27', month: 'Oct' },
  ];

  const slotOptions = [
    { id: 'Morning', label: 'Morning', time: '9 - 12 PM', icon: 'wb_twilight' },
    { id: 'Afternoon', label: 'Afternoon', time: '12 - 4 PM', icon: 'sunny' },
    { id: 'Evening', label: 'Evening', time: '4 - 8 PM', icon: 'bedtime' },
  ];

  const handleTogglePromo = () => {
    if (isPromoApplied) {
      setIsPromoApplied(false);
      showToast('Promo code removed');
    } else {
      if (promoCode.trim().toUpperCase() === 'FIRST50' || promoCode.trim().toUpperCase() === 'PRONEAR') {
        setIsPromoApplied(true);
        showToast('Promo code applied: ₹50 OFF');
      } else {
        showToast('Invalid promo code. Try FIRST50');
      }
    }
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      showToast('Recording voice note... speak now');
      setTimeout(() => {
        setIsRecordingVoice(false);
        setVoiceNoteRecorded(true);
        showToast('Voice note attached (14 sec)');
      }, 3000);
    } else {
      setIsRecordingVoice(false);
      setVoiceNoteRecorded(true);
    }
  };

  const handleConfirmSchedule = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const chosenAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        bookingCode: `PN-${Math.floor(1000 + Math.random() * 9000)}`,
        proId: checkoutPro.id,
        companyName: checkoutPro.companyName,
        technicianName: checkoutPro.technicianName,
        proAvatar: checkoutPro.avatar,
        serviceTitle: 'Ceiling Fan Installation & Switch Repair',
        items: ['Ceiling Fan Installation', 'Switchboard Repair'],
        addons: [
          ...(addonRegulator ? [{ name: 'Fan regulator replacement', price: 99 }] : []),
          ...(addonWiring ? [{ name: 'Earthing & Wiring load test', price: 49 }] : []),
        ],
        date: `${selectedDate}, 24 Oct`,
        slot: `${selectedSlot} (${selectedSlot === 'Morning' ? '9 - 12 PM' : selectedSlot === 'Afternoon' ? '12 - 4 PM' : '4 - 8 PM'})`,
        address: chosenAddr,
        notes: problemNotes,
        status: 'assigned',
        totalAmount: finalTotal,
        otp: `${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: 'Just now',
        etaMinutes: 25,
      };

      addBooking(newBooking);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface overflow-y-auto pb-safe">
      {/* Checkout Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-margin flex items-center justify-between gap-space-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Go back"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-low transition-colors -ml-2"
              onClick={() => setIsCheckoutOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="ProNear Brand Mark"
              className="h-7 w-auto object-contain flex-shrink-0"
              src={ASSETS.logo}
            />
            <h1 className="text-base font-semibold text-on-surface truncate">Booking Checkout</h1>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Search options"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">more_vert</span>
            </button>
            <button
              aria-label="Profile"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                src={ASSETS.userAvatar}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-28 max-w-2xl mx-auto">
        <div className="flex flex-col w-full pb-10">
          {/* Progress Header */}
          <div className="px-margin pt-space-md pb-space-sm bg-surface">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Step 2 of 4
              </span>
              <span className="text-[11px] text-on-surface-variant font-medium">50% Completed</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-1/2 rounded-full transition-all duration-300"></div>
            </div>
            <h2 className="text-xl font-bold text-on-surface mt-space-sm">Schedule & Address</h2>
          </div>

          {/* Professional & Service Summary Card */}
          <div className="px-margin my-space-sm">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high/60">
              <div className="flex items-start gap-space-md">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-xl shadow-xs"
                    src={checkoutPro.avatar}
                    alt={checkoutPro.altText}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary rounded-full p-0.5 shadow-sm">
                    <span
                      className="material-symbols-outlined text-[14px] block"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-space-xs">
                    <h3 className="text-sm font-bold text-on-surface truncate">
                      {checkoutPro.companyName}
                    </h3>
                    <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex-shrink-0">
                      <span
                        className="material-symbols-outlined text-tertiary-container text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-bold">{checkoutPro.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {checkoutPro.title} • {checkoutPro.experienceYears}+ yrs exp
                  </p>
                  <div className="mt-space-xs inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface-container-low text-primary">
                    <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
                    <span className="text-xs font-semibold">
                      Ceiling Fan Installation & Switch Repair (2 items)
                    </span>
                  </div>
                  <div className="mt-space-xs flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">Base Rate</span>
                    <span className="text-sm font-bold text-on-surface">₹{baseRate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Popular Add-ons */}
          <div className="px-margin mt-space-md">
            <div className="flex items-center justify-between mb-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h4 className="text-sm font-bold text-on-surface">Popular Add-ons</h4>
              </div>
              <span className="text-[11px] text-secondary bg-secondary-fixed/40 px-2 py-0.5 rounded-full font-bold">
                Recommended
              </span>
            </div>
            <div className="space-y-space-xs">
              {/* Add-on 1: Fan regulator */}
              <label
                onClick={() => setAddonRegulator(!addonRegulator)}
                className={`flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer transition-all border ${
                  addonRegulator ? 'border-primary/40 bg-primary/5' : 'border-surface-container-high/60'
                }`}
              >
                <div className="flex items-start gap-space-sm min-w-0 pr-space-xs">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-on-primary transition-colors flex-shrink-0 mt-0.5 ${
                      addonRegulator ? 'bg-primary' : 'bg-surface-container-high text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-on-surface">Fan regulator replacement</p>
                    <p className="text-xs text-on-surface-variant">
                      Includes standard heavy-duty rotary module
                    </p>
                  </div>
                </div>
                <span className="text-sm text-primary font-bold whitespace-nowrap">+₹99</span>
              </label>

              {/* Add-on 2: Earthing */}
              <label
                onClick={() => setAddonWiring(!addonWiring)}
                className={`flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer transition-all border ${
                  addonWiring ? 'border-primary/40 bg-primary/5' : 'border-surface-container-high/60'
                }`}
              >
                <div className="flex items-start gap-space-sm min-w-0 pr-space-xs">
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-on-primary transition-colors flex-shrink-0 mt-0.5 ${
                      addonWiring ? 'bg-primary' : 'bg-surface-container-high text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-on-surface">
                      Earthing & Wiring load test
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Voltage surge testing for high safety
                    </p>
                  </div>
                </div>
                <span className="text-sm text-primary font-bold whitespace-nowrap">+₹49</span>
              </label>
            </div>
          </div>

          {/* Step 2: Date Selection */}
          <div className="px-margin mt-space-lg">
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h4 className="text-sm font-bold text-on-surface">Select Date</h4>
            </div>
            <div className="flex gap-space-sm overflow-x-auto pb-1 -mx-margin px-margin no-scrollbar">
              {dateOptions.map((date) => {
                const isSelected = selectedDate === date.label;
                return (
                  <button
                    key={date.label}
                    className={`date-chip flex flex-col items-center justify-center min-w-[76px] py-space-sm px-space-xs rounded-xl shadow-sm transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md'
                        : 'bg-surface-container-lowest text-on-surface border border-surface-container-high'
                    }`}
                    onClick={() => setSelectedDate(date.label)}
                    type="button"
                  >
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-on-primary/80 font-semibold' : 'text-on-surface-variant'
                      }`}
                    >
                      {date.label}
                    </span>
                    <span className="text-xl font-bold my-0.5">{date.day}</span>
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-on-primary/80' : 'text-on-surface-variant'
                      }`}
                    >
                      {date.month}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Select Time Slot */}
          <div className="px-margin mt-space-lg">
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h4 className="text-sm font-bold text-on-surface">Select Time Slot</h4>
            </div>
            <div className="grid grid-cols-3 gap-space-xs">
              {slotOptions.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    className={`slot-pill flex flex-col items-center p-space-sm rounded-xl shadow-sm transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md'
                        : 'bg-surface-container-lowest text-on-surface border border-surface-container-high'
                    }`}
                    onClick={() => setSelectedSlot(slot.id)}
                    type="button"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] mb-1 ${
                        isSelected
                          ? 'text-primary-fixed'
                          : slot.id === 'Morning'
                          ? 'text-tertiary-container'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {slot.icon}
                    </span>
                    <span className="text-sm font-semibold">{slot.label}</span>
                    <span
                      className={`text-[11px] ${
                        isSelected ? 'text-on-primary/80 font-medium' : 'text-on-surface-variant'
                      }`}
                    >
                      {slot.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Service Address */}
          <div className="px-margin mt-space-lg">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <h4 className="text-sm font-bold text-on-surface">Service Address</h4>
              </div>
              <button
                className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                onClick={() => setIsAddAddressModalOpen(true)}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Add New
              </button>
            </div>

            <div className="space-y-space-xs">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <label
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`address-option flex items-start gap-space-sm p-space-md rounded-xl shadow-sm cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-secondary-container/20 border-secondary/40'
                        : 'bg-surface-container-lowest border-surface-container-high'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-surface-container-high text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-space-xs mb-0.5">
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isSelected ? 'text-secondary' : 'text-on-surface-variant'
                          }`}
                        >
                          {addr.type === 'home' ? 'home' : 'business'}
                        </span>
                        <span className="text-sm text-on-surface font-bold">{addr.title}</span>
                        {addr.isDefault && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary-container text-on-secondary-container uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface font-medium truncate">{addr.line1}</p>
                      <p className="text-xs text-on-surface-variant truncate">{addr.line2}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 5: Problem Description & Notes */}
          <div className="px-margin mt-space-lg">
            <div className="flex items-center gap-2 mb-space-sm">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed text-xs flex items-center justify-center font-bold">
                5
              </span>
              <h4 className="text-sm font-bold text-on-surface">Problem Description & Notes</h4>
            </div>
            <div className="relative bg-surface-container-lowest rounded-xl p-space-sm shadow-sm border border-surface-container-high">
              <textarea
                className="w-full bg-transparent p-space-xs text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none resize-none"
                placeholder="Provide extra details for Raj (e.g. ladder required, ceiling height, noise symptoms)..."
                rows={3}
                value={problemNotes}
                onChange={(e) => setProblemNotes(e.target.value)}
              />
              <div className="flex items-center justify-between pt-space-xs px-space-xs border-t border-surface-container-high/40">
                <button
                  type="button"
                  onClick={handleToggleVoiceRecord}
                  className={`flex items-center gap-1 transition-colors ${
                    isRecordingVoice
                      ? 'text-error font-bold animate-pulse'
                      : voiceNoteRecorded
                      ? 'text-secondary font-bold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isRecordingVoice ? 'stop_circle' : voiceNoteRecorded ? 'mic_external_on' : 'mic'}
                  </span>
                  <span className="text-[11px]">
                    {isRecordingVoice
                      ? 'Recording... (Tap to stop)'
                      : voiceNoteRecorded
                      ? 'Voice note attached (14s)'
                      : 'Tap to add voice note'}
                  </span>
                </button>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  {problemNotes.length}/250
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown Card */}
          <div className="px-margin mt-space-lg">
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-high">
              <h4 className="text-sm font-bold text-on-surface mb-space-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-primary">
                  receipt_long
                </span>
                Payment Summary
              </h4>

              {/* Promo Code Box */}
              <div className="flex items-center gap-space-xs mb-space-md p-1.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2 pl-space-xs flex-1 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    local_offer
                  </span>
                  <input
                    className="bg-transparent text-sm text-on-surface font-bold tracking-wider uppercase focus:outline-none w-full"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  />
                </div>
                <button
                  className={`px-space-md py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 ${
                    isPromoApplied
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                  onClick={handleTogglePromo}
                  type="button"
                >
                  {isPromoApplied ? 'APPLIED' : 'APPLY'}
                </button>
              </div>

              {/* Line items */}
              <div className="space-y-space-xs text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Service Total (Base + Add-ons)</span>
                  <span className="text-on-surface font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Safety & Equipment fee</span>
                  <span className="text-on-surface font-medium">₹{safetyFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Taxes (GST 18%)</span>
                  <span className="text-on-surface font-medium">₹{tax}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between items-center text-secondary font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">celebration</span>
                      Promo Discount ({promoCode})
                    </span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="pt-space-sm mt-space-sm bg-surface-container-high h-[1px] w-full"></div>
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Final Amount</p>
                    <p className="text-[11px] text-on-surface-variant">
                      Pay post-service via UPI / Cash / Card
                    </p>
                  </div>
                  <p className="text-xl font-extrabold text-on-surface">₹{finalTotal}</p>
                </div>
              </div>

              {/* Guarantee Chip */}
              <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-center gap-space-sm">
                <span
                  className="material-symbols-outlined text-[20px] text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <p className="text-[11px] text-on-surface-variant leading-tight">
                  ProNear 30-Day Happiness Guarantee covers all parts & service faults.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-surface-container-lowest shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-margin py-space-sm z-50 pb-safe border-t border-surface-container-high">
        <div className="flex items-center justify-between gap-space-md max-w-2xl mx-auto">
          <div>
            <span className="text-[11px] text-on-surface-variant uppercase font-semibold">
              To Pay
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-on-surface">₹{finalTotal}</span>
              {isPromoApplied && (
                <span className="text-xs text-secondary font-bold">Saved ₹{discount}</span>
              )}
            </div>
          </div>
          <button
            className={`flex-1 py-3 px-space-lg rounded-xl text-on-primary text-sm font-bold shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
              isSubmitting ? 'bg-secondary' : 'bg-primary hover:bg-primary-container'
            }`}
            onClick={handleConfirmSchedule}
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                <span>Booking Confirmed...</span>
              </>
            ) : (
              <>
                <span>Confirm & Schedule</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
