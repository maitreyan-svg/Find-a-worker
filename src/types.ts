export type UserMode = 'client' | 'partner';

export type NavigationTab = 'home' | 'bookings' | 'services' | 'messages' | 'profile';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  bgClass: string;
  textClass: string;
  count?: string;
}

export interface PopularService {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  rating: number;
  imageUrl: string;
  altText: string;
  category: string;
}

export interface Professional {
  id: string;
  companyName: string;
  technicianName: string;
  title: string;
  avatar: string;
  altText: string;
  rating: number;
  jobsDone: number;
  distanceKm: number;
  experienceYears: number;
  badges: string[];
  specialties: string[];
  startingPrice: number;
  priceType: string;
  nextSlot: string;
  verified: boolean;
  phone: string;
  about: string;
  reviews: {
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface ServiceAddress {
  id: string;
  type: 'home' | 'office' | 'other';
  title: string;
  isDefault?: boolean;
  line1: string;
  line2: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  proId: string;
  companyName: string;
  technicianName: string;
  proAvatar: string;
  serviceTitle: string;
  items: string[];
  addons: { name: string; price: number }[];
  date: string;
  slot: string;
  address: ServiceAddress;
  notes: string;
  status: 'assigned' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  otp: string;
  createdAt: string;
  etaMinutes?: number;
}

export interface IncomingJob {
  id: string;
  title: string;
  customerName: string;
  customerPhone: string;
  payout: number;
  address: string;
  distanceKm: number;
  timeSlot: string;
  customerNote: string;
  travelTime: string;
  expiresInSeconds: number;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner' | 'support';
  senderName: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
}
