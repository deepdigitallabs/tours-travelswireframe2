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
    luggage: "20 Large Bags + Roof Carrier",
    ratePerKm: 38,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    amenities: ["Maharaja Leather Captain Seats", "Independent AC Blowers", "Panoramic UV Glass Windows", "Mobile USB Chargers Each Seat", "Music & PA Mic"],
    description: "The flagship of Vishal Travels. European luxury with superior legroom and whisper-quiet suspension for executive corporate trips and wedding VIP guests."
  },
  {
    id: "f2",
    name: "Tempo Traveller AC (17 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "17 Seater Push-back AC",
    seatsNum: 17,
    submodel: "Force Motors Deluxe 2x1 Configuration",
    rating: 4.92,
    reviewsCount: 520,
    luggage: "18 Suitcases + Rooftop Carrier",
    ratePerKm: 28,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "https://images.unsplash.com/photo-1525962898597-a4ae6402826e?w=800&auto=format&fit=crop&q=80",
    amenities: ["Push-back Plush Velvet Seats", "JBL Sound System & Mic", "High-efficiency Dual AC", "First Aid & Fire Extinguisher", "Experienced Highway Driver"],
    description: "Pune's top pick for Ashtavinayak Darshan, Mahabaleshwar weekend escapes, and Shirdi pilgrimages. Highly comfortable for family groups."
  },
  {
    id: "f3",
    name: "Tempo Traveller AC (26 Seater)",
    category: "tempo",
    categoryLabel: "Tempo Traveller AC",
    seatingText: "26 Seater Push-back AC",
    seatsNum: 26,
    submodel: "Extra Long Wheelbase • 2x2 Push-back",
    rating: 4.89,
    reviewsCount: 380,
    luggage: "25+ Suitcases",
    ratePerKm: 34,
    minKmPerDay: 300,
    driverAllowancePerDay: 600,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: ["Individual Air Blowers", "LED Screen Infotainment", "Rear Air Suspension", "Ample Boot Space", "Emergency Exit Hammer"],
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
    rating: 4.88,
    reviewsCount: 290,
    luggage: "35 Large Suitcases",
    ratePerKm: 42,
    minKmPerDay: 300,
    driverAllowancePerDay: 700,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80",
    amenities: ["Comfortable High-Back Seats", "Central Climate AC", "Mic System for Tour Guide", "Curtained Windows", "Clean Sanitized Cabin"],
    description: "Spacious and affordable for school/college industrial visits, Pune IT park shifts, and Konkan group excursions."
  },
  {
    id: "f5",
    name: "Luxury Coach / Volvo Multi-Axle (49 Seater)",
    category: "luxury-bus",
    categoryLabel: "Luxury Coach & Sleeper",
    seatingText: "45-49 Seater Push-back / Sleeper",
    seatsNum: 49,
    submodel: "BharatBenz / Volvo B11R Multi-Axle",
    rating: 4.96,
    reviewsCount: 410,
    luggage: "60+ Suitcases Boot Capacity",
    ratePerKm: 60,
    minKmPerDay: 350,
    driverAllowancePerDay: 900,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&auto=format&fit=crop&q=80",
    amenities: ["Air Suspension Glide", "Reading Lights & Charging Points", "Dual Drivers for Long Highway Routes", "Emergency SOS & GPS", "Mineral Water Bottles"],
    description: "The gold standard for multi-day pilgrimage tours (5 Jyotirlinga, Char Dham) and large destination weddings in Goa and Rajasthan."
  },
  {
    id: "f6",
    name: "Toyota Innova Crysta & Maruti Ertiga",
    category: "suv",
    categoryLabel: "Premium SUV / Taxi",
    seatingText: "6 - 7 Seater Captain Seats",
    seatsNum: 7,
    submodel: "Innova Crysta 2.4 ZX / Ertiga ZXi+",
    rating: 4.97,
    reviewsCount: 640,
    luggage: "5 Suitcases",
    ratePerKm: 18,
    minKmPerDay: 250,
    driverAllowancePerDay: 400,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    amenities: ["Reclining Leather Seats", "Automatic Dual AC", "Fastag Enabled", "Dashcam Security", "Professional Chauffeur"],
    description: "Swift, comfortable intercity rides for Pune-Mumbai airport pick & drop, client visits, and small family hill tours."
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
    highlights: ["Mayureshwar (Morgaon)", "Siddhivinayak (Siddhatek)", "Ballaleshwar (Pali)", "Varadvinayak (Mahad)", "Chintamani, Girijatmaj, Vighnahar, Mahaganapati"]
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
    highlights: ["Bhimashankar", "Trimbakeshwar (Nashik)", "Grishneshwar (Ellora)", "Aundha Nagnath", "Parli Vaijnath"]
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
    highlights: ["Arthur Seat Point", "Venna Lake Boating", "Mapro Garden Strawberry Farms", "Table Land Panchgani", "Old Mahabaleshwar Mandir"]
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
    highlights: ["Sai Baba Samadhi Mandir VIP", "Shani Shingnapur Temple", "Experienced highway route driver", "Flexible halt timings"]
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
    highlights: ["Sindhudurg Sea Fort", "Tarkarli Watersports & Scuba", "North Goa Beaches", "Authentic Malvani Food Halts"]
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
    highlights: ["Mahalakshmi (Kolhapur)", "Bhavani Mata (Tuljapur)", "Renuka Mata (Mahur)", "Saptashrungi Nivasini (Vani)"]
  }
];

