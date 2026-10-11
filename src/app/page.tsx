"use client";

import React, { useState, useEffect } from "react";

// --- Types & Data modeled directly after Vishal Travels Pune ---

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
    name: "Force Urbania Luxury VIP Lounge (13 & 17 Seater)",
    category: "urbania",
    categoryLabel: "Force Urbania VIP",
    seatingText: "13 / 17 Seater Maharaja AC",
    seatsNum: 17,
    submodel: "Mercedes-Derived Engine • Monocoque Body • Air Suspension",
    rating: 4.98,
    reviewsCount: 240,
    luggage: "20 Large Bags + Roof Carrier",
    ratePerKm: 38,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    amenities: ["Maharaja Reclining Captain Seats", "Independent AC Vents", "Panoramic UV Glass Windows", "Mobile USB Chargers Each Seat", "Music & PA Mic"],
    description: "The pride of Vishal Travels. European luxury with superior legroom and whisper-quiet suspension for executive corporate trips and wedding VIP guests."
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
    description: "Pune's top pick for Ashtavinayak Darshan, Mahabaleshwar weekend escapes, and Shirdi pilgrimages. Highly comfortable for small family groups."
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
    name: "Luxury Coach / Volvo Multi-Axle (45-49 Seater)",
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
    name: "Toyota Innova Crysta & Maruti Ertiga (6-7 Seater)",
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

