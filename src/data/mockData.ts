import { Professional, ServiceCategory, PopularService, ServiceAddress, Booking, IncomingJob, ChatMessage } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UFCLc3hc_Xychs6MsbGcJn1y6JP-nXwc8W_hGo7ER_80rIbS_Ndxm5qq4VY4m7SOWVI-xyXEbQhwQ9q5fQlEpE4GBxn278srrqLpwS-im4jEABwF3crTVVssH-Ilpz5ozlN9W3Jw6pHzUZ7QSXj4eaYx-xrwOLbqY-4qLRFWuxY-rlGMcIFB8mejqMnEHKBLvrMOAQFiWOKc0j_NSdk-AHV0HYE0Lcns4wbA3lW0D_pyMH90JE_frtHXU',
  userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuj21KVi0Rl2l5wR1sa7qdBToyuxQGVLiUpB8wl-kh7yQxQe4klMA7IQK2JzDFTRcDWT6bTe2cWv_-nF4H6VXY_cV5djWHCdxeXXga7X51CL6PT5mm8-oJXlsmvTjkOj33UEbeNNgBcBdT8o-bQLwiBIIxCV7rOsL039rkGsLPXJCysu285DoqzHSV6c80vP3XPmONouXE9F3LYuYsDXy3lvd1UcdUoo2h9kjt5Xfp1e0fTQyrFe1d',
  rajAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAetR5fEU37aVT0epIZzIdOVkExw5-BAVFGjEOn0jPR1OUei0OfkTmy2qE1ZVzKyx776wbIu_P5Tl90NEhtUSBc7qM_hEz5dGeBvtFRN7ta9u6LnibnDFpv0xTl79Z9KS1gUzWU3Dixbqcy9C-uXWiLYiaCjZPpXZnAEhRPW0PgSV0-6Hx3CZ-5cogvWLQcHlmF_96f0elEwUnxRoHisnBXFqvcwLETC1c646oXNcyeJv-cW3IytTro',
  sureshAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvsTBhRVb4vMTPJciXuOSEFgS0-sAIyO1F5nC5hfuK4v65pdzac-QHaqvi-2P7Kd83MH-O1T5OYDougVnZwpvt8SRRhpr0T36iqCRsavvwJqkcgAxXBFQGpgZhphE2mzGSz-mGpiSRKsZW9OzrU4OlFGSjde918T0FWiIIsb3yBquF8CJkgHoPlayPk9C0dXcOjQpfvgAyMSnpsmJtSm6zgbFhu8e1olgsjjuRqe2PeEOOr2FrC4cL',
  arjunAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6UfZyUrkmx4bO_Anb-GmwXTEA74wEN-3rdG171tGtEIsksKnpzJ0ucdqZt7S6MWc_w_ilswshuTO9EaANAA_inCKGVu_8oVJDwIGxfWCyulXdEUL200Wtppyq3ipAj5QPL65-lGxjci4aU_ycGr7pfCKLtbXB3uvmnGUwCUPeLFic4_S3M6CYwbh9Tz4gjxhkl2KQFoLr6cd2jl80wARyW3M-k-j7jJ8b77CT_YfvPpeDQa3KZw5q',
  amitAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmGHGcD-96wmGZSxCFkTrxs-paMp3aYfnbbqW-lnxh2E2vFTaw13xHfGN3LXFDXlo_CYuU5RD20e3E9cFFKexO7A8IhQftOPX3x5Vca6t_e7ifBR4_7yRK7oyarggvRQ5hXAAejPsgnlxbAroIsZ-Q8BppxdybxJiRGn1Z681wti_1e-xbPMN9zEyGu80cq2Wf46U6cRpSoBYwoPREZIKPj9Vd7pXKnd0TsOuGAuN3DEuYLpWjI_tm',
  priyaAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCttE8S6sXwedRi8o1dNNHckBiNEyQvQqQSsXNHtExKY4VqzmDLTSnp4czmAOHyYUEj9zFuAGPpHk-hlXHCH2JcT0So7kEYb-aRc5bRmL03yuQKiJ9sOkHdEye3BftNeaY6BlusTTwpn4jzDMhI3BOfxTSmVODRXNZo2ZRjH2mm8nF1kBAhWmYyFskdKSSgwAq2bmSvaAbUgRJn1ZFVEoDMnYWVywL_ZTbnkXaHASPZMWGiibgwwI6E',
  mapPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2DpOc1ezH1MwB_SONqYmMjNYRngBvORniTXQsyUJGhfMVEk4y-aQ7UxAWUzge4iOF06q-XB-Y6vOtf5zchIMm6WNj7CoaWGSBODU6STdP6-06okO9gE8ZfdmzKSRKIt0R0hEP5QAWPNIF_NVq_kXHC1wBnm-8rOKyRrRACHrHLszyqumGcrM7O7M2JnLJBDx6A6BjDAPc3vpSVFxBBNXu8fOe4JGMtAkw7vzlXv9NJ56bRPbB7_Wf',
  acService: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1WwKe5Y91k4qYcxu2kDGTPI01vm2bhBDI6lm1rTNrI9usQU6nlrf-CNWIybIAReQQG_mnf6NLj9caoAqssk7L5TxaA9q4UlK38-b-6GlIGGSkexgDEisLyL4yG8LwAwLggjgYeOvuehKGHeVy8bQdc43HBr6D2HfNomm-G96X8BqNqS83Tp8wLAUoWsv8XQA03a-iSt3YMsBweN-LiejQwrhHTi-RsV9HZakkqsvGNeii_ChtVWl3',
  switchboardService: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZACdeBLFt5rjqd_bfPfPn6lOpEMtudahV3BHHAVWIcX87uQBNo6SKA6bS-jSNyjdWveBlI7tbM_Zg6BG7qtP6QMHa2xC7Cp6cN0xpWpImrgAIvMl2_uliN-6tvDKQ62NMHTq5mRQ8wCUQ9U0iS9KCAxW7i6Hpm-TqnXlWmw_6TMU6KkjRSvQieTVfGuOaTpAa_uigq-o5909YsfaUdHh7wnfQzR689C9UVbWoYwTMc4t2oEfHlS2N',
  tapLeakageService: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_P0qLaBqSKXulqQ6qXs10qFZpMzh89qOprhew2lkQIyqMJfWzG_lyY9ynk8lOetSh6nfui_M7VWT2MpxxO_TDvSYmud8J0pL74s3R6Td7zSCLJpMJEgx6MsM8a1D3OTY8tzFvTKGQNpgfkfK_8U8ctwLi86jvxW-FTnm5c5ZSizMWqILvvzvrwRrwBJ3Ozdg71_BwcprlDOOiOimu6UTW49CbkKja82P6tLZsOPWBgxqWhcL3J1O',
  sofaService: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ9dPGWW7ipFgj6RmhZYjiyBtPSin5PWpI6FTO-DPxD5ZYyipcTEnL32rgcVYgvf1dlW92mkJ0WPSYye04QsY8ILTa4zbt03mPFwjTsjL0oxcSJe-HUQaFkNfRcrxSDtTkZ2o2xWw9dbtQl8ime_rnuNjEzK0if3N6LnHPF6ImFCKlEI5FAmifajUohwKFqGzrsz2G3pB2ZSvB4L7X6ODEkbzAQVUXeBgnaaqLeCVEsI84xQnz5mUc',
  rajPartnerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOXPA-Pp4oySD1MAqO5BBk3YfE_rOPlQLwA4VUvNEfgquOaP7OfnZeRPwqiWBe_1Rblc4JEzueHYcfaPnyVItrPTtJyTB-bl_lJbRvxbfv73AD-96DyuSjeTsEQP7g0kudcxywFKd4vSkNWkTD10zmqSsYa0RHTM9dSvMGaVctEQWAX4slJWc4GN47P2_uV7rStuRPB9yz_V0U66v3GlCkYsYKgU-1wsAvJNreFcJr4w9xXwu2WRD7',
  routeMapGraphic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUvABOYP8R4zXxr0As-1zysnDpdjYqfYj18pJ86YHPrPP-XvdD6gnyR-r1-vNx97B7WyaHNvyiwN-1ktRjuDt-W0WoUNXh-o54fPyxC-1ofRxJxjkjBuF5edb_UEt4hToJsUbHwXbtcNBhsQdjWrO3bd17X3kW5X6uiotVOkU3UmlBfaMLt7_fWqUlwSnMZnrgsl6JNHzPE_KxWzL9J2k713AJVqDKnrCLo_cJiCcP2-7Z87oBMYe'
};

