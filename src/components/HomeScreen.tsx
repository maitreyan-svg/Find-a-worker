import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, POPULAR_SERVICES, PROFESSIONALS, OTHER_VERIFIED_PROS } from '../data/mockData';
import { Professional } from '../types';
import { HelpinLogo } from './HelpinLogo';

export const HomeScreen: React.FC = () => {
  const {
    setActiveTab,
    setSelectedCategory,
    startBookingFlow,
    setUserMode,
    setIsLocationModalOpen,
    currentLocation,
    setSearchQuery,
    setSelectedPro,
    setIsProProfileOpen,
    showToast
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveTab('services');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'electrician') {
      setSearchQuery('Ceiling fan spark & MCB tripping');
    } else {
      setSearchQuery('');
    }
    setActiveTab('services');
  };

  const handleBookPro = (pro: Professional) => {
    setSelectedPro(pro);
    startBookingFlow(pro);
  };

  const handleViewProProfile = (pro: Professional) => {
    setSelectedPro(pro);
    setIsProProfileOpen(true);
  };

  const verifiedProsList = [
    PROFESSIONALS[0], // Raj Electrical
    OTHER_VERIFIED_PROS[0], // Amit AC
    OTHER_VERIFIED_PROS[1], // Priya Clean
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-6 max-w-2xl mx-auto">
      {/* Search & Location Quick Bar */}
      <section className="px-margin space-y-3">
        <div className="flex items-center justify-between text-on-surface">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="material-symbols-outlined text-primary text-[20px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
            <div className="truncate">
              <span className="text-xs font-semibold text-on-surface truncate block">
                {currentLocation} 560038
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-xs text-primary font-bold hover:underline flex-shrink-0"
            type="button"
          >
            Change
          </button>
        </div>

        {/* Live Search Field */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">
            search
          </span>
          <input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-12 pl-11 pr-12 rounded-xl bg-surface-container-lowest text-on-surface text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 placeholder:text-outline/70 transition-all"
            placeholder="Search Electrician, AC Repair, Cleaning..."
            type="text"
          />
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            aria-label="Open Filters"
            className="absolute right-2 w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </form>
      </section>

      {/* Hero Banner Card */}
      <section className="px-margin">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-space-md text-on-primary shadow-lg">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
              <span className="text-[11px] font-bold text-on-primary tracking-wide">
                LIGHTNING FAST DISPATCH
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-on-primary leading-tight max-w-[270px]">
              Trusted home experts at your doorstep in 30 mins
            </h2>
            <p className="text-sm text-on-primary/85 max-w-[280px]">
              Vetted neighborhood specialists ready to tackle fixes, repairs, and cleanups right now.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => handleCategoryClick('electrician')}
                className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-primary text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Book Now</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 grid grid-cols-3 gap-2">
              <div className="flex items-center gap-1 text-on-primary/95">
                <span
                  className="material-symbols-outlined text-[16px] text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-[11px] font-semibold">Verified Pros</span>
              </div>
              <div className="flex items-center gap-1 text-on-primary/95">
                <span
                  className="material-symbols-outlined text-[16px] text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
                <span className="text-[11px] font-semibold">Upfront Price</span>
              </div>
              <div className="flex items-center gap-1 text-on-primary/95">
                <span
                  className="material-symbols-outlined text-[16px] text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                <span className="text-[11px] font-semibold">30-Day Cover</span>
              </div>
            </div>
          </div>
          {/* Ambient Glow & Blended Transparent Logo in Background */}
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-72 h-44 opacity-25 pointer-events-none select-none mix-blend-overlay rotate-[-6deg]">
            <HelpinLogo variant="watermark" />
          </div>
          <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
        </div>
      </section>

      {/* Service Categories Grid (3x3 Layout) */}
      <section className="px-margin space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-on-surface font-bold">Categories</h3>
          <span className="text-xs text-primary font-bold uppercase tracking-wider">
            9 Trades
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group active:scale-95"
              type="button"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform mb-1.5 ${cat.bgClass}`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {cat.icon}
                </span>
              </div>
              <span className="text-xs font-semibold text-on-surface text-center leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Services Horizontal Carousel */}
      <section className="space-y-3">
        <div className="px-margin flex items-center justify-between">
          <div>
            <h3 className="text-xl text-on-surface font-bold">Popular Services</h3>
            <p className="text-xs text-on-surface-variant">Frequently requested today in your area</p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-xs text-primary font-bold hover:underline"
            type="button"
          >
            View all
          </button>
        </div>
        <div className="flex overflow-x-auto gap-3.5 px-margin no-scrollbar py-1">
          {POPULAR_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="w-64 flex-shrink-0 bg-surface-container-lowest rounded-2xl shadow-sm p-3 flex flex-col justify-between space-y-3 transition-transform hover:shadow-md"
            >
              <div className="relative h-28 w-full rounded-xl overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  src={srv.imageUrl}
                  alt={srv.altText}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary text-xs font-bold flex items-center gap-0.5">
                  <span
                    className="material-symbols-outlined text-[13px] text-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {srv.rating}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface truncate">{srv.title}</h4>
                <p className="text-xs text-on-surface-variant line-clamp-1">{srv.subtitle}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[11px] text-outline">Starting at</span>
                  <p className="text-lg font-bold text-primary">₹{srv.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryClick(srv.category);
                    showToast(`Selected: ${srv.title}`);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed text-xs font-bold hover:bg-primary-fixed-dim transition-colors flex items-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Professionals Near You */}
      <section className="px-margin space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl text-on-surface font-bold">Verified Pros Near You</h3>
            <p className="text-xs text-on-surface-variant">Background-checked neighborhood tradespeople</p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="text-xs text-primary font-bold hover:underline"
            type="button"
          >
            Filters
          </button>
        </div>

        <div className="space-y-3">
          {verifiedProsList.map((pro) => (
            <div
              key={pro.id}
              className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-3"
            >
              <div className="flex items-start gap-3">
                <div
                  className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface-container flex-shrink-0 cursor-pointer"
                  onClick={() => handleViewProProfile(pro)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={pro.avatar}
                    alt={pro.altText}
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="absolute bottom-0 right-0 bg-secondary rounded-tl-lg p-0.5 text-on-secondary"
                    title="Background Checked"
                  >
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className="text-sm font-bold text-on-surface truncate cursor-pointer hover:text-primary transition-colors"
                      onClick={() => handleViewProProfile(pro)}
                    >
                      {pro.companyName}
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                      {pro.nextSlot.includes('mins') ? pro.nextSlot : '25 mins'}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">
                    {pro.title} • {pro.experienceYears} yrs exp
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5 text-tertiary-container font-bold text-xs">
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {pro.rating}
                    </div>
                    <span className="text-outline text-xs">•</span>
                    <span className="text-[11px] text-on-surface-variant">
                      {pro.jobsDone} jobs done
                    </span>
                    <span className="text-outline text-xs">•</span>
                    <span className="text-[11px] text-primary font-semibold">
                      {pro.distanceKm} km away
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/40">
                <div>
                  <span className="text-[11px] text-outline">Inspection & Visit</span>
                  <p className="text-sm font-bold text-on-surface">
                    ₹{pro.startingPrice} <span className="text-xs text-outline font-normal">onwards</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleBookPro(pro)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>Book Now</span>
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Helpin Works: 4-Step Stepper */}
      <section className="px-margin space-y-3">
        <div className="flex flex-col">
          <h3 className="text-xl text-on-surface font-bold">How Helpin Works</h3>
          <p className="text-xs text-on-surface-variant">Simple, safe, and zero hidden surprises</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-low shadow-sm space-y-4">
          <div className="grid grid-cols-4 gap-2 relative">
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-surface-container-high -z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shadow">
                1
              </div>
              <span className="text-[11px] font-bold text-on-surface leading-tight">
                Choose Service
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shadow">
                2
              </div>
              <span className="text-[11px] font-bold text-on-surface leading-tight">
                Pick Verified Pro
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center shadow">
                3
              </div>
              <span className="text-[11px] font-bold text-on-surface leading-tight">
                Select Slot
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center shadow">
                4
              </div>
              <span className="text-[11px] font-bold text-on-surface leading-tight">
                Pay After Work
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-lowest flex items-center gap-2.5">
            <span
              className="material-symbols-outlined text-secondary text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security
            </span>
            <p className="text-xs text-on-surface leading-tight">
              Your payment stays safely in escrow until you inspect and approve the job.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="space-y-3">
        <div className="px-margin flex items-center justify-between">
          <div>
            <h3 className="text-xl text-on-surface font-bold">Neighbourhood Love</h3>
            <p className="text-xs text-on-surface-variant">Recent reviews from Indiranagar residents</p>
          </div>
          <div className="flex items-center gap-1 text-tertiary-container font-bold text-xs">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            4.9/5
          </div>
        </div>
        <div className="flex overflow-x-auto gap-3.5 px-margin no-scrollbar py-1">
          {/* Testimonial 1 */}
          <div className="w-72 flex-shrink-0 p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-tertiary-container">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-outline">Yesterday</span>
              </div>
              <p className="text-xs text-on-surface-variant italic leading-relaxed">
                “Raj arrived within 20 mins for our main breaker tripping emergency on Sunday.
                Transparent pricing, no fuss. Fantastic experience!”
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2 border-t border-surface-container-high/40">
              <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary-container text-xs">
                SK
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-on-surface truncate">Siddharth Kumar</h5>
                <p className="text-[11px] text-primary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Verified Booking
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="w-72 flex-shrink-0 p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-tertiary-container">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs text-outline">3 days ago</span>
              </div>
              <p className="text-xs text-on-surface-variant italic leading-relaxed">
                “Priya's deep cleaning crew turned our post-renovation dust catastrophe into a
                showroom finish. Professional equipment and respectful staff.”
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2 border-t border-surface-container-high/40">
              <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary text-xs">
                AM
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-bold text-on-surface truncate">Ananya Menon</h5>
                <p className="text-[11px] text-primary flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">verified</span> Verified Booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Switch Banner (Partner Mode) */}
      <section className="px-margin">
        <div className="p-4 rounded-2xl bg-inverse-surface text-inverse-on-surface shadow-md flex items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="inline-flex items-center gap-1 text-secondary-fixed">
              <span className="material-symbols-outlined text-[16px]">handyman</span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Join As Professional
              </span>
            </div>
            <h4 className="text-sm font-bold truncate">Earn ₹45,000+/mo</h4>
            <p className="text-xs text-outline-variant line-clamp-1">Zero commission in your first 30 days</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setUserMode('partner');
              showToast('Switched to Partner Mode');
            }}
            className="px-3.5 py-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex-shrink-0 hover:bg-secondary-fixed-dim transition-colors shadow-sm active:scale-95"
          >
            Switch Pro
          </button>
        </div>
      </section>

      {/* Clean Footer Assurance & Hotline */}
      <section className="px-margin pt-2 space-y-4">
        <div className="p-4 rounded-2xl bg-surface-container flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-on-surface">Helpin Happiness Guarantee</h5>
              <p className="text-xs text-on-surface-variant">Free re-work if you're not 100% satisfied</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-xs text-on-surface font-semibold">24/7 Priority Support Active</span>
            </div>
            <a
              className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
              href="tel:1800-435-746"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              1800-HELP-IN
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