const REVIEWS_DATA: Review[] = [
  {
    id: "r1",
    name: "Rajesh Gaikwad",
    role: "Family Group Coordinator",
    city: "Kothrud, Pune",
    rating: 5,
    text: "We booked Vishal Travels 17-seater Tempo Traveller for our family Ashtavinayak Yatra. The driver arrived 30 mins early in Kothrud, drove with utmost safety, and knew all temple entry timings. Extremely polite and comfortable!",
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
    name: "Mahesh Kulkarni",
    role: "Wedding Host",
    city: "Baner, Pune",
    rating: 5,
    text: "Hired 2 luxury coaches for our daughter's wedding guest transit between Pune and Kolhapur. Zero hassle, courteous staff, and round-the-clock telephone support. Best bus rental service in Pune!",
    date: "02 Oct 2026",
    tripType: "Wedding Barat Escort"
  }
];

export default function VishalTravelsWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick Form State
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("17 Seater");
  const [busType, setBusType] = useState("Force Urbania A/C");
  const [pickupLocation, setPickupLocation] = useState("Pune, Maharashtra");
  const [destination, setDestination] = useState("Mahabaleshwar");

  // Fleet Filter
  const [fleetFilter, setFleetFilter] = useState("all");

  // Fare Estimator
  const [calcRate, setCalcRate] = useState(38);
  const [calcDA, setCalcDA] = useState(500);
  const [calcKm, setCalcKm] = useState(350);
  const [calcDays, setCalcDays] = useState(2);
  const [calcVehicleName, setCalcVehicleName] = useState("Force Urbania VIP (17 Seater)");

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<{
    pnr: string;
    name: string;
    phone: string;
    vehicle: string;
    from: string;
    to: string;
    date: string;
  } | null>(null);

  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerProgress, setTrackerProgress] = useState(62);
  const [trackerSpeed, setTrackerSpeed] = useState(72);

  // WhatsApp Chat Modal
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [waMessages, setWaMessages] = useState<Array<{ text: string; sender: "bot" | "user"; time: string }>>([
    {
      text: "Namaskar! 🙏 Welcome to Vishal Travels Pune. Looking for a Tempo Traveller, Force Urbania, or Luxury Bus rental?",
      sender: "bot",
      time: "Just now"
    }
  ]);
  const [waInput, setWaInput] = useState("");

  // Toast
  const [toast, setToast] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  const triggerToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    const afterTomorrow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    setReturnDate(afterTomorrow.toISOString().split("T")[0]);
  }, []);

  // GPS simulation
  useEffect(() => {
    if (!isTrackerModalOpen) return;
    const interval = setInterval(() => {
      setTrackerProgress((prev) => (prev >= 92 ? 25 : prev + 1));
      setTrackerSpeed(68 + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [isTrackerModalOpen]);

  // Handle Quick Booking Form "Lets Go!"
  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) {
      triggerToast("Please enter your name and contact number", "warning");
      return;
    }
    const matching = FLEET_DATA.find((f) => f.name.toLowerCase().includes(busType.toLowerCase().split(" ")[0])) || FLEET_DATA[0];
    setSelectedVehicle(matching);
    setIsBookingModalOpen(true);
    triggerToast(`Booking enquiry submitted for ${busType} (${seatingCapacity})!`, "success");
  };

  // Confirm Reservation & Ticket Generation
  const handleConfirmReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pnr = `VT-PUNE-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicket({
      pnr,
      name: custName || "Sanjay Shinde",
      phone: custPhone || "9764564699",
      vehicle: selectedVehicle?.name || busType,
      from: pickupLocation,
      to: destination,
      date: startDate
    });
    setIsBookingModalOpen(false);
    setIsTicketModalOpen(true);
    triggerToast(`Booking confirmed with PNR ${pnr}! E-Ticket generated.`, "success");
  };

  // WhatsApp Interaction
  const handleSendWa = (text: string) => {
    if (!text.trim()) return;
    setWaMessages((prev) => [...prev, { text, sender: "user", time: "Just now" }]);
    setWaInput("");
    setTimeout(() => {
      let reply = "Dhanyawad! Our Pune booking manager is checking available buses for your dates. We will call you on +91 9764564699 shortly.";
      if (text.toLowerCase().includes("ashtavinayak")) {
        reply = "🛕 Ashtavinayak Darshan 2-Day package available in AC Tempo Traveller (17-seater) & Force Urbania. Toll guidance included!";
      } else if (text.toLowerCase().includes("urbania")) {
        reply = "🚐 Force Urbania VIP available with Maharaja leather seats and charging ports. Call directly on +91 9764564699 for instant lock.";
      }
      setWaMessages((prev) => [...prev, { text: reply, sender: "bot", time: "Just now" }]);
    }, 800);
  };

  // Calculator Math
  const totalBase = calcKm * calcRate;
  const totalDA = calcDays * calcDA;
  const totalGst = Math.round((totalBase + totalDA) * 0.05);
  const totalEstimate = totalBase + totalDA + totalGst;

  const filteredFleet = fleetFilter === "all"
    ? FLEET_DATA
    : FLEET_DATA.filter((v) => v.category === fleetFilter);

  return (
    <>
      {/* 1. TOP BAR (Exact Gold/Yellow Background from Screenshot) */}
      <div className="vishal-topbar">
        <div className="container vishal-topbar-content">
          <div className="topbar-phone-links">
            <a href="tel:+919764564699" className="topbar-phone-item">
              <span>📞</span> +919764564699
            </a>
            <a href="tel:+919372459371" className="topbar-phone-item">
              <span>📞</span> +919372459371
            </a>
            <a href="tel:+918600118437" className="topbar-phone-item">
              <span>📞</span> +918600118437
            </a>
          </div>

          <div className="topbar-social-links">
            <a href="https://www.facebook.com/share/14X2F187jBq/" target="_blank" rel="noreferrer" className="topbar-social-icon" aria-label="Facebook">
              f
            </a>
            <a href="https://www.instagram.com/vishaltravelspune?utm_source=qr" target="_blank" rel="noreferrer" className="topbar-social-icon" aria-label="Instagram">
              📷
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Pure White with Vishal Travels Logo & Sky Blue Button) */}
      <header className="vishal-header" id="mainHeader">
        <div className="container vishal-header-inner">
          {/* Logo Matching Screenshot */}
          <a href="#home" className="vishal-logo-wrap">
            <div className="vishal-logo-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="6" width="18" height="12" rx="3"/>
                <circle cx="7" cy="18" r="2"/>
                <circle cx="17" cy="18" r="2"/>
                <line x1="3" y1="11" x2="21" y2="11"/>
                <line x1="7" y1="6" x2="7" y2="11"/>
                <line x1="12" y1="6" x2="12" y2="11"/>
                <line x1="17" y1="6" x2="17" y2="11"/>
              </svg>
            </div>
            <div className="vishal-logo-text">
              <div className="vishal-brand-name">
                Vishal <span>Travels</span>
              </div>
              <span className="vishal-brand-tagline">JOURNEYS THAT CONNECT</span>
            </div>
          </a>

          {/* Navigation Links from Screenshot */}
          <nav className="vishal-nav-menu">
            <a href="#home" className="vishal-nav-item active">Home</a>
            <a href="#about-us" className="vishal-nav-item">About Us</a>
            <a href="#routes-trips" className="vishal-nav-item">
              Routes & Trips <span className="dropdown-caret">▼</span>
            </a>
            <a href="#tour-packages" className="vishal-nav-item">
              Packages <span className="dropdown-caret">▼</span>
            </a>
            <a href="#fare-calculator" className="vishal-nav-item">Bus Fair</a>
            <a href="#our-fleet" className="vishal-nav-item">Gallery</a>
            <a href="#why-choose-us" className="vishal-nav-item">Blog</a>
            <a href="#contact-us" className="vishal-nav-item">Contact Us</a>
          </nav>

          {/* Sky Blue "Book Your Bus" Button from Screenshot */}
          <a href="#booking-form-section" className="btn-book-bus">
            <span>🚎</span> Book Your Bus
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* 3. HERO SECTION (Identical to User Screenshot) */}
      <section className="vishal-hero" id="home">
        {/* Yellow/Orange "WELCOME TO VISHAL TRAVEL" Badge */}
        <div className="hero-welcome-badge">
          WELCOME TO VISHAL TRAVEL
        </div>

        {/* Exact Headline from Screenshot */}
        <h1 className="hero-main-title">
          Bus Rental in Pune — Tempo Traveller, Mini Bus & Luxury Coach on Hire
        </h1>

        {/* Exact Subtitle from Screenshot */}
        <p className="hero-description-text">
          Need a reliable bus on rent in Pune? Vishal Travels offers safe, affordable group travel with professional drivers, transparent pricing, and 24/7 support for corporate trips, weddings, tours, and outstation journeys.
        </p>

        {/* Exact White Stats Card Bar from Screenshot */}
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

      {/* Floating Action Circle Buttons on Bottom-Left (from screenshot) */}
      <div className="hero-floating-actions">
        {/* Dark Teal Call Button */}
        <a href="tel:+919764564699" className="fab-circle-btn fab-call-circle" aria-label="Call Vishal Travels">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>

        {/* Green WhatsApp Circle Button with Sonar Pulse Wave */}
        <button
          className="fab-circle-btn fab-wa-circle"
          onClick={() => setIsWaOpen(!isWaOpen)}
          aria-label="WhatsApp Chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.192 8.192 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
          </svg>
        </button>
      </div>

      {/* QUICK ACTION BUTTONS BAR (As peeking at the bottom of the screenshot) */}
      <div style={{ background: "#ffffff", padding: "18px 0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/919764564699"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#25d366",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "6px",
              fontWeight: 800,
              fontSize: "0.95rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>💬</span> WhatsApp: +91 9764564699
          </a>
          <a
            href="tel:+919764564699"
            style={{
              background: "#009df8",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "6px",
              fontWeight: 800,
              fontSize: "0.95rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>📞</span> Call Us: +91 9764564699
          </a>
        </div>
      </div>

      {/* 4. "BOOK A BUS" SECTION (Exact 2-Column Form from Vishal Travels Pune) */}
      <section className="booking-section" id="booking-form-section">
        <div className="container booking-two-col">
          {/* Left Info Column */}
          <div className="booking-info-box">
            <span className="sub-tag-line">Book a Bus</span>
            <h2 className="booking-info-title">
              Easily Book Your Comfortable Bus Ride Online Today
            </h2>
            <p className="booking-info-desc">
              Book tempo travellers, mini buses & luxury coaches for outstation trips, corporate travel, and family tours at the best price.
            </p>

            <div className="contact-quick-pill">
              <div className="contact-pill-icon">📞</div>
              <div className="contact-pill-text">
                <strong>Call Us Any Time</strong>
                <a href="tel:+919764564699">+91 9764564699</a>
              </div>
            </div>

            <div className="contact-quick-pill">
              <div className="contact-pill-icon" style={{ background: "#dcfce7", color: "#16a34a" }}>💬</div>
              <div className="contact-pill-text">
                <strong>WhatsApp Support</strong>
                <a href="https://wa.me/919764564699" style={{ color: "#16a34a" }}>+91 9764564699</a>
              </div>
            </div>
          </div>

          {/* Right Form Column (Exact Fields & "Lets Go!" Button) */}
          <div className="booking-form-box">
            <form onSubmit={handleQuickBookSubmit}>
              <div className="bf-grid-2">
                <div className="bf-field">
                  <label htmlFor="formCustName">Name</label>
                  <input
                    type="text"
                    id="formCustName"
                    placeholder="Name"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    required
                  />
                </div>
                <div className="bf-field">
                  <label htmlFor="formCustPhone">Phone / Mobile</label>
                  <input
                    type="tel"
                    id="formCustPhone"
                    placeholder="Mobile Number"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bf-grid-2">
                <div className="bf-field">
                  <label htmlFor="formStartDate">Travel Start Date</label>
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
                    required
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
                    <option value="4 Seater">4 Seater</option>
                    <option value="6 Seater">6 Seater</option>
                    <option value="7 Seater">7 Seater</option>
                    <option value="13 Seater">13 Seater</option>
                    <option value="17 Seater">17 Seater</option>
                    <option value="22 Seater">22 Seater</option>
                    <option value="26 Seater">26 Seater</option>
                    <option value="30 Seater">30 Seater</option>
                    <option value="32 Seater">32 Seater</option>
                    <option value="35 Seater">35 Seater</option>
                    <option value="40 Seater">40 Seater</option>
                    <option value="45 Seater">45 Seater</option>
                    <option value="49 Seater">49 Seater</option>
                  </select>
                </div>
                <div className="bf-field">
                  <label htmlFor="formBusType">Bus Type</label>
                  <select
                    id="formBusType"
                    value={busType}
                    onChange={(e) => setBusType(e.target.value)}
                  >
                    <option value="Force Urbania A/C">Force Urbania A/C</option>
                    <option value="Tempo Traveller A/C">Tempo Traveller A/C</option>
                    <option value="Tempo Traveller Non-A/C">Tempo Traveller Non-A/C</option>
                    <option value="Luxury Bus">Luxury Bus (Volvo / Multi-Axle)</option>
                    <option value="Mini Bus">Mini Bus</option>
                    <option value="Innova">Toyota Innova</option>
                    <option value="Ertiga">Maruti Ertiga</option>
                    <option value="Dzire">Swift Dzire / Aura</option>
                  </select>
                </div>
              </div>

              <div className="bf-field" style={{ marginBottom: "14px" }}>
                <label htmlFor="formPickup">Pickup Location</label>
                <input
                  type="text"
                  id="formPickup"
                  placeholder="Pickup Location (e.g. Pune, Shivaji Nagar)"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>

              {/* Exact "Lets Go!" Button from Screenshot/Code */}
              <button type="submit" className="btn-lets-go">
                Lets Go!
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 5. SIMPLE STEPS TO BOOK YOUR BUS RIDE (From Vishal Travels Pune) */}
      <section className="steps-section" id="steps-section">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">HOW IT WORKS</span>
            <h2 className="head-title">Simple Steps To Book Your Bus Ride</h2>
            <p className="head-desc">Book your bus quickly and easily in just a few steps.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number-icon">1</div>
              <h4>Choose Your Bus</h4>
              <p>Select the type of bus rental you need (Tempo Traveller, Force Urbania, or Luxury Coach).</p>
            </div>
            <div className="step-card" style={{ borderTopColor: "var(--topbar-bg)" }}>
              <div className="step-number-icon" style={{ background: "#fef3c7", color: "var(--topbar-bg)" }}>2</div>
              <h4>Pick Date & Schedule</h4>
              <p>Set your preferred travel date, return schedule, and pickup landmark in Pune.</p>
            </div>
            <div className="step-card" style={{ borderTopColor: "#10b981" }}>
              <div className="step-number-icon" style={{ background: "#d1fae5", color: "#10b981" }}>3</div>
              <h4>Easy Booking</h4>
              <p>Confirm your booking with instant E-Ticket issue, live GPS tracking, and verified driver details.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TOUR PACKAGES FROM PUNE (Ashtavinayak, 5 Jyotirlinga, Mahabaleshwar) */}
      <section className="packages-section" id="tour-packages">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">PILGRIMAGE & WEEKEND PLANS</span>
            <h2 className="head-title">Tour Packages from Pune</h2>
            <p className="head-desc">Curated temple yatras and hill station packages with experienced route drivers.</p>
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
                    <strong>Highlights:</strong>
                    <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} style={{ listStyleType: "disc" }}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pkg-footer">
                    <div className="pkg-price-stack">
                      <span className="pkg-price-label">Starting From</span>
                      <strong className="pkg-price-amount">₹{pkg.startingPrice.toLocaleString()}</strong>
                    </div>
                    <button
                      className="btn-book-bus"
                      style={{ padding: "8px 18px", fontSize: "0.88rem" }}
                      onClick={() => {
                        setDestination(pkg.title);
                        const match = FLEET_DATA.find((f) => f.name.includes("Urbania") || f.name.includes("Tempo")) || FLEET_DATA[0];
                        setSelectedVehicle(match);
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

      {/* 7. ROUTES & TRIPS (Pune to Mumbai, Chiplun, Shirdi, Mahabaleshwar) */}
      <section className="steps-section" id="routes-trips" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">DIRECT INTERCITY TRIPS</span>
            <h2 className="head-title">Popular Routes & Trips from Pune</h2>
            <p className="head-desc">Convenient point-to-point and round-trip transfers across Maharashtra.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
            {[
              { route: "Pune ➔ Mumbai / Airport", time: "3.5 hrs", dist: "150 KM", fare: "₹3,500" },
              { route: "Pune ➔ Mahabaleshwar", time: "3 hrs", dist: "120 KM", fare: "₹4,200" },
              { route: "Pune ➔ Shirdi Mandir", time: "4.5 hrs", dist: "210 KM", fare: "₹4,800" },
              { route: "Pune ➔ Chiplun / Konkan", time: "5 hrs", dist: "230 KM", fare: "₹5,400" },
              { route: "Pune ➔ Panchgani", time: "2.5 hrs", dist: "100 KM", fare: "₹3,900" },
              { route: "Pune ➔ Goa Coastal", time: "8.5 hrs", dist: "450 KM", fare: "₹14,500" },
            ].map((r, i) => (
              <div key={i} className="step-card" style={{ textAlign: "left", padding: "20px" }}>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{r.route}</h4>
                <p style={{ fontSize: "0.82rem", color: "#64748b" }}>⏱️ {r.time} • 🛣️ {r.dist}</p>
                <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "1.15rem", color: "#0b3c6d" }}>{r.fare}</strong>
                  <button
                    className="btn-book-bus"
                    style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                    onClick={() => {
                      setPickupLocation("Pune");
                      setDestination(r.route.split("➔")[1].trim());
                      const car = FLEET_DATA.find((f) => f.category === "urbania") || FLEET_DATA[0];
                      setSelectedVehicle(car);
                      setIsBookingModalOpen(true);
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR FLEET */}
      <section className="fleet-section" id="our-fleet">
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">WELL-MAINTAINED VEHICLES</span>
            <h2 className="head-title">Our Fleet in Pune</h2>
            <p className="head-desc">From Force Urbania VIP to Tempo Travellers and Volvo Coaches.</p>
          </div>

          <div className="fleet-filter-bar">
            <button
              className={`fleet-filter-btn ${fleetFilter === "all" ? "active" : ""}`}
              onClick={() => setFleetFilter("all")}
            >
              All Fleet ({FLEET_DATA.length})
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

                  <div className="fleet-footer">
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>Base Tariff</span>
                      <strong style={{ fontSize: "1.35rem", color: "#0b3c6d" }}>₹{vehicle.ratePerKm} <small>/ KM</small></strong>
                    </div>
                    <button
                      className="btn-book-bus"
                      style={{ padding: "8px 18px", fontSize: "0.88rem" }}
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsBookingModalOpen(true);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BUS FAIR ESTIMATOR CALCULATOR */}
      <section className="calc-section" id="fare-calculator">
        <div className="container">
          <div className="calc-box-wrap">
            <div>
              <span style={{ color: "var(--topbar-bg)", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase" }}>
                TRANSPARENT PUNE TARIFF
              </span>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#fff", margin: "8px 0 12px" }}>
                Instant Bus Fair Estimator
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                Estimate your exact budget based on Vishal Travels Pune official rate card.
              </p>

              <div style={{ marginTop: "24px" }}>
                <label style={{ fontSize: "0.85rem", color: "#e2e8f0", display: "block", marginBottom: "6px" }}>
                  Select Vehicle Model
                </label>
                <select
                  style={{ width: "100%", height: "46px", background: "#061a33", border: "1px solid #1e3a63", color: "#fff", padding: "0 14px", borderRadius: "6px" }}
                  onChange={(e) => {
                    const opt = e.target.options[e.target.selectedIndex];
                    setCalcRate(Number(e.target.value));
                    setCalcDA(Number(opt.getAttribute("data-da") || 500));
                    setCalcVehicleName(opt.getAttribute("data-name") || "");
                  }}
                >
                  <option value="38" data-da="500" data-name="Force Urbania VIP (17 Seater)">Force Urbania VIP 17 Seater (₹38/KM)</option>
                  <option value="28" data-da="500" data-name="Tempo Traveller AC (17 Seater)">Tempo Traveller AC 17 Seater (₹28/KM)</option>
                  <option value="34" data-da="600" data-name="Tempo Traveller AC (26 Seater)">Tempo Traveller AC 26 Seater (₹34/KM)</option>
                  <option value="42" data-da="700" data-name="Executive Mini Bus (32 Seater)">Executive Mini Bus 32 Seater (₹42/KM)</option>
                  <option value="60" data-da="900" data-name="Volvo Multi-Axle (49 Seater)">Volvo Multi-Axle 49 Seater (₹60/KM)</option>
                  <option value="18" data-da="400" data-name="Innova Crysta / Ertiga (7 Seater)">Innova Crysta / Ertiga 7 Seater (₹18/KM)</option>
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
              <h3 style={{ fontSize: "1.2rem", color: "#0b3c6d", marginBottom: "4px" }}>Itemized Quotation</h3>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--topbar-bg)", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
                {calcVehicleName}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem", marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Base Distance ({calcKm} KM @ ₹{calcRate}/km)</span>
                  <strong>₹{totalBase.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Driver Allowance ({calcDays} Days @ ₹{calcDA}/day)</span>
                  <strong>₹{totalDA.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sanitization & First Aid</span>
                  <strong style={{ color: "#16a34a" }}>Included</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>GST (5% Transport Slab)</span>
                  <strong>₹{totalGst.toLocaleString()}</strong>
                </div>
                <div style={{ height: "1px", background: "#e2e8f0", margin: "6px 0" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", color: "#0b3c6d" }}>
                  <span>Total Estimate</span>
                  <strong style={{ fontSize: "1.5rem" }}>₹{totalEstimate.toLocaleString()}</strong>
                </div>
              </div>

              <button
                className="btn-lets-go"
                style={{ width: "100%" }}
                onClick={() => {
                  const match = FLEET_DATA.find((f) => f.name.includes(calcVehicleName.split(" ")[0])) || FLEET_DATA[0];
                  setSelectedVehicle(match);
                  setIsBookingModalOpen(true);
                }}
              >
                Lock Price & Book
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS & TESTIMONIALS */}
      <section className="packages-section" id="reviews" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-head-center">
            <span className="head-subtitle">TESTIMONIALS</span>
            <h2 className="head-title">What Our Customers Say</h2>
            <p className="head-desc">Over 5,000+ satisfied passengers across Maharashtra.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="step-card" style={{ textAlign: "left" }}>
                <div style={{ color: "#f5a623", marginBottom: "8px", fontSize: "1.1rem" }}>
                  {"★".repeat(rev.rating)}
                </div>
                <p style={{ fontStyle: "italic", marginBottom: "16px", color: "#334155" }}>
                  "{rev.text}"
                </p>
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "12px" }}>
                  <strong style={{ display: "block", color: "#0b3c6d" }}>{rev.name}</strong>
                  <small style={{ color: "#64748b" }}>{rev.role} • {rev.city} ({rev.tripType})</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FOOTER (Vishal Travels Pune) */}
      <footer className="vishal-footer" id="contact-us">
        <div className="container footer-grid-4">
          <div>
            <div className="vishal-logo-wrap" style={{ marginBottom: "16px" }}>
              <div className="vishal-logo-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="6" width="18" height="12" rx="3"/>
                  <circle cx="7" cy="18" r="2"/>
                  <circle cx="17" cy="18" r="2"/>
                </svg>
              </div>
              <div className="vishal-logo-text">
                <div className="vishal-brand-name">
                  Vishal <span>Travels</span>
                </div>
                <span className="vishal-brand-tagline">JOURNEYS THAT CONNECT</span>
              </div>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#94a3b8" }}>
              Vishal Travels offers AC & Non-AC tempo travellers, Force Urbanias, mini buses & luxury coaches in Pune. Safe, reliable, and on-time travel across Maharashtra.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links-list">
              <a href="#home">Home</a>
              <a href="#booking-form-section">Book a Bus</a>
              <a href="#routes-trips">Routes & Trips</a>
              <a href="#tour-packages">Packages</a>
              <a href="#our-fleet">Our Fleet</a>
              <a href="#fare-calculator">Bus Fair</a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Contact Details</h4>
            <div style={{ fontSize: "0.88rem", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <strong>Office:</strong><br />
                Pune, Maharashtra, India
              </div>
              <div>
                <strong>Helplines:</strong><br />
                <a href="tel:+919764564699" style={{ color: "#fff" }}>+91 9764564699</a><br />
                <a href="tel:+919372459371" style={{ color: "#fff" }}>+91 9372459371</a><br />
                <a href="tel:+918600118437" style={{ color: "#fff" }}>+91 8600118437</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Inquiry</h4>
            <p style={{ fontSize: "0.82rem", marginBottom: "10px" }}>Need instant quote? Send your route:</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast("Enquiry sent to Vishal Travels! We will call back in 5 mins.", "success");
                e.currentTarget.reset();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{ width: "100%", height: "38px", background: "#0b223d", border: "1px solid #1e3a63", color: "#fff", padding: "0 10px", borderRadius: "4px", fontSize: "0.85rem" }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                style={{ width: "100%", height: "38px", background: "#0b223d", border: "1px solid #1e3a63", color: "#fff", padding: "0 10px", borderRadius: "4px", fontSize: "0.85rem" }}
              />
              <button type="submit" className="btn-lets-go" style={{ height: "40px", fontSize: "0.9rem", marginTop: "4px" }}>
                Send Enquiry
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <span>© 2026 Vishal Travels. All Rights Reserved. Pune, Maharashtra.</span>
            <span>Privacy Policy • Terms & Conditions</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP MODAL POPUP */}
      {isWaOpen && (
        <div className="whatsapp-chat-modal">
          <div className="wa-header">
            <span style={{ fontSize: "1.5rem" }}>👨‍💼</span>
            <div>
              <strong style={{ display: "block", fontSize: "0.9rem" }}>Vishal Travels Pune Desk</strong>
              <small style={{ color: "#e2e8f0" }}>Online • Instant Response</small>
            </div>
            <button
              onClick={() => setIsWaOpen(false)}
              style={{ marginLeft: "auto", background: "none", border: "none", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}
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
              style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "20px", padding: "3px 10px", fontSize: "0.72rem", cursor: "pointer" }}
            >
              🛕 Ashtavinayak
            </button>
            <button
              onClick={() => handleSendWa("Force Urbania 17 seater in Pune")}
              style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "20px", padding: "3px 10px", fontSize: "0.72rem", cursor: "pointer" }}
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
            <button type="submit" className="wa-send-btn">➤</button>
          </form>
        </div>
      )}

      {/* RESERVATION CONFIRMATION MODAL */}
      {isBookingModalOpen && selectedVehicle && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3>Book with Vishal Travels Pune</h3>
              <button className="modal-close-btn" onClick={() => setIsBookingModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px", background: "#f8fafc", padding: "16px", borderRadius: "8px" }}>
                <div>
                  <h4 style={{ color: "#0b3c6d", marginBottom: "4px" }}>{selectedVehicle.name}</h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>{selectedVehicle.seatingText}</p>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>Rate: <strong>₹{selectedVehicle.ratePerKm}/km</strong> (Min {selectedVehicle.minKmPerDay} km/day)</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: "#dcfce7", color: "#16a34a", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700 }}>
                    ● 24/7 Pune Dispatch Ready
                  </span>
                </div>
              </div>

              <form onSubmit={handleConfirmReservation}>
                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Passenger Name *</label>
                    <input
                      type="text"
                      defaultValue={custName || "Sanjay Shinde"}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      defaultValue={custPhone || "9764564699"}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Pickup Location *</label>
                    <input
                      type="text"
                      defaultValue={pickupLocation}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Destination *</label>
                    <input
                      type="text"
                      defaultValue={destination}
                      required
                    />
                  </div>
                </div>

                <div className="bf-grid-2">
                  <div className="bf-field">
                    <label>Date of Journey *</label>
                    <input
                      type="date"
                      defaultValue={startDate}
                      required
                    />
                  </div>
                  <div className="bf-field">
                    <label>Reporting Time *</label>
                    <input type="time" defaultValue="06:30" required />
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "6px", margin: "16px 0", border: "1px solid #e2e8f0" }}>
                  <label style={{ display: "flex", gap: "10px", alignItems: "center", cursor: "pointer" }}>
                    <input type="radio" name="payToken" defaultChecked />
                    <div>
                      <strong style={{ fontSize: "0.92rem", display: "block" }}>Token Advance Booking (₹2,000 via UPI)</strong>
                      <small style={{ color: "#64748b" }}>Balance payable to driver upon departure</small>
                    </div>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    style={{ padding: "10px 18px", border: "1px solid #cbd5e1", background: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700 }}
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-lets-go" style={{ width: "auto", padding: "10px 24px", marginTop: 0 }}>
                    Confirm & Issue E-Ticket
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
            <div className="modal-header" style={{ background: "#0b3c6d", color: "#fff" }}>
              <h3 style={{ color: "#fff" }}>BOOKING CONFIRMED • VISHAL TRAVELS PUNE</h3>
              <button className="modal-close-btn" onClick={() => setIsTicketModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body" id="printTicketArea">
              <div style={{ border: "2px dashed #cbd5e1", borderRadius: "8px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", marginBottom: "14px" }}>
                  <div>
                    <h3 style={{ color: "#0b3c6d", margin: 0 }}>Vishal Travels Pune</h3>
                    <small style={{ color: "#64748b" }}>Booking Voucher & E-Ticket</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", display: "block" }}>PNR NUMBER</span>
                    <strong style={{ color: "var(--topbar-bg)", fontSize: "1.2rem" }}>{generatedTicket.pnr}</strong>
                  </div>
                </div>

                <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>FROM</span>
                    <strong style={{ fontSize: "1.1rem" }}>{generatedTicket.from}</strong>
                  </div>
                  <div style={{ color: "var(--topbar-bg)", fontSize: "1.2rem" }}>➔</div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block" }}>TO</span>
                    <strong style={{ fontSize: "1.1rem" }}>{generatedTicket.to}</strong>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.85rem", marginBottom: "16px" }}>
                  <div>Passenger: <strong>{generatedTicket.name}</strong></div>
                  <div>Phone: <strong>+91 {generatedTicket.phone}</strong></div>
                  <div>Vehicle: <strong>{generatedTicket.vehicle}</strong></div>
                  <div>Journey Date: <strong>{generatedTicket.date}</strong></div>
                  <div>Assigned Driver: <strong>Santosh Shinde (Verified)</strong></div>
                  <div>Helpline: <strong>+91 9764564699</strong></div>
                </div>

                <div style={{ background: "#e0f2fe", padding: "10px 14px", borderRadius: "6px", fontSize: "0.82rem", color: "#0369a1" }}>
                  ✓ Driver will contact you 2 hours before trip. Toll and state tax payable as actuals or bundled.
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
                <button
                  style={{ padding: "8px 18px", border: "1px solid #cbd5e1", background: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 700 }}
                  onClick={() => window.print()}
                >
                  🖨️ Print Ticket
                </button>
                <button
                  className="btn-book-bus"
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
              <button className="modal-close-btn" onClick={() => setIsTrackerModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div style={{ height: "180px", background: "#0b223d", borderRadius: "8px", position: "relative", display: "flex", alignItems: "center", padding: "0 30px", border: "1px solid #1e3a63" }}>
                <div style={{ width: "100%", height: "6px", background: "#1e3a63", borderRadius: "3px", position: "relative" }}>
                  <div style={{ width: `${trackerProgress}%`, height: "100%", background: "linear-gradient(90deg, #10b981, #f5a623)", borderRadius: "3px" }}></div>
                  <div style={{ position: "absolute", left: `${trackerProgress}%`, top: "50%", transform: "translate(-50%, -50%)", fontSize: "1.6rem" }}>
                    🚌
                  </div>
                </div>
                <div style={{ position: "absolute", top: "12px", left: "16px", color: "#10b981", fontSize: "0.75rem", fontWeight: 800 }}>
                  ● GPS SATELLITE LOCK: ACTIVE (MH-12-VT-9764)
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px" }}>
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Speed Governor</span>
                  <strong style={{ fontSize: "1.2rem", color: "#0b3c6d" }}>{trackerSpeed} km/h</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Progress</span>
                  <strong style={{ fontSize: "1.2rem", color: "#0b3c6d" }}>{trackerProgress}% Done</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Next Rest Halt</span>
                  <strong style={{ fontSize: "1rem", color: "#0b3c6d" }}>Shirwal Plaza</strong>
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
    </>
  );
}