export const CATEGORIES: ServiceCategory[] = [
  { id: 'electrician', name: 'Electrician', icon: 'bolt', bgClass: 'bg-tertiary-fixed text-tertiary', textClass: 'text-tertiary' },
  { id: 'plumber', name: 'Plumber', icon: 'plumbing', bgClass: 'bg-surface-container-high text-primary', textClass: 'text-primary' },
  { id: 'ac', name: 'AC Repair', icon: 'mode_fan', bgClass: 'bg-primary-fixed text-on-primary-fixed-variant', textClass: 'text-primary' },
  { id: 'appliance', name: 'Appliance', icon: 'kitchen', bgClass: 'bg-tertiary-container/20 text-tertiary-container', textClass: 'text-tertiary' },
  { id: 'carpenter', name: 'Carpenter', icon: 'carpenter', bgClass: 'bg-tertiary-fixed-dim/40 text-tertiary', textClass: 'text-tertiary' },
  { id: 'painter', name: 'Painter', icon: 'format_paint', bgClass: 'bg-surface-container-highest text-inverse-surface', textClass: 'text-inverse-surface' },
  { id: 'auto', name: 'Auto Repair', icon: 'build', bgClass: 'bg-surface-dim text-on-surface-variant', textClass: 'text-on-surface-variant' },
  { id: 'cleaning', name: 'Deep Clean', icon: 'cleaning_services', bgClass: 'bg-secondary-container text-on-secondary-container', textClass: 'text-secondary' },
  { id: 'tutor', name: 'Tutor Skills', icon: 'school', bgClass: 'bg-surface-container-high text-primary', textClass: 'text-primary' },
];

