import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserMode,
  NavigationTab,
  Professional,
  ServiceAddress,
  Booking,
  IncomingJob,
  ChatMessage,
} from '../types';
import {
  PROFESSIONALS,
  INITIAL_SAVED_ADDRESSES,
  INITIAL_BOOKINGS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_INCOMING_JOB
} from '../data/mockData';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSort: string;
  setActiveSort: (s: string) => void;
  activeFilters: string[];
  toggleFilter: (f: string) => void;
  resetFilters: () => void;
  selectedPro: Professional;
  setSelectedPro: (pro: Professional) => void;
  isProProfileOpen: boolean;
  setIsProProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutPro: Professional;
  startBookingFlow: (pro?: Professional) => void;
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  addresses: ServiceAddress[];
  addAddress: (addr: Omit<ServiceAddress, 'id'>) => void;
  isAddAddressModalOpen: boolean;
  setIsAddAddressModalOpen: (open: boolean) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  incomingJob: IncomingJob | null;
  acceptIncomingJob: () => void;
  declineIncomingJob: () => void;
  partnerIsOnline: boolean;
  togglePartnerOnline: () => void;
  partnerEarnings: number;
  partnerCompletedJobs: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('client');
  const [activeTab, setActiveTab] = useState<NavigationTab>('services');
  const [selectedCategory, setSelectedCategory] = useState<string>('electrician');
  const [searchQuery, setSearchQuery] = useState<string>('Ceiling fan spark & MCB tripping');
  const [activeSort, setActiveSort] = useState<string>('Recommended');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Rating 4.5+']);
  const [selectedPro, setSelectedPro] = useState<Professional>(PROFESSIONALS[0]);
  const [isProProfileOpen, setIsProProfileOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutPro, setCheckoutPro] = useState<Professional>(PROFESSIONALS[0]);
  const [currentLocation, setCurrentLocation] = useState<string>('Indiranagar, Bengaluru');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<ServiceAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [incomingJob, setIncomingJob] = useState<IncomingJob | null>(INITIAL_INCOMING_JOB);
  const [partnerIsOnline, setPartnerIsOnline] = useState<boolean>(true);
  const [partnerEarnings, setPartnerEarnings] = useState<number>(1850);
  const [partnerCompletedJobs, setPartnerCompletedJobs] = useState<number>(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const resetFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    showToast('Filters reset to default');
  };

  const startBookingFlow = (pro?: Professional) => {
    const targetPro = pro || selectedPro;
    setCheckoutPro(targetPro);
    setIsCheckoutOpen(true);
  };

  const addAddress = (newAddr: Omit<ServiceAddress, 'id'>) => {
    const addrWithId: ServiceAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    setAddresses((prev) => [addrWithId, ...prev]);
    showToast(`Added new address: ${newAddr.title}`);
  };

  const addBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setIsCheckoutOpen(false);
    setActiveTab('bookings');
    showToast('Booking successfully scheduled!');
  };

  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: userMode === 'client' ? 'user' : 'partner',
      senderName: userMode === 'client' ? 'Ananya Sharma' : 'Rajesh Kumar',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated reply
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        sender: userMode === 'client' ? 'partner' : 'user',
        senderName: userMode === 'client' ? 'Rajesh Kumar (Electrician)' : 'Ananya Sharma (Customer)',
        text:
          userMode === 'client'
            ? 'Got it, Ananya ji! I have the required tools and spare modules ready. Approaching your street now.'
            : 'Thank you Rajesh bhaiya! The guard will let you enter when you say Flat 402.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  const acceptIncomingJob = () => {
    if (!incomingJob) return;
    setPartnerEarnings((prev) => prev + incomingJob.payout);
    setPartnerCompletedJobs((prev) => prev + 1);
    setIncomingJob((prev) => (prev ? { ...prev, status: 'accepted' } : null));
    showToast(`Job accepted! ₹${incomingJob.payout} added to today's earnings.`);
    setTimeout(() => {
      setIncomingJob(null);
    }, 2000);
  };

  const declineIncomingJob = () => {
    setIncomingJob((prev) => (prev ? { ...prev, status: 'declined' } : null));
    showToast('Job offer declined');
    setTimeout(() => {
      setIncomingJob(null);
    }, 600);
  };

  const togglePartnerOnline = () => {
    setPartnerIsOnline((prev) => {
      const next = !prev;
      showToast(next ? 'You are now ONLINE to receive jobs' : 'You are now OFFLINE');
      return next;
    });
  };

  return (
    <AppContext.Provider
      value={{
        userMode,
        setUserMode,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeSort,
        setActiveSort,
        activeFilters,
        toggleFilter,
        resetFilters,
        selectedPro,
        setSelectedPro,
        isProProfileOpen,
        setIsProProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutPro,
        startBookingFlow,
        currentLocation,
        setCurrentLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        addresses,
        addAddress,
        isAddAddressModalOpen,
        setIsAddAddressModalOpen,
        bookings,
        addBooking,
        chatMessages,
        sendChatMessage,
        incomingJob,
        acceptIncomingJob,
        declineIncomingJob,
        partnerIsOnline,
        togglePartnerOnline,
        partnerEarnings,
        partnerCompletedJobs,
        toastMessage,
        showToast,
        isNotificationOpen,
        setIsNotificationOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
