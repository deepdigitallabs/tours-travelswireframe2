"use client";

import React, { useState, useEffect } from "react";

// --- Data Types ---

interface Vehicle {
  id: string;
  name: string;
  category: "urbania" | "tempo" | "minibus" | "luxury-bus" | "suv";
  categoryLabel: string;
  seatingText: string;
  seatsNum: number;
  submodel: string;
  bestFor: string;
  rating: number;
  reviewsCount: number;
  luggage: string;
  ratePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  image: string;
  amenities: string[];
}

interface PackageTour {
  id: string;
  anchorId: string;
  title: string;
  subtitle: string;
  duration: string;
  durationDays: number;
  distanceKm: number;
  image: string;
  tag: string;
  highlights: string[];
  vehiclePrices: {
    tempo17: number;
    urbania: number;
    innova: number;
  };
}

interface RouteItem {
  id: string;
  anchorId: string;
  route: string;
  time: string;
  dist: string;
  tripType: "One-Way Drop" | "Round-Trip";
  vehicleModel: string;
  fare: string;
  numericFare: number;
}

interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  tripType: string;
}

// Global Single Verified Contact Info
const PRIMARY_PHONE = "+91 98220 44555";
const PRIMARY_PHONE_TEL = "tel:+919822044555";
const PRIMARY_WHATSAPP_NUMBER = "919822044555";
const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=Vishal+Travels+Pune+Swargate";

const FLEET_DATA: Vehicle[] = [
  {
    id: "f1",
    name: "Force Urbania Luxury VIP Lounge",
    category: "urbania",
    categoryLabel: "Force Urbania VIP",
    seatingText: "13 & 17 Seater Maharaja AC",
    seatsNum: 17,
    submodel: "High-Roof Executive Cabin • Ultra-Quiet Air Suspension",
    bestFor: "Corporate delegations, VIP airport escorts & wedding bride/groom families",
    rating: 4.98,
    reviewsCount: 340,
    luggage: "20 Large Bags + Dedicated Boot",
    ratePerKm: 38,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "/images/urbania_vip.jpg",
    amenities: ["Maharaja Leather Captain Seats", "Independent AC Blowers", "Panoramic UV Windows", "USB at Every Seat"]
  },
  {
    id: "f2",
    name: "Force Tempo Traveller AC (17 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "17 Seater Push-back AC",
    seatsNum: 17,
    submodel: "Force Motors Deluxe 2x1 Reclining Configuration",
    bestFor: "Ashtavinayak Yatra, Mahabaleshwar family trips & Shirdi pilgrimages",
    rating: 4.94,
    reviewsCount: 520,
    luggage: "18 Suitcases + Rooftop Carrier",
    ratePerKm: 28,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "/images/tempo_traveller.jpg",
    amenities: ["Push-back Velvet Seats", "Chilled Dual AC", "JBL Sound & Tour Mic", "Ghat-Tested Chauffeur"]
  },
  {
    id: "f-tempo-20",
    name: "Force Tempo Traveller AC (20 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "20 Seater Push-back AC",
    seatsNum: 20,
    submodel: "Extended Wheelbase 2x1 Configuration • Large Boot",
    bestFor: "Medium family groups (18–20 pax) needing extra space without hiring a bus",
    rating: 4.92,
    reviewsCount: 280,
    luggage: "20+ Suitcases + Top Carrier",
    ratePerKm: 31,
    minKmPerDay: 300,
    driverAllowancePerDay: 550,
    image: "/images/tempo_traveller.jpg",
    amenities: ["2x1 Reclining Seats", "Dual Evaporator Chilled AC", "Overhead Reading Lights", "Speed Regulated"]
  },
  {
    id: "f3",
    name: "Force Tempo Traveller AC (26 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "26 Seater Push-back AC",
    seatsNum: 26,
    submodel: "Extra Long Wheelbase • 2x2 Reclining Configuration",
    bestFor: "Large wedding barat transfers & Hinjewadi IT company team offsites",
    rating: 4.91,
    reviewsCount: 380,
    luggage: "25+ Suitcases Boot",
    ratePerKm: 34,
    minKmPerDay: 300,
    driverAllowancePerDay: 600,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: ["Individual AC Louvers", "LED Screen System", "Rear Air Suspension", "Emergency Hammer"]
  },
  {
    id: "f4",
    name: "Executive Mini Bus (32 Seater AC)",
    category: "minibus",
    categoryLabel: "Mini Bus Rental",
    seatingText: "32 Seater Reclining High-Back",
    seatsNum: 32,
    submodel: "Tata Starbus / Eicher Executive Luxury Coach",
    bestFor: "College industrial tours, corporate shifts & Pune wedding guest convoys",
    rating: 4.89,
    reviewsCount: 290,
    luggage: "35 Large Suitcases Boot",
    ratePerKm: 42,
    minKmPerDay: 300,
    driverAllowancePerDay: 700,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    amenities: ["High-Back Reclining Seats", "Ducted Central Climate AC", "PA Tour Guide Mic", "Curtained Windows"]
  },
  {
    id: "f5-volvo",
    name: "Volvo B11R Multi-Axle Luxury Coach",
    category: "luxury-bus",
    categoryLabel: "Volvo Multi-Axle Coach",
    seatingText: "49 Seater Push-back Semi-Sleeper",
    seatsNum: 49,
    submodel: "Volvo B11R Electronically Controlled Air Suspension",
    bestFor: "5 Jyotirlinga, Char Dham pilgrimages & Goa destination wedding groups",
    rating: 4.97,
    reviewsCount: 310,
    luggage: "60+ Large Suitcases Under-floor",
    ratePerKm: 60,
    minKmPerDay: 350,
    driverAllowancePerDay: 900,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&auto=format&fit=crop&q=80",
    amenities: ["Full Air Suspension Glide", "Personal USB & Reading Lights", "Dual Highway Drivers", "Live GPS Telemetry"]
  },
  {
    id: "f5-sleeper",
    name: "BharatBenz AC Sleeper Luxury Coach",
    category: "luxury-bus",
    categoryLabel: "AC Sleeper Bus",
    seatingText: "36 Berths (2x1 Luxury Sleeper)",
    seatsNum: 36,
    submodel: "BharatBenz Custom Sleeper Coach • Independent Mattresses",
    bestFor: "Overnight interstate travel from Pune to Goa, Indore, or Hyderabad",
    rating: 4.95,
    reviewsCount: 190,
    luggage: "Spacious Underbelly Cargo Hold",
    ratePerKm: 58,
    minKmPerDay: 350,
    driverAllowancePerDay: 900,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: ["Individual AC Vents Each Berth", "Privacy Curtains", "Dual Chauffeurs", "Soft Night Reading Lamps"]
  },
  {
    id: "f6",
    name: "Toyota Innova Crysta & Maruti Ertiga",
    category: "suv",
    categoryLabel: "Chauffeur SUV",
    seatingText: "6 - 7 Seater Captain Seats",
    seatsNum: 7,
    submodel: "Innova Crysta 2.4 ZX / Ertiga ZXi+ Chauffeur Driven",
    bestFor: "Pune-Mumbai airport drop/pick, executive client visits & small family tours",
    rating: 4.96,
    reviewsCount: 640,
    luggage: "5 Suitcases",
    ratePerKm: 18,
    minKmPerDay: 250,
    driverAllowancePerDay: 400,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    amenities: ["Leather Captain Seats", "Automatic Multi-Zone AC", "Fastag Enabled", "Professional Chauffeur"]
  }
];