export const POPULAR_SERVICES: PopularService[] = [
  {
    id: 'ac-jet',
    title: 'AC Deep Jet Service',
    subtitle: 'Indoor + outdoor coil wash & gas check',
    price: 499,
    rating: 4.9,
    imageUrl: ASSETS.acService,
    altText: 'Close-up technician jet cleaning split air conditioner coil',
    category: 'ac'
  },
  {
    id: 'switchboard',
    title: 'Switchboard Repair',
    subtitle: 'Sockets, burnt switches & fuse fixes',
    price: 199,
    rating: 4.8,
    imageUrl: ASSETS.switchboardService,
    altText: 'Electrician replacing switchboard sockets on textured wall',
    category: 'electrician'
  },
  {
    id: 'tap-leakage',
    title: 'Tap Leakage & Fitting',
    subtitle: 'Washbasin, sink & concealed taps',
    price: 249,
    rating: 4.7,
    imageUrl: ASSETS.tapLeakageService,
    altText: 'Plumber fixing chrome water faucet in modern bathroom',
    category: 'plumber'
  },
  {
    id: 'sofa-shampoo',
    title: 'Sofa Shampooing',
    subtitle: 'Fabric & leather anti-allergen clean',
    price: 799,
    rating: 4.9,
    imageUrl: ASSETS.sofaService,
    altText: 'Deep cleaning specialist shampooing fabric sofa in bright living room',
    category: 'cleaning'
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'raj-kumar',
    companyName: 'Raj Electrical Services',
    technicianName: 'Rajesh Kumar',
    title: 'Master Electrician',
    avatar: ASSETS.rajAvatar,
    altText: 'Rajesh Kumar, experienced Indian electrician smiling in dark teal uniform',
    rating: 4.8,
    jobsDone: 342,
    distanceKm: 1.4,
    experienceYears: 12,
    badges: ['Top Rated', 'Background Verified', '12 yrs exp'],
    specialties: ['Fan repair', 'MCB wiring', 'Inverter setup', 'Light installation'],
    startingPrice: 299,
    priceType: 'Diagnosis included',
    nextSlot: 'Today, 3:30 PM',
    verified: true,
    phone: '+91 98450 12891',
    about: 'Master certified technician with 12+ years of field experience in residential electrical safety, rewiring, inverter systems, and heavy-duty appliance circuitry. Rated top performer in Indiranagar & HAL.',
    reviews: [
      {
        author: 'Siddharth Kumar',
        rating: 5,
        date: 'Yesterday',
        comment: 'Raj arrived within 20 mins for our main breaker tripping emergency on Sunday. Transparent pricing, no fuss. Fantastic experience!'
      },
      {
        author: 'Pooja Hegde',
        rating: 4.8,
        date: '4 days ago',
        comment: 'Very polite, carried all the diagnostic gear and replaced our burnt regulator in 15 minutes. Even tidied up the insulation shavings.'
      },
      {
        author: 'Karthik Raman',
        rating: 5,
        date: '1 week ago',
        comment: 'Excellent service for my inverter battery wiring overhaul. Highly recommend Rajesh!'
      }
    ]
  },
  {
    id: 'suresh-nair',
    companyName: 'Suresh Power Solutions',
    technicianName: 'Suresh Nair',
    title: 'Senior Master Electrician',
    avatar: ASSETS.sureshAvatar,
    altText: 'Suresh Nair senior expert master electrician smiling in Bangalore apartment',
    rating: 4.9,
    jobsDone: 420,
    distanceKm: 2.6,
    experienceYears: 15,
    badges: ['Super Pro', 'Insured Guarantee'],
    specialties: ['Complete home re-wiring', 'Chandelier mounting', 'Fuse repair'],
    startingPrice: 349,
    priceType: 'fixed quote',
    nextSlot: 'Today, 5:00 PM',
    verified: true,
    phone: '+91 98451 98320',
    about: 'Specialist in heavy fixture installations, luxury chandeliers, concealed conduit inspection, and smart home IoT breaker boards. Over 400 successful assignments in East Bengaluru.',
    reviews: [
      {
        author: 'Devika Krishnan',
        rating: 5,
        date: '2 days ago',
        comment: 'Mounted our 18kg chandelier safely onto the ceiling slab. Extremely thorough load calculations and spotless finish.'
      },
      {
        author: 'Rohan Gupta',
        rating: 4.9,
        date: 'Last week',
        comment: 'Identified an earthing leakage problem that two other technicians missed. Saved us from a costly appliance surge hazard.'
      }
    ]
  },
  {
    id: 'arjun-verma',
    companyName: 'CityFast Electricals',
    technicianName: 'Arjun Verma',
    title: 'Certified Field Electrician',
    avatar: ASSETS.arjunAvatar,
    altText: 'Arjun Verma licensed male technician holding multimeter with ID card',
    rating: 4.6,
    jobsDone: 185,
    distanceKm: 3.1,
    experienceYears: 6,
    badges: ['Ultra Fast Dispatch', 'Govt. Licensed'],
    specialties: ['Emergency tripping', 'Geyser electrical point', 'LED strip lighting', 'Switch repair'],
    startingPrice: 249,
    priceType: 'quick inspection',
    nextSlot: 'Available in 40 mins',
    verified: true,
    phone: '+91 98452 44109',
    about: 'Specialized in lightning-fast response times for power failures, tripping RCDs, and quick room repairs across Indiranagar, Domlur, and Koramangala.',
    reviews: [
      {
        author: 'Nikhil Mehta',
        rating: 4.7,
        date: '5 days ago',
        comment: 'Showed up right on time in 30 minutes! Diagnosed our tripped MCB immediately and had replacement fuse in his kit.'
      }
    ]
  }
];

