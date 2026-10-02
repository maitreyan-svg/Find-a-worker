import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';

export const PartnerDashboardScreen: React.FC = () => {
  const {
    setUserMode,
    partnerIsOnline,
    togglePartnerOnline,
    incomingJob,
    acceptIncomingJob,
    declineIncomingJob,
    partnerEarnings,
    partnerCompletedJobs,
    showToast,
    setActiveTab,
  } = useApp();

  // Countdown timer for incoming flash request
  const [secondsRemaining, setSecondsRemaining] = useState<number>(165); // 2 min 45 sec
  const [activeJobStatus, setActiveJobStatus] = useState<'on_the_way' | 'in_progress' | 'completed'>('on_the_way');
  const [showIncentivesModal, setShowIncentivesModal] = useState(false);
  const [showPayoutsModal, setShowPayoutsModal] = useState(false);
  const [showRatesModal, setShowRatesModal] = useState(false);

  useEffect(() => {
    if (!incomingJob || incomingJob.status !== 'pending') return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          declineIncomingJob();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingJob]);

  const formatTimer = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s} min`;
  };

  const handleStartOrCompleteJob = () => {
    if (activeJobStatus === 'on_the_way') {
      setActiveJobStatus('in_progress');
      showToast('Job started! Timer & safety checklist active.');
    } else if (activeJobStatus === 'in_progress') {
      setActiveJobStatus('completed');
      showToast('Job completed! Invoice generated and OTP verified.');
    } else {
      showToast('Job already completed.');
    }
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md max-w-2xl mx-auto pb-10">
      {/* Provider Mode Banner */}
      <div className="flex items-center justify-between bg-surface-container-high px-space-md py-space-sm rounded-xl">
        <div className="flex items-center gap-space-xs min-w-0">
          <span
            className="material-symbols-outlined text-[18px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            badge
          </span>
          <span className="text-xs font-semibold text-on-surface truncate">Provider Mode Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        </div>
        <button
          onClick={() => {
            setUserMode('client');
            showToast('Switched back to Client Mode');
          }}
          className="flex items-center gap-0.5 text-primary hover:text-on-surface-variant transition-colors min-h-[28px] px-2 py-0.5 rounded-lg bg-surface-container-lowest shadow-sm active:scale-95"
          type="button"
        >
          <span className="text-[11px] font-bold">Switch to Customer</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* Partner Greeting & Online Status Hero Bar */}
      <div className="flex items-center justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-high/60">
        <div className="flex items-center gap-space-sm">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
              src={ASSETS.rajPartnerAvatar}
              alt="Rajesh Kumar Master Electrician"
            />
            <span
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-surface-container-lowest transition-colors ${
                partnerIsOnline ? 'bg-secondary' : 'bg-outline'
              }`}
            ></span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-on-surface tracking-tight">Hello, Rajesh! 👋</h1>
            <p className="text-xs text-on-surface-variant">Master Electrician • Indiranagar</p>
          </div>
        </div>

        {/* Interactive Status Toggle Pill */}
        <button
          onClick={togglePartnerOnline}
          className={`cursor-pointer select-none flex items-center gap-space-xs px-3 py-1.5 rounded-full shadow-sm transition-all active:scale-95 ${
            partnerIsOnline ? 'bg-secondary-container/40' : 'bg-surface-container-high'
          }`}
          type="button"
        >
          <span className="relative flex h-2.5 w-2.5">
            {partnerIsOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                partnerIsOnline ? 'bg-secondary' : 'bg-outline'
              }`}
            ></span>
          </span>
          <span
            className={`text-[11px] font-bold tracking-wide uppercase ${
              partnerIsOnline ? 'text-secondary' : 'text-on-surface-variant'
            }`}
          >
            {partnerIsOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </button>
      </div>

      {/* Urgent Incoming Job Offer Card */}
      {incomingJob && incomingJob.status === 'pending' && (
        <div
          className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-md border-2 border-primary/40 animate-in fade-in zoom-in-95 duration-300"
          id="incomingJobCard"
        >
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="flex h-2 w-2 rounded-full bg-tertiary"></span>
              <span className="text-[11px] uppercase text-tertiary font-bold tracking-wider">
                New Instant Job Match
              </span>
            </div>
            <div className="flex items-center gap-1 bg-tertiary-container/10 px-2 py-0.5 rounded-full">
              <span
                className="material-symbols-outlined text-[14px] text-tertiary animate-spin"
                style={{ animationDuration: '4s' }}
              >
                timer
              </span>
              <span className="text-xs text-tertiary font-bold">{formatTimer(secondsRemaining)}</span>
            </div>
          </div>

          <div className="mt-space-xs flex items-start justify-between gap-space-sm">
            <div>
              <h2 className="text-sm font-bold text-on-surface">{incomingJob.title}</h2>
              <div className="flex items-center gap-1 text-on-surface-variant mt-0.5">
                <span className="material-symbols-outlined text-[15px] text-primary">person</span>
                <span className="text-xs text-on-surface font-semibold">
                  {incomingJob.customerName}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0 bg-secondary-container/20 px-3 py-1.5 rounded-lg">
              <span className="text-[10px] text-on-surface-variant block uppercase font-medium">
                Payout
              </span>
              <span className="text-lg text-secondary font-bold">₹{incomingJob.payout}</span>
            </div>
          </div>

          {/* Location & Schedule Details */}
          <div className="mt-space-sm space-y-1.5 bg-surface-container-low p-space-sm rounded-lg text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-outline flex-shrink-0">
                  location_on
                </span>
                <span className="text-xs text-on-surface truncate">{incomingJob.address}</span>
              </div>
              <span className="text-xs text-primary flex-shrink-0 font-semibold">
                {incomingJob.distanceKm} km away
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-outline flex-shrink-0">
                schedule
              </span>
              <span className="text-xs text-on-surface">{incomingJob.timeSlot}</span>
            </div>
            <div className="flex items-start gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary flex-shrink-0">
                info
              </span>
              <span className="text-xs text-on-surface-variant italic leading-snug">
                "{incomingJob.customerNote}"
              </span>
            </div>
          </div>

          {/* Quick Mini Location Graphic */}
          <div className="mt-space-sm h-16 w-full rounded-lg overflow-hidden relative">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${ASSETS.routeMapGraphic}')` }}
            ></div>
            <div className="absolute inset-0 bg-inverse-surface/10 flex items-center justify-center pointer-events-none">
              <div className="bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  navigation
                </span>
                <span className="text-[11px] text-on-surface font-semibold">
                  {incomingJob.travelTime}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-space-md grid grid-cols-5 gap-space-xs">
            <button
              className="col-span-2 py-2.5 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant text-xs font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95"
              onClick={declineIncomingJob}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              Decline
            </button>
            <button
              className="col-span-3 py-2.5 px-space-sm rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1"
              onClick={acceptIncomingJob}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              Accept (₹{incomingJob.payout})
            </button>
          </div>
        </div>
      )}

      {/* Key Daily Stats (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-space-sm">
        {/* Stat 1: Earnings */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Today's Earnings</span>
            <div className="w-7 h-7 rounded-full bg-secondary-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl text-on-surface font-bold">₹{partnerEarnings.toLocaleString()}</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-secondary">trending_up</span>
              <span className="text-xs text-secondary font-semibold">+18% vs y'day</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Jobs Done */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Completed Jobs</span>
            <div className="w-7 h-7 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-primary">task_alt</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-on-surface font-bold">{partnerCompletedJobs}</span>
              <span className="text-xs text-on-surface-variant">/ 6 target</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (partnerCompletedJobs / 6) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stat 3: Pending Leads */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Job Requests</span>
            <div className="w-7 h-7 rounded-full bg-tertiary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                notifications_active
              </span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl text-tertiary font-bold">2 New</span>
            <span className="text-xs text-on-surface-variant block mt-0.5 truncate">
              HAL & Domlur areas
            </span>
          </div>
        </div>

        {/* Stat 4: Rating & Tier */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-high/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Partner Rating</span>
            <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-1">
              <span className="text-2xl text-on-surface font-bold">4.88</span>
              <span
                className="material-symbols-outlined text-[18px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-on-surface-variant">342 reviews</span>
              <span className="px-1.5 py-0.2 bg-tertiary-container/10 text-tertiary text-[10px] font-bold rounded">
                GOLD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Job Queue Section */}
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">route</span>
            <h2 className="text-lg font-bold text-on-surface">Today's Schedule</h2>
          </div>
          <span className="text-xs text-primary font-semibold px-2 py-0.5 rounded-full bg-primary-container/10">
            2 Confirmed
          </span>
        </div>

        {/* Active Job Card (Ongoing) */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-sm border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container-high text-on-surface-variant font-mono">
                #PN-8921
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                {activeJobStatus === 'on_the_way'
                  ? 'On the way'
                  : activeJobStatus === 'in_progress'
                  ? 'In Progress'
                  : 'Completed'}
              </span>
            </div>
            <span className="text-sm font-bold text-on-surface">₹650</span>
          </div>

          <div className="flex items-start justify-between gap-space-xs">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-on-surface">Inverter Fuse & Battery Check</h3>
              <p className="text-xs text-on-surface-variant">
                Customer: <strong className="text-on-surface font-semibold">Manoj Kumar</strong>
              </p>
              <p className="text-xs text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                Flat 402, Green Glen Layout, Bellandur (2.1 km)
              </p>
            </div>
            <a
              aria-label="Call Customer"
              className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-secondary-container/30 flex items-center justify-center text-primary transition-colors flex-shrink-0"
              href="tel:+919876543210"
              onClick={(e) => {
                e.preventDefault();
                showToast('Dialing customer Manoj Kumar (+91 98765 43210)...');
              }}
            >
              <span className="material-symbols-outlined text-[20px]">phone</span>
            </a>
          </div>

          {/* Action Row */}
          <div className="pt-space-xs flex items-center gap-space-xs">
            <button
              className="flex-1 py-2.5 px-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow transition-colors flex items-center justify-center gap-1 active:scale-95"
              onClick={handleStartOrCompleteJob}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {activeJobStatus === 'on_the_way'
                  ? 'play_arrow'
                  : activeJobStatus === 'in_progress'
                  ? 'task_alt'
                  : 'check'}
              </span>
              {activeJobStatus === 'on_the_way'
                ? 'Start Job'
                : activeJobStatus === 'in_progress'
                ? 'Complete & Generate Invoice'
                : 'Job Completed'}
            </button>
            <button
              className="py-2.5 px-3 rounded-lg bg-surface-container-high text-on-surface-variant text-xs font-semibold transition-colors flex items-center gap-1 hover:text-on-surface active:scale-95"
              onClick={() => showToast('Opening GPS route navigation via 100ft Rd...')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              Maps
            </button>
          </div>
        </div>

        {/* Scheduled Upcoming Job Card */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-xs opacity-95 border border-surface-container-high">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container-high text-on-surface-variant font-mono">
                #PN-8919
              </span>
              <span className="text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">
                Scheduled
              </span>
            </div>
            <span className="text-sm font-bold text-on-surface">₹800</span>
          </div>
          <div className="flex items-start justify-between gap-space-xs pt-1">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Kitchen Chimney Concealed Wiring</h3>
              <p className="text-xs text-on-surface-variant">
                Customer: <strong className="text-on-surface font-semibold">Vikram Rao</strong>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-primary flex items-center gap-0.5 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">alarm</span>
                  Today at 6:00 PM
                </span>
                <span className="text-outline-variant text-xs">•</span>
                <span className="text-xs text-outline">Defiance Colony (3.5 km)</span>
              </div>
            </div>
            <button
              aria-label="Booking Details"
              className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
              onClick={() => showToast('Job Details: Customer requested 4-core copper wiring')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Earnings & Performance Target */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-xs border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">insights</span>
            <span className="text-sm font-bold text-on-surface">October Revenue Goal</span>
          </div>
          <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded">
            87% reached
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-xl text-on-surface font-extrabold">₹48,250</span>
            <span className="text-xs text-on-surface-variant"> earned</span>
          </div>
          <span className="text-xs text-outline font-semibold">Goal: ₹55,000</span>
        </div>
        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mt-1">
          <div
            className="bg-primary h-full rounded-full transition-all duration-1000"
            style={{ width: '87.7%' }}
          ></div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-on-surface-variant">₹6,750 needed by Oct 31</span>
          <button
            onClick={() => setShowIncentivesModal(true)}
            className="text-xs text-primary font-semibold flex items-center gap-0.5 hover:underline"
            type="button"
          >
            View Incentive Tiers
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Quick Shortcut Action Tiles */}
      <div className="space-y-space-xs pt-1">
        <h3 className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Action 1: Bank Payouts */}
          <button
            className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-3 text-left hover:bg-surface-container-low transition-colors border border-surface-container-high active:scale-95"
            onClick={() => setShowPayoutsModal(true)}
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 text-secondary">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-on-surface block leading-tight truncate">
                Payouts
              </span>
              <span className="text-xs text-on-surface-variant truncate block">Instant Transfer</span>
            </div>
          </button>

          {/* Action 2: Rates & Catalog */}
          <button
            className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-3 text-left hover:bg-surface-container-low transition-colors border border-surface-container-high active:scale-95"
            onClick={() => setShowRatesModal(true)}
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary">
              <span className="material-symbols-outlined text-[20px]">build_circle</span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-on-surface block leading-tight truncate">
                Rates
              </span>
              <span className="text-xs text-on-surface-variant truncate block">Custom Rate Card</span>
            </div>
          </button>

          {/* Action 3: Verification Badge */}
          <button
            className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-3 text-left hover:bg-surface-container-low transition-colors border border-surface-container-high active:scale-95"
            onClick={() => showToast('Aadhaar & Electrical Master License verified by ProNear Compliance')}
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 text-secondary">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-on-surface block leading-tight truncate">
                KYC Docs
              </span>
              <span className="text-xs text-secondary font-semibold truncate block">Verified ✔</span>
            </div>
          </button>

          {/* Action 4: Pro Helpdesk */}
          <button
            className="p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-3 text-left hover:bg-surface-container-low transition-colors border border-surface-container-high active:scale-95"
            onClick={() => setActiveTab('messages')}
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-on-surface block leading-tight truncate">
                Help Desk
              </span>
              <span className="text-xs text-on-surface-variant truncate block">24x7 Partner Care</span>
            </div>
          </button>
        </div>
      </div>

      {/* Safety & Guarantee Badge Note */}
      <div className="py-space-xs text-center flex items-center justify-center gap-1 text-outline">
        <span className="material-symbols-outlined text-[14px]">shield</span>
        <span className="text-[11px]">
          ProNear Partner Protection Plan Active • Covered up to ₹1,00,000
        </span>
      </div>

      {/* Incentive Tiers Modal */}
      {showIncentivesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-surface-container-high">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface">Partner Incentive Tiers</h3>
              <button
                onClick={() => setShowIncentivesModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-tertiary-fixed/30 border border-tertiary-container/30">
                <span className="font-bold text-tertiary block text-sm">GOLD (Current)</span>
                <p className="text-on-surface-variant">
                  30+ jobs/month • ₹3,000 monthly bonus + 0% platform fee on emergency calls.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-secondary-container/30 border border-secondary/30">
                <span className="font-bold text-secondary block text-sm">PLATINUM (Next Target)</span>
                <p className="text-on-surface-variant">
                  50+ jobs/month • ₹7,500 monthly bonus + Priority dispatch algorithm lock.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <span className="font-bold text-primary block text-sm">DIAMOND MASTER</span>
                <p className="text-on-surface-variant">
                  75+ jobs/month • ₹15,000 bonus + Free annual toolkit & insurance renewal.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIncentivesModal(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payouts Modal */}
      {showPayoutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-surface-container-high">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface">Instant Bank Payout</h3>
              <button
                onClick={() => setShowPayoutsModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low text-xs space-y-1">
              <span className="text-on-surface-variant">Available Balance</span>
              <p className="text-2xl font-bold text-secondary">₹{partnerEarnings.toLocaleString()}</p>
              <p className="text-[11px] text-outline">Linked to HDFC Bank A/C ending in 4108</p>
            </div>
            <button
              onClick={() => {
                showToast(`Transferred ₹${partnerEarnings} to HDFC Bank instantly via IMPS!`);
                setShowPayoutsModal(false);
              }}
              className="w-full py-3 rounded-xl bg-secondary text-on-secondary text-xs font-bold shadow active:scale-95"
            >
              Transfer Now (Zero Fees)
            </button>
          </div>
        </div>
      )}

      {/* Custom Rates Modal */}
      {showRatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-surface-container-high">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface">Custom Rate Card</h3>
              <button
                onClick={() => setShowRatesModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span>Standard Inspection</span>
                <span className="font-bold text-primary">₹299</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span>Fan Installation</span>
                <span className="font-bold text-primary">₹398</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span>Complete Inverter Wiring</span>
                <span className="font-bold text-primary">₹650</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-lg bg-surface-container-low">
                <span>Emergency Night Dispatch</span>
                <span className="font-bold text-primary">+₹150</span>
              </div>
            </div>
            <button
              onClick={() => {
                showToast('Rate card changes saved.');
                setShowRatesModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold"
            >
              Save Rate Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