// Calculated transparently from standard rate card:
// Tempo 17-str: max(km, days*300)*28 + days*500 + 5% GST
// Force Urbania: max(km, days*300)*38 + days*500 + 5% GST
// Innova Crysta: max(km, days*250)*18 + days*400 + 5% GST
const PACKAGES_DATA: PackageTour[] = [
  {
    id: "pkg1",
    anchorId: "pkg-ashtavinayak",
    title: "Ashtavinayak Darshan from Pune",
    subtitle: "Complete 8 Ganesh Temples sacred pilgrimage in 2 Days",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    distanceKm: 650,
    image: "/images/hero_fleet.jpg",
    tag: "Most Popular Pilgrimage",
    highlights: [
      "Mayureshwar (Morgaon) & Siddhivinayak (Siddhatek)",
      "Ballaleshwar (Pali) & Varadvinayak (Mahad)",
      "Chintamani (Theur) & Girijatmaj (Lenyadri)",
      "Vighnahar (Ozar) & Mahaganapati (Ranjangaon)"
    ],
    vehiclePrices: {
      tempo17: 20160,
      urbania: 26985,
      innova: 13125
    }
  },
  {
    id: "pkg2",
    anchorId: "pkg-jyotirlinga",
    title: "5 Jyotirlinga Darshan Circuit",
    subtitle: "Sacred 5 Maharashtra Shiva Shrines circuit tour from Pune",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    distanceKm: 1450,
    image: "/images/jyotirlinga_temple.jpg",
    tag: "Sacred Yatra",
    highlights: [
      "1. Bhimashankar (Pune)",
      "2. Trimbakeshwar (Nashik)",
      "3. Grishneshwar (Ellora, Chhatrapati Sambhajinagar)",
      "4. Aundha Nagnath (Hingoli)",
      "5. Parli Vaijnath (Beed)"
    ],
    vehiclePrices: {
      tempo17: 44730,
      urbania: 59955,
      innova: 29085
    }
  },
  {
    id: "pkg3",
    anchorId: "pkg-mahabaleshwar",
    title: "Pune to Mahabaleshwar & Panchgani",
    subtitle: "Scenic Sahyadri hill station getaway (600 km minimum applied)",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    distanceKm: 260,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80",
    tag: "Weekend Getaway",
    highlights: [
      "Arthur Seat & Kate's Point Valley Views",
      "Venna Lake Boating & Horse Riding",
      "Mapro Garden Strawberry Farms",
      "Table Land & Sydney Point in Panchgani",
      "Old Mahabaleshwar Mandir"
    ],
    vehiclePrices: {
      tempo17: 18690,
      urbania: 24990,
      innova: 10290
    }
  },
  {
    id: "pkg4",
    anchorId: "pkg-shirdi",
    title: "Pune to Shirdi & Shani Shingnapur",
    subtitle: "Sai Baba Samadhi Mandir VIP Darshan with Return Drop",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    distanceKm: 450,
    image: "/images/shirdi_temple.jpg",
    tag: "Express Yatra",
    highlights: [
      "Sai Baba Samadhi Mandir VIP Darshan",
      "Dwarkamai & Chavadi Visits",
      "Shani Shingnapur Holy Shrine",
      "Clean Highway Halts with Senior Care",
      "Flexible Aarti & Darshan Timings"
    ],
    vehiclePrices: {
      tempo17: 18690,
      urbania: 24990,
      innova: 10290
    }
  },
  {
    id: "pkg5",
    anchorId: "pkg-konkan",
    title: "Malvan, Sindhudurg & Goa Tour",
    subtitle: "Konkan Coastal Heritage, Scuba & Beach Holiday",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    distanceKm: 1200,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80",
    tag: "Coastal Holiday",
    highlights: [
      "Historic Sindhudurg Island Fort",
      "Tarkarli Watersports & Scuba Diving",
      "North Goa Beaches & Fort Aguada",
      "Authentic Malvani Cuisine Halts",
      "Expert Coastal Highway Navigation"
    ],
    vehiclePrices: {
      tempo17: 37380,
      urbania: 49980,
      innova: 24360
    }
  },
  {
    id: "pkg6",
    anchorId: "pkg-shaktipeeth",
    title: "Sade Teen Shakti Peeth Yatra",
    subtitle: "All 3.5 Divine Devi Temples including Saptashrungi (Half Peeth)",
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    distanceKm: 1650,
    image: "/images/shaktipeeth_temple.jpg",
    tag: "Devi Darshan Circuit",
    highlights: [
      "1. Mahalakshmi Temple (Kolhapur) - Full Peeth",
      "2. Tulja Bhavani Temple (Tuljapur) - Full Peeth",
      "3. Renuka Devi Temple (Mahur) - Full Peeth",
      "4. Saptashrungi Nivasini (Vani, Nashik) - Sacred 0.5 (Half) Peeth"
    ],
    vehiclePrices: {
      tempo17: 50610,
      urbania: 67935,
      innova: 32865
    }
  }
];

