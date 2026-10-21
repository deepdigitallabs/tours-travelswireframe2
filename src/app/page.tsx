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
  rating: number;
  reviewsCount: number;
  luggage: string;
  ratePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  image: string;
  amenities: string[];
  description: string;
}

interface PackageTour {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distanceKm: number;
  startingPrice: number;
  image: string;
  tag: string;
  highlights: string[];
}

interface Review {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  tripType: string;
}

const FLEET_DATA: Vehicle[] = [
  {
    id: "f1",
    name: "Force Urbania Luxury VIP Lounge",
    category: "urbania",
    categoryLabel: "Force Urbania VIP",
    seatingText: "13 & 17 Seater Maharaja AC",
    seatsNum: 17,
    submodel: "Mercedes-Derived Engine • Monocoque Body • Air Suspension",
    rating: 4.98,
    reviewsCount: 240,
    luggage: "20 Large Bags + Boot Space",
    ratePerKm: 38,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "/images/urbania_vip.jpg",
    amenities: [
      "Maharaja Leather Captain Seats",
      "Independent AC Blowers",
      "Panoramic UV Glass Windows",
      "Mobile USB Chargers Each Seat",
      "Music & PA Mic"
    ],
    description: "The flagship of Vishal Travels Pune. European luxury with superior legroom and whisper-quiet suspension for executive corporate trips and wedding VIP guests."
  },
  {
    id: "f2",
    name: "Force Tempo Traveller AC (17 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "17 Seater Push-back AC",
    seatsNum: 17,
    submodel: "Force Motors Deluxe 2x1 Configuration",
    rating: 4.94,
    reviewsCount: 520,
    luggage: "18 Suitcases + Rooftop Carrier",
    ratePerKm: 28,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "/images/tempo_traveller.jpg",
    amenities: [
      "Push-back Plush Velvet Seats",
      "JBL Sound System & Mic",
      "High-efficiency Dual AC",
      "First Aid & Fire Extinguisher",
      "Ghat-Experienced Driver"
    ],
    description: "Pune's top pick for Ashtavinayak Darshan, Mahabaleshwar weekend escapes, and Shirdi pilgrimages. Highly comfortable for family groups."
  },
  {
    id: "f3",
    name: "Force Tempo Traveller AC (26 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "26 Seater Push-back AC",
    seatsNum: 26,
    submodel: "Extra Long Wheelbase • 2x2 Reclining",
    rating: 4.91,
    reviewsCount: 380,
    luggage: "25+ Suitcases",
    ratePerKm: 34,
    minKmPerDay: 300,
    driverAllowancePerDay: 600,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: [
      "Individual Air Blowers",
      "LED Screen Infotainment",
      "Rear Air Suspension",
      "Ample Boot Space",
      "Emergency Exit Hammer"
    ],
    description: "Ideal for larger wedding barats and IT company offsite outings traveling across Maharashtra and Konkan."
  },
  {
    id: "f4",
    name: "Executive Mini Bus (32 Seater AC / Non-AC)",
    category: "minibus",
    categoryLabel: "Mini Bus Rental",
    seatingText: "32 Seater Reclining Seats",
    seatsNum: 32,
    submodel: "Eicher / Tata Starbus Executive Coach",
    rating: 4.89,
    reviewsCount: 290,
    luggage: "35 Large Suitcases",
    ratePerKm: 42,
    minKmPerDay: 300,
    driverAllowancePerDay: 700,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    amenities: [
      "Comfortable High-Back Seats",
      "Central Climate AC",
      "Mic System for Tour Guide",
      "Curtained Windows",
      "Clean Sanitized Cabin"
    ],
    description: "Spacious and affordable for school/college industrial visits, Pune IT park shifts, and Konkan group excursions."
  },
  {
    id: "f5",
    name: "Luxury Coach / Volvo Multi-Axle (49 Seater)",
    category: "luxury-bus",
    categoryLabel: "Luxury Volvo Coach",
    seatingText: "45-49 Seater Push-back / Sleeper",
    seatsNum: 49,
    submodel: "BharatBenz / Volvo B11R Multi-Axle",
    rating: 4.97,
    reviewsCount: 410,
    luggage: "60+ Suitcases Boot Capacity",
    ratePerKm: 60,
    minKmPerDay: 350,
    driverAllowancePerDay: 900,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&auto=format&fit=crop&q=80",
    amenities: [
      "Air Suspension Glide",
      "Reading Lights & Charging Points",
      "Dual Drivers for Highway Routes",
      "Emergency SOS & GPS",
      "Mineral Water Bottles"
    ],
    description: "The gold standard for multi-day pilgrimage tours (5 Jyotirlinga, Char Dham) and large destination weddings in Goa and Rajasthan."
  },
  {
    id: "f6",
    name: "Toyota Innova Crysta & Maruti Ertiga",
    category: "suv",
    categoryLabel: "Premium Chauffeur SUV",
    seatingText: "6 - 7 Seater Captain Seats",
    seatsNum: 7,
    submodel: "Innova Crysta 2.4 ZX / Ertiga ZXi+",
    rating: 4.96,
    reviewsCount: 640,
    luggage: "5 Suitcases",
    ratePerKm: 18,
    minKmPerDay: 250,
    driverAllowancePerDay: 400,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    amenities: [
      "Reclining Leather Seats",
      "Automatic Dual AC",
      "Fastag Enabled",
      "Dashcam Security",
      "Professional Chauffeur"
    ],
    description: "Swift, comfortable intercity rides for Pune-Mumbai airport pick & drop, corporate client visits, and small family hill tours."
  }
];

const PACKAGES_DATA: PackageTour[] = [
  {
    id: "pkg1",
    title: "Ashtavinayak Darshan from Pune",
    subtitle: "Complete 8 Ganesh Temples Yatra in 2 Days",
    duration: "2 Days / 1 Night",
    distanceKm: 650,
    startingPrice: 14500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80",
    tag: "Most Popular Pilgrimage",
    highlights: [
      "Mayureshwar (Morgaon)",
      "Siddhivinayak (Siddhatek)",
      "Ballaleshwar (Pali)",
      "Varadvinayak (Mahad)",
      "Chintamani, Girijatmaj, Vighnahar, Mahaganapati"
    ]
  },
  {
    id: "pkg2",
    title: "5 Jyotirlinga Darshan Bus Package",
    subtitle: "Sacred Maharashtra Circuit Yatra from Pune",
    duration: "4 Days / 3 Nights",
    distanceKm: 1450,
    startingPrice: 38000,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80",
    tag: "Sacred Yatra",
    highlights: [
      "Bhimashankar",
      "Trimbakeshwar (Nashik)",
      "Grishneshwar (Ellora)",
      "Aundha Nagnath",
      "Parli Vaijnath"
    ]
  },
  {
    id: "pkg3",
    title: "Pune to Mahabaleshwar & Panchgani",
    subtitle: "Scenic Hill Station Weekend Retreat",
    duration: "2 Days / 1 Night",
    distanceKm: 260,
    startingPrice: 8500,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80",
    tag: "Weekend Getaway",
    highlights: [
      "Arthur Seat Point",
      "Venna Lake Boating",
      "Mapro Garden Strawberry Farms",
      "Table Land Panchgani",
      "Old Mahabaleshwar Mandir"
    ]
  },
  {
    id: "pkg4",
    title: "Pune to Shirdi & Shani Shingnapur",
    subtitle: "Sai Baba Darshan with Return Pune Drop",
    duration: "Same Day or 2 Days",
    distanceKm: 420,
    startingPrice: 9800,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80",
    tag: "Express Yatra",
    highlights: [
      "Sai Baba Samadhi Mandir VIP",
      "Shani Shingnapur Temple",
      "Experienced highway route driver",
      "Flexible halt timings"
    ]
  },
  {
    id: "pkg5",
    title: "Malvan, Sindhudurg & Goa Tour",
    subtitle: "Konkan Coastal Heritage & Scuba Special",
    duration: "4 Days / 3 Nights",
    distanceKm: 980,
    startingPrice: 28500,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80",
    tag: "Konkan Beach Holiday",
    highlights: [
      "Sindhudurg Sea Fort",
      "Tarkarli Watersports & Scuba",
      "North Goa Beaches",
      "Authentic Malvani Food Halts"
    ]
  },
  {
    id: "pkg6",
    title: "Sade Teen Shakti Peeth Yatra",
    subtitle: "Divine Devi Temples of Maharashtra",
    duration: "3 Days / 2 Nights",
    distanceKm: 1100,
    startingPrice: 29900,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80",
    tag: "Devi Darshan Circuit",
    highlights: [
      "Mahalakshmi (Kolhapur)",
      "Bhavani Mata (Tuljapur)",
      "Renuka Mata (Mahur)",
      "Saptashrungi Nivasini (Vani)"
    ]
  }
];