export const OTHER_VERIFIED_PROS: Professional[] = [
  {
    id: 'amit-ac',
    companyName: 'Amit AC Solutions',
    technicianName: 'Amit Sharma',
    title: 'HVAC & Inverter AC Specialist',
    avatar: ASSETS.amitAvatar,
    altText: 'Amit Sharma experienced AC technician holding multimeter',
    rating: 4.7,
    jobsDone: 218,
    distanceKm: 2.1,
    experienceYears: 9,
    badges: ['HVAC Certified', 'Same Day Service'],
    specialties: ['Jet clean', 'Gas leak fix', 'PCB repair', 'Compressor replacement'],
    startingPrice: 399,
    priceType: 'onwards',
    nextSlot: 'Today',
    verified: true,
    phone: '+91 98453 66120',
    about: 'Certified inverter air conditioning repair and comprehensive preventative jet cleaning services. Specialized in Daikin, LG, and Voltas units.',
    reviews: [
      {
        author: 'Arun Prasad',
        rating: 4.8,
        date: '3 days ago',
        comment: 'Jet cleaning was done with water collection sheets so zero mess in the bedroom. Great cooling restored!'
      }
    ]
  },
  {
    id: 'priya-clean',
    companyName: 'Priya Home Deep Clean',
    technicianName: 'Priya Sundaram',
    title: 'Sanitation & Disinfection Supervisor',
    avatar: ASSETS.priyaAvatar,
    altText: 'Priya Sundaram professional cleaning supervisor with uniform badge',
    rating: 4.9,
    jobsDone: 512,
    distanceKm: 0.8,
    experienceYears: 8,
    badges: ['SuperPro', 'Eco-Friendly Chemicals'],
    specialties: ['Deep kitchen scrubbing', 'Bathroom scale removal', 'Balcony jet wash', 'Sofa steam'],
    startingPrice: 699,
    priceType: 'onwards',
    nextSlot: 'Available in 25 mins',
    verified: true,
    phone: '+91 98454 88301',
    about: 'Hospital-grade mechanized home cleaning with certified industrial vacuum extractors and eco-friendly disinfectants. 500+ happy homes.',
    reviews: [
      {
        author: 'Ananya Menon',
        rating: 5,
        date: '3 days ago',
        comment: 'Priya’s deep cleaning crew turned our post-renovation dust catastrophe into a showroom finish. Professional equipment and respectful staff.'
      }
    ]
  }
];