const POPULAR_ROUTES: RouteItem[] = [
  {
    id: "r1",
    anchorId: "route-mumbai",
    route: "Pune ➔ Mumbai Airport (T1/T2)",
    time: "3.5 hrs",
    dist: "150 KM",
    tripType: "One-Way Drop",
    vehicleModel: "Innova Crysta / Sedan",
    fare: "₹3,500",
    numericFare: 3500
  },
  {
    id: "r2",
    anchorId: "route-mumbai-tempo",
    route: "Pune ➔ Mumbai Group Transfer",
    time: "3.5 hrs",
    dist: "150 KM",
    tripType: "One-Way Drop",
    vehicleModel: "17-Seater AC Tempo Traveller",
    fare: "₹7,500",
    numericFare: 7500
  },
  {
    id: "r3",
    anchorId: "route-mahabaleshwar",
    route: "Pune ➔ Mahabaleshwar Day Return",
    time: "Same Day Return",
    dist: "300 KM Min",
    tripType: "Round-Trip",
    vehicleModel: "17-Seater AC Tempo Traveller",
    fare: "₹8,900",
    numericFare: 8900
  },
  {
    id: "r4",
    anchorId: "route-shirdi",
    route: "Pune ➔ Shirdi Darshan Round Trip",
    time: "Same Day Return",
    dist: "420 KM",
    tripType: "Round-Trip",
    vehicleModel: "17-Seater AC Tempo Traveller",
    fare: "₹12,800",
    numericFare: 12800
  },
  {
    id: "r5",
    anchorId: "route-lonavala",
    route: "Pune ➔ Lonavala & Khandala Ghat",
    time: "Day Excursion",
    dist: "200 KM",
    tripType: "Round-Trip",
    vehicleModel: "Innova Crysta 7-Seater",
    fare: "₹4,200",
    numericFare: 4200
  },
  {
    id: "r6",
    anchorId: "route-chiplun",
    route: "Pune ➔ Chiplun & Konkan Foothills",
    time: "5.5 hrs",
    dist: "240 KM",
    tripType: "One-Way Drop",
    vehicleModel: "17-Seater AC Tempo Traveller",
    fare: "₹8,500",
    numericFare: 8500
  },
  {
    id: "r7",
    anchorId: "route-nashik",
    route: "Pune ➔ Nashik & Trimbakeshwar",
    time: "Day Return / 1 Night",
    dist: "440 KM",
    tripType: "Round-Trip",
    vehicleModel: "Force Urbania VIP (17 Seater)",
    fare: "₹17,800",
    numericFare: 17800
  },
  {
    id: "r8",
    anchorId: "route-goa",
    route: "Pune ➔ Goa Coastal Drop",
    time: "8.5 hrs",
    dist: "440 KM",
    tripType: "One-Way Drop",
    vehicleModel: "17-Seater AC Tempo Traveller",
    fare: "₹16,500",
    numericFare: 16500
  }
];

const REVIEWS_DATA: Review[] = [
  {
    id: "r1",
    name: "Rajesh Gaikwad",
    initials: "RG",
    role: "Family Coordinator",
    city: "Kothrud, Pune",
    rating: 5,
    text: "Booked a 17-seater Tempo Traveller for our 2-day family Ashtavinayak yatra. Driver Mr. Sachin was at our doorstep 20 minutes prior with a spotless bus and chilled AC. Handled Khandala and Pali ghat curves with immense care.",
    date: "12 Oct 2026",
    tripType: "Ashtavinayak Darshan"
  },
  {
    id: "r2",
    name: "Sneha Deshmukh",
    initials: "SD",
    role: "HR Operations Lead",
    city: "Hinjewadi Phase 3, Pune",
    rating: 5,
    text: "Vishal Travels provided four Force Urbanias for our leadership summit at Mahabaleshwar. Maharaja leather captain seats, individual USB ports, and clean audio systems made the journey remarkably comfortable. GST invoice provided promptly.",
    date: "24 Sep 2026",
    tripType: "Corporate Transport"
  },
  {
    id: "r3",
    name: "Amitabh Kulkarni",
    initials: "AK",
    role: "Wedding Host",
    city: "Baner, Pune",
    rating: 5,
    text: "Hired a 49-seater Volvo Multi-Axle and two 17-seater Tempo Travellers for guest transport from Pune to Goa. Spotless interiors, prompt driver dispatch, and zero mechanical issues. Made all 80 family members feel pampered.",
    date: "18 Aug 2026",
    tripType: "Destination Wedding"
  },
  {
    id: "r4",
    name: "Mahesh Panchal",
    initials: "MP",
    role: "Group Leader",
    city: "Swargate, Pune",
    rating: 5,
    text: "Completed the 4-day 5 Jyotirlinga tour in an Urbania. Visited all 5 shrines: Bhimashankar, Trimbakeshwar, Grishneshwar, Aundha Nagnath, and Parli Vaijnath. Driver was deeply courteous to our senior citizen parents.",
    date: "04 Jul 2026",
    tripType: "5 Jyotirlinga Sacred Circuit"
  }
];