const REVIEWS_DATA: Review[] = [
  {
    id: "r1",
    name: "Rajesh Gaikwad",
    role: "Family Group Coordinator",
    city: "Kothrud, Pune",
    rating: 5,
    text: "We booked Vishal Travels 17-seater Tempo Traveller for our family Ashtavinayak Yatra. The driver arrived 30 mins early in Kothrud, drove with utmost safety across the ghats, and knew all temple entry timings. Extremely polite and comfortable!",
    date: "12 Oct 2026",
    tripType: "Ashtavinayak Darshan"
  },
  {
    id: "r2",
    name: "Sneha Deshmukh",
    role: "HR Operations Lead",
    city: "Hinjewadi Phase 3, Pune",
    rating: 5,
    text: "Vishal Travels provided 4 Force Urbanias for our company leadership conference at Mahabaleshwar. Clean vehicles, crystal-clear sound systems, and billing was 100% transparent with GST. Will definitely book again.",
    date: "24 Sept 2026",
    tripType: "Corporate Transport"
  },
  {
    id: "r3",
    name: "Amitabh & Neha Kulkarni",
    role: "Wedding Hosts",
    city: "Baner, Pune",
    rating: 5,
    text: "Hired a 49-seater Volvo Multi-Axle and 2 Tempo Travellers for guest transport from Pune to Goa. Spotless interiors, prompt driver dispatch, and zero breakdown hassles. Made our wedding guests super comfortable.",
    date: "18 Aug 2026",
    tripType: "Destination Wedding"
  }
];

const FAQ_DATA = [
  {
    q: "What types of buses and tempo travellers are available for hire in Pune?",
    a: "Vishal Travels provides a comprehensive fleet including Force Urbania Luxury VIP (13 & 17 seater), Force Tempo Travellers (17, 20 & 26 seater AC/Non-AC), Executive Mini Buses (32 seater), and Luxury Multi-Axle Volvo / BharatBenz Coaches (45-55 seater). All vehicles are equipped with push-back seats, powerful air conditioning, charging ports, and luggage carriers."
  },
  {
    q: "How does the outstation bus rental tariff work in Pune?",
    a: "For outstation journeys, billing is typically based on per-kilometer tariff with a standard minimum average of 300 km per calendar day. In addition, driver allowance (DA) applies per day (₹500 to ₹700 depending on vehicle). Tolls, parking, and state entry permits are paid as actuals or can be bundled into an all-inclusive quotation upon request."
  },
  {
    q: "Are drivers experienced with ghat roads like Mahabaleshwar and Konkan?",
    a: "Yes! All our drivers are seasoned professionals with over 10+ years of highway experience navigating ghat sections including Bhor Ghat, Pasarni Ghat, and Amba Ghat. Our vehicles undergo strict brake and tire inspections before each trip."
  },
  {
    q: "What is the advance booking and cancellation policy?",
    a: "You can confirm your booking with a small token advance of ₹1,000 to ₹2,000 via UPI / bank transfer. The remaining balance can be settled with the driver at pickup or upon trip conclusion. If you need to reschedule with 24 hours prior notice, your token can be transferred to a future travel date with zero cancellation fee."
  }
];