export const INITIAL_SAVED_ADDRESSES: ServiceAddress[] = [
  {
    id: 'addr-home',
    type: 'home',
    title: 'Home',
    isDefault: true,
    line1: 'Flat 402, Green Glen Heights',
    line2: 'Indiranagar, 100ft Road, Bengaluru 560038'
  },
  {
    id: 'addr-office',
    type: 'office',
    title: 'Office',
    isDefault: false,
    line1: 'Suite 305, Tech Hub Plaza',
    line2: 'Outer Ring Road, Bellandur, Bengaluru 560103'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1',
    bookingCode: 'PN-8921',
    proId: 'raj-kumar',
    companyName: 'Raj Electrical Services',
    technicianName: 'Rajesh Kumar',
    proAvatar: ASSETS.rajAvatar,
    serviceTitle: 'Ceiling Fan Installation & Switch Repair',
    items: ['Ceiling Fan Installation', 'Switchboard Repair'],
    addons: [{ name: 'Fan regulator replacement', price: 99 }],
    date: 'Tomorrow, 24 Oct',
    slot: 'Afternoon (12 - 4 PM)',
    address: INITIAL_SAVED_ADDRESSES[0],
    notes: 'Fan is making clicking noise and regulator not functioning on speed 2 and 4.',
    status: 'on_the_way',
    totalAmount: 521,
    otp: '4829',
    createdAt: 'Today, 2:15 PM',
    etaMinutes: 14
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'partner',
    senderName: 'Rajesh Kumar (Electrician)',
    text: 'Namaste Ananya ji! I have accepted your ceiling fan and switch repair booking.',
    timestamp: '2:16 PM'
  },
  {
    id: 'm-2',
    sender: 'user',
    senderName: 'Ananya Sharma',
    text: 'Hi Rajesh! Please make sure to bring a replacement 5-speed regulator suitable for Havells fan.',
    timestamp: '2:18 PM'
  },
  {
    id: 'm-3',
    sender: 'partner',
    senderName: 'Rajesh Kumar (Electrician)',
    text: 'Yes definitely, I have genuine Anchor and Havells modular step regulators in my kit.',
    timestamp: '2:20 PM'
  },
  {
    id: 'm-4',
    sender: 'partner',
    senderName: 'Rajesh Kumar (Electrician)',
    text: 'I am on the way now via 100ft Road. Will reach your apartment lobby in approximately 14 mins.',
    timestamp: '3:15 PM'
  }
];

export const INITIAL_INCOMING_JOB: IncomingJob = {
  id: 'job-9823',
  title: 'Ceiling Fan Repair & MCB Check',
  customerName: 'Ananya Sharma',
  customerPhone: '+91 98450 77123',
  payout: 450,
  address: '12th Main Rd, HAL 2nd Stage, Indiranagar',
  distanceKm: 1.4,
  timeSlot: 'Today, 4:00 PM – 5:00 PM (In 35 min)',
  customerNote: 'Fan sparked once while switching on speed 4.',
  travelTime: '6 mins via 100ft Rd',
  expiresInSeconds: 165,
  status: 'pending'
};