const FAQ_DATA = [
  {
    q: "What vehicle types and seating capacities are available for hire in Pune?",
    a: "Vishal Travels provides a comprehensive executive fleet including Force Urbania VIP (13 & 17 seater), Force Tempo Travellers (17, 20 & 26 seater AC), Executive Mini Buses (32 seater), Luxury Volvo B11R Multi-Axle Coaches (49 seater push-back), BharatBenz AC Sleeper Buses (36 berths), and Toyota Innova Crysta SUVs (6-7 seater). Every vehicle is equipped with dual AC, reclining seats, mobile charging, and commercial RTO passenger permits."
  },
  {
    q: "How is the outstation bus rental tariff calculated (Minimum KM Rule)?",
    a: "Outstation journeys in Pune follow a standard calendar-day minimum average: 300 km per day for Tempo Travellers, Force Urbanias, and Mini Buses (350 km/day for Volvo Multi-Axle; 250 km/day for Innova). For example, a 2-day trip has a minimum billable baseline of 600 km. If you travel 350 km in 2 days, you are billed for 600 km at the agreed per-km rate plus driver allowance and 5% GST. If you travel 720 km in 2 days, you are billed for the actual 720 km."
  },
  {
    q: "What is included in the fare quotation, and what is paid extra?",
    a: "Included in your quote: Complete vehicle rental, commercial driver charges, fuel/diesel, air conditioning, and 5% GST with tax invoice. Paid extra at actuals: Highway Fastag toll plaza charges, parking tickets, and interstate border entry taxes (if crossing into Goa, Gujarat, Karnataka, etc.). There are zero hidden agency commissions or secret fuel surcharges."
  },
  {
    q: "What is your booking advance and cancellation refund policy?",
    a: "You can confirm your trip reservation with a token advance of ₹2,000 for Tempo Travellers and Force Urbanias (₹5,000 for Luxury Volvo Coaches) payable via UPI or bank transfer. Cancellation Schedule: 1) 7+ days prior: 100% refund. 2) 48 hours to 7 days prior: 80% refund. 3) 24 to 48 hours prior: 50% refund or 100% credit towards a rescheduled trip within 6 months. 4) Less than 24 hours prior: Advance token is retained to cover driver schedule blocking and fleet yard preparation."
  },
  {
    q: "Are drivers experienced with steep ghat roads like Khandala, Mahabaleshwar & Konkan?",
    a: "Yes. All our drivers hold commercial transport badge licenses with minimum 8+ years of highway driving experience across steep Western Ghat corridors including Bhor Ghat, Pasarni Ghat, Amba Ghat, and Varandha Ghat. Every vehicle undergoes rigorous brake, tire, and fluid inspections before dispatch."
  }
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Booking Card State
  const [tripType, setTripType] = useState<"outstation" | "local" | "airport">("outstation");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [startDate, setStartDate] = useState("2026-10-25");
  const [returnDate, setReturnDate] = useState("2026-10-27");
  const [passengers, setPassengers] = useState("14-17");
  const [phone, setPhone] = useState("");
  const [formVehicleRecommended, setFormVehicleRecommended] = useState("Force Urbania VIP (17 Seater) / AC Tempo");

  // Dynamic recommendation based on passengers
  useEffect(() => {
    switch (passengers) {
      case "1-6":
        setFormVehicleRecommended("Toyota Innova Crysta (6-7 Seats)");
        break;
      case "7-13":
        setFormVehicleRecommended("Force Urbania VIP Maharaja (13 Seats)");
        break;
      case "14-17":
        setFormVehicleRecommended("Force Urbania VIP / 17-Seater AC Tempo");
        break;
      case "18-20":
        setFormVehicleRecommended("Force Tempo Traveller AC (20 Seater)");
        break;
      case "21-26":
        setFormVehicleRecommended("Force Tempo Traveller AC (26 Seater)");
        break;
      case "27-32":
        setFormVehicleRecommended("Executive Mini Bus (32 Seater AC)");
        break;
      case "33-49":
        setFormVehicleRecommended("Volvo B11R Multi-Axle Luxury Coach (49 Seater)");
        break;
      default:
        setFormVehicleRecommended("Force Urbania VIP (17 Seater)");
    }
  }, [passengers]);

  // Packages State - Active vehicle pill per package card
  const [packageVehicles, setPackageVehicles] = useState<{ [key: string]: "tempo17" | "urbania" | "innova" }>({
    pkg1: "tempo17",
    pkg2: "tempo17",
    pkg3: "tempo17",
    pkg4: "tempo17",
    pkg5: "tempo17",
    pkg6: "tempo17"
  });

  // Fleet Filter State
  const [fleetFilter, setFleetFilter] = useState<string>("all");

  // Fare Estimator State
  const [calcKm, setCalcKm] = useState<number>(350);
  const [calcDays, setCalcDays] = useState<number>(2);
  const [calcRate, setCalcRate] = useState<number>(38);
  const [calcMinKmPerDay, setCalcMinKmPerDay] = useState<number>(300);
  const [calcDA, setCalcDA] = useState<number>(500);
  const [calcVehicleName, setCalcVehicleName] = useState<string>("Force Urbania VIP 17 Seater");
  const [isReturnTrip, setIsReturnTrip] = useState<boolean>(true);
  const [isExclusionsOpen, setIsExclusionsOpen] = useState<boolean>(false);

  // FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Estimator Calculations
  const effectiveDistance = isReturnTrip ? calcKm : calcKm;
  const minBillableKm = calcDays * calcMinKmPerDay;
  const billableKm = Math.max(effectiveDistance, minBillableKm);
  const isMinBillingApplied = effectiveDistance < minBillableKm;

  const totalBase = billableKm * calcRate;
  const totalDA = calcDays * calcDA;
  const subtotal = totalBase + totalDA;
  const totalGst = Math.round(subtotal * 0.05);
  const totalEstimate = subtotal + totalGst;

  // Filtered Fleet
  const filteredFleet =
    fleetFilter === "all"
      ? FLEET_DATA
      : FLEET_DATA.filter((v) => v.category === fleetFilter);

  // Handle Hero WhatsApp Booking
  const handleHeroBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnr = "VT-" + Math.floor(100000 + Math.random() * 900000);
    const waText = `*TRIP RESERVATION REQUEST (REF: ${pnr})*
*Vishal Travels Pune - Booking Desk*
--------------------------------------------
*Trip Type:* ${tripType === "outstation" ? "Outstation Tour" : tripType === "local" ? "Pune Local 8Hr" : "Airport Transfer"}
*Pickup Point:* ${pickup || "Pune City"}
*Destination:* ${dropoff || "Outstation"}
*Journey Dates:* ${startDate} ${returnDate ? "to " + returnDate : "(One-Way)"}
*Passengers:* ${passengers} (${formVehicleRecommended})
*Contact Phone:* ${phone || "Provided on WhatsApp"}
--------------------------------------------
_Namaskar Vishal Travels! Please check vehicle availability and share the all-inclusive quotation._`;

    const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  return (
    <>
      {/* 1. TOP BAR - Single Slim Line */}
      <div className="site-topbar">
        <div className="container topbar-content">
          <div className="topbar-permit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>MH-12-TP-2024-8891 • All-India Commercial Tourist Permit</span>
          </div>

          <div className="topbar-contact-group">
            <a href={PRIMARY_PHONE_TEL} className="topbar-phone-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{PRIMARY_PHONE}</span>
            </a>
            <a
              href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-wa-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - Logo Left, 5 Plain Links, Call & Get Quote CTAs */}
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-content">
          <a href="#home" className="header-logo">
            <div className="logo-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="3" y="6" width="18" height="12" rx="3" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
                <line x1="3" y1="11" x2="21" y2="11" />
              </svg>
            </div>
            <div>
              <div className="logo-text-title">
                Vishal <span>Travels</span>
              </div>
              <span className="logo-tagline">EXECUTIVE FLEET • PUNE</span>
            </div>
          </a>

          {/* 5 Plain Links - Zero Dropdowns */}
          <nav className="header-nav">
            <a href="#packages" className="nav-link">Packages</a>
            <a href="#routes" className="nav-link">Routes</a>
            <a href="#fleet" className="nav-link">Fleet</a>
            <a href="#fare" className="nav-link">Fare</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <div className="header-actions">
            <a href={PRIMARY_PHONE_TEL} className="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Desk</span>
            </a>
            <a href="#booking-card" className="btn btn-primary">
              <span>Get Quote</span>
            </a>
            <button
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Simple Drawer */}
        {mobileMenuOpen && (
          <div style={{ background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#packages" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Packages</a>
            <a href="#routes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Routes</a>
            <a href="#fleet" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Fleet</a>
            <a href="#fare" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Fare Estimator</a>
            <a href="#faq" className="nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              <a href={PRIMARY_PHONE_TEL} className="btn btn-secondary" style={{ minHeight: "44px" }}>Call</a>
              <a href="#booking-card" className="btn btn-primary" style={{ minHeight: "44px" }} onClick={() => setMobileMenuOpen(false)}>Get Quote</a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - 2 Columns (Content Left, Floating Booking Card Right) */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column */}
            <div className="hero-content">
              <h1>
                Executive Bus &amp; Tempo Traveller{" "}
                <span className="saffron-text">Rental in Pune</span>
              </h1>
              <p className="hero-lead">
                Reliable outstation group travel across Maharashtra with Vishal Travels. Force Urbania VIP,
                luxury AC Tempo Travellers (13–26 seater), and Volvo coaches with verified commercial chauffeurs.
              </p>

              {/* 3 Short Benefit Bullets */}
              <ul className="hero-bullets">
                <li className="hero-bullet-item">
                  <span className="hero-bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Doorstep pickup across Pune &amp; PCMC with sanitized AC fleet</span>
                </li>
                <li className="hero-bullet-item">
                  <span className="hero-bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Commercial RTO licensed drivers with 8+ years ghat experience</span>
                </li>
                <li className="hero-bullet-item">
                  <span className="hero-bullet-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Transparent per-km rate card with zero hidden surcharges</span>
                </li>
              </ul>

              {/* Compact Trust Row */}
              <div className="hero-trust-compact">
                <div className="trust-item">
                  <span className="star">★</span>
                  <strong>4.9/5 on Google</strong>
                  <span style={{ color: "#94a3b8" }}>(1,420+ Reviews)</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <strong>15+ Years</strong>
                  <span style={{ color: "#94a3b8" }}>in Pune</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Booking Card */}
            <div className="hero-booking-card" id="booking-card">
              <div className="card-header-tag">
                <h2>Quick Fare Quote</h2>
                <span className="card-badge">Instant Dispatch</span>
              </div>

              {/* Segmented Control */}
              <div className="segmented-control">
                <button
                  type="button"
                  className={`segment-btn ${tripType === "outstation" ? "active" : ""}`}
                  onClick={() => setTripType("outstation")}
                >
                  Outstation
                </button>
                <button
                  type="button"
                  className={`segment-btn ${tripType === "local" ? "active" : ""}`}
                  onClick={() => setTripType("local")}
                >
                  Local 8hr
                </button>
                <button
                  type="button"
                  className={`segment-btn ${tripType === "airport" ? "active" : ""}`}
                  onClick={() => setTripType("airport")}
                >
                  Airport
                </button>
              </div>

              <form onSubmit={handleHeroBookingSubmit}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroPickup">
                      Pickup in Pune <span className="req">*</span>
                    </label>
                    <input
                      id="heroPickup"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Swargate / Baner"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroDrop">
                      Destination <span className="req">*</span>
                    </label>
                    <input
                      id="heroDrop"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Mahabaleshwar / Shirdi"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroStart">
                      Start Date <span className="req">*</span>
                    </label>
                    <input
                      id="heroStart"
                      type="date"
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroReturn">
                      Return Date <small style={{ color: "#64748b" }}>(Optional)</small>
                    </label>
                    <input
                      id="heroReturn"
                      type="date"
                      className="form-input"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroPassengers">
                      Passengers <span className="req">*</span>
                    </label>
                    <select
                      id="heroPassengers"
                      className="form-select"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                    >
                      <option value="1-6">1–6 Pax (Innova SUV)</option>
                      <option value="7-13">7–13 Pax (Urbania VIP)</option>
                      <option value="14-17">14–17 Pax (Tempo / Urbania)</option>
                      <option value="18-20">18–20 Pax (20-Str Tempo)</option>
                      <option value="21-26">21–26 Pax (26-Str Tempo)</option>
                      <option value="27-32">27–32 Pax (Mini Bus)</option>
                      <option value="33-49">33–49 Pax (Volvo Coach)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="heroPhone">
                      Mobile Phone <span className="req">*</span>
                    </label>
                    <input
                      id="heroPhone"
                      type="tel"
                      className="form-input"
                      placeholder="98220 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Recommended Vehicle Tag */}
                <div className="form-vehicle-rec">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>Recommended: <strong>{formVehicleRecommended}</strong></span>
                </div>

                {/* Green WhatsApp Submit Button */}
                <button type="submit" className="btn btn-whatsapp card-submit-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
                  </svg>
                  <span>Send Quote Request on WhatsApp</span>
                </button>

                <p className="form-subtext">Reply within ~30 min</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST STRIP - 1 Row of 4 Stats Under Hero */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-strip-grid">
            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="trust-strip-text">
                <strong>4.9/5 Rating</strong>
                <span>1,420+ Google Reviews</span>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="trust-strip-text">
                <strong>15+ Years in Pune</strong>
                <span>Serving Since 2011</span>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="trust-strip-text">
                <strong>15,000+ Passengers</strong>
                <span>4,800+ Completed Trips</span>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="trust-strip-text">
                <strong>100% RTO &amp; GST</strong>
                <span>Permit: MH-12-TP-2024-8891</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PACKAGES - 3-Column Card Grid with Horizontal Scroll on Mobile */}
      <section className="section-pad" id="packages">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">POPULAR OUTSTATION CIRCUITS</span>
            <h2 className="section-title">Curated Pilgrimage &amp; Tour Packages</h2>
            <p className="section-desc">
              Formula-based tariffs per vehicle model with seasoned highway chauffeurs and zero hidden markups.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES_DATA.map((pkg) => {
              const selectedV = packageVehicles[pkg.id] || "tempo17";
              const currentPrice = pkg.vehiclePrices[selectedV];
              const vehicleLabel = selectedV === "tempo17" ? "17-Seater Tempo" : selectedV === "urbania" ? "Force Urbania VIP" : "Innova Crysta";

              return (
                <div key={pkg.id} id={pkg.anchorId} className="package-card">
                  <div className="package-img-wrap">
                    <img src={pkg.image} alt={pkg.title} className="package-img" loading="lazy" />
                    <span className="package-category-chip">{pkg.tag}</span>
                  </div>

                  <div className="package-body">
                    <div className="package-meta-row">
                      <span className="package-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {pkg.duration}
                      </span>
                      <span className="package-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                        {pkg.distanceKm} KM
                      </span>
                    </div>

                    <h3 className="package-title">{pkg.title}</h3>
                    <p className="package-subtitle">{pkg.subtitle}</p>

                    <ul className="package-highlights-list">
                      {pkg.highlights.map((h, i) => (
                        <li key={i}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Vehicle Selector Chips */}
                    <div className="package-vehicle-row">
                      <div className="vehicle-selector-chips">
                        <button
                          type="button"
                          className={`v-chip ${selectedV === "innova" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "innova" })}
                        >
                          <small>Innova</small>
                          <strong>₹{pkg.vehiclePrices.innova.toLocaleString()}</strong>
                        </button>
                        <button
                          type="button"
                          className={`v-chip ${selectedV === "tempo17" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "tempo17" })}
                        >
                          <small>17-Str</small>
                          <strong>₹{pkg.vehiclePrices.tempo17.toLocaleString()}</strong>
                        </button>
                        <button
                          type="button"
                          className={`v-chip ${selectedV === "urbania" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "urbania" })}
                        >
                          <small>Urbania</small>
                          <strong>₹{pkg.vehiclePrices.urbania.toLocaleString()}</strong>
                        </button>
                      </div>

                      <div className="package-pricing-row">
                        <div>
                          <span className="package-price-line">From ₹{currentPrice.toLocaleString()} · {vehicleLabel}</span>
                          <span className="package-price-amount">₹{currentPrice.toLocaleString()}</span>
                        </div>

                        <div className="package-actions">
                          <a
                            href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20package%20(${vehicleLabel}%20at%20₹${currentPrice.toLocaleString()}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp-icon"
                            aria-label={`WhatsApp Quote for ${pkg.title}`}
                            title="Chat on WhatsApp"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
                            </svg>
                          </a>
                          <a href="#booking-card" className="btn btn-secondary" style={{ padding: "0 14px", fontSize: "0.86rem" }}>
                            View details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ROUTES - Scan List / Rows (Cards on Mobile) */}
      <section className="section-pad" id="routes" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">PUNCTUAL DOOR-TO-DOOR TRANSFERS</span>
            <h2 className="section-title">Popular Outstation Routes from Pune</h2>
            <p className="section-desc">
              Fast-scanning tariff list for frequent intercity highway corridors across Maharashtra and Goa.
            </p>
          </div>

          <div className="routes-list-wrap">
            {POPULAR_ROUTES.map((r) => (
              <div key={r.id} id={r.anchorId} className="route-row">
                <div className="route-name-col">
                  <span className={`route-type-badge ${r.tripType === "One-Way Drop" ? "oneway" : "round"}`}>
                    {r.tripType}
                  </span>
                  <span>{r.route}</span>
                </div>

                <div className="route-detail-col">
                  <span>Distance</span>
                  <strong>{r.dist}</strong>
                </div>

                <div className="route-detail-col">
                  <span>Travel Time</span>
                  <strong>{r.time}</strong>
                </div>

                <div className="route-price-col">
                  {r.fare}
                  <span>{r.vehicleModel}</span>
                </div>

                <div className="route-action-col">
                  <a
                    href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20book%20the%20${encodeURIComponent(r.route)}%20route%20(${r.tripType}%20in%20${encodeURIComponent(r.vehicleModel)}%20at%20${r.fare}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ minHeight: "44px", padding: "0 16px" }}
                  >
                    <span>Book Route</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FLEET - Filter Chips, 2x2 Specs Grid, Best-For Tag, Bold Rate */}
      <section className="section-pad" id="fleet">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">COMMERCIAL RTO VERIFIED FLEET</span>
            <h2 className="section-title">Executive Chauffeur Fleet in Pune</h2>
            <p className="section-desc">
              13 to 49-seater vehicles equipped with dual climate AC, pushback seats, and speed-governed safety.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="fleet-filter-bar">
            <button
              type="button"
              className={`fleet-chip ${fleetFilter === "all" ? "active" : ""}`}
              onClick={() => setFleetFilter("all")}
            >
              All Vehicles ({FLEET_DATA.length})
            </button>
            <button
              type="button"
              className={`fleet-chip ${fleetFilter === "urbania" ? "active" : ""}`}
              onClick={() => setFleetFilter("urbania")}
            >
              Force Urbania VIP
            </button>
            <button
              type="button"
              className={`fleet-chip ${fleetFilter === "tempo" ? "active" : ""}`}
              onClick={() => setFleetFilter("tempo")}
            >
              Tempo Travellers (17, 20 &amp; 26)
            </button>
            <button
              type="button"
              className={`fleet-chip ${fleetFilter === "minibus" ? "active" : ""}`}
              onClick={() => setFleetFilter("minibus")}
            >
              Mini Bus (32 Seats)
            </button>
            <button
              type="button"
              className={`fleet-chip ${fleetFilter === "luxury-bus" ? "active" : ""}`}
              onClick={() => setFleetFilter("luxury-bus")}
            >
              Luxury Coaches &amp; Sleepers
            </button>
          </div>

          <div className="fleet-grid">
            {filteredFleet.map((vehicle) => (
              <div key={vehicle.id} className="fleet-card">
                <div className="fleet-img-wrap">
                  <img src={vehicle.image} alt={vehicle.name} className="fleet-img" loading="lazy" />
                  <span className="fleet-category-tag">{vehicle.categoryLabel}</span>
                </div>

                <div className="fleet-body">
                  <h3 className="fleet-name">{vehicle.name}</h3>
                  <p className="fleet-submodel">{vehicle.submodel}</p>

                  {/* 2x2 Spec Grid */}
                  <div className="fleet-specs-2x2">
                    <div className="spec-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      <span>{vehicle.seatingText}</span>
                    </div>
                    <div className="spec-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="spec-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Min {vehicle.minKmPerDay} km/day</span>
                    </div>
                    <div className="spec-cell">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M3 21v-2a7 7 0 0 1 14 0v2" />
                      </svg>
                      <span>DA ₹{vehicle.driverAllowancePerDay}/day</span>
                    </div>
                  </div>

                  {/* Best For Tag */}
                  <div className="fleet-best-for">
                    <strong>Best for:</strong> {vehicle.bestFor}
                  </div>

                  <div className="fleet-footer">
                    <div className="fleet-rate-box">
                      <span>Outstation Rate</span>
                      <strong>₹{vehicle.ratePerKm} <small style={{ fontSize: "0.82rem", fontWeight: 600 }}>/ KM</small></strong>
                    </div>

                    <a
                      href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20check%20availability%20for%20the%20${encodeURIComponent(vehicle.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ minHeight: "44px" }}
                    >
                      Reserve Fleet
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FARE ESTIMATOR - 2 Panels (Inputs Left, Sticky Receipt Right) */}
      <section className="section-pad" id="fare" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">PUNE RATE CARD CALCULATOR</span>
            <h2 className="section-title">Instant Bus Fare Estimator</h2>
            <p className="section-desc">
              Calculate your exact travel budget according to official Pune minimum km rules.
            </p>
          </div>

          <div className="estimator-grid">
            {/* Left Inputs Panel */}
            <div className="estimator-inputs-panel">
              <h3>Trip Parameters</h3>
              <p>Configure your route distance, vehicle type, and travel duration.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="calcVehicle">Select Vehicle Model</label>
                <select
                  id="calcVehicle"
                  className="form-select"
                  onChange={(e) => {
                    const opt = e.target.options[e.target.selectedIndex];
                    setCalcRate(Number(e.target.value));
                    setCalcDA(Number(opt.getAttribute("data-da") || 500));
                    setCalcMinKmPerDay(Number(opt.getAttribute("data-min-km") || 300));
                    setCalcVehicleName(opt.getAttribute("data-name") || "");
                  }}
                >
                  <option value="38" data-da="500" data-min-km="300" data-name="Force Urbania VIP 17 Seater">
                    Force Urbania VIP 17 Seater (₹38/KM • Min 300 km/day)
                  </option>
                  <option value="28" data-da="500" data-min-km="300" data-name="Tempo Traveller AC 17 Seater">
                    Tempo Traveller AC 17 Seater (₹28/KM • Min 300 km/day)
                  </option>
                  <option value="31" data-da="550" data-min-km="300" data-name="Tempo Traveller AC 20 Seater">
                    Tempo Traveller AC 20 Seater (₹31/KM • Min 300 km/day)
                  </option>
                  <option value="34" data-da="600" data-min-km="300" data-name="Tempo Traveller AC 26 Seater">
                    Tempo Traveller AC 26 Seater (₹34/KM • Min 300 km/day)
                  </option>
                  <option value="42" data-da="700" data-min-km="300" data-name="Executive Mini Bus 32 Seater">
                    Executive Mini Bus 32 Seater (₹42/KM • Min 300 km/day)
                  </option>
                  <option value="60" data-da="900" data-min-km="350" data-name="Volvo B11R Multi-Axle 49 Seater">
                    Volvo Multi-Axle Luxury Coach 49 Seater (₹60/KM • Min 350 km/day)
                  </option>
                  <option value="58" data-da="900" data-min-km="350" data-name="BharatBenz AC Sleeper 36 Berths">
                    BharatBenz AC Sleeper Coach (₹58/KM • Min 350 km/day)
                  </option>
                  <option value="18" data-da="400" data-min-km="250" data-name="Toyota Innova Crysta 7 Seater">
                    Toyota Innova Crysta 7 Seater (₹18/KM • Min 250 km/day)
                  </option>
                </select>
              </div>

              {/* Distance Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <span>Total Distance</span>
                  <strong style={{ color: "var(--navy-900)" }}>{calcKm} KM</strong>
                </div>
                <input
                  type="range"
                  min="150"
                  max="2000"
                  step="25"
                  value={calcKm}
                  onChange={(e) => setCalcKm(Number(e.target.value))}
                  className="range-slider"
                  aria-label="Estimated Distance"
                />
              </div>

              {/* Days Slider */}
              <div className="slider-group">
                <div className="slider-header">
                  <span>Trip Duration</span>
                  <strong style={{ color: "var(--navy-900)" }}>{calcDays} Days</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="range-slider"
                  aria-label="Trip Duration"
                />
              </div>

              {/* Return Trip Toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px", padding: "12px", background: "var(--bg-subtle)", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--navy-900)" }}>
                  Round-Trip (Return to Pune)
                </span>
                <input
                  type="checkbox"
                  checked={isReturnTrip}
                  onChange={(e) => setIsReturnTrip(e.target.checked)}
                  style={{ width: "20px", height: "20px", accentColor: "var(--navy-900)" }}
                  aria-label="Toggle Round-Trip"
                />
              </div>

              {/* Minimum Billing Explanatory Alert */}
              {isMinBillingApplied && (
                <div style={{ marginTop: "16px", background: "var(--saffron-bg)", border: "1px solid var(--saffron-border)", borderRadius: "8px", padding: "12px", fontSize: "0.82rem", color: "var(--navy-900)", lineHeight: 1.5 }}>
                  <strong>Minimum KM Rule Applied:</strong> Pune outstation guidelines require a minimum of {calcMinKmPerDay} km/day ({calcDays} days = {minBillableKm} KM). Your entered distance of {effectiveDistance} KM is billed at the {minBillableKm} KM standard baseline.
                </div>
              )}
            </div>

            {/* Right Sticky Receipt Panel */}
            <div className="estimator-receipt-panel">
              <h3 className="receipt-title">Itemized Fare Summary</h3>
              <span className="receipt-vehicle-label">{calcVehicleName}</span>

              <div className="receipt-rows-list">
                <div className="receipt-line">
                  <span>Base Distance ({billableKm} KM @ ₹{calcRate}/km)</span>
                  <strong>₹{totalBase.toLocaleString()}</strong>
                </div>

                <div className="receipt-line">
                  <span>Driver Allowance ({calcDays} Days @ ₹{calcDA}/day)</span>
                  <strong>₹{totalDA.toLocaleString()}</strong>
                </div>

                <div className="receipt-line">
                  <span>GPS Tracking &amp; Sanitization</span>
                  <strong style={{ color: "#34d399" }}>Included Free</strong>
                </div>

                <div className="receipt-line">
                  <span>GST (5% Road Transport)</span>
                  <strong>₹{totalGst.toLocaleString()}</strong>
                </div>

                <div className="receipt-divider-line"></div>

                <div className="receipt-total-line">
                  <span>Total Estimate:</span>
                  <strong>₹{totalEstimate.toLocaleString()}</strong>
                </div>
              </div>

              <a
                href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20quoted%20an%20estimate%20of%20₹${totalEstimate.toLocaleString()}%20for%20${encodeURIComponent(calcVehicleName)}%20(${billableKm}%20KM,%20${calcDays}%20Days).%20Please%20confirm%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: "100%", minHeight: "48px", marginTop: "10px" }}
              >
                <span>Lock Fare on WhatsApp</span>
              </a>

              {/* Collapsed "What's Not Included" Note */}
              <div className="receipt-exclusions-accordion">
                <button
                  type="button"
                  className="exclusions-toggle-btn"
                  onClick={() => setIsExclusionsOpen(!isExclusionsOpen)}
                  aria-expanded={isExclusionsOpen}
                >
                  <span>What is NOT included? (Paid at actuals)</span>
                  <span>{isExclusionsOpen ? "−" : "+"}</span>
                </button>
                {isExclusionsOpen && (
                  <ul className="exclusions-content">
                    <li>• Highway Fastag toll receipts (paid as actuals)</li>
                    <li>• Parking fees at monuments, airports &amp; hotels</li>
                    <li>• State border permits (only if crossing outside Maharashtra)</li>
                    <li>• Night travel allowance (₹300 strictly if driving 11 PM – 5 AM)</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROCESS - 3 Steps with Numbered Circles Joined by a Line */}
      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">SEAMLESS DISPATCH</span>
            <h2 className="section-title">How Vishal Travels Works</h2>
            <p className="section-desc">
              Three simple steps from vehicle selection to doorstep pickup in Pune.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-step-card">
              <div className="process-num-circle">1</div>
              <h3 className="process-step-title">Select Fleet &amp; Route</h3>
              <p className="process-step-desc">
                Choose from Force Urbania VIP, Tempo Travellers, or luxury coaches tailored to your passenger count.
              </p>
            </div>

            <div className="process-step-card">
              <div className="process-num-circle">2</div>
              <h3 className="process-step-title">Transparent Fare Lock</h3>
              <p className="process-step-desc">
                Receive an itemized quote with standard minimum km guidelines, driver allowance, and GST invoice.
              </p>
            </div>

            <div className="process-step-card">
              <div className="process-num-circle">3</div>
              <h3 className="process-step-title">Chauffeur &amp; GPS Dispatch</h3>
              <p className="process-step-desc">
                Get driver details and live GPS tracking 2 hours before trip. Chilled AC doorstep pickup guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS - Left Score Summary Badge & Right Review Cards */}
      <section className="section-pad" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VERIFIED GOOGLE REVIEWS</span>
            <h2 className="section-title">What Our Passengers Say</h2>
            <p className="section-desc">
              Over 15,000+ happy travelers across Maharashtra family pilgrimages, weddings, and corporate offsites.
            </p>
          </div>

          <div className="reviews-layout">
            {/* Left Score Summary Card */}
            <div className="reviews-summary-card">
              <div className="reviews-score-big">4.9</div>
              <div className="reviews-stars-row">★★★★★</div>
              <p className="reviews-count-text">Based on 1,420+ Verified Pune Reviews</p>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: "100%", minHeight: "44px", fontSize: "0.85rem" }}
              >
                <span>View on Google Maps</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Right Reviews Grid */}
            <div className="reviews-grid-cards">
              {REVIEWS_DATA.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div className="review-top-meta">
                    <span className="review-stars">★★★★★</span>
                    <span className="review-google-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                      Google Verified
                    </span>
                  </div>

                  <p className="review-quote">&ldquo;{rev.text}&rdquo;</p>

                  <div className="review-author-wrap">
                    <div className="author-initials-avatar">{rev.initials}</div>
                    <div className="author-details">
                      <strong>{rev.name}</strong>
                      <span>{rev.role} • {rev.city} ({rev.date})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION - With + / - Icons (First Item Open by Default) */}
      <section className="section-pad" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CLEAR &amp; TRANSPARENT</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about outstation billing, advance tokens, and cancellation policies.
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FOOTER - 4 Columns, Map Preview & Social Icons */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid-4">
            {/* Col 1: Brand & Permit */}
            <div className="footer-col">
              <div className="footer-brand-title">
                Vishal <span>Travels</span>
              </div>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#94a3b8" }}>
                Licensed commercial passenger transport fleet operator in Pune, Maharashtra. Force Urbanias, AC tempo travellers, mini buses, and Volvo coaches for family pilgrimages, weddings, and corporate logistics.
              </p>
              <div className="footer-permit-box">
                <div><strong>GSTIN:</strong> 27AABCV1234F1Z8</div>
                <div><strong>RTO Permit:</strong> MH-12-TP-2024-8891</div>
                <div><strong>Type:</strong> All-India Tourist Contract Carriage</div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links-col">
                <li><a href="#packages">Tour Packages</a></li>
                <li><a href="#routes">Popular Routes</a></li>
                <li><a href="#fleet">Our Fleet (13–49 Seater)</a></li>
                <li><a href="#fare">Bus Fare Calculator</a></li>
                <li><a href="#faq">FAQ &amp; Cancellation Policy</a></li>
              </ul>
            </div>

            {/* Col 3: Contact Details (All 3 Phone Numbers Located Here) */}
            <div className="footer-col">
              <h4>Contact &amp; Helplines</h4>
              <div className="footer-contact-details">
                <div>
                  <strong>Head Office (Swargate):</strong>
                  Shop No. 14, Ground Floor, Pune-Satara Road, Near Swargate Bus Stand, Swargate, Pune 411042
                </div>
                <div>
                  <strong>Hinjewadi Yard:</strong>
                  Plot 42, Rajiv Gandhi Infotech Park, Phase 1, Hinjewadi, Pune 411057
                </div>
                <div>
                  <strong>Dispatch Phone Numbers:</strong>
                  <div style={{ marginTop: "4px" }}>
                    <a href={PRIMARY_PHONE_TEL} style={{ color: "#ffffff", fontWeight: 700 }}>
                      {PRIMARY_PHONE} (Primary 24/7)
                    </a>
                  </div>
                  <div>
                    <a href="tel:+919822044556" style={{ color: "#cbd5e1" }}>
                      +91 98220 44556 (Hinjewadi Desk)
                    </a>
                  </div>
                  <div>
                    <a href="tel:+919822044557" style={{ color: "#cbd5e1" }}>
                      +91 98220 44557 (Corporate Bookings)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Embedded Map & Social Icons */}
            <div className="footer-col">
              <h4>Office Location</h4>
              <div className="footer-map-box">
                <iframe
                  title="Vishal Travels Swargate Pune Location"
                  src="https://maps.google.com/maps?q=Swargate%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Social Icons in Footer */}
              <div className="footer-social-row">
                <a
                  href="https://www.facebook.com/share/14X2F187jBq/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/vishaltravelspune?utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  aria-label="Google Maps"
                  title="Google Maps"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Vishal Travels. All Rights Reserved. Pune, Maharashtra. (GSTIN: 27AABCV1234F1Z8)</span>
            <span>RTO Tourist Permit: MH-12-TP-2024-8891 • 100% Fastag Verified Fleet</span>
          </div>
        </div>
      </footer>

      {/* 13. FIXED MOBILE BOTTOM DOCK - Call, WhatsApp, Get Quote (No bubble overlap!) */}
      <div className="mobile-bottom-dock">
        <div className="mobile-dock-grid">
          <a href={PRIMARY_PHONE_TEL} className="btn btn-secondary mobile-dock-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20enquire%20about%20bus%20and%20tempo%20traveller%20rental%20in%20Pune.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mobile-dock-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <a href="#booking-card" className="btn btn-primary mobile-dock-btn">
            <span>Get Quote</span>
          </a>
        </div>
      </div>
    </>
  );
}
