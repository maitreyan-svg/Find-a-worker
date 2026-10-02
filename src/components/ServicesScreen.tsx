import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PROFESSIONALS, ASSETS } from '../data/mockData';
import { Professional } from '../types';

export const ServicesScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeSort,
    setActiveSort,
    activeFilters,
    toggleFilter,
    resetFilters,
    setSelectedPro,
    setIsProProfileOpen,
    startBookingFlow,
    currentLocation
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [showDemoEmptyState, setShowDemoEmptyState] = useState(false);
  const [selectedMapPro, setSelectedMapPro] = useState<Professional>(PROFESSIONALS[0]);

  const sortOptions = ['Recommended', 'Highest Rated', 'Price: Low to High', 'Nearest'];

  const filterOptions = [
    { label: 'Rating 4.5+', icon: 'star', filled: true },
    { label: 'Under ₹499', icon: 'payments', filled: false },
    { label: '< 3 km', icon: 'near_me', filled: false },
    { label: 'Available Today', icon: 'today', filled: false },
    { label: 'Instant Booking', icon: 'bolt', filled: false },
  ];

  // Filtering and sorting logic
  const filteredPros = useMemo(() => {
    let list = [...PROFESSIONALS];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => {
        return (
          p.companyName.toLowerCase().includes(q) ||
          p.technicianName.toLowerCase().includes(q) ||
          p.specialties.some((s) => s.toLowerCase().includes(q)) ||
          p.about.toLowerCase().includes(q) ||
          q.includes('fan') ||
          q.includes('mcb') ||
          q.includes('spark') ||
          q.includes('tripping') ||
          q.includes('electric')
        );
      });
    }

    // Filter by chips
    if (activeFilters.includes('Rating 4.5+')) {
      list = list.filter((p) => p.rating >= 4.5);
    }
    if (activeFilters.includes('Under ₹499')) {
      list = list.filter((p) => p.startingPrice < 499);
    }
    if (activeFilters.includes('< 3 km')) {
      list = list.filter((p) => p.distanceKm < 3.0);
    }

    // Sort
    if (activeSort === 'Highest Rated') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'Price: Low to High') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (activeSort === 'Nearest') {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return list;
  }, [searchQuery, activeFilters, activeSort]);

  const handleViewProfile = (pro: Professional) => {
    setSelectedPro(pro);
    setIsProProfileOpen(true);
  };

  const handleBookNow = (pro: Professional) => {
    setSelectedPro(pro);
    startBookingFlow(pro);
  };

  return (
    <div className="flex flex-col w-full px-margin pb-space-xl max-w-2xl mx-auto">
      {/* Contextual Breadcrumb & Category Title Block */}
      <section className="flex flex-col gap-space-xs pt-space-md mb-space-md">
        <div className="flex items-center gap-1.5 text-primary">
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Home Repairs • Quick Dispatch
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface">
          Electrician Services & Repairs
        </h1>
        <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
          <span>Showing 18 verified electricians near {currentLocation}</span>
        </div>
      </section>

      {/* Search & View Toggle Controls */}
      <section className="flex flex-col gap-space-sm mb-space-md">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-surface-container-lowest text-on-surface text-sm shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors"
            placeholder="Search for repair, wiring, or technician name..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              aria-label="Clear search query"
              className="absolute right-3 w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface bg-surface-container-high transition-colors"
              onClick={() => setSearchQuery('')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* View Mode Switcher & Sort Dropdown */}
        <div className="flex items-center justify-between gap-space-sm">
          <div className="inline-flex p-1 rounded-xl bg-surface-container-high">
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setViewMode('list')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              <span>List View</span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              onClick={() => setViewMode('map')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              <span>Map View</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-lowest text-on-surface shadow-sm text-xs font-semibold hover:bg-surface-container-low transition-colors"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              type="button"
            >
              <span className="text-on-surface-variant font-normal">Sort:</span>
              <span className="font-bold text-primary">{activeSort}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {isSortDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsSortDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-48 rounded-xl bg-surface-container-lowest shadow-xl p-1 z-30 flex flex-col gap-0.5 border border-surface-container-high">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        activeSort === opt
                          ? 'bg-surface-container-low text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low font-medium'
                      }`}
                      onClick={() => {
                        setActiveSort(opt);
                        setIsSortDropdownOpen(false);
                      }}
                      type="button"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Filter Chips */}
      <section className="mb-space-lg -mx-margin px-margin overflow-x-auto no-scrollbar flex items-center gap-2">
        {filterOptions.map((chip) => {
          const isSelected = activeFilters.includes(chip.label);
          return (
            <button
              key={chip.label}
              onClick={() => toggleFilter(chip.label)}
              className={`filter-chip flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex-shrink-0 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={chip.filled || isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {chip.icon}
              </span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </section>

      {/* View Mode = MAP VIEW */}
      {viewMode === 'map' && (
        <section className="mb-space-lg">
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-surface-container-lowest border border-surface-container-high">
            <div className="relative w-full h-80 bg-surface-container">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-300"
                style={{ backgroundImage: `url('${ASSETS.mapPreview}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent pointer-events-none"></div>

              {/* Live Interactive Technician Pins */}
              {PROFESSIONALS.map((pro, idx) => {
                const isSelected = selectedMapPro.id === pro.id;
                // Pin layout coordinates
                const positions = [
                  { top: '25%', left: '20%' },
                  { bottom: '35%', right: '22%' },
                  { top: '48%', left: '55%' },
                ];
                const pos = positions[idx] || { top: '40%', left: '40%' };

                return (
                  <button
                    key={pro.id}
                    onClick={() => setSelectedMapPro(pro)}
                    style={{ top: pos.top, left: pos.left, right: pos.right }}
                    className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-semibold transition-transform active:scale-95 ${
                      isSelected
                        ? 'bg-primary text-on-primary ring-2 ring-white scale-110 z-20'
                        : 'bg-surface-container-lowest text-on-surface hover:scale-105 z-10'
                    }`}
                    type="button"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-secondary-fixed animate-ping' : 'bg-secondary'
                      }`}
                    ></span>
                    <span className="font-bold">{pro.technicianName}</span>
                    <span>• {pro.distanceKm} km</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Pro Mini Card in Map */}
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={selectedMapPro.avatar}
                  alt={selectedMapPro.technicianName}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-on-surface truncate">
                    {selectedMapPro.companyName}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <span className="font-bold text-tertiary-container flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {selectedMapPro.rating}
                    </span>
                    <span>•</span>
                    <span>{selectedMapPro.distanceKm} km away</span>
                    <span>•</span>
                    <span className="text-primary font-bold">₹{selectedMapPro.startingPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => handleViewProfile(selectedMapPro)}
                  className="px-3 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-semibold hover:bg-surface-container-highest transition-colors"
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => handleBookNow(selectedMapPro)}
                  className="px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:opacity-95 transition-transform active:scale-95"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Professional Cards Listing */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-space-lg" id="cards-container">
          {filteredPros.length > 0 ? (
            filteredPros.map((pro, index) => {
              // Custom gradient highlight per card
              const gradientGlow =
                index === 0
                  ? 'from-primary/10'
                  : index === 1
                  ? 'from-secondary/10'
                  : 'from-tertiary/10';

              return (
                <article
                  key={pro.id}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden transition-all hover:shadow-md border border-surface-container-high/40"
                >
                  {/* Ambient Sparkle Highlight */}
                  <div
                    className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${gradientGlow} via-transparent to-transparent pointer-events-none`}
                  ></div>

                  {/* Header: Photo, Name, Badges, Metrics */}
                  <div className="flex items-start gap-space-sm">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-16 h-16 rounded-xl object-cover shadow-inner cursor-pointer"
                        src={pro.avatar}
                        alt={pro.altText}
                        referrerPolicy="no-referrer"
                        onClick={() => handleViewProfile(pro)}
                      />
                      {pro.verified && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[12px] shadow-sm">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h2
                          className="text-base font-semibold text-on-surface truncate cursor-pointer hover:text-primary transition-colors"
                          onClick={() => handleViewProfile(pro)}
                        >
                          {pro.companyName}
                        </h2>
                      </div>
                      <span className="text-sm text-on-surface-variant">{pro.technicianName}</span>
                      <div className="flex items-center gap-2 mt-1 text-on-surface-variant flex-wrap text-xs">
                        <div className="flex items-center gap-1 text-tertiary font-bold">
                          <span
                            className="material-symbols-outlined text-[16px] text-tertiary-container"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span>{pro.rating}</span>
                          <span className="text-on-surface-variant font-normal">
                            ({pro.jobsDone} jobs)
                          </span>
                        </div>
                        <span className="text-outline">•</span>
                        <div className="flex items-center gap-0.5 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[15px]">location_on</span>
                          <span>{pro.distanceKm} km away</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges Strip */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pro.badges.map((badge, bIdx) => {
                      let badgeClass = 'bg-surface-container-high text-on-surface';
                      let icon = 'security';
                      if (badge.includes('Top Rated')) {
                        badgeClass = 'bg-secondary-fixed text-on-secondary-fixed font-bold';
                        icon = 'award_star';
                      } else if (badge.includes('Super Pro')) {
                        badgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed font-bold';
                        icon = 'workspace_premium';
                      } else if (badge.includes('Ultra Fast') || badge.includes('Fast')) {
                        badgeClass = 'bg-secondary-container text-on-secondary-container font-bold';
                        icon = 'bolt';
                      } else if (badge.includes('exp')) {
                        badgeClass = 'bg-surface-container text-on-surface-variant';
                        icon = 'electric_bolt';
                      }

                      return (
                        <span
                          key={bIdx}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide flex items-center gap-1 ${badgeClass}`}
                        >
                          <span className="material-symbols-outlined text-[12px]">{icon}</span>
                          {badge}
                        </span>
                      );
                    })}
                  </div>

                  {/* Specialities Pill Cloud */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pro.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface text-[11px] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Pricing & Scheduling Ribbon */}
                  <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-2.5 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-on-surface-variant">Starting from</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl text-primary font-bold">₹{pro.startingPrice}</span>
                        <span className="text-[11px] text-on-surface-variant line-clamp-1">
                          ({pro.priceType})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-lowest shadow-sm text-secondary text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{pro.nextSlot}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      className="w-full py-2.5 px-3 rounded-lg bg-surface-container-high text-on-surface text-sm font-semibold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1 active:scale-98"
                      onClick={() => handleViewProfile(pro)}
                      type="button"
                    >
                      <span>View Profile</span>
                    </button>
                    <button
                      className="w-full py-2.5 px-3 rounded-lg bg-primary text-on-primary text-sm font-semibold shadow-sm hover:opacity-95 transition-transform active:scale-[0.98] flex items-center justify-center gap-1"
                      onClick={() => handleBookNow(pro)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                      <span>Book Now</span>
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            /* Dynamic Zero-Results Empty State */
            <div className="p-space-lg rounded-xl flex flex-col items-center text-center bg-surface-container-lowest border border-surface-container-high shadow-sm my-space-md">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                <span className="material-symbols-outlined text-[32px]">search_off</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-1">No electricians found</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mb-space-md">
                We couldn't find verified pros matching all applied filters in this perimeter. Try
                broadening your search or resetting filters.
              </p>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm transition-transform active:scale-95"
                onClick={resetFilters}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Map Preview Mockup Card (shown in list mode) */}
      {viewMode === 'list' && (
        <section className="mt-space-lg">
          <div className="relative rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest flex flex-col border border-surface-container-high">
            <div className="relative w-full h-44 bg-surface-container">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${ASSETS.mapPreview}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent pointer-events-none"></div>

              {/* Live Marker Tags Overlaid on Map Preview */}
              <div className="absolute top-4 left-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-md text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="font-bold text-primary">Rajesh K.</span> • 1.4 km
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface shadow-md text-xs font-semibold">
                <span className="material-symbols-outlined text-secondary text-[14px]">
                  electric_bolt
                </span>
                <span className="font-bold text-on-surface">Suresh N.</span> • 2.6 km
              </div>
            </div>

            {/* Preview Footer with CTA */}
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
                  <span className="text-sm font-semibold text-on-surface truncate">
                    Explore electricians on live map
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant truncate">
                  See real-time transit & nearest technicians
                </span>
              </div>
              <button
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:opacity-95 transition-transform active:scale-95"
                onClick={() => setViewMode('map')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">near_me</span>
                <span>Open Map</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Empty State Fallback Accordion (Delight / Interactive Demo) */}
      <section className="mt-space-lg">
        <div className="rounded-xl bg-surface-container-low overflow-hidden transition-all border border-surface-container-high/60">
          <button
            className="w-full px-space-md py-3 flex items-center justify-between text-left text-on-surface-variant hover:text-on-surface text-xs font-semibold"
            onClick={() => setShowDemoEmptyState(!showDemoEmptyState)}
            type="button"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-tertiary">tune</span>
              <span>Preview zero-results empty state UX</span>
            </span>
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                showDemoEmptyState ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {showDemoEmptyState && (
            <div className="p-space-lg flex flex-col items-center text-center bg-surface-container-lowest border-t border-surface-container-high/50">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                <span className="material-symbols-outlined text-[32px]">search_off</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-1">No electricians found</h3>
              <p className="text-xs text-on-surface-variant max-w-xs mb-space-md">
                We couldn't find verified pros matching all applied filters in this perimeter. Try
                broadening your distance or price limit.
              </p>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm transition-transform active:scale-95"
                onClick={() => {
                  resetFilters();
                  setShowDemoEmptyState(false);
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