export default function VishalTravelsApp() {
  // Navigation & State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"one-way" | "round-trip">("round-trip");
  
  // Quick Booking Form State (Mirroring Vishal Travels' exact fields)
  const [custName, setCustName] = useState("Sanjay Shinde");
  const [custPhone, setCustPhone] = useState("9764564699");
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("17 Seater");
  const [busType, setBusType] = useState("Force Urbania A/C");
  const [pickupLocation, setPickupLocation] = useState("Shivaji Nagar, Pune");
  const [destination, setDestination] = useState("Mahabaleshwar");

  // Fleet Filter
  const [fleetFilter, setFleetFilter] = useState("all");

  // Fare Estimator Calculator State
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
    payment: string;
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

  // Live GPS simulation
  useEffect(() => {
    if (!isTrackerModalOpen) return;
    const interval = setInterval(() => {
      setTrackerProgress((prev) => (prev >= 92 ? 25 : prev + 1));
      setTrackerSpeed(68 + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [isTrackerModalOpen]);

  // Handle Quick Booking "Let's Go!"
  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) {
      triggerToast("Please provide your name and phone number", "warning");
      return;
    }
    const matching = FLEET_DATA.find((f) => f.name.toLowerCase().includes(busType.toLowerCase().split(" ")[0])) || FLEET_DATA[0];
    setSelectedVehicle(matching);
    setIsBookingModalOpen(true);
    triggerToast(`Booking enquiry initialized for ${busType} (${seatingCapacity})!`, "success");
  };

  // Confirm Reservation & Ticket Generation
  const handleConfirmReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pnr = `VT-PUNE-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicket({
      pnr,
      name: custName,
      phone: custPhone,
      vehicle: selectedVehicle?.name || busType,
      from: pickupLocation,
      to: destination,
      date: startDate,
      payment: "Token Advance Confirmed (UPI / Cash on Boarding)"
    });
    setIsBookingModalOpen(false);
    setIsTicketModalOpen(true);
    triggerToast(`Booking confirmed with PNR ${pnr}! E-Ticket generated.`, "success");
  };

  // WhatsApp interaction
  const handleSendWa = (text: string) => {
    if (!text.trim()) return;
    setWaMessages((prev) => [...prev, { text, sender: "user", time: "Just now" }]);
    setWaInput("");
    setTimeout(() => {
      let reply = "Dhanyawad! Our Pune booking manager is checking available buses for your dates. We will call you on +91 " + custPhone + " shortly.";
      if (text.toLowerCase().includes("ashtavinayak")) {
        reply = "🛕 Ashtavinayak Darshan 2-Day package available in AC Tempo Traveller (17-seater) & Force Urbania. Free highway toll guidance included!";
      } else if (text.toLowerCase().includes("urbania")) {
        reply = "🚐 Force Urbania VIP available with Maharaja leather seats and charging ports. Call directly on +91 9764564699 for instant lock.";
      }
      setWaMessages((prev) => [...prev, { text: reply, sender: "bot", time: "Just now" }]);
    }, 900);
  };

  // Fare calculation
  const totalBase = calcKm * calcRate;
  const totalDA = calcDays * calcDA;
  const totalGst = Math.round((totalBase + totalDA) * 0.05);
  const totalEstimate = totalBase + totalDA + totalGst;

  const filteredFleet = fleetFilter === "all"
    ? FLEET_DATA
    : FLEET_DATA.filter((v) => v.category === fleetFilter);

  return (
    <>
      {/* TOPBAR (Exact numbers from Vishal Travels Pune) */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="badge-gold">★ Pune's #1 Rated Bus & Tempo Traveller Rental</span>
            <span className="top-info">
              📞 <a href="tel:+919764564699" style={{ color: "#fff" }}><strong>+91 9764564699</strong></a>
            </span>
            <span className="top-info">
              📞 <a href="tel:+919372459371" style={{ color: "#fff" }}><strong>+91 9372459371</strong></a>
            </span>
            <span className="top-info">
              📞 <a href="tel:+918600118437" style={{ color: "#fff" }}><strong>+91 8600118437</strong></a>
            </span>
          </div>

          <div className="top-bar-right">
            <div className="lang-selector">
              <span>🌐</span>
              <select onChange={(e) => triggerToast(`Language switched to ${e.target.options[e.target.selectedIndex].text}`, "info")}>
                <option value="en">English (EN)</option>
                <option value="mr">मराठी (MR)</option>
                <option value="hi">हिन्दी (HI)</option>
              </select>
            </div>
            <a
              href="https://wa.me/919764564699"
              target="_blank"
              rel="noreferrer"
              className="top-btn-admin"
              style={{ background: "#25d366", borderColor: "#1ebd56", color: "#fff" }}
            >
              💬 WhatsApp: 9764564699
            </a>
          </div>
        </div>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="main-header" id="mainHeader">
        <div className="container nav-container">
          <a href="#home" className="logo-brand">
            <div className="logo-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="6" width="18" height="12" rx="3"/>
                <circle cx="7" cy="18" r="2"/>
                <circle cx="17" cy="18" r="2"/>
                <line x1="3" y1="11" x2="21" y2="11"/>
                <line x1="7" y1="6" x2="7" y2="11"/>
                <line x1="12" y1="6" x2="12" y2="11"/>
                <line x1="17" y1="6" x2="17" y2="11"/>
              </svg>
            </div>
            <div className="logo-text">
              <span className="logo-main">Vishal Travels</span>
              <span className="logo-sub">Pune's Most Trusted Rental</span>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`} id="navLinks">
            <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#booking-form" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Book a Bus</a>
            <a href="#routes-trips" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Routes & Trips</a>
            <a href="#tour-packages" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Tour Packages</a>
            <a href="#our-fleet" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Our Fleet</a>
            <a href="#fare-calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Bus Fare</a>
            <a href="#why-choose-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About Us</a>
            <a href="#reviews" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+919764564699" className="btn btn-outline-call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 9764564699
            </a>
            <a href="#booking-form" className="btn btn-primary glow-effect">
              Book Your Bus
            </a>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Adapted directly from Vishal Travels Pune) */}
      <section className="hero-section" id="home">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge-tag">
            <span className="pulse-dot"></span>
            <span>Welcome to Vishal Travels Pune</span>
          </div>
          <h1 className="hero-title">
            Affordable Bus Rental in Pune – Tempo Traveller, Mini Bus & Luxury Coach
          </h1>
          <p className="hero-subtitle">
            Hire AC tempo travellers (9–27 seater), Force Urbanias, mini buses & luxury coaches in Pune. Police-verified drivers, GPS-tracked fleet, 24/7 availability across Maharashtra.
          </p>

          <div className="hero-features-strip">
            <div className="hero-feature-item">
              <span>🛡️ Police-Verified Drivers</span>
            </div>
            <div className="hero-feature-item">
              <span>🛰️ Real-Time GPS Tracking</span>
            </div>
            <div className="hero-feature-item">
              <span>💰 Zero Hidden Charges</span>
            </div>
            <div className="hero-feature-item">
              <span>★ 4.9/5 Rating in Pune</span>
            </div>
          </div>

          {/* VISHAL TRAVELS QUICK BOOKING FORM (Exact fields from vishaltravelspune.com) */}
          <div className="booking-widget-card" id="booking-form">
            <div className="widget-header">
              <div className="trip-tabs" role="tablist">
                <button
                  className={`trip-tab ${activeTab === "round-trip" ? "active" : ""}`}
                  onClick={() => setActiveTab("round-trip")}
                >
                  <span className="radio-indicator"></span> Round Trip / Outstation
                </button>
                <button
                  className={`trip-tab ${activeTab === "one-way" ? "active" : ""}`}
                  onClick={() => setActiveTab("one-way")}
                >
                  <span className="radio-indicator"></span> One Way Drop
                </button>
              </div>
              <div className="widget-quick-help">
                <span>⚡ Instant Call & Booking Support</span>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleQuickBookSubmit}>
              <div className="form-grid-row">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="custName"><span className="input-icon">👤</span> Your Name</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="custName"
                      placeholder="e.g. Sanjay Shinde"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="custPhone"><span className="input-icon">📱</span> Mobile Number</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="custPhone"
                      placeholder="e.g. 9764564699"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Travel Start Date */}
                <div className="form-group">
                  <label htmlFor="startDate"><span className="input-icon">📅</span> Travel Start Date</label>
                  <div className="input-wrapper">
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Return Date */}
                <div className="form-group">
                  <label htmlFor="returnDate">
                    <span className="input-icon">🔄</span> Return Date {activeTab === "one-way" ? "(Optional)" : ""}
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="date"
                      id="returnDate"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      disabled={activeTab === "one-way"}
                      style={{ opacity: activeTab === "one-way" ? 0.6 : 1 }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-row secondary-row">
                {/* Seating Capacity dropdown (matches vishaltravelspune.com) */}
                <div className="form-group">
                  <label htmlFor="seatingCapacity"><span className="input-icon">👥</span> Seating Capacity</label>
                  <div className="input-wrapper">
                    <select
                      id="seatingCapacity"
                      value={seatingCapacity}
                      onChange={(e) => setSeatingCapacity(e.target.value)}
                    >
                      <option value="4 Seater">4 Seater (Dzire / Aura)</option>
                      <option value="6-7 Seater">6 - 7 Seater (Innova / Ertiga)</option>
                      <option value="13 Seater">13 Seater (Tempo / Urbania)</option>
                      <option value="17 Seater">17 Seater (Tempo Traveller / Urbania)</option>
                      <option value="22 Seater">22 Seater (Mini Bus)</option>
                      <option value="26 Seater">26 Seater (Tempo Traveller)</option>
                      <option value="32 Seater">32 Seater (Executive Coach)</option>
                      <option value="35 Seater">35 Seater (Coach)</option>
                      <option value="45 Seater">45 Seater (Luxury Bus)</option>
                      <option value="49 Seater">49 Seater (Volvo Multi-Axle)</option>
                    </select>
                  </div>
                </div>

                {/* Bus Type dropdown (matches vishaltravelspune.com) */}
                <div className="form-group">
                  <label htmlFor="busType"><span className="input-icon">🚌</span> Bus Type</label>
                  <div className="input-wrapper">
                    <select
                      id="busType"
                      value={busType}
                      onChange={(e) => setBusType(e.target.value)}
                    >
                      <option value="Force Urbania A/C">Force Urbania A/C (VIP Lounge)</option>
                      <option value="Tempo Traveller A/C">Tempo Traveller A/C</option>
                      <option value="Tempo Traveller Non-A/C">Tempo Traveller Non-A/C</option>
                      <option value="Luxury Bus">Luxury Bus (Volvo / Multi-Axle)</option>
                      <option value="Mini Bus">Mini Bus (28-35 Seater)</option>
                      <option value="Innova">Toyota Innova Crysta</option>
                      <option value="Ertiga">Maruti Ertiga</option>
                    </select>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="form-group">
                  <label htmlFor="pickupLocation"><span className="input-icon">📍</span> Pickup Location (Pune)</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="pickupLocation"
                      placeholder="e.g. Shivaji Nagar, Kothrud, Hinjewadi"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit button: "Lets Go!" */}
                <div className="form-group form-action">
                  <button type="submit" className="btn btn-search-vehicles" id="letsGoSubmitBtn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    Let's Go! Check Availability
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SIMPLE 3 STEPS TO BOOK YOUR BUS RIDE (Section from Vishal Travels Pune) */}
      <section className="section" style={{ background: "#ffffff", padding: "60px 0" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">EFFORTLESS BOOKING</span>
            <h2 className="section-title">Simple Steps To Book Your Bus Ride</h2>
            <p className="section-desc">Book your bus quickly and easily in just a few steps with Vishal Travels.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <div className="trust-item" style={{ textAlign: "center", borderTop: "4px solid var(--primary)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🚌</div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>1. Choose Your Bus</h4>
              <p style={{ color: "#64748b" }}>Select the type of bus rental you need (Tempo Traveller, Force Urbania, or Luxury Coach).</p>
            </div>
            <div className="trust-item" style={{ textAlign: "center", borderTop: "4px solid var(--accent-gold)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📅</div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>2. Pick Date & Schedule</h4>
              <p style={{ color: "#64748b" }}>Set your preferred journey date, pickup point in Pune, and total travel days.</p>
            </div>
            <div className="trust-item" style={{ textAlign: "center", borderTop: "4px solid #10b981" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✅</div>
              <h4 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>3. Instant Confirmation</h4>
              <p style={{ color: "#64748b" }}>Get instant digital E-Ticket, assigned driver phone number, and live tracking link.</p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR TOUR PACKAGES (Directly from Vishal Travels Packages & Menu) */}
      <section className="section popular-routes-section" id="tour-packages">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">CURATED PILGRIMAGE & WEEKEND TOURS</span>
            <h2 className="section-title">Popular Tour Packages from Pune</h2>
            <p className="section-desc">Fixed transparent packages with experienced highway chauffeurs, toll guidance, and well-timed halts.</p>
          </div>

          <div className="routes-grid" id="packagesGrid">
            {PACKAGES_DATA.map((pkg) => (
              <div key={pkg.id} className="route-card">
                <div className="route-image-wrap">
                  <img src={pkg.image} alt={pkg.title} className="route-img" />
                  <span className="route-badge">{pkg.tag}</span>
                </div>
                <div className="route-body">
                  <h3 style={{ fontSize: "1.25rem", color: "var(--primary-dark)", marginBottom: "4px" }}>{pkg.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>{pkg.subtitle}</p>

                  <div className="route-meta-strip">
                    <span>⏱️ {pkg.duration}</span>
                    <span>🛣️ {pkg.distanceKm} KM approx</span>
                  </div>

                  <div style={{ marginBottom: "16px", fontSize: "0.82rem", color: "#334155" }}>
                    <strong>Key Attractions:</strong>
                    <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} style={{ listStyleType: "disc", marginBottom: "2px" }}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="route-pricing-row">
                    <div className="route-price-box">
                      <span className="price-sub">Starting From</span>
                      <strong className="price-main">₹{pkg.startingPrice.toLocaleString()}</strong>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setDestination(pkg.title);
                        const match = FLEET_DATA.find((f) => f.name.includes("Urbania") || f.name.includes("Tempo")) || FLEET_DATA[0];
                        setSelectedVehicle(match);
                        setIsBookingModalOpen(true);
                        triggerToast(`Selected package: ${pkg.title}`, "info");
                      }}
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES (Directly from Vishal Travels "Routes & Trips" Menu) */}
      <section className="section" id="routes-trips" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">DIRECT INTERCITY TRANSFERS</span>
            <h2 className="section-title">Popular Routes & Trips from Pune</h2>
            <p className="section-desc">Reliable point-to-point and return transport service across Maharashtra expressways.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { route: "Pune ➔ Mumbai / Airport", time: "3.5 hrs", dist: "150 KM", fare: "₹3,500" },
              { route: "Pune ➔ Mahabaleshwar", time: "3 hrs", dist: "120 KM", fare: "₹4,200" },
              { route: "Pune ➔ Shirdi Mandir", time: "4.5 hrs", dist: "210 KM", fare: "₹4,800" },
              { route: "Pune ➔ Chiplun / Konkan", time: "5 hrs", dist: "230 KM", fare: "₹5,400" },
              { route: "Pune ➔ Panchgani", time: "2.5 hrs", dist: "100 KM", fare: "₹3,900" },
              { route: "Pune ➔ Goa Beachside", time: "8.5 hrs", dist: "450 KM", fare: "₹14,500" },
            ].map((r, idx) => (
              <div key={idx} className="trust-item" style={{ background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontSize: "1.05rem", color: "var(--primary)" }}>{r.route}</h4>
                  <p style={{ fontSize: "0.82rem", color: "#64748b" }}>⏱️ {r.time} • 🛣️ {r.dist}</p>
                </div>
                <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ color: "var(--primary-dark)", fontSize: "1.1rem" }}>{r.fare}</strong>
                  <button
                    className="btn btn-outline btn-sm"
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

      {/* OUR FLEET SHOWCASE */}
      <section className="section fleet-section" id="our-fleet">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">VISHAL TRAVELS FLEET</span>
            <h2 className="section-title">Explore Our Pune Rental Fleet</h2>
            <p className="section-desc">Clean, sanitised, and well-maintained buses and travellers for every group size.</p>
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
              Force Urbania VIP (17 Seats)
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "tempo" ? "active" : ""}`}
              onClick={() => setFleetFilter("tempo")}
            >
              Tempo Travellers (17-26 Seats)
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
              Luxury Volvo Coaches (49 Seats)
            </button>
            <button
              className={`fleet-filter-btn ${fleetFilter === "suv" ? "active" : ""}`}
              onClick={() => setFleetFilter("suv")}
            >
              Innova Crysta / SUVs
            </button>
          </div>

          <div className="fleet-grid">
            {filteredFleet.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-thumb-wrap">
                  <img src={vehicle.image} alt={vehicle.name} className="vehicle-thumb" />
                  <span className="vehicle-cat-tag">{vehicle.categoryLabel}</span>
                  <span className="vehicle-rating-tag">★ {vehicle.rating} ({vehicle.reviewsCount})</span>
                </div>
                <div className="vehicle-details">
                  <h3 className="vehicle-name">{vehicle.name}</h3>
                  <p className="vehicle-submodel">{vehicle.submodel}</p>

                  <div className="vehicle-specs-grid">
                    <div className="spec-cell">
                      <span>👥 {vehicle.seatingText}</span>
                    </div>
                    <div className="spec-cell">
                      <span>🧳 {vehicle.luggage}</span>
                    </div>
                    <div className="spec-cell">
                      <span>⏱️ Min: {vehicle.minKmPerDay} km/day</span>
                    </div>
                    <div className="spec-cell">
                      <span>👨‍✈️ DA: ₹{vehicle.driverAllowancePerDay}/day</span>
                    </div>
                  </div>

                  <div className="vehicle-amenities-pills">
                    {vehicle.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="amenity-pill">✓ {a}</span>
                    ))}
                  </div>

                  <div className="vehicle-pricing-footer">
                    <div className="rate-stack">
                      <span className="rate-min">Base Tariff</span>
                      <strong className="rate-amount">₹{vehicle.ratePerKm} <small>/ KM</small></strong>
                    </div>
                    <div className="vehicle-action-btns">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsBookingModalOpen(true);
                        }}
                      >
                        Specs
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARE ESTIMATOR CALCULATOR (Vishal Travels "Bus Fair" Section) */}
      <section className="section estimator-section" id="fare-calculator">
        <div className="container">
          <div className="estimator-card">
            <div className="estimator-left">
              <span className="section-eyebrow">TRANSPARENT PUNE TARIFF</span>
              <h2 className="estimator-title">Instant Bus Fair Estimator</h2>
              <p className="estimator-desc">
                Calculate your exact budget based on Vishal Travels standard per-km rate chart. Zero surprise fees.
              </p>

              <div className="calc-controls">
                <div className="calc-control-group">
                  <label htmlFor="calcVehicleType">Select Vehicle Model</label>
                  <select
                    id="calcVehicleType"
                    className="calc-select"
                    onChange={(e) => {
                      const option = e.target.options[e.target.selectedIndex];
                      setCalcRate(Number(e.target.value));
                      setCalcDA(Number(option.getAttribute("data-da") || 500));
                      setCalcVehicleName(option.getAttribute("data-name") || "");
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

                <div className="calc-slider-group">
                  <div className="slider-label-row">
                    <span>Estimated Distance</span>
                    <strong>{calcKm} KM</strong>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="2000"
                    step="25"
                    value={calcKm}
                    onChange={(e) => setCalcKm(Number(e.target.value))}
                    className="custom-slider"
                  />
                  <div className="slider-marks">
                    <span>150 KM</span>
                    <span>1000 KM</span>
                    <span>2000 KM</span>
                  </div>
                </div>

                <div className="calc-slider-group">
                  <div className="slider-label-row">
                    <span>Duration of Trip</span>
                    <strong>{calcDays} Days</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="custom-slider"
                  />
                  <div className="slider-marks">
                    <span>1 Day</span>
                    <span>5 Days</span>
                    <span>10 Days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="estimator-right">
              <div className="fare-breakdown-box">
                <div className="breakdown-header">
                  <h3>Itemized Rate Quotation</h3>
                  <span className="live-pill">⚡ Guaranteed Fair Fare</span>
                </div>
                <div className="vehicle-selected-name">
                  {calcVehicleName}
                </div>
                <div className="breakdown-list">
                  <div className="breakdown-item">
                    <span>Base Kilometre Fare ({calcKm} KM @ ₹{calcRate}/km)</span>
                    <strong>₹{totalBase.toLocaleString()}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Driver Allowance ({calcDays} Days @ ₹{calcDA}/day)</span>
                    <strong>₹{totalDA.toLocaleString()}</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Maharashtra Border & Sanitization</span>
                    <span className="tag-free">Included</span>
                  </div>
                  <div className="breakdown-item">
                    <span>GST (5% Transport Slab)</span>
                    <strong>₹{totalGst.toLocaleString()}</strong>
                  </div>
                  <div className="breakdown-divider"></div>
                  <div className="breakdown-item total-item">
                    <span>Total Estimated Cost</span>
                    <strong className="total-price">₹{totalEstimate.toLocaleString()}</strong>
                  </div>
                </div>
                <p className="fare-note">* Tolls and parking receipts payable as actuals or bundled on request.</p>
                <div className="breakdown-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      const match = FLEET_DATA.find((f) => f.name.includes(calcVehicleName.split(" ")[0])) || FLEET_DATA[0];
                      setSelectedVehicle(match);
                      setIsBookingModalOpen(true);
                    }}
                  >
                    Lock Price & Book in Pune
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / ABOUT US (From vishaltravelspune.com) */}
      <section className="section trust-section" id="why-choose-us">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">WHO WE ARE</span>
            <h2 className="section-title">Reliable Bus Rental Services by Vishal Travels</h2>
            <p className="section-desc">
              Vishal Travels is a trusted bus rental service in Pune offering tempo travellers, mini buses, and luxury coaches. We ensure safe, on-time, and comfortable travel for families, corporate groups, and tours across Maharashtra.
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon-wrap">🛡️</div>
              <h4>Police-Verified Drivers</h4>
              <p>Experienced highway chauffeurs with background checks, commercial licenses, and defensive driving training.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-wrap">🛰️</div>
              <h4>GPS-Tracked Fleet</h4>
              <p>Live satellite tracking on every bus with centralized journey tracking for family security.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-wrap">💰</div>
              <h4>Affordable & Transparent</h4>
              <p>Best price in Pune with clear rate card. Zero hidden surcharges or surprise vehicle swaps.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-wrap">🎧</div>
              <h4>24/7 Availability</h4>
              <p>Round-the-clock booking hotline (+91 9764564699) and on-road breakdown replacement assistance.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-wrap">🧽</div>
              <h4>Clean & Sanitized</h4>
              <p>Deep vacuumed seats, sanitized interiors, working AC vents, and fresh clean blankets on long sleeper trips.</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon-wrap">✅</div>
              <h4>RTO Registered & Insured</h4>
              <p>100% compliant with Maharashtra Transport Department and comprehensive passenger insurance.</p>
            </div>
          </div>

          <div className="stats-counter-bar">
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Vehicles in Pune Fleet</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Happy Passengers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">18+</span>
              <span className="stat-label">Years Operating</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">99.4%</span>
              <span className="stat-label">On-Time Pickup Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS & TESTIMONIALS */}
      <section className="section testimonials-section" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">WHAT PUNE SAYS</span>
            <h2 className="section-title">Google Reviews for Vishal Travels Pune</h2>
            <p className="section-desc">Rated 4.9/5 by families, corporate HRs, and tour organizers in Pune.</p>
          </div>

          <div className="testimonials-carousel">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="testimonial-card">
                <div className="review-stars">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="review-text">"{rev.text}"</p>
                <div className="reviewer-meta">
                  <div className="reviewer-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div className="reviewer-info">
                    <strong>{rev.name}</strong>
                    <small>{rev.role} • {rev.city} ({rev.tripType})</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE GPS TRACKING & SMART E-TICKET CALLOUT */}
      <section className="section digital-app-section">
        <div className="container">
          <div className="digital-box">
            <div className="digital-text">
              <span className="badge-gold">⚡ REAL-TIME PASSENGER SAFETY</span>
              <h2>Live GPS Tracking & Digital E-Tickets from Vishal Travels</h2>
              <p>
                Share your live tracking link with family members, get automated driver contact details via WhatsApp, and download official travel invoices online.
              </p>
              <div className="feature-bullets">
                <div className="fb-item">✓ Live bus speedometer and satellite map telemetry</div>
                <div className="fb-item">✓ Instant driver contact card dispatched via WhatsApp</div>
                <div className="fb-item">✓ Verifiable digital E-Ticket with QR code</div>
                <div className="fb-item">✓ 24/7 Pune journey control room monitoring</div>
              </div>
              <div className="cta-actions">
                <button
                  className="btn btn-secondary-light"
                  onClick={() => setIsTrackerModalOpen(true)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                  Launch Live GPS Tracker Simulator
                </button>
                <a href="#booking-form" className="btn btn-primary">Book Your Bus Now</a>
              </div>
            </div>

            <div className="digital-preview">
              <div className="phone-mockup">
                <div className="phone-header">
                  <span>Vishal Travels Live Telemetry</span>
                  <span className="live-dot-pulse">● LIVE GPS</span>
                </div>
                <div className="mockup-route">
                  <strong>Pune ➔ Mahabaleshwar</strong>
                  <small>Force Urbania VIP • MH-12-VT-9764</small>
                </div>
                <div className="mockup-progress-bar">
                  <div className="mockup-fill" style={{ width: `${trackerProgress}%` }}></div>
                </div>
                <div className="mockup-stats">
                  <div><span>Current Speed</span><strong>{trackerSpeed} km/h</strong></div>
                  <div><span>Next Halt</span><strong>Shirwal Food Plaza</strong></div>
                  <div><span>ETA</span><strong>04:30 PM</strong></div>
                </div>
                <div className="mockup-driver">
                  <div className="driver-avatar">👨‍✈️</div>
                  <div>
                    <strong>Santosh Shinde (Verified)</strong>
                    <p>★ 4.95 rating • 14 yrs highway experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (Vishal Travels Pune branding & contact details) */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="logo-brand footer-logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="6" width="18" height="12" rx="3"/>
                  <circle cx="7" cy="18" r="2"/>
                  <circle cx="17" cy="18" r="2"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-main text-white">Vishal Travels</span>
                <span className="logo-sub text-gold">Pune's Most Trusted Rental</span>
              </div>
            </div>
            <p className="footer-about">
              Vishal Travels offers AC & Non-AC tempo travellers, Force Urbanias, mini buses & luxury coaches in Pune. Specialised in Ashtavinayak Darshan, 5 Jyotirlinga Yatra, and corporate transit across Maharashtra.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/14X2F187jBq/" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">FB</a>
              <a href="https://www.instagram.com/vishaltravelspune?utm_source=qr" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">IG</a>
              <a href="https://wa.me/919764564699" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">WA</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#booking-form">Book a Bus Online</a></li>
              <li><a href="#routes-trips">Routes & Trips</a></li>
              <li><a href="#tour-packages">Pilgrimage Packages</a></li>
              <li><a href="#our-fleet">Tempo Traveller & Fleet</a></li>
              <li><a href="#fare-calculator">Bus Fare Calculator</a></li>
              <li><a href="#why-choose-us">About Vishal Travels</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact Vishal Travels Pune</h4>
            <div className="footer-contact-item">
              <span className="icon">📍</span>
              <div>
                <strong>Main Office:</strong><br />
                Pune, Maharashtra, India - 411038
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <div>
                <strong>Direct Booking Phone Numbers:</strong><br />
                <a href="tel:+919764564699" style={{ color: "#fff" }}>+91 9764564699</a><br />
                <a href="tel:+919372459371" style={{ color: "#fff" }}>+91 9372459371</a><br />
                <a href="tel:+918600118437" style={{ color: "#fff" }}>+91 8600118437</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="icon">💬</span>
              <div>
                <strong>WhatsApp Inquiries:</strong><br />
                <a href="https://wa.me/919764564699" style={{ color: "#25d366" }}>+91 9764564699</a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Inquiry Callback</h4>
            <p className="query-note">Need an instant rate quote for your Pune journey?</p>
            <form
              className="footer-query-form"
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast("Enquiry sent to Vishal Travels desk! We will call back shortly.", "success");
                e.currentTarget.reset();
              }}
            >
              <input type="text" placeholder="Your Name" required />
              <input type="tel" placeholder="Mobile / WhatsApp Number" required />
              <textarea rows={2} placeholder="Trip Route (e.g. Pune to Mahabaleshwar)..." required></textarea>
              <button type="submit" className="btn btn-primary btn-block">Request Quote</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>© 2026 Vishal Travels. All Rights Reserved. Pune, Maharashtra.</p>
            <div className="footer-legal-links">
              <a href="#">Terms of Service</a>
              <span>•</span>
              <a href="#">Cancellation Policy</a>
              <span>•</span>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS (With Vishal Travels Sonar Wave effect) */}
      <div className="floating-fab-container">
        {/* Call Now */}
        <a href="tel:+919764564699" className="fab-btn fab-call" aria-label="Call Vishal Travels">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="fab-label">Call +91 9764564699</span>
        </a>

        {/* WhatsApp Chat with Sonar Pulse */}
        <button
          className="fab-btn fab-whatsapp"
          onClick={() => setIsWaOpen(!isWaOpen)}
          aria-label="WhatsApp Vishal Travels"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.192 8.192 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
          </svg>
          <span className="fab-label">WhatsApp</span>
        </button>
      </div>

      {/* WHATSAPP MODAL POPUP */}
      {isWaOpen && (
        <div className="whatsapp-chat-modal">
          <div className="wa-header">
            <div className="wa-avatar">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Vishal Travels Desk"
                className="wa-avatar-img"
              />
              <span className="wa-online-dot"></span>
            </div>
            <div className="wa-header-info">
              <strong>Vishal Travels Pune Desk</strong>
              <p>Online • Instant Response</p>
            </div>
            <button className="wa-close-btn" onClick={() => setIsWaOpen(false)}>✕</button>
          </div>
          <div className="wa-body">
            {waMessages.map((msg, i) => (
              <div key={i} className={`wa-message ${msg.sender === "bot" ? "received" : "sent"}`}>
                <p>{msg.text}</p>
                <span className="wa-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="wa-quick-replies">
            <button className="wa-chip" onClick={() => handleSendWa("Book Ashtavinayak Darshan Package")}>🛕 Ashtavinayak Package</button>
            <button className="wa-chip" onClick={() => handleSendWa("Force Urbania 17 Seater in Pune")}>🚐 Force Urbania VIP</button>
            <button className="wa-chip" onClick={() => handleSendWa("Pune to Mumbai Bus Rental")}>🛣️ Pune ➔ Mumbai</button>
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

      {/* RESERVATION MODAL */}
      {isBookingModalOpen && selectedVehicle && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <h3>Book with Vishal Travels Pune</h3>
                <span className="badge-gold">{selectedVehicle.name}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsBookingModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-section-grid">
                <div className="modal-vehicle-preview">
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="modal-img" />
                  <div className="modal-amenities-tags">
                    {selectedVehicle.amenities.map((a, i) => (
                      <span key={i} className="amenity-pill">✓ {a}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-tariff-card">
                  <h4>Tariff Policy in Pune</h4>
                  <div className="tariff-line"><span>Rate Per KM:</span> <strong>₹{selectedVehicle.ratePerKm}/km</strong></div>
                  <div className="tariff-line"><span>Min. Billing / Day:</span> <strong>{selectedVehicle.minKmPerDay} km</strong></div>
                  <div className="tariff-line"><span>Driver Allowance:</span> <strong>₹{selectedVehicle.driverAllowancePerDay} / day</strong></div>
                  <div className="tariff-line"><span>Seating:</span> <strong>{selectedVehicle.seatingText}</strong></div>
                  <div className="tariff-line text-success"><span>Assistance:</span> <strong>24/7 Breakdown Backup</strong></div>
                </div>
              </div>

              <form className="reservation-form" onSubmit={handleConfirmReservation}>
                <h4 className="form-subhead">Passenger & Trip Details</h4>
                <div className="form-row-2">
                  <div className="form-field">
                    <label>Passenger Name *</label>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Pickup Location in Pune *</label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Destination City *</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Pickup Time *</label>
                    <input type="time" defaultValue="06:30" required />
                  </div>
                </div>

                <div className="payment-selection-box">
                  <h4>Confirmation & Advance Mode</h4>
                  <div className="payment-options">
                    <label className="pay-option">
                      <input type="radio" name="payType" value="advance" defaultChecked />
                      <div className="pay-option-content">
                        <strong>Token Advance (Pay ₹2,000 Now via UPI)</strong>
                        <small>Balance paid to driver upon boarding</small>
                      </div>
                    </label>
                    <label className="pay-option">
                      <input type="radio" name="payType" value="paylater" />
                      <div className="pay-option-content">
                        <strong>Pay on Boarding / Cash to Driver</strong>
                        <small>Confirmed via phone call from Vishal Travels</small>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="modal-footer-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setIsBookingModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary glow-effect">
                    Confirm Reservation & Issue E-Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* E-TICKET ISSUED MODAL */}
      {isTicketModalOpen && generatedTicket && (
        <div className="modal-backdrop">
          <div className="modal-dialog ticket-dialog">
            <div className="modal-header ticket-modal-header">
              <div className="ticket-status-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                BOOKING CONFIRMED • VISHAL TRAVELS PUNE
              </div>
              <button className="modal-close-btn" onClick={() => setIsTicketModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body ticket-print-body" id="eTicketContent">
              <div className="ticket-card">
                <div className="ticket-card-header">
                  <div className="ticket-brand">
                    <h3>Vishal Travels Pune</h3>
                    <p>Official Bus & Tempo Traveller Booking Voucher</p>
                  </div>
                  <div className="ticket-pnr-box">
                    <span className="pnr-label">BOOKING ID</span>
                    <strong className="pnr-val">{generatedTicket.pnr}</strong>
                  </div>
                </div>

                <div className="ticket-route-strip">
                  <div className="route-point">
                    <span className="label">ORIGIN</span>
                    <h4>{generatedTicket.from}</h4>
                  </div>
                  <div className="route-arrow">
                    <span>➔</span>
                    <small>Outstation Tour</small>
                  </div>
                  <div className="route-point">
                    <span className="label">DESTINATION</span>
                    <h4>{generatedTicket.to}</h4>
                  </div>
                </div>

                <div className="ticket-details-grid">
                  <div className="detail-cell">
                    <span className="cell-label">Customer Name</span>
                    <strong>{generatedTicket.name}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Phone</span>
                    <strong>+91 {generatedTicket.phone}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Vehicle Assigned</span>
                    <strong>{generatedTicket.vehicle}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Start Date</span>
                    <strong>{generatedTicket.date}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Support Helpline</span>
                    <strong>+91 9764564699</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Payment Mode</span>
                    <strong className="text-success">{generatedTicket.payment}</strong>
                  </div>
                </div>

                <div className="ticket-driver-section">
                  <div className="driver-info">
                    <span className="cell-label">Assigned Chauffeur</span>
                    <strong>Santosh Shinde (Heavy Badge Verified)</strong>
                    <small>📞 +91 9764564699 • Vehicle: MH-12-VT-9764</small>
                  </div>
                  <div className="qr-code-box">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                      <rect x="15" y="15" width="2" height="2"/>
                      <rect x="18" y="18" width="2" height="2"/>
                    </svg>
                    <span>Scan to Track</span>
                  </div>
                </div>

                <div className="ticket-instructions">
                  <p>
                    <strong>Note:</strong> Chauffeur will call you 2 hours prior to journey. For any updates, dial Vishal Travels 24/7 hotline at <strong>+91 9764564699</strong>.
                  </p>
                </div>
              </div>

              <div className="ticket-actions">
                <button className="btn btn-outline" onClick={() => window.print()}>
                  🖨️ Print / Save Ticket
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsTicketModalOpen(false);
                    setIsTrackerModalOpen(true);
                  }}
                >
                  🛰️ Track Live Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE GPS TELEMETRY SIMULATOR */}
      {isTrackerModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog tracker-dialog">
            <div className="modal-header">
              <div>
                <h3>🛰️ Live GPS Vehicle Telemetry • Vishal Travels</h3>
                <p>Real-time vehicle speed, satellite coordinates, and safe driver monitoring</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsTrackerModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body tracker-body">
              <div className="simulated-map-container">
                <div className="map-highway-line">
                  <div className="map-progress-highlight" style={{ width: `${trackerProgress}%` }}></div>
                  <div className="map-bus-marker" style={{ left: `${trackerProgress}%` }}>
                    <div className="marker-tooltip">
                      <span>MH-12-VT-9764 [Urbania]</span><br />
                      <strong>{trackerSpeed} km/h</strong>
                    </div>
                    <div className="marker-icon">🚌</div>
                  </div>
                  <div className="map-city-point origin-point">
                    <span className="city-dot"></span>
                    <strong>Pune (Shivaji Nagar)</strong>
                    <small>Departed 06:30 AM</small>
                  </div>
                  <div className="map-city-point dest-point">
                    <span className="city-dot"></span>
                    <strong>{destination}</strong>
                    <small>ETA 04:30 PM</small>
                  </div>
                </div>
                <div className="map-live-tag">
                  <span className="blinking-dot"></span> GPS SATELLITE LOCK: ACTIVE (12 SATELLITES)
                </div>
              </div>

              <div className="telemetry-grid">
                <div className="telemetry-card">
                  <span>Speed Governor</span>
                  <strong>{trackerSpeed} km/h</strong>
                  <small className="text-success">Within Safe Expressway Limit (&lt;80)</small>
                </div>
                <div className="telemetry-card">
                  <span>Journey Progress</span>
                  <strong>{trackerProgress}% Completed</strong>
                  <small>Highway traffic clear</small>
                </div>
                <div className="telemetry-card">
                  <span>Next Rest Stop</span>
                  <strong>Shirwal Food Plaza</strong>
                  <small>ETA: 20 mins</small>
                </div>
                <div className="telemetry-card">
                  <span>Emergency SOS Desk</span>
                  <button
                    className="btn-sos-call"
                    onClick={() => triggerToast("🚨 Emergency SOS dispatched to Vishal Travels Pune Control Room!", "warning")}
                  >
                    🚨 TRIGGER SOS
                  </button>
                </div>
              </div>

              <div className="driver-comm-box">
                <div className="driver-meta">
                  <div className="driver-img">👨‍✈️</div>
                  <div>
                    <strong>Santosh Shinde (Lead Chauffeur)</strong>
                    <p>Badge: MH-12-COMM-8912 • Police Verified • 14 yrs Experience</p>
                  </div>
                </div>
                <div className="driver-actions">
                  <a href="tel:+919764564699" className="btn btn-outline btn-sm">📞 Call Driver</a>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => triggerToast("Live tracking link copied to clipboard & sent to your WhatsApp!", "success")}
                  >
                    📲 Share Live Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            <span>{toast.type === "success" ? "✓" : toast.type === "warning" ? "⚠️" : "ℹ️"}</span>
            <span>{toast.text}</span>
          </div>
        </div>
      )}
    </>
  );
}