export default function HomePage() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Booking Form State
  const [bookingTripType, setBookingTripType] = useState<"outstation" | "local" | "airport">("outstation");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [startDate, setStartDate] = useState("2026-10-22");
  const [returnDate, setReturnDate] = useState("2026-10-24");
  const [seatingCapacity, setSeatingCapacity] = useState("17 Seater");
  const [busType, setBusType] = useState("Force Urbania A/C");
  const [pickupLocation, setPickupLocation] = useState("Pune (Any Landmark)");
  const [destination, setDestination] = useState("Mahabaleshwar");

  // Fleet Filtering State
  const [fleetFilter, setFleetFilter] = useState<string>("all");

  // Fare Calculator State
  const [calcKm, setCalcKm] = useState<number>(350);
  const [calcDays, setCalcDays] = useState<number>(2);
  const [calcRate, setCalcRate] = useState<number>(38);
  const [calcDA, setCalcDA] = useState<number>(500);
  const [calcVehicleName, setCalcVehicleName] = useState<string>("Force Urbania VIP (17 Seater)");

  // Modals & Interactivity State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageTour | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<{
    pnr: string;
    name: string;
    phone: string;
    vehicle: string;
    date: string;
    time: string;
    from: string;
    to: string;
  } | null>(null);
  const [generatedTicketImage, setGeneratedTicketImage] = useState<string | null>(null);
  const [lastWaText, setLastWaText] = useState<string>("");

  // Reservation Modal Form State (Defaulting to User Request Values)
  const [modalName, setModalName] = useState("Sanjay Shinde");
  const [modalPhone, setModalPhone] = useState("9764564699");
  const [modalPickup, setModalPickup] = useState("Pune (Any Landmark)");
  const [modalDestination, setModalDestination] = useState("Mumbai International Airport (T2)");
  const [modalDate, setModalDate] = useState("2026-10-22");
  const [modalTime, setModalTime] = useState("06:30");

  // Live GPS Telemetry Simulation State
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerSpeed, setTrackerSpeed] = useState(62);
  const [trackerProgress, setTrackerProgress] = useState(45);

  // Toast System
  const [toast, setToast] = useState<{ text: string; type: "success" | "info" } | null>(null);

  // WhatsApp Simulation Drawer
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [waMessages, setWaMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Namaskar! Welcome to Vishal Travels Pune. How can we assist your trip planning today?"
    }
  ]);
  const [waInput, setWaInput] = useState("");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sticky Header Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Telemetry Interval
  useEffect(() => {
    if (!isTrackerModalOpen) return;
    const interval = setInterval(() => {
      setTrackerSpeed((prev) => Math.min(78, Math.max(45, prev + (Math.floor(Math.random() * 7) - 3))));
      setTrackerProgress((prev) => (prev >= 98 ? 15 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isTrackerModalOpen]);

  const triggerToast = (text: string, type: "success" | "info" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Canvas-based High-Resolution Trip Voucher & Enquiry Image Generator
  const createTicketCanvasImage = (ticket: {
    pnr: string;
    name: string;
    phone: string;
    vehicle: string;
    date: string;
    time: string;
    from: string;
    to: string;
    advance?: string;
  }) => {
    if (typeof window === "undefined") return null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 680;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Executive Midnight Gradient
      const grad = ctx.createLinearGradient(0, 0, 960, 680);
      grad.addColorStop(0, "#050d1a");
      grad.addColorStop(0.5, "#0a1932");
      grad.addColorStop(1, "#122a50");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 680);

      // Gold Perimeter Border
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.strokeRect(18, 18, 924, 644);

      // Card Inner Surface
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      ctx.fillRect(36, 36, 888, 608);

      // Header Brand
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("VISHAL TRAVELS PUNE", 60, 85);

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("BOOKING ENQUIRY & TRIP SUMMARY VOUCHER", 60, 115);

      // Gold Reference Ribbon
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(660, 55, 230, 52);
      ctx.fillStyle = "#071324";
      ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(`REF: ${ticket.pnr}`, 678, 88);

      // Divider Line
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 140);
      ctx.lineTo(890, 140);
      ctx.stroke();

      // Route Strip
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(60, 160, 830, 84);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("PICKUP / ORIGIN", 80, 186);
      ctx.fillText("DESTINATION", 520, 186);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(ticket.from, 80, 220);
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("➔", 460, 220);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText(ticket.to, 520, 220);

      // Details 2-Column Grid
      const drawItem = (label: string, val: string, x: number, y: number) => {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "13px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(label, x, y);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 17px -apple-system, BlinkMacSystemFont, sans-serif";
        ctx.fillText(val, x, y + 25);
      };

      drawItem("PASSENGER NAME", ticket.name, 80, 285);
      drawItem("CONTACT MOBILE", `+91 ${ticket.phone}`, 520, 285);
      drawItem("VEHICLE REQUESTED", ticket.vehicle, 80, 360);
      drawItem("JOURNEY DATE & TIME", `${ticket.date} • ${ticket.time}`, 520, 360);
      drawItem("ENQUIRY STATUS", "Forwarded via WhatsApp", 80, 435);
      drawItem("DISPATCH HELPLINE", "+91 9764564699 / 9372459371", 520, 435);

      // Green Guarantee Strip
      ctx.fillStyle = "rgba(16, 185, 129, 0.16)";
      ctx.fillRect(60, 495, 830, 52);
      ctx.fillStyle = "#10b981";
      ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("✓ Request forwarded directly to Vishal Travels Owner on WhatsApp for availability check.", 80, 528);

      ctx.fillStyle = "#64748b";
      ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.fillText("Vishal Travels Pune • Swargate & Hinjewadi Hub • Verified Maharashtra Tourist Permit Fleet", 60, 595);

      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnr = "VT-REQ-" + Math.floor(100000 + Math.random() * 900000);
    const passengerName = custName || "Guest Traveler";
    const passengerPhone = custPhone || "9764564699";
    const vehicleChoice = `${seatingCapacity} • ${busType}`;
    const journeyDate = startDate;
    const reportingTime = "06:30 AM";
    const fromLoc = pickupLocation;
    const toLoc = destination;

    const ticketData = {
      pnr,
      name: passengerName,
      phone: passengerPhone,
      vehicle: vehicleChoice,
      date: journeyDate,
      time: reportingTime,
      from: fromLoc,
      to: toLoc
    };

    const imgData = createTicketCanvasImage(ticketData);
    setGeneratedTicketImage(imgData);
    setGeneratedTicket(ticketData);

    // Send formatted WhatsApp text to owner (+91 9764564699)
    const ownerPhone = "919764564699";
    const waText = `*TRIP ENQUIRY & RESERVATION REQUEST*
*Vishal Travels Pune*
--------------------------------------------
*Enquiry Ref:* ${pnr}
*Passenger Name:* ${passengerName}
*Mobile Number:* +91 ${passengerPhone}
*Vehicle Selected:* ${vehicleChoice}
*Pickup Point:* ${fromLoc}
*Destination:* ${toLoc}
*Journey Date:* ${journeyDate}
*Reporting Time:* ${reportingTime}
--------------------------------------------
_Namaskar Vishal Travels! Please check vehicle availability for my journey and share the final quotation._`;

    setLastWaText(waText);
    const waUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(waText)}`;
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    setIsTicketModalOpen(true);
    triggerToast("Trip enquiry crafted & sent to Owner on WhatsApp (+91 9764564699).", "success");
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const pnr = selectedPackage
      ? "VT-TOUR-" + Math.floor(100000 + Math.random() * 900000)
      : "VT-REQ-" + Math.floor(100000 + Math.random() * 900000);
    const vehicleName = selectedPackage
      ? `${selectedPackage.title} (${selectedPackage.duration})`
      : selectedVehicle
      ? selectedVehicle.name
      : "Toyota Innova Crysta & Maruti Ertiga";
    const passengerName = modalName || custName || "Sanjay Shinde";
    const passengerPhone = modalPhone || custPhone || "9764564699";
    const fromLocation = modalPickup || pickupLocation || "Pune (Any Landmark)";
    const toLocation = selectedPackage
      ? `${selectedPackage.title} (${selectedPackage.distanceKm} KM)`
      : modalDestination || destination || "Mumbai International Airport (T2)";
    const journeyDate = modalDate || startDate || "2026-10-22";
    const reportingTime = modalTime || "06:30 AM";

    const ticketData = {
      pnr,
      name: passengerName,
      phone: passengerPhone,
      vehicle: vehicleName,
      date: journeyDate,
      time: reportingTime,
      from: fromLocation,
      to: toLocation
    };

    // 1. Generate downloadable image of the Trip Summary Voucher
    const imgData = createTicketCanvasImage(ticketData);
    setGeneratedTicketImage(imgData);
    setGeneratedTicket(ticketData);

    // 2. Prepare text message for WhatsApp to the owner (+91 9764564699)
    const ownerPhone = "919764564699";
    const waText = selectedPackage
      ? `*TOUR PACKAGE BOOKING ENQUIRY*
*Vishal Travels Pune*
--------------------------------------------
*Enquiry Ref:* ${pnr}
*Tour Package:* ${selectedPackage.title}
*Subtitle:* ${selectedPackage.subtitle}
*Duration & Distance:* ${selectedPackage.duration} • ${selectedPackage.distanceKm} KM
*Package Fare:* Starting From ₹${selectedPackage.startingPrice.toLocaleString()}
*Passenger Name:* ${passengerName}
*Mobile Number:* +91 ${passengerPhone}
*Pickup Point:* ${fromLocation}
*Journey Date:* ${journeyDate}
*Reporting Time:* ${reportingTime}
--------------------------------------------
_Namaskar Vishal Travels! Please check vehicle availability for our tour and share the final itinerary quotation._`
      : `*TRIP ENQUIRY & RESERVATION REQUEST*
*Vishal Travels Pune*
--------------------------------------------
*Enquiry Ref:* ${pnr}
*Passenger Name:* ${passengerName}
*Mobile Number:* +91 ${passengerPhone}
*Vehicle Requested:* ${vehicleName}
*Pickup Point:* ${fromLocation}
*Destination:* ${toLocation}
*Journey Date:* ${journeyDate}
*Reporting Time:* ${reportingTime}
--------------------------------------------
_Namaskar Vishal Travels! Please check vehicle availability for my trip and share the final quotation._`;

    setLastWaText(waText);

    // 3. Open WhatsApp to send the text message to the owner directly!
    const waUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(waText)}`;
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    setIsBookingModalOpen(false);
    setIsTicketModalOpen(true);
    triggerToast("Trip enquiry crafted & sent to Owner on WhatsApp (+91 9764564699).", "success");
  };

  const handleDownloadTicketImage = () => {
    if (!generatedTicketImage) {
      triggerToast("Generating ticket image...", "info");
      return;
    }
    const a = document.createElement("a");
    a.href = generatedTicketImage;
    a.download = `Vishal_Travels_Voucher_${generatedTicket?.pnr || "Enquiry"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerToast("Trip summary voucher image downloaded successfully!", "success");
  };

  const handleSendWa = (userMsg: string) => {
    if (!userMsg.trim()) return;
    const newMsgs = [...waMessages, { sender: "user" as const, text: userMsg }];
    setWaMessages(newMsgs);
    setWaInput("");
    setTimeout(() => {
      let reply = "Dhanyawad! Our Pune booking manager is checking available buses for your dates. We will call you on +91 9764564699 shortly.";
      if (userMsg.toLowerCase().includes("ashtavinayak")) {
        reply = "🛕 Ashtavinayak Darshan 2-Day package available in AC Tempo Traveller (17-seater) & Force Urbania. Toll guidance included!";
      } else if (userMsg.toLowerCase().includes("urbania")) {
        reply = "🚐 Force Urbania VIP available with Maharaja leather seats and charging ports. Call directly on +91 9764564699 for instant lock.";
      }
      setWaMessages((prev) => [...prev, { sender: "bot" as const, text: reply }]);
    }, 700);
  };

  const filteredFleet =
    fleetFilter === "all"
      ? FLEET_DATA
      : FLEET_DATA.filter((v) => v.category === fleetFilter);

  // Calculations
  const totalBase = calcKm * calcRate;
  const totalDA = calcDays * calcDA;
  const subtotal = totalBase + totalDA;
  const totalGst = Math.round(subtotal * 0.05);
  const totalEstimate = subtotal + totalGst;

  return (
    <>
      {/* 1. TOP BAR - Executive Midnight Ribbon with Warm Gold Highlights */}
      <div className="vishal-topbar">
        <div className="container vishal-topbar-content">
          <div className="topbar-phone-links">
            <span className="topbar-badge-pill">
              🛡️ MH Tourist Permit Fleet • Pune Hub
            </span>
            <a href="tel:+919764564699" className="topbar-phone-item">
              <span>📞</span> +91 9764564699
            </a>
            <a href="tel:+919372459371" className="topbar-phone-item">
              <span>📞</span> +91 9372459371
            </a>
            <a href="tel:+918600118437" className="topbar-phone-item">
              <span>📞</span> +91 8600118437
            </a>
          </div>

          <div className="topbar-right-group">
            <div className="topbar-rating-badge">
              <span>⭐</span> <strong>4.9 / 5</strong> (1,400+ Verified Pune Reviews)
            </div>
            <div className="topbar-social-links">
              <a
                href="https://www.facebook.com/share/14X2F187jBq/"
                target="_blank"
                rel="noreferrer"
                className="topbar-social-icon"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/vishaltravelspune?utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="topbar-social-icon"
                aria-label="Instagram"
              >
                ig
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - Refined Glassmorphism & Gold Gradient CTA */}
      <header className={`vishal-header ${isScrolled ? "scrolled" : ""}`} id="mainHeader">
        <div className="container vishal-header-inner">
          {/* Logo with Premium Crest & Typography */}
          <a href="#home" className="vishal-logo-wrap">
            <div className="vishal-logo-badge">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="6" width="18" height="12" rx="3" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
                <line x1="3" y1="11" x2="21" y2="11" />
                <line x1="7" y1="6" x2="7" y2="11" />
                <line x1="12" y1="6" x2="12" y2="11" />
                <line x1="17" y1="6" x2="17" y2="11" />
              </svg>
            </div>
            <div className="vishal-logo-text">
              <div className="vishal-brand-name">
                Vishal <span>Travels</span>
              </div>
              <span className="vishal-brand-tagline">EXECUTIVE FLEET • PUNE</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="vishal-nav-menu">
            <a
              href="#home"
              className={`vishal-nav-item ${activeSection === "home" ? "active" : ""}`}
              onClick={() => setActiveSection("home")}
            >
              Home
            </a>
            <a
              href="#booking-form-section"
              className={`vishal-nav-item ${activeSection === "booking" ? "active" : ""}`}
              onClick={() => setActiveSection("booking")}
            >
              Book Fleet
            </a>

            {/* Routes Dropdown */}
            <div className="nav-item-has-dropdown">
              <a
                href="#routes-trips"
                className={`vishal-nav-item ${activeSection === "routes-trips" ? "active" : ""}`}
              >
                Routes & Trips <span className="dropdown-caret">▼</span>
              </a>
              <div className="nav-dropdown-menu">
                <a
                  href="#routes-trips"
                  className="nav-dropdown-link"
                  onClick={() => {
                    setPickupLocation("Pune");
                    setDestination("Mahabaleshwar");
                  }}
                >
                  <span>Pune ➔ Mahabaleshwar</span>
                  <small style={{ color: "var(--gold-600)", fontWeight: 700 }}>₹4,200</small>
                </a>
                <a
                  href="#routes-trips"
                  className="nav-dropdown-link"
                  onClick={() => {
                    setPickupLocation("Pune");
                    setDestination("Shirdi");
                  }}
                >
                  <span>Pune ➔ Shirdi Mandir</span>
                  <small style={{ color: "var(--gold-600)", fontWeight: 700 }}>₹4,800</small>
                </a>
                <a
                  href="#routes-trips"
                  className="nav-dropdown-link"
                  onClick={() => {
                    setPickupLocation("Pune");
                    setDestination("Mumbai Airport");
                  }}
                >
                  <span>Pune ➔ Mumbai Airport</span>
                  <small style={{ color: "var(--gold-600)", fontWeight: 700 }}>₹3,500</small>
                </a>
                <a
                  href="#routes-trips"
                  className="nav-dropdown-link"
                  onClick={() => {
                    setPickupLocation("Pune");
                    setDestination("Chiplun");
                  }}
                >
                  <span>Pune ➔ Chiplun / Konkan</span>
                  <small style={{ color: "var(--gold-600)", fontWeight: 700 }}>₹5,400</small>
                </a>
                <a
                  href="#routes-trips"
                  className="nav-dropdown-link"
                  onClick={() => {
                    setPickupLocation("Pune");
                    setDestination("Goa");
                  }}
                >
                  <span>Pune ➔ Goa Coastal</span>
                  <small style={{ color: "var(--gold-600)", fontWeight: 700 }}>₹14,500</small>
                </a>
              </div>
            </div>

            {/* Packages Dropdown */}
            <div className="nav-item-has-dropdown">
              <a
                href="#tour-packages"
                className={`vishal-nav-item ${activeSection === "tour-packages" ? "active" : ""}`}
              >
                Packages <span className="dropdown-caret">▼</span>
              </a>
              <div className="nav-dropdown-menu">
                <a
                  href="#tour-packages"
                  className="nav-dropdown-link"
                  onClick={() => setDestination("Ashtavinayak Darshan")}
                >
                  <span>🛕 Ashtavinayak 8 Ganpati</span>
                  <small style={{ color: "var(--blue-accent)", fontWeight: 700 }}>2 Days</small>
                </a>
                <a
                  href="#tour-packages"
                  className="nav-dropdown-link"
                  onClick={() => setDestination("5 Jyotirlinga")}
                >
                  <span>🔱 5 Jyotirlinga Circuit</span>
                  <small style={{ color: "var(--blue-accent)", fontWeight: 700 }}>4 Days</small>
                </a>
                <a
                  href="#tour-packages"
                  className="nav-dropdown-link"
                  onClick={() => setDestination("Mahabaleshwar & Panchgani")}
                >
                  <span>🍓 Mahabaleshwar Weekend</span>
                  <small style={{ color: "var(--blue-accent)", fontWeight: 700 }}>2 Days</small>
                </a>
                <a
                  href="#tour-packages"
                  className="nav-dropdown-link"
                  onClick={() => setDestination("Shirdi & Shani Shingnapur")}
                >
                  <span>🙏 Shirdi Sai Baba Darshan</span>
                  <small style={{ color: "var(--blue-accent)", fontWeight: 700 }}>1-2 Days</small>
                </a>
                <a
                  href="#tour-packages"
                  className="nav-dropdown-link"
                  onClick={() => setDestination("Malvan & Goa")}
                >
                  <span>🏖️ Malvan Scuba & Goa</span>
                  <small style={{ color: "var(--blue-accent)", fontWeight: 700 }}>4 Days</small>
                </a>
              </div>
            </div>

            <a
              href="#our-fleet"
              className={`vishal-nav-item ${activeSection === "our-fleet" ? "active" : ""}`}
            >
              Our Fleet
            </a>
            <a
              href="#fare-calculator"
              className={`vishal-nav-item ${activeSection === "fare-calculator" ? "active" : ""}`}
            >
              Bus Fare
            </a>
            <a
              href="#reviews"
              className={`vishal-nav-item ${activeSection === "reviews" ? "active" : ""}`}
            >
              Reviews
            </a>
            <a
              href="#faq"
              className={`vishal-nav-item ${activeSection === "faq" ? "active" : ""}`}
            >
              FAQ
            </a>
          </nav>

          {/* Luxury Gold CTA Button */}
          <a href="#booking-form-section" className="btn-header-cta">
            <span>Instant Reservation</span>
            <span>➔</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Animated Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="vishal-mobile-drawer">
            <a href="#home" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Home</span> <span>➔</span>
            </a>
            <a href="#booking-form-section" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Book Fleet</span> <span>➔</span>
            </a>
            <a href="#tour-packages" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Tour Packages</span> <span>➔</span>
            </a>
            <a href="#routes-trips" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Routes & Trips</span> <span>➔</span>
            </a>
            <a href="#our-fleet" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Our Fleet</span> <span>➔</span>
            </a>
            <a href="#fare-calculator" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Bus Fare Calculator</span> <span>➔</span>
            </a>
            <a href="#faq" className="vishal-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Frequently Asked Questions</span> <span>➔</span>
            </a>
            <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <a
                href="tel:+919764564699"
                className="btn-header-cta"
                style={{ textAlign: "center", justifyContent: "center", textDecoration: "none" }}
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/919764564699"
                style={{
                  background: "#25d366",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  textDecoration: "none"
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - Cinematic Fleet View with Luxury Multi-stop Gradient */}
      <section className="vishal-hero" id="home">
        {/* Prestigious Trust Badge */}
        <div className="hero-trust-pill">
          <span className="star-badge">★</span>
          <span>Pune's Highest Rated Luxury Fleet • 15+ Years of Excellence</span>
        </div>

        {/* Dynamic Gradient Headline */}
        <h1 className="hero-main-title">
          Executive Bus &amp; Tempo Traveller{" "}
          <span className="gradient-text">Rental in Pune</span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="hero-description-text">
          Experience peerless road travel across Maharashtra with Vishal Travels. Force Urbania VIP,
          luxury AC Tempo Travellers (13–26 seater), mini buses, and Volvo coaches with verified,
          ghat-tested chauffeurs and 100% transparent billing.
        </p>

        {/* Action CTAs in Hero */}
        <div className="hero-cta-group">
          <a href="#booking-form-section" className="btn-hero-primary">
            <span>Book Your Fleet</span>
            <span>➔</span>
          </a>
          <a href="#fare-calculator" className="btn-hero-secondary">
            <span>Calculate Bus Fare</span>
          </a>
        </div>

        {/* Exact Stats Bar in Single Line Desktop View */}
        <div className="hero-stats-card">
          <div className="stats-card-item">
            <span className="stats-star">★</span> 4.8/5 on Google
          </div>
          <div className="stats-card-item">
            5,000+ Happy Customers
          </div>
          <div className="stats-card-item">
            10,000+ Trips Completed
          </div>
          <div className="stats-card-item">
            7+ Years in Pune
          </div>
          <div className="stats-card-item">
            50+ Vehicles in Fleet
          </div>
        </div>
      </section>

      {/* 4. EXECUTIVE BOOKING CONSOLE SECTION */}
      <section className="booking-section" id="booking-form-section">
        <div className="container booking-two-col">
          {/* Left Column: Brand Guarantees & Real Pune Context */}
          <div className="booking-info-box">
            <span className="sub-tag-line">
              <span>●</span> VERIFIED PUNE FLEET DISPATCH
            </span>
            <h2 className="booking-info-title">
              Effortless Booking for Group Tours, Corporate Offsites &amp; Weddings
            </h2>
            <p className="booking-info-desc">
              Whether you are organizing an Ashtavinayak pilgrimage for your family, an executive
              conference at Mahabaleshwar, or airport transfers for VIP guests, our fleet is dispatched
              with spotless interiors, chilled AC, and polite, police-verified chauffeurs.
            </p>

            <div className="booking-value-props">
              <div className="value-prop-item">
                <div className="vp-icon-circle">✓</div>
                <div className="vp-text">
                  <strong>Doorstep Pickup Anywhere in Pune &amp; PCMC</strong>
                  <small>Kothrud, Hinjewadi, Viman Nagar, Hadapsar, Baner, Wakad &amp; Swargate.</small>
                </div>
              </div>
              <div className="value-prop-item">
                <div className="vp-icon-circle">✓</div>
                <div className="vp-text">
                  <strong>Experienced Highway &amp; Ghat Drivers</strong>
                  <small>Over 10+ years expert navigation across Khandala, Bhor &amp; Pasarni ghats.</small>
                </div>
              </div>
              <div className="value-prop-item">
                <div className="vp-icon-circle">✓</div>
                <div className="vp-text">
                  <strong>Transparent Per-KM Tariff with GST Invoice</strong>
                  <small>Fixed rate card, clear driver allowance, zero unexpected toll surcharges.</small>
                </div>
              </div>
            </div>

            <div className="booking-contact-row">
              <a href="tel:+919764564699" className="contact-quick-card">
                <div className="contact-card-icon">📞</div>
                <div className="contact-card-text">
                  <small>Call 24/7 Helpline</small>
                  <strong>+91 9764564699</strong>
                </div>
              </a>
              <a
                href="https://wa.me/919764564699"
                target="_blank"
                rel="noreferrer"
                className="contact-quick-card wa"
              >
                <div className="contact-card-icon">💬</div>
                <div className="contact-card-text">
                  <small>Instant WhatsApp</small>
                  <strong>+91 9764564699</strong>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Executive Trip Booking Console */}
          <div className="booking-form-box">
            <div className="bf-header-strip">
              <div className="bf-header-title">
                <span>🚌</span> Trip Booking Console
              </div>
              <span className="bf-header-badge">Direct WhatsApp Booking</span>
            </div>

            <div className="bf-body">
              {/* Trip Type Selector Tabs */}
              <div className="bf-tabs-row">
                <button
                  type="button"
                  className={`bf-tab-btn ${bookingTripType === "outstation" ? "active" : ""}`}
                  onClick={() => setBookingTripType("outstation")}
                >
                  Outstation Tour
                </button>
                <button
                  type="button"
                  className={`bf-tab-btn ${bookingTripType === "local" ? "active" : ""}`}
                  onClick={() => {
                    setBookingTripType("local");
                    setDestination("Pune Local (8 Hrs / 80 KM)");
                  }}
                >
                  Pune Local 8Hr
                </button>
                <button
                  type="button"
                  className={`bf-tab-btn ${bookingTripType === "airport" ? "active" : ""}`}
                  onClick={() => {
                    setBookingTripType("airport");
                    setDestination("Mumbai International Airport (T2)");
                  }}
                >
                  Airport Drop/Pick
                </button>
              </div>

              <form onSubmit={handleQuickBookSubmit}>
                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label htmlFor="formCustName">Your Full Name *</label>
                    <input
                      type="text"
                      id="formCustName"
                      placeholder="e.g. Rahul Patil"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label htmlFor="formCustPhone">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      id="formCustPhone"
                      placeholder="10-digit mobile number"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label htmlFor="formPickup">Pickup Landmark in Pune *</label>
                    <input
                      type="text"
                      id="formPickup"
                      placeholder="e.g. Hinjewadi Phase 1, Baner, Kothrud"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label htmlFor="formDest">Destination / Route *</label>
                    <input
                      type="text"
                      id="formDest"
                      placeholder="e.g. Mahabaleshwar, Shirdi, Goa"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label htmlFor="formStartDate">Journey Start Date *</label>
                    <input
                      type="date"
                      id="formStartDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label htmlFor="formReturnDate">Return Date</label>
                    <input
                      type="date"
                      id="formReturnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label htmlFor="formSeating">Seating Capacity</label>
                    <select
                      id="formSeating"
                      value={seatingCapacity}
                      onChange={(e) => setSeatingCapacity(e.target.value)}
                    >
                      <option value="13 Seater">13 Seater VIP Urbania</option>
                      <option value="17 Seater">17 Seater Maharaja / Tempo</option>
                      <option value="20 Seater">20 Seater Tempo Traveller</option>
                      <option value="26 Seater">26 Seater Long Wheelbase</option>
                      <option value="32 Seater">32 Seater Executive Coach</option>
                      <option value="49 Seater">49 Seater Volvo Multi-Axle</option>
                      <option value="7 Seater">7 Seater Innova Crysta</option>
                    </select>
                  </div>
                  <div className="bf-field">
                    <label htmlFor="formBusType">Vehicle Category</label>
                    <select
                      id="formBusType"
                      value={busType}
                      onChange={(e) => setBusType(e.target.value)}
                    >
                      <option value="Force Urbania VIP A/C">Force Urbania VIP Lounge A/C</option>
                      <option value="Tempo Traveller Deluxe A/C">Tempo Traveller Deluxe A/C</option>
                      <option value="Executive Mini Bus A/C">Executive Mini Bus A/C</option>
                      <option value="Volvo Multi-Axle Luxury Coach">Volvo Multi-Axle Luxury Coach</option>
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-submit-booking">
                  <span>💬 Send Booking Request on WhatsApp</span>
                  <span>➔</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE VISHAL TRAVELS STANDARD (Zero Generic AI Template Artifacts) */}
      <section className="steps-section" id="steps-section">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">RELIABLE GROUP MOBILITY</span>
            <h2 className="head-title">The Vishal Travels Seamless Process</h2>
            <p className="head-desc">
              From reservation to doorstep drop-off, every detail is engineered for safety, comfort,
              and peace of mind.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-header-row">
                <div className="step-icon-badge">🚐</div>
                <span className="step-order-number">01</span>
              </div>
              <h4>Curate Fleet &amp; Route</h4>
              <p>
                Choose from Force Urbania VIP, Tempo Travellers (13–26 seats), or luxury coaches based
                on your passenger count and luggage needs.
              </p>
            </div>

            <div className="step-card">
              <div className="step-header-row">
                <div className="step-icon-badge">📄</div>
                <span className="step-order-number">02</span>
              </div>
              <h4>Transparent Fare Lock</h4>
              <p>
                Receive an all-inclusive itemized quotation covering base distance, driver allowance,
                and state permits with zero hidden surprises.
              </p>
            </div>

            <div className="step-card">
              <div className="step-header-row">
                <div className="step-icon-badge">🛰️</div>
                <span className="step-order-number">03</span>
              </div>
              <h4>Verified Chauffeur &amp; GPS Dispatch</h4>
              <p>
                Get your driver name, contact, and live GPS tracking link 2 hours before trip. Travel in
                spotless, chilled AC comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOUR PACKAGES FROM PUNE */}
      <section className="packages-section" id="tour-packages">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">PILGRIMAGE &amp; SCENIC HOLIDAYS</span>
            <h2 className="head-title">Curated Tour Packages from Pune</h2>
            <p className="head-desc">
              Handcrafted itineraries with seasoned drivers who know every temple ritual schedule,
              clean food stop, and scenic viewpoint.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES_DATA.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="pkg-img-wrap">
                  <img src={pkg.image} alt={pkg.title} className="pkg-img" />
                  <span className="pkg-badge">{pkg.tag}</span>
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-title">{pkg.title}</h3>
                  <p className="pkg-subtitle">{pkg.subtitle}</p>
                  <div className="pkg-meta-row">
                    <span>⏱️ {pkg.duration}</span>
                    <span>🛣️ {pkg.distanceKm} KM</span>
                  </div>
                  <div className="pkg-highlights">
                    <strong>Circuit Highlights:</strong>
                    <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} style={{ listStyleType: "disc" }}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pkg-footer">
                    <div className="pkg-price-stack">
                      <span className="pkg-price-label">Starting From</span>
                      <strong className="pkg-price-amount">
                        ₹{pkg.startingPrice.toLocaleString()}
                      </strong>
                    </div>
                    <button
                      className="btn-header-cta"
                      style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setSelectedVehicle(null);
                        setModalDestination(`${pkg.title} (${pkg.duration})`);
                        setModalPickup("Pune (Any Landmark / Swargate / Hinjewadi)");
                        setIsBookingModalOpen(true);
                      }}
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ROUTES & TRIPS */}
      <section className="booking-section" id="routes-trips" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">FREQUENT HIGHWAY CORRIDORS</span>
            <h2 className="head-title">Popular Outstation Routes from Pune</h2>
            <p className="head-desc">
              Punctual door-to-door group transfers across Maharashtra, Konkan, and Goa.
            </p>
          </div>

          <div className="routes-grid">
            {[
              { route: "Pune ➔ Mumbai / Airport", time: "3.5 hrs", dist: "150 KM", fare: "₹3,500" },
              { route: "Pune ➔ Mahabaleshwar", time: "3.0 hrs", dist: "125 KM", fare: "₹4,200" },
              { route: "Pune ➔ Shirdi Sai Mandir", time: "4.5 hrs", dist: "210 KM", fare: "₹4,800" },
              { route: "Pune ➔ Lonavala & Khandala", time: "1.5 hrs", dist: "70 KM", fare: "₹2,600" },
              { route: "Pune ➔ Chiplun & Konkan", time: "5.5 hrs", dist: "240 KM", fare: "₹5,400" },
              { route: "Pune ➔ Nashik Trimbakeshwar", time: "5.0 hrs", dist: "220 KM", fare: "₹5,000" },
              { route: "Pune ➔ Goa Coastal", time: "8.5 hrs", dist: "440 KM", fare: "₹14,500" },
              { route: "Pune ➔ Kolhapur Mahalaxmi", time: "4.5 hrs", dist: "240 KM", fare: "₹5,600" }
            ].map((r, i) => (
              <div key={i} className="route-card">
                <div className="route-title">
                  <span>🛣️</span> {r.route}
                </div>
                <div className="route-stats-strip">
                  <span>⏱️ Duration: {r.time}</span>
                  <span>📍 Approx: {r.dist}</span>
                </div>
                <div className="route-fare-row">
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Standard Fare:</span>
                  <strong className="route-fare-text">{r.fare}</strong>
                </div>
                <button
                  className="btn-card-book"
                  style={{ width: "100%", padding: "8px 0" }}
                  onClick={() => {
                    setDestination(r.route.split("➔")[1].trim());
                    setSelectedVehicle(FLEET_DATA[0]);
                    setIsBookingModalOpen(true);
                  }}
                >
                  Reserve This Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR FLEET */}
      <section className="fleet-section" id="our-fleet">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">WELL-MAINTAINED EXECUTIVE FLEET</span>
            <h2 className="head-title">Our Premium Fleet in Pune</h2>
            <p className="head-desc">
              From executive Force Urbania VIPs to spacious Tempo Travellers and Volvo Multi-Axle
              coaches, all equipped with dual AC and pushback seats.
            </p>
          </div>

          <div className="fleet-filter-bar">
            <button
              className={`fleet-filter-btn ${fleetFilter === "all" ? "active" : ""}`}
              onClick={() => setFleetFilter("all")}
            >
              All Vehicles ({FLEET_DATA.length})
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "urbania" ? "active" : ""}`}
              onClick={() => setFleetFilter("urbania")}
            >
              Force Urbania VIP
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "tempo" ? "active" : ""}`}
              onClick={() => setFleetFilter("tempo")}
            >
              Tempo Travellers (17-26)
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "minibus" ? "active" : ""}`}
              onClick={() => setFleetFilter("minibus")}
            >
              Mini Bus (32 Seats)
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "luxury-bus" ? "active" : ""}`}
              onClick={() => setFleetFilter("luxury-bus")}
            >
              Luxury Volvo Coaches
            </button>
          </div>

          <div className="fleet-grid">
            {filteredFleet.map((vehicle) => (
              <div key={vehicle.id} className="fleet-card">
                <div className="fleet-img-wrap">
                  <img src={vehicle.image} alt={vehicle.name} className="fleet-img" />
                  <span className="fleet-tag">{vehicle.categoryLabel}</span>
                </div>
                <div className="fleet-body">
                  <h3 className="fleet-title">{vehicle.name}</h3>
                  <p className="fleet-submodel">{vehicle.submodel}</p>

                  <div className="fleet-specs-grid">
                    <div>👥 {vehicle.seatingText}</div>
                    <div>🧳 {vehicle.luggage}</div>
                    <div>⏱️ Min: {vehicle.minKmPerDay} km/day</div>
                    <div>👨‍✈️ DA: ₹{vehicle.driverAllowancePerDay}/day</div>
                  </div>

                  <div className="fleet-amenities-tags">
                    {vehicle.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="fleet-amenity-chip">
                        ✓ {a}
                      </span>
                    ))}
                  </div>

                  <div className="fleet-footer">
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>
                        Base Tariff
                      </span>
                      <strong style={{ fontSize: "1.35rem", color: "var(--navy-900)" }}>
                        ₹{vehicle.ratePerKm} <small>/ KM</small>
                      </strong>
                    </div>
                    <button
                      className="btn-header-cta"
                      style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsBookingModalOpen(true);
                      }}
                    >
                      Book Fleet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BUS FARE ESTIMATOR CALCULATOR (Spelling Fixed: Bus Fare) */}
      <section className="calc-section" id="fare-calculator">
        <div className="container">
          <div className="calc-box-wrap">
            <div>
              <span
                style={{
                  color: "#fbbf24",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                }}
              >
                TRANSPARENT PUNE TARIFF
              </span>
              <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "#fff", margin: "8px 0 12px" }}>
                Instant Bus Fare Estimator
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.98rem", lineHeight: 1.6 }}>
                Estimate your exact road travel budget according to Vishal Travels official rate card.
                Zero hidden driver or fuel surcharges.
              </p>

              <div style={{ marginTop: "24px" }}>
                <label
                  style={{ fontSize: "0.84rem", color: "#e2e8f0", display: "block", marginBottom: "6px" }}
                >
                  Select Vehicle Model
                </label>
                <select
                  style={{
                    width: "100%",
                    height: "48px",
                    background: "#07172e",
                    border: "1.5px solid #1e3a63",
                    color: "#fff",
                    padding: "0 14px",
                    borderRadius: "8px",
                    fontSize: "0.92rem"
                  }}
                  onChange={(e) => {
                    const opt = e.target.options[e.target.selectedIndex];
                    setCalcRate(Number(e.target.value));
                    setCalcDA(Number(opt.getAttribute("data-da") || 500));
                    setCalcVehicleName(opt.getAttribute("data-name") || "");
                  }}
                >
                  <option value="38" data-da="500" data-name="Force Urbania VIP (17 Seater)">
                    Force Urbania VIP 17 Seater (₹38/KM)
                  </option>
                  <option value="28" data-da="500" data-name="Tempo Traveller AC (17 Seater)">
                    Tempo Traveller AC 17 Seater (₹28/KM)
                  </option>
                  <option value="34" data-da="600" data-name="Tempo Traveller AC (26 Seater)">
                    Tempo Traveller AC 26 Seater (₹34/KM)
                  </option>
                  <option value="42" data-da="700" data-name="Executive Mini Bus (32 Seater)">
                    Executive Mini Bus 32 Seater (₹42/KM)
                  </option>
                  <option value="60" data-da="900" data-name="Volvo Multi-Axle (49 Seater)">
                    Volvo Multi-Axle 49 Seater (₹60/KM)
                  </option>
                  <option value="18" data-da="400" data-name="Innova Crysta / Ertiga (7 Seater)">
                    Innova Crysta / Ertiga 7 Seater (₹18/KM)
                  </option>
                </select>
              </div>

              <div className="calc-slider-item">
                <div className="slider-val-header">
                  <span>Estimated Total Distance</span>
                  <strong>{calcKm} KM</strong>
                </div>
                <input
                  type="range"
                  min="150"
                  max="2000"
                  step="25"
                  value={calcKm}
                  onChange={(e) => setCalcKm(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>

              <div className="calc-slider-item">
                <div className="slider-val-header">
                  <span>Trip Duration</span>
                  <strong>{calcDays} Days</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="calc-range-input"
                />
              </div>
            </div>

            <div className="calc-receipt-card">
              <div>
                <div className="receipt-header">
                  <h3 style={{ fontSize: "1.2rem", color: "var(--navy-900)", marginBottom: "4px" }}>
                    Itemized Fare Quotation
                  </h3>
                  <div className="receipt-vehicle-name">{calcVehicleName}</div>
                  <span className="receipt-sub">Includes Police-Verified Chauffeur</span>
                </div>

                <div className="receipt-rows">
                  <div className="receipt-row">
                    <span>Base Distance ({calcKm} KM @ ₹{calcRate}/km)</span>
                    <strong>₹{totalBase.toLocaleString()}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Driver Allowance ({calcDays} Days @ ₹{calcDA}/day)</span>
                    <strong>₹{totalDA.toLocaleString()}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Sanitization &amp; GPS Telemetry</span>
                    <strong style={{ color: "#16a34a" }}>Included Free</strong>
                  </div>
                  <div className="receipt-row">
                    <span>GST (5% Passenger Transport)</span>
                    <strong>₹{totalGst.toLocaleString()}</strong>
                  </div>
                  <div className="receipt-divider"></div>
                  <div className="receipt-total-row">
                    <span>Total Estimate</span>
                    <strong>₹{totalEstimate.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <button
                className="btn-lock-fare"
                onClick={() => {
                  const match =
                    FLEET_DATA.find((f) => f.name.includes(calcVehicleName.split(" ")[0])) ||
                    FLEET_DATA[0];
                  setSelectedVehicle(match);
                  setIsBookingModalOpen(true);
                }}
              >
                Lock Fare &amp; Reserve Fleet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS & TESTIMONIALS */}
      <section className="testimonials-section" id="reviews">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">REAL PASSENGER EXPERIENCES</span>
            <h2 className="head-title">What Our Customers Say</h2>
            <p className="head-desc">
              Over 15,000+ satisfied passengers, corporate HR leaders, and pilgrimage groups across
              Maharashtra.
            </p>
          </div>

          <div className="testimonials-grid">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="testimonial-card">
                <div>
                  <div className="review-stars">{"★".repeat(rev.rating)}</div>
                  <p className="review-text">"{rev.text}"</p>
                </div>
                <div className="reviewer-meta">
                  <div className="reviewer-avatar">
                    {rev.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="reviewer-info">
                    <strong>{rev.name}</strong>
                    <small>
                      {rev.role} • {rev.city} ({rev.tripType})
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">TRANSPARENCY FIRST</span>
            <h2 className="head-title">Frequently Asked Questions</h2>
            <p className="head-desc">
              Clear answers regarding bus rental rates, Force Urbania booking, outstation permits, and
              driver allowances in Pune.
            </p>
          </div>

          <div className="faq-container">
            {FAQ_DATA.map((faq, idx) => (
              <div key={idx} className={`faq-card ${openFaqIndex === idx ? "open" : ""}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{faq.q}</span>
                  <span className="faq-chevron">▼</span>
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer-content">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="vishal-footer" id="contact-us">
        <div className="container footer-grid-4">
          <div>
            <div className="vishal-logo-wrap" style={{ marginBottom: "16px" }}>
              <div className="vishal-logo-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="6" width="18" height="12" rx="3" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
              </div>
              <div className="vishal-logo-text">
                <div className="vishal-brand-name" style={{ color: "#ffffff" }}>
                  Vishal <span style={{ color: "#f59e0b" }}>Travels</span>
                </div>
                <span className="vishal-brand-tagline">EXECUTIVE FLEET • PUNE</span>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#94a3b8" }}>
              Vishal Travels Pune is a licensed passenger transport service operator providing AC &amp;
              Non-AC tempo travellers, Force Urbanias, mini buses, and luxury Volvo coaches for
              family pilgrimages, corporate shifts, and weddings across India.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links-list">
              <a href="#home">Home</a>
              <a href="#booking-form-section">Book Fleet</a>
              <a href="#routes-trips">Routes &amp; Trips</a>
              <a href="#tour-packages">Tour Packages</a>
              <a href="#our-fleet">Our Fleet</a>
              <a href="#fare-calculator">Bus Fare Estimator</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Pune Depots &amp; Contact</h4>
            <div style={{ fontSize: "0.88rem", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <strong>Head Office:</strong>
                <br />
                Swargate &amp; Hinjewadi Phase 1, Pune, Maharashtra
              </div>
              <div>
                <strong>24/7 Dispatch Helplines:</strong>
                <br />
                <a href="tel:+919764564699" style={{ color: "#fbbf24", fontWeight: 700 }}>
                  +91 9764564699
                </a>
                <br />
                <a href="tel:+919372459371" style={{ color: "#ffffff" }}>
                  +91 9372459371
                </a>
                <br />
                <a href="tel:+918600118437" style={{ color: "#ffffff" }}>
                  +91 8600118437
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Instant Route Enquiry</h4>
            <p style={{ fontSize: "0.82rem", marginBottom: "10px" }}>
              Send your route to receive an instant WhatsApp quotation:
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast("Enquiry sent to Vishal Travels! Booking team will call in 5 mins.", "success");
                e.currentTarget.reset();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{
                  width: "100%",
                  height: "40px",
                  background: "#0c182c",
                  border: "1px solid #1e3a63",
                  color: "#fff",
                  padding: "0 12px",
                  borderRadius: "6px",
                  fontSize: "0.86rem"
                }}
              />
              <input
                type="tel"
                placeholder="WhatsApp Mobile Number"
                required
                style={{
                  width: "100%",
                  height: "40px",
                  background: "#0c182c",
                  border: "1px solid #1e3a63",
                  color: "#fff",
                  padding: "0 12px",
                  borderRadius: "6px",
                  fontSize: "0.86rem"
                }}
              />
              <button
                type="submit"
                className="btn-header-cta"
                style={{ height: "42px", fontSize: "0.88rem", marginTop: "4px", justifyContent: "center" }}
              >
                Send Route Details
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <span>© 2026 Vishal Travels. All Rights Reserved. Pune, Maharashtra. (MH-Gov Permit)</span>
            <span>Privacy Policy • Terms &amp; Conditions • Fastag Verified Fleet</span>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING ACTION DOCK - Placed at Bottom-Right (Zero overlap with dev badge) */}
      <div className="floating-actions-dock">
        <a href="tel:+919764564699" className="dock-action-pill dock-call-pill">
          <span>📞</span>
          <span>Call Dispatch</span>
        </a>
        <button
          className="dock-action-pill dock-wa-pill"
          onClick={() => setIsWaOpen(!isWaOpen)}
        >
          <span>💬</span>
          <span>WhatsApp Quote</span>
        </button>
      </div>

      {/* WHATSAPP INTERACTIVE MODAL */}
      {isWaOpen && (
        <div className="whatsapp-chat-modal">
          <div className="wa-header">
            <span style={{ fontSize: "1.4rem" }}>👨‍💼</span>
            <div>
              <strong style={{ display: "block", fontSize: "0.9rem" }}>Vishal Travels Pune Desk</strong>
              <small style={{ color: "#dcf8c6" }}>Online • Instant Response</small>
            </div>
            <button
              onClick={() => setIsWaOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>
          <div className="wa-body">
            {waMessages.map((msg, i) => (
              <div key={i} className={`wa-message ${msg.sender === "bot" ? "received" : "sent"}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 12px", background: "#f8fafc", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              onClick={() => handleSendWa("Ashtavinayak Darshan bus booking")}
              style={{
                background: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "0.72rem",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              🛕 Ashtavinayak
            </button>
            <button
              onClick={() => handleSendWa("Force Urbania 17 seater in Pune")}
              style={{
                background: "#fff",
                border: "1px solid #cbd5e1",
                borderRadius: "20px",
                padding: "4px 10px",
                fontSize: "0.72rem",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              🚐 Force Urbania VIP
            </button>
          </div>
          <form
            className="wa-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendWa(waInput);
            }}
          >
            <input
              type="text"
              placeholder="Type message to Vishal Travels..."
              value={waInput}
              onChange={(e) => setWaInput(e.target.value)}
              required
            />
            <button type="submit" className="wa-send-btn">
              ➤
            </button>
          </form>
        </div>
      )}

      {/* RESERVATION / TOUR BOOKING MODAL */}
      {isBookingModalOpen && (selectedVehicle || selectedPackage) && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>
                {selectedPackage
                  ? `Book Tour: ${selectedPackage.title}`
                  : `Reserve ${selectedVehicle?.name || "Vehicle"}`}
              </h3>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setIsBookingModalOpen(false);
                  setSelectedPackage(null);
                }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {selectedPackage ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.8fr",
                    gap: "16px",
                    marginBottom: "18px",
                    background: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1.5px solid #e2e8f0"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span
                        style={{
                          background: "var(--gold-500)",
                          color: "#071324",
                          fontWeight: 800,
                          fontSize: "0.72rem",
                          padding: "2px 8px",
                          borderRadius: "4px"
                        }}
                      >
                        {selectedPackage.tag}
                      </span>
                      <h4 style={{ color: "var(--navy-900)", margin: 0, fontSize: "1.05rem" }}>
                        {selectedPackage.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "4px 0" }}>
                      {selectedPackage.subtitle}
                    </p>
                    <div style={{ fontSize: "0.82rem", color: "#334155", display: "flex", gap: "12px", marginTop: "6px" }}>
                      <span>⏱️ <strong>{selectedPackage.duration}</strong></span>
                      <span>🛣️ <strong>{selectedPackage.distanceKm} KM</strong></span>
                    </div>
                    <div style={{ marginTop: "8px", fontSize: "0.78rem", color: "#475569" }}>
                      <strong>Circuit Highlights:</strong>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                        {selectedPackage.highlights.map((h, i) => (
                          <span
                            key={i}
                            style={{
                              background: "#ffffff",
                              border: "1px solid #cbd5e1",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "0.75rem"
                            }}
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span
                        style={{
                          background: "#dcfce7",
                          color: "#16a34a",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          display: "inline-block"
                        }}
                      >
                        ● 24/7 Pune Dispatch Ready
                      </span>
                    </div>
                    <div style={{ background: "#ffffff", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Starting From</span>
                      <strong style={{ fontSize: "1.3rem", color: "var(--navy-900)" }}>
                        ₹{selectedPackage.startingPrice.toLocaleString()}
                      </strong>
                      <small style={{ display: "block", color: "#64748b", fontSize: "0.72rem" }}>
                        AC Tempo / Urbania with Chauffeur
                      </small>
                    </div>
                  </div>
                </div>
              ) : selectedVehicle ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "18px",
                    background: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <div>
                    <h4 style={{ color: "var(--navy-900)", marginBottom: "4px" }}>
                      {selectedVehicle.name}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      {selectedVehicle.seatingText}
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      Rate: <strong>₹{selectedVehicle.ratePerKm}/km</strong> (Min{" "}
                      {selectedVehicle.minKmPerDay} km/day)
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        background: "#dcfce7",
                        color: "#16a34a",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 700
                      }}
                    >
                      ● 24/7 Pune Dispatch Ready
                    </span>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleConfirmReservation}>
                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Passenger Name *</label>
                    <input
                      type="text"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Pickup Location *</label>
                    <input
                      type="text"
                      value={modalPickup}
                      onChange={(e) => setModalPickup(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Destination / Tour *</label>
                    <input
                      type="text"
                      value={modalDestination}
                      onChange={(e) => setModalDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Date of Journey *</label>
                    <input
                      type="date"
                      value={modalDate}
                      onChange={(e) => setModalDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Reporting Time *</label>
                    <input
                      type="time"
                      value={modalTime}
                      onChange={(e) => setModalTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                  <button
                    type="button"
                    style={{
                      padding: "10px 18px",
                      border: "1.5px solid #cbd5e1",
                      background: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 700
                    }}
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setSelectedPackage(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-header-cta"
                    style={{
                      padding: "10px 24px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      color: "#fff",
                      border: "none",
                      boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)"
                    }}
                  >
                    <span>💬</span> Send Enquiry to Owner on WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* E-TICKET VOUCHER MODAL */}
      {isTicketModalOpen && generatedTicket && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div
              className="modal-header"
              style={{ background: "var(--navy-900)", color: "#fff" }}
            >
              <div>
                <h3 style={{ color: "#fff", fontSize: "1.2rem" }}>BOOKING ENQUIRY CRAFTED • VISHAL TRAVELS PUNE</h3>
                <small style={{ color: "#38bdf8", fontWeight: 700 }}>
                  ✓ Details Sent to Owner on WhatsApp (+91 9764564699)
                </small>
              </div>
              <button
                className="modal-close-btn"
                style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                onClick={() => setIsTicketModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body" id="printTicketArea">
              {/* WhatsApp Sent Alert Banner */}
              <div
                style={{
                  background: "#dcfce7",
                  border: "1.5px solid #86efac",
                  color: "#166534",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  fontSize: "0.88rem",
                  fontWeight: 600
                }}
              >
                <span>
                  📲 <strong>WhatsApp Dispatched:</strong> Your trip enquiry message has been crafted and sent to Vishal Travels Owner (+91 9764564699). We will check vehicle availability and confirm shortly!
                </span>
                <a
                  href={`https://wa.me/919764564699?text=${encodeURIComponent(lastWaText)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "#16a34a",
                    color: "#ffffff",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>💬</span> Re-open WhatsApp
                </a>
              </div>

              {/* Generated Image Preview if available */}
              {generatedTicketImage && (
                <div style={{ marginBottom: "16px", borderRadius: "8px", overflow: "hidden", border: "1.5px solid #cbd5e1" }}>
                  <img
                    src={generatedTicketImage}
                    alt="Vishal Travels Generated Trip Voucher"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}

              {/* Fallback Detailed Voucher Card */}
              <div style={{ border: "2px dashed #cbd5e1", borderRadius: "10px", padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e2e8f0",
                    paddingBottom: "12px",
                    marginBottom: "14px"
                  }}
                >
                  <div>
                    <h3 style={{ color: "var(--navy-900)", margin: 0 }}>Vishal Travels Pune</h3>
                    <small style={{ color: "#64748b" }}>Trip Enquiry Summary &amp; Estimate Voucher</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>
                      PNR NUMBER
                    </span>
                    <strong style={{ color: "#d97706", fontSize: "1.2rem" }}>
                      {generatedTicket.pnr}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    background: "#f1f5f9",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>
                      FROM
                    </span>
                    <strong style={{ fontSize: "1.05rem" }}>{generatedTicket.from}</strong>
                  </div>
                  <div style={{ color: "var(--gold-600)", fontSize: "1.2rem" }}>➔</div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>
                      TO
                    </span>
                    <strong style={{ fontSize: "1.05rem" }}>{generatedTicket.to}</strong>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    fontSize: "0.86rem",
                    marginBottom: "16px"
                  }}
                >
                  <div>
                    Passenger: <strong>{generatedTicket.name}</strong>
                  </div>
                  <div>
                    Phone: <strong>+91 {generatedTicket.phone}</strong>
                  </div>
                  <div>
                    Vehicle: <strong>{generatedTicket.vehicle}</strong>
                  </div>
                  <div>
                    Journey Date: <strong>{generatedTicket.date}</strong>
                  </div>
                  <div>
                    Assigned Driver: <strong>Santosh Shinde (Verified)</strong>
                  </div>
                  <div>
                    Helpline: <strong>+91 9764564699</strong>
                  </div>
                </div>

                <div
                  style={{
                    background: "#e0f2fe",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    fontSize: "0.82rem",
                    color: "#0369a1"
                  }}
                >
                  ✓ Chauffeur will call 2 hours prior to journey. Toll and state tax payable as actuals or bundled.
                </div>
              </div>

              {/* Modal Action Buttons: Download Image, Print, Track GPS */}
              <div style={{ display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: "10px", marginTop: "18px" }}>
                {generatedTicketImage && (
                  <button
                    style={{
                      padding: "8px 18px",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                    }}
                    onClick={handleDownloadTicketImage}
                  >
                    <span>📥</span> Download Trip Voucher (PNG)
                  </button>
                )}

                <button
                  style={{
                    padding: "8px 18px",
                    border: "1.5px solid #cbd5e1",
                    background: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 700
                  }}
                  onClick={() => window.print()}
                >
                  🖨️ Print Trip Voucher
                </button>

                <button
                  className="btn-header-cta"
                  onClick={() => {
                    setIsTicketModalOpen(false);
                    setIsTrackerModalOpen(true);
                  }}
                >
                  🛰️ Track Live GPS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE GPS TELEMETRY SIMULATOR */}
      {isTrackerModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>🛰️ Live GPS Telemetry • Vishal Travels Pune</h3>
              <button className="modal-close-btn" onClick={() => setIsTrackerModalOpen(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div
                style={{
                  height: "180px",
                  background: "#081427",
                  borderRadius: "10px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                  border: "1px solid #1e3a63"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    background: "#1e3a63",
                    borderRadius: "3px",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      width: `${trackerProgress}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #10b981, #f59e0b)",
                      borderRadius: "3px"
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: `${trackerProgress}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1.6rem"
                    }}
                  >
                    🚌
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "16px",
                    color: "#10b981",
                    fontSize: "0.75rem",
                    fontWeight: 800
                  }}
                >
                  ● GPS SATELLITE LOCK: ACTIVE (MH-12-VT-9764)
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginTop: "16px"
                }}
              >
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>
                    Speed Governor
                  </span>
                  <strong style={{ fontSize: "1.2rem", color: "var(--navy-900)" }}>
                    {trackerSpeed} km/h
                  </strong>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>
                    Progress
                  </span>
                  <strong style={{ fontSize: "1.2rem", color: "var(--navy-900)" }}>
                    {trackerProgress}% Done
                  </strong>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>
                    Next Rest Halt
                  </span>
                  <strong style={{ fontSize: "1rem", color: "var(--navy-900)" }}>
                    Shirwal Plaza
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <span>{toast.type === "success" ? "✓" : "ℹ️"}</span>
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* BACK TO TOP BUTTON */}
      {isScrolled && (
        <button
          className="btn-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      )}
    </>
  );
}
