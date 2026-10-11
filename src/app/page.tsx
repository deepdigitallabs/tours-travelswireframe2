"use client";

import React, { useState, useEffect } from "react";

// --- Mock Data & Types ---

interface Vehicle {
  id: string;
  name: string;
  category: "luxury-bus" | "tempo" | "urbania" | "car-fleet";
  categoryLabel: string;
  submodel: string;
  rating: number;
  reviewsCount: number;
  capacity: string;
  seatsNum: number;
  luggage: string;
  ratePerKm: number;
  minKmPerDay: number;
  driverAllowancePerDay: number;
  image: string;
  amenities: string[];
  description: string;
}

interface RoutePackage {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  startingPrice: number;
  recommendedVehicle: string;
  image: string;
  tag: string;
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

const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Volvo 9600 Multi-Axle Luxury Sleeper",
    category: "luxury-bus",
    categoryLabel: "Ultra Luxury Bus",
    submodel: "BS-VI Euro-6 • 15m Long • Air Suspension",
    rating: 4.95,
    reviewsCount: 312,
    capacity: "45-49 Berths / Reclining",
    seatsNum: 49,
    luggage: "60+ Large Suitcases",
    ratePerKm: 65,
    minKmPerDay: 350,
    driverAllowancePerDay: 1000,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: ["Individual AC Blowers", "Personal USB & 220V Charging", "4K Ambient LED Screen", "Air Suspension Glide", "Clean Blanket & Pillow Kit"],
    description: "The gold standard in Indian highway travel. Whisper-quiet Scandinavian suspension, plush ergonomic memory-foam sleeper berths, and dual emergency escape hatches."
  },
  {
    id: "v2",
    name: "Force Urbania VIP Luxury Lounge",
    category: "urbania",
    categoryLabel: "Force Urbania VIP",
    submodel: "Mercedes-Benz Tech Engine • Monocoque Body",
    rating: 4.98,
    reviewsCount: 184,
    capacity: "17 VIP Reclining Seats (1x1)",
    seatsNum: 17,
    luggage: "25 Large Suitcases",
    ratePerKm: 38,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80",
    amenities: ["Maharaja Leather Captain Seats", "Individual Reading Lamps", "Harmonized AC Vents", "Panoramic UV Glass Windows", "Smart Android Infotainment"],
    description: "Revolutionary European styling with extra headroom, ultra-soft independent front suspension, and zero cabin vibration. Best for VIP delegations and executive weddings."
  },
  {
    id: "v3",
    name: "BharatBenz Executive AC Sleeper Coach",
    category: "luxury-bus",
    categoryLabel: "Executive Sleeper Bus",
    submodel: "Daimler Chassis • 2+1 Upper/Lower Sleeper",
    rating: 4.91,
    reviewsCount: 220,
    capacity: "36 AC Sleeper Berths",
    seatsNum: 36,
    luggage: "45 Large Suitcases",
    ratePerKm: 52,
    minKmPerDay: 350,
    driverAllowancePerDay: 800,
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&auto=format&fit=crop&q=80",
    amenities: ["Full Curtain Privacy", "High-Speed WiFi Hotspot", "Central Mineral Water Cooler", "GPS Speed Governor (<80km/h)", "Dual Certified Highway Drivers"],
    description: "Engineered by Daimler Germany for unmatched stability on curves and high-speed expressway cruising. Spacious berths with personal luggage racks."
  },
  {
    id: "v4",
    name: "Executive Tempo Traveller (17 Seater AC)",
    category: "tempo",
    categoryLabel: "Tempo Traveller",
    submodel: "Force Motors Deluxe 2x1 Configuration",
    rating: 4.88,
    reviewsCount: 450,
    capacity: "17 Pushback Seats",
    seatsNum: 17,
    luggage: "18 Suitcases + Rooftop Carrier",
    ratePerKm: 28,
    minKmPerDay: 300,
    driverAllowancePerDay: 500,
    image: "https://images.unsplash.com/photo-1525962898597-a4ae6402826e?w=800&auto=format&fit=crop&q=80",
    amenities: ["Push-back Plush Velvet Seats", "JBL Surround Sound & Mic", "Rear Heavy Luggage Boot", "First Aid & Fire Extinguisher", "Ice Box & Chiller"],
    description: "India's favorite choice for family holidays and pilgrimage groups. Perfectly balanced turning radius for hill tracks and narrow heritage streets."
  },
  {
    id: "v5",
    name: "Luxury Tempo Traveller (26 Seater AC)",
    category: "tempo",
    categoryLabel: "Tempo Traveller",
    submodel: "Extra-Long Wheelbase • 2x2 Pushback",
    rating: 4.87,
    reviewsCount: 290,
    capacity: "26 Pushback Seats",
    seatsNum: 26,
    luggage: "28 Suitcases",
    ratePerKm: 34,
    minKmPerDay: 300,
    driverAllowancePerDay: 600,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    amenities: ["Individual Air Vents", "Subwoofer Stereo System", "Double Rear Air Suspension", "Emergency Siren & Hammer", "Seatbelts for All Passengers"],
    description: "Accommodates larger corporate staff outings and wedding parties without the need to charter a 40+ seat big bus."
  },
  {
    id: "v6",
    name: "Toyota Innova Crysta VIP (7 Seater)",
    category: "car-fleet",
    categoryLabel: "Premium SUV",
    submodel: "2.4 ZX Automatic • Captain Seats",
    rating: 4.96,
    reviewsCount: 620,
    capacity: "6-7 Passengers",
    seatsNum: 7,
    luggage: "4 Large Suitcases",
    ratePerKm: 19,
    minKmPerDay: 250,
    driverAllowancePerDay: 400,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
    amenities: ["Leather Reclining Captain Seats", "Automatic Climate Dual AC", "Dashcam Security", "Complimentary Water & Tissues", "Fastag Toll Pass"],
    description: "Unmatched reliability and executive prestige. Ideal for airport transfers, VIP wedding groom escorts, and swift intercity family travel."
  }
];

const POPULAR_ROUTES: RoutePackage[] = [
  {
    id: "r1",
    from: "Ahmedabad",
    to: "Jaipur",
    distanceKm: 670,
    duration: "11 hrs",
    startingPrice: 24999,
    recommendedVehicle: "Volvo 9600 Sleeper / Urbania VIP",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80",
    tag: "Heritage Highway Express"
  },
  {
    id: "r2",
    from: "Pune",
    to: "Mumbai",
    distanceKm: 150,
    duration: "3.5 hrs",
    startingPrice: 6500,
    recommendedVehicle: "Innova Crysta / Force Urbania",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80",
    tag: "Expressway Daily Shuttle"
  },
  {
    id: "r3",
    from: "Surat",
    to: "Goa",
    distanceKm: 780,
    duration: "14 hrs",
    startingPrice: 31000,
    recommendedVehicle: "BharatBenz AC Sleeper Coach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80",
    tag: "Coastal Holiday Special"
  },
  {
    id: "r4",
    from: "Delhi NCR",
    to: "Manali",
    distanceKm: 540,
    duration: "12 hrs",
    startingPrice: 22500,
    recommendedVehicle: "Tempo Traveller 17 Seater 4x4",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80",
    tag: "Himalayan Hill Tour"
  },
  {
    id: "r5",
    from: "Bengaluru",
    to: "Ooty",
    distanceKm: 275,
    duration: "6.5 hrs",
    startingPrice: 12800,
    recommendedVehicle: "Force Urbania 17 Seater",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80",
    tag: "Nilgiri Scenic Route"
  },
  {
    id: "r6",
    from: "Ahmedabad",
    to: "Somnath - Dwarka",
    distanceKm: 890,
    duration: "3 Days Circuit",
    startingPrice: 34500,
    recommendedVehicle: "Executive Coach 36 Seater",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80",
    tag: "Pilgrimage Yatra Circuit"
  }
];

const REVIEWS: Review[] = [
  {
    id: "rev1",
    name: "Dr. Alok Joshi",
    role: "Wedding Coordinator",
    city: "Ahmedabad",
    rating: 5,
    text: "We booked 2 Volvo 9600 sleepers and 3 Force Urbanias for my daughter's wedding in Udaipur. Every single coach arrived 45 minutes ahead of schedule, spotless, with polite drivers in crisp uniforms. Flawless execution!",
    date: "14 Sept 2026",
    tripType: "Wedding Barat Escort"
  },
  {
    id: "rev2",
    name: "Pooja Trivedi",
    role: "HR Operations Lead, TechMatrix",
    city: "Pune",
    rating: 5,
    text: "Our annual company leadership offsite to Mahabaleshwar was smooth and stress-free. The live GPS tracking link let our management team monitor all coaches simultaneously. Transparent GST invoice delivered within 2 hours.",
    date: "28 Aug 2026",
    tripType: "Corporate Transport"
  },
  {
    id: "rev3",
    name: "Harshadbhai Patel",
    role: "Senior Citizen Group Organizer",
    city: "Surat",
    rating: 5,
    text: "Took 24 family members to Somnath and Dwarka in the 26-seater Tempo Traveller. The driver Surajbhai drove very gently, avoided harsh braking, and helped the elderly members at every temple stop. Highly recommended!",
    date: "04 Oct 2026",
    tripType: "Family Pilgrimage Tour"
  }
];

// --- Main Page Component ---

export default function HomePage() {
  // Navigation & View State
  const [isAdminView, setIsAdminView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search Widget State
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "hourly">("one-way");
  const [fromCity, setFromCity] = useState("Ahmedabad");
  const [toCity, setToCity] = useState("Jaipur");
  const [journeyDate, setJourneyDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengerCapacity, setPassengerCapacity] = useState("all");
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState("all");
  const [tripPurpose, setTripPurpose] = useState("outstation");

  // Fleet Catalog Active Filter
  const [activeFleetFilter, setActiveFleetFilter] = useState("all");

  // Fare Estimator Calculator State
  const [calcVehicleRate, setCalcVehicleRate] = useState(38);
  const [calcDriverAllowanceRate, setCalcDriverAllowanceRate] = useState(500);
  const [calcKm, setCalcKm] = useState(450);
  const [calcDays, setCalcDays] = useState(2);
  const [calcVehicleName, setCalcVehicleName] = useState("Force Urbania 17 Seater VIP");

  // Modals State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<Vehicle | null>(null);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState<{
    pnr: string;
    customerName: string;
    phone: string;
    email: string;
    vehicleName: string;
    from: string;
    to: string;
    date: string;
    pickup: string;
    paymentMode: string;
  } | null>(null);

  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerBusProgress, setTrackerBusProgress] = useState(55);
  const [trackerSpeed, setTrackerSpeed] = useState(74);

  // WhatsApp Chat Modal State
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waMessages, setWaMessages] = useState<Array<{ text: string; sender: "bot" | "user"; time: string }>>([
    {
      text: "Namaste! 🙏 Welcome to RoyalVoyage Travels. How can we help you plan your journey today?",
      sender: "bot",
      time: "Just now",
    },
  ]);
  const [waInputText, setWaInputText] = useState("");

  // Toast System
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" | "warning" } | null>(null);

  // Initialize Default Dates
  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    const nextWeek = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const formattedNext = nextWeek.toISOString().split("T")[0];
    setJourneyDate(formattedToday);
    setReturnDate(formattedNext);
  }, []);

  // Live GPS Telemetry Simulation Interval
  useEffect(() => {
    if (!isTrackerModalOpen) return;
    const interval = setInterval(() => {
      setTrackerBusProgress((prev) => (prev >= 90 ? 20 : prev + 1));
      setTrackerSpeed(70 + Math.floor(Math.random() * 8));
    }, 2000);
    return () => clearInterval(interval);
  }, [isTrackerModalOpen]);

  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Swap Origin and Destination
  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    showToast(`Swapped origin & destination: ${toCity} ➔ ${temp}`, "info");
  };

  // Handle Search Widget Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      showToast("Please enter pickup and drop cities", "warning");
      return;
    }
    showToast(`Searching vehicles for ${fromCity} ➔ ${toCity} (${journeyDate})`, "success");
    const fleetSection = document.getElementById("our-fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-fill Route Package into Booking
  const handleSelectRoutePackage = (route: RoutePackage) => {
    setFromCity(route.from);
    setToCity(route.to);
    showToast(`Selected popular package: ${route.from} to ${route.to}`, "info");
    const matchingVehicle = VEHICLES.find((v) => v.name.includes("Urbania") || v.name.includes("Volvo")) || VEHICLES[0];
    setSelectedVehicleForBooking(matchingVehicle);
    setIsBookingModalOpen(true);
  };

  // Open Booking for a vehicle
  const handleOpenBooking = (vehicle: Vehicle) => {
    setSelectedVehicleForBooking(vehicle);
    setIsBookingModalOpen(true);
  };

  // Handle Booking Form Submit
  const handleConfirmReservation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("custName") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("custPhone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("custEmail") as HTMLInputElement).value;
    const pickup = (form.elements.namedItem("custPickupAddress") as HTMLInputElement).value;
    const paymentRadio = form.querySelector('input[name="paymentType"]:checked') as HTMLInputElement;
    const paymentMode = paymentRadio ? paymentRadio.value : "advance";

    const randomPnr = `RV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setConfirmedBookingData({
      pnr: randomPnr,
      customerName: name,
      phone: phone,
      email: email,
      vehicleName: selectedVehicleForBooking?.name || "Force Urbania VIP",
      from: fromCity,
      to: toCity,
      date: journeyDate,
      pickup: pickup,
      paymentMode: paymentMode === "advance" ? "20% Advance Token Paid (UPI)" : paymentMode === "full" ? "100% Full Payment Confirmed" : "Pay on Boarding",
    });

    setIsBookingModalOpen(false);
    setIsTicketModalOpen(true);
    showToast(`Reservation confirmed! PNR ${randomPnr} generated.`, "success");
  };

  // WhatsApp interactive responses
  const handleSendWaMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;
    const newMsg = { text: textToSend, sender: "user" as const, time: "Just now" };
    setWaMessages((prev) => [...prev, newMsg]);
    setWaInputText("");

    setTimeout(() => {
      let reply = "Thank you! Our dispatch desk is checking available coaches for your route. We will share official quotation within 5 minutes.";
      if (textToSend.toLowerCase().includes("wedding")) {
        reply = "💍 Wedding Fleet Special: We offer complimentary ribbon decor, uniformed chauffeurs, and luggage backup tempos. A wedding coordinator will call you shortly!";
      } else if (textToSend.toLowerCase().includes("tempo")) {
        reply = "🚐 Tempo Travellers (12, 17, 26 Seater) available with pushback Maharaja seats and music system. Tariff starts at ₹26/km.";
      }
      setWaMessages((prev) => [...prev, { text: reply, sender: "bot", time: "Just now" }]);
    }, 1000);
  };

  // Calculator Math
  const calculatedBaseFare = calcKm * calcVehicleRate;
  const calculatedDriverAllowance = calcDays * calcDriverAllowanceRate;
  const calculatedGst = Math.round((calculatedBaseFare + calculatedDriverAllowance) * 0.05);
  const calculatedTotalFare = calculatedBaseFare + calculatedDriverAllowance + calculatedGst;

  // Filtered Vehicles
  const filteredVehicles = activeFleetFilter === "all"
    ? VEHICLES
    : VEHICLES.filter((v) => v.category === activeFleetFilter);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <span className="badge-gold">★ ISO 9001:2015 & GTVOA Certified</span>
            <span className="top-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              24/7 Helpline: <strong>+91 98765 43210</strong>
            </span>
            <span className="top-info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              reservations@royalvoyagetravels.com
            </span>
          </div>

          <div className="top-bar-right">
            <div className="lang-selector">
              <span>🌐</span>
              <select
                aria-label="Select Language"
                onChange={(e) => showToast(`Language changed to ${e.target.options[e.target.selectedIndex].text}`, "info")}
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="gu">ગુજરાતી (GU)</option>
              </select>
            </div>
            <button
              className="top-btn-admin"
              onClick={() => {
                setIsAdminView(!isAdminView);
                showToast(isAdminView ? "Returned to Passenger view" : "Switched to Fleet Admin Portal View", "info");
              }}
              title="Toggle Fleet Management View"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              <span>{isAdminView ? "Exit Admin View" : "Admin Portal View"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header" id="mainHeader">
        <div className="container nav-container">
          <a href="#home" className="logo-brand">
            <div className="logo-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
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
              <span className="logo-main">RoyalVoyage</span>
              <span className="logo-sub">Travels & Fleet Rentals</span>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`} id="navLinks">
            <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#popular-routes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Top Routes</a>
            <a href="#our-fleet" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Our Fleet</a>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#fare-calculator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Fare Estimator</a>
            <a href="#why-choose-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Safety & Trust</a>
            <a href="#testimonials" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+919876543210" className="btn btn-outline-call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Now
            </a>
            <a href="#booking-widget" className="btn btn-primary glow-effect">
              Get Instant Quote
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

      {/* Conditional View: Admin vs Client */}
      {isAdminView ? (
        /* ADMIN PORTAL VIEW */
        <section className="admin-portal-view" id="adminView">
          <div className="container admin-container">
            <div className="admin-top-header">
              <div>
                <h2>Operations & Fleet Management Dashboard</h2>
                <p>SRS Module 3.5: Real-time vehicle oversight, RTO compliance monitoring, and booking dispatch.</p>
              </div>
              <div className="admin-top-actions">
                <button className="btn btn-secondary" onClick={() => setIsAdminView(false)}>
                  ← Return to Passenger View
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => showToast("Add vehicle modal opened (Form for RTO, Fitness Cert, GPS ID)", "info")}
                >
                  + Add New Vehicle
                </button>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="admin-stats-grid">
              <div className="admin-stat-box">
                <div className="stat-top">
                  <span>Total Fleet Size</span>
                  <span className="icon">🚌</span>
                </div>
                <strong className="stat-val">48 Vehicles</strong>
                <span className="stat-sub text-success">● 42 On Route / Available</span>
              </div>
              <div className="admin-stat-box">
                <div className="stat-top">
                  <span>Today's Active Trips</span>
                  <span className="icon">📍</span>
                </div>
                <strong className="stat-val">19 In Progress</strong>
                <span className="stat-sub">100% GPS Signal Locked</span>
              </div>
              <div className="admin-stat-box">
                <div className="stat-top">
                  <span>RTO Compliance Alert</span>
                  <span className="icon">⚠️</span>
                </div>
                <strong className="stat-val text-warning">1 Permit Renewal Due</strong>
                <span className="stat-sub">GJ-01-BX-9080 Fitness in 12 days</span>
              </div>
              <div className="admin-stat-box">
                <div className="stat-top">
                  <span>Current Month Revenue</span>
                  <span className="icon">📈</span>
                </div>
                <strong className="stat-val">₹ 34.8 Lakhs</strong>
                <span className="stat-sub text-success">↑ 18.5% YoY Growth</span>
              </div>
            </div>

            {/* Admin Table: Fleet Compliance */}
            <div className="pricing-mgmt-box" style={{ marginBottom: "20px" }}>
              <h3>Live Fleet Inventory & Compliance Status</h3>
              <p>Monitors Regional Transport Office (RTO) fitness certificates, insurance renewals, and driver assignments.</p>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Registration No.</th>
                    <th>Model / Category</th>
                    <th>Capacity</th>
                    <th>RTO Fitness Expiry</th>
                    <th>GPS Telemetry</th>
                    <th>Assigned Chauffeur</th>
                    <th>Trip Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>GJ-01-BX-9080</strong></td>
                    <td>Volvo 9600 Sleeper</td>
                    <td>49 Berths</td>
                    <td><span className="badge-gold">28 Oct 2026</span></td>
                    <td><span className="text-success">● Online (74 km/h)</span></td>
                    <td>Vikram Singh (Verified)</td>
                    <td><span className="badge-success">On Journey</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                          setIsTrackerModalOpen(true);
                          setIsAdminView(false);
                        }}
                      >
                        Track GPS
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>GJ-01-ET-4490</strong></td>
                    <td>Force Urbania VIP</td>
                    <td>17 Seats</td>
                    <td><span className="badge-success">15 Jun 2027</span></td>
                    <td><span className="text-success">● Online (Standby)</span></td>
                    <td>Surajbhai Solanki</td>
                    <td><span className="badge-success">Assigned</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => showToast("Inspection checklist verified: AC, Tyres, First Aid OK", "info")}
                      >
                        Checklist
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>GJ-05-CX-1249</strong></td>
                    <td>BharatBenz Sleeper</td>
                    <td>36 Berths</td>
                    <td><span className="badge-success">12 Jan 2027</span></td>
                    <td><span className="text-success">● Online (Depot)</span></td>
                    <td>Ramesh Rathod</td>
                    <td><span className="badge-gold">Available</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => showToast("Maintenance audit: Scheduled for next Tuesday", "info")}
                      >
                        Audit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>GJ-27-K-8812</strong></td>
                    <td>Innova Crysta 2.4 ZX</td>
                    <td>7 Seats</td>
                    <td><span className="badge-success">08 Dec 2027</span></td>
                    <td><span className="text-success">● Online (Standby)</span></td>
                    <td>Mukeshbhai Vaghela</td>
                    <td><span className="badge-gold">Available</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => showToast("Driver documents verified: DL, Aadhar, Police verification", "info")}
                      >
                        Driver KYC
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dynamic Seasonal Rate Card Adjustment (SRS FR 5.4) */}
            <div className="pricing-mgmt-box" style={{ marginTop: "40px" }}>
              <h3>Dynamic Season & Demand Pricing Multipliers (SRS FR 5.4)</h3>
              <p>Admins can adjust seasonal pricing rules for wedding surges, festivals, and long weekends.</p>
              <div className="pricing-controls-grid">
                <div className="pricing-card">
                  <h4>Regular Off-Peak Rate</h4>
                  <p>Standard rate card without multipliers. 1.0x base tariff.</p>
                  <span className="badge-success">Active Default</span>
                </div>
                <div className="pricing-card">
                  <h4>Wedding Season Surge</h4>
                  <p>Applies a 1.25x multiplier across all luxury buses and tempo travellers.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => showToast("Wedding surge pricing multiplier (1.25x) toggled!", "success")}
                  >
                    Activate Rule
                  </button>
                </div>
                <div className="pricing-card">
                  <h4>Diwali & Festive Rush</h4>
                  <p>Applies a 1.35x multiplier during the 10-day holiday window.</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => showToast("Diwali rush scheduled for October 24th - Nov 4th", "info")}
                  >
                    Schedule Rule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* PASSENGER CLIENT VIEW */
        <main id="clientView">
          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="hero-overlay"></div>
            <div className="container hero-content">
              <div className="hero-badge-tag">
                <span className="pulse-dot"></span>
                <span>India's Most Trusted Bus & Fleet Rental Service</span>
              </div>
              <h1 className="hero-title">
                Premium Bus & Travel Rental Services for Every Journey
              </h1>
              <p className="hero-subtitle">
                Safe, Affordable, and Reliable Travel for Weddings, Corporate Outings, Pilgrimages & Family Trips. Volvo 9600 Sleeper Coaches, Force Urbanias & Luxury Travellers.
              </p>

              <div className="hero-features-strip">
                <div className="hero-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Police Verified Drivers</span>
                </div>
                <div className="hero-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Real-time GPS Tracking</span>
                </div>
                <div className="hero-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Zero Hidden Charges</span>
                </div>
                <div className="hero-feature-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>4.9/5 Rated on Google</span>
                </div>
              </div>

              {/* Quick Booking Widget (SRS Module 3.2 & Wireframe) */}
              <div className="booking-widget-card" id="booking-widget">
                <div className="widget-header">
                  <div className="trip-tabs" role="tablist">
                    <button
                      className={`trip-tab ${tripType === "one-way" ? "active" : ""}`}
                      onClick={() => setTripType("one-way")}
                    >
                      <span className="radio-indicator"></span> One Way
                    </button>
                    <button
                      className={`trip-tab ${tripType === "round-trip" ? "active" : ""}`}
                      onClick={() => setTripType("round-trip")}
                    >
                      <span className="radio-indicator"></span> Round Trip
                    </button>
                    <button
                      className={`trip-tab ${tripType === "hourly" ? "active" : ""}`}
                      onClick={() => setTripType("hourly")}
                    >
                      <span className="radio-indicator"></span> Multi-Day / Custom Hire
                    </button>
                  </div>
                  <div className="widget-quick-help">
                    <span>⚡ Instant Booking Confirmation</span>
                  </div>
                </div>

                <form className="booking-form" onSubmit={handleSearchSubmit}>
                  <div className="form-grid-row">
                    {/* Origin City */}
                    <div className="form-group">
                      <label htmlFor="fromCity"><span className="input-icon">📍</span> Origin / Pickup City</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="fromCity"
                          list="popularCities"
                          placeholder="e.g. Ahmedabad, Gujarat"
                          value={fromCity}
                          onChange={(e) => setFromCity(e.target.value)}
                          required
                        />
                        <datalist id="popularCities">
                          <option value="Ahmedabad" />
                          <option value="Mumbai" />
                          <option value="Pune" />
                          <option value="Surat" />
                          <option value="Jaipur" />
                          <option value="Delhi NCR" />
                          <option value="Vadodara" />
                          <option value="Bengaluru" />
                          <option value="Goa" />
                          <option value="Udaipur" />
                          <option value="Indore" />
                        </datalist>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <button
                      type="button"
                      className="btn-swap-cities"
                      onClick={handleSwapCities}
                      title="Swap Origin and Destination"
                      aria-label="Swap Cities"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
                      </svg>
                    </button>

                    {/* Destination City */}
                    <div className="form-group">
                      <label htmlFor="toCity"><span className="input-icon">🏁</span> Destination City</label>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          id="toCity"
                          list="popularCities"
                          placeholder="e.g. Jaipur, Rajasthan"
                          value={toCity}
                          onChange={(e) => setToCity(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Journey Date */}
                    <div className="form-group">
                      <label htmlFor="journeyDate"><span className="input-icon">📅</span> Journey Date</label>
                      <div className="input-wrapper">
                        <input
                          type="date"
                          id="journeyDate"
                          value={journeyDate}
                          onChange={(e) => setJourneyDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Return Date (Conditional for Round Trip) */}
                    <div className="form-group">
                      <label htmlFor="returnDate">
                        <span className="input-icon">🔄</span> Return Date {tripType === "one-way" ? "(Optional)" : ""}
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="date"
                          id="returnDate"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          disabled={tripType === "one-way"}
                          style={{ opacity: tripType === "one-way" ? 0.6 : 1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-grid-row secondary-row">
                    {/* Passenger Capacity */}
                    <div className="form-group">
                      <label htmlFor="passengerCapacity"><span className="input-icon">👥</span> Passenger Capacity</label>
                      <div className="input-wrapper">
                        <select
                          id="passengerCapacity"
                          value={passengerCapacity}
                          onChange={(e) => setPassengerCapacity(e.target.value)}
                        >
                          <option value="all">Any Capacity (4 to 53 Seats)</option>
                          <option value="4-7">4 - 7 Passengers (Innova / SUV)</option>
                          <option value="12-17">12 - 17 Passengers (Tempo Traveller)</option>
                          <option value="20-26">20 - 26 Passengers (Luxury Mini Bus)</option>
                          <option value="30-36">30 - 36 Passengers (Executive Coach)</option>
                          <option value="45-53">45 - 53 Passengers (Volvo Multi-Axle)</option>
                        </select>
                      </div>
                    </div>

                    {/* Vehicle Category */}
                    <div className="form-group">
                      <label htmlFor="vehicleCategory"><span className="input-icon">🚌</span> Vehicle Type</label>
                      <div className="input-wrapper">
                        <select
                          id="vehicleCategory"
                          value={vehicleCategoryFilter}
                          onChange={(e) => {
                            setVehicleCategoryFilter(e.target.value);
                            setActiveFleetFilter(e.target.value);
                          }}
                        >
                          <option value="all">All Vehicle Types</option>
                          <option value="luxury-bus">Luxury AC Sleeper / Seater Bus</option>
                          <option value="tempo">Tempo Traveller (12/17/26 Seater)</option>
                          <option value="urbania">Force Urbania VIP Lounge</option>
                          <option value="car-fleet">Premium Wedding Car / SUV</option>
                        </select>
                      </div>
                    </div>

                    {/* Trip Purpose */}
                    <div className="form-group">
                      <label htmlFor="tripPurpose"><span className="input-icon">🎯</span> Trip Purpose</label>
                      <div className="input-wrapper">
                        <select
                          id="tripPurpose"
                          value={tripPurpose}
                          onChange={(e) => setTripPurpose(e.target.value)}
                        >
                          <option value="outstation">Family Outstation Trip</option>
                          <option value="wedding">Wedding / Barat Fleet</option>
                          <option value="corporate">Corporate Offsite / Staff</option>
                          <option value="pilgrimage">Pilgrimage / Religious Tour</option>
                          <option value="school">School / College Excursion</option>
                        </select>
                      </div>
                    </div>

                    {/* Search Submit */}
                    <div className="form-group form-action">
                      <button type="submit" className="btn btn-search-vehicles" id="searchSubmitBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        Search Available Vehicles
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Top Destinations / Popular Routes */}
          <section className="section popular-routes-section" id="popular-routes">
            <div className="container">
              <div className="section-header">
                <span className="section-eyebrow">POPULAR OUTSTATION ROUTES</span>
                <h2 className="section-title">Popular Routes & Fixed Packages</h2>
                <p className="section-desc">
                  Curated routes with fixed transparent tariffs, toll estimations, and verified rest-stop recommendations.
                </p>
              </div>

              <div className="routes-grid" id="routesContainer">
                {POPULAR_ROUTES.map((route) => (
                  <div key={route.id} className="route-card">
                    <div className="route-image-wrap">
                      <img src={route.image} alt={`${route.from} to ${route.to}`} className="route-img" />
                      <span className="route-badge">{route.tag}</span>
                    </div>
                    <div className="route-body">
                      <div className="route-destinations">
                        <span className="route-city">{route.from}</span>
                        <span className="route-arrow-icon">➔</span>
                        <span className="route-city">{route.to}</span>
                      </div>
                      <div className="route-meta-strip">
                        <span>🛣️ {route.distanceKm} KM</span>
                        <span>⏱️ {route.duration}</span>
                        <span>🚌 {route.recommendedVehicle.split("/")[0]}</span>
                      </div>
                      <div className="route-pricing-row">
                        <div className="route-price-box">
                          <span className="price-sub">All-inclusive from</span>
                          <strong className="price-main">₹{route.startingPrice.toLocaleString()}</strong>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSelectRoutePackage(route)}
                        >
                          Book Route
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Fleet Showcase (SRS Module 3.2 & Wireframe) */}
          <section className="section fleet-section" id="our-fleet">
            <div className="container">
              <div className="section-header">
                <span className="section-eyebrow">PREMIUM VEHICLE INVENTORY</span>
                <h2 className="section-title">Explore Our Fleet of Vehicles</h2>
                <p className="section-desc">
                  From multi-axle Volvo 9600 sleeper coaches to Force Urbanias and executive Tempo Travellers. All RTO registered, speed-governed, and GPS tracked.
                </p>
              </div>

              {/* Fleet Filter Bar */}
              <div className="fleet-filter-bar">
                <button
                  className={`fleet-filter-btn ${activeFleetFilter === "all" ? "active" : ""}`}
                  onClick={() => setActiveFleetFilter("all")}
                >
                  All Vehicles ({VEHICLES.length})
                </button>
                <button
                  className={`fleet-filter-btn ${activeFleetFilter === "luxury-bus" ? "active" : ""}`}
                  onClick={() => setActiveFleetFilter("luxury-bus")}
                >
                  Luxury Buses (36-49 Berths)
                </button>
                <button
                  className={`fleet-filter-btn ${activeFleetFilter === "tempo" ? "active" : ""}`}
                  onClick={() => setActiveFleetFilter("tempo")}
                >
                  Tempo Travellers (17-26 Seats)
                </button>
                <button
                  className={`fleet-filter-btn ${activeFleetFilter === "urbania" ? "active" : ""}`}
                  onClick={() => setActiveFleetFilter("urbania")}
                >
                  Force Urbania VIP
                </button>
                <button
                  className={`fleet-filter-btn ${activeFleetFilter === "car-fleet" ? "active" : ""}`}
                  onClick={() => setActiveFleetFilter("car-fleet")}
                >
                  Premium SUVs & Cars
                </button>
              </div>

              {/* Vehicle Cards Grid */}
              <div className="fleet-grid" id="fleetGridContainer">
                {filteredVehicles.map((vehicle) => (
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                          </svg>
                          <span>{vehicle.capacity}</span>
                        </div>
                        <div className="spec-cell">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                          </svg>
                          <span>{vehicle.luggage}</span>
                        </div>
                        <div className="spec-cell">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>Min: {vehicle.minKmPerDay} km/day</span>
                        </div>
                        <div className="spec-cell">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                          <span>Driver: ₹{vehicle.driverAllowancePerDay}/day</span>
                        </div>
                      </div>

                      <div className="vehicle-amenities-pills">
                        {vehicle.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="amenity-pill">✓ {amenity}</span>
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
                              setSelectedVehicleForBooking(vehicle);
                              setIsBookingModalOpen(true);
                            }}
                          >
                            Details
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleOpenBooking(vehicle)}
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

          {/* Our Services (Wireframe Section) */}
          <section className="section services-section" id="services">
            <div className="container">
              <div className="section-header">
                <span className="section-eyebrow">TAILORED TRAVEL SOLUTIONS</span>
                <h2 className="section-title">Travel Solutions for Every Occasion</h2>
                <p className="section-desc">
                  Turnkey passenger logistics backed by 21+ years of experience, dedicated dispatch managers, and round-the-clock roadside assistance.
                </p>
              </div>

              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="6" width="18" height="12" rx="3"/>
                      <circle cx="7" cy="18" r="2"/>
                      <circle cx="17" cy="18" r="2"/>
                      <path d="M3 11h18"/>
                    </svg>
                  </div>
                  <h3>1. Luxury Bus Rental</h3>
                  <p>Multi-axle Volvo, Scania, and BharatBenz coaches for long-haul intercity journeys, pilgrimage tours, and school & college excursions.</p>
                  <ul className="service-check-list">
                    <li>Push-back & sleeper berths</li>
                    <li>Dual AC & individual blower vents</li>
                    <li>Large luggage boot storage</li>
                  </ul>
                </div>

                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h2"/>
                      <circle cx="7" cy="17" r="2"/>
                      <circle cx="17" cy="17" r="2"/>
                    </svg>
                  </div>
                  <h3>2. Premium Tempo Traveller</h3>
                  <p>12, 17, 20 & 26-seater executive travellers fitted with Maharaja seats, personal charging sockets, LED screens, and smooth air suspension.</p>
                  <ul className="service-check-list">
                    <li>Ideal for small family getaways</li>
                    <li>Comfortable legroom & reclining</li>
                    <li>Equipped with music system & mic</li>
                  </ul>
                </div>

                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3>3. Wedding Car & Fleet Escort</h3>
                  <p>End-to-end wedding guest logistics, from decorated luxury groom cars to guest shuttle buses and luggage escort tempos.</p>
                  <ul className="service-check-list">
                    <li>Uniformed, courteous chauffeurs</li>
                    <li>On-time coordination manager</li>
                    <li>Ribbon & floral decoration options</li>
                  </ul>
                </div>

                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                  </div>
                  <h3>4. Corporate Staff Transportation</h3>
                  <p>Custom daily employee shuttle contracts, executive offsite transfers, and conference transit management with digital attendance & tracking.</p>
                  <ul className="service-check-list">
                    <li>GST invoice & monthly billing</li>
                    <li>Guaranteed backup vehicles</li>
                    <li>Live passenger manifest reporting</li>
                  </ul>
                </div>

                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </div>
                  <h3>5. Family Outstation & Pilgrimages</h3>
                  <p>Comfortable multi-day tours across religious circuits: Char Dham, Somnath-Dwarka, Rajasthan Forts, Shirdi-Nashik, and Goa coastal routes.</p>
                  <ul className="service-check-list">
                    <li>Route-experienced highway drivers</li>
                    <li>Custom halt & food stop flexibility</li>
                    <li>Assistance with toll and tax permits</li>
                  </ul>
                </div>

                <div className="service-card">
                  <div className="service-icon-box">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/>
                    </svg>
                  </div>
                  <h3>6. Contractual & Event Mobility</h3>
                  <p>Dedicated long-term transport solutions for sporting events, political rallies, film shoots, college festivals, and nationwide industrial excursions.</p>
                  <ul className="service-check-list">
                    <li>All-India National Tourist Permits</li>
                    <li>Comprehensive passenger transit insurance</li>
                    <li>24/7 dedicated dispatch manager</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Fare Estimator Calculator */}
          <section className="section estimator-section" id="fare-calculator">
            <div className="container">
              <div className="estimator-card">
                <div className="estimator-left">
                  <span className="section-eyebrow">TRANSPARENT TARIFF ESTIMATOR</span>
                  <h2 className="estimator-title">Instant Outstation Fare Calculator</h2>
                  <p className="estimator-desc">
                    Estimate your transparent budget in seconds. Zero surprise toll additions or hidden surcharges.
                  </p>

                  <div className="calc-controls">
                    <div className="calc-control-group">
                      <label htmlFor="calcVehicleType">Select Vehicle Model</label>
                      <select
                        id="calcVehicleType"
                        className="calc-select"
                        onChange={(e) => {
                          const option = e.target.options[e.target.selectedIndex];
                          setCalcVehicleRate(Number(e.target.value));
                          setCalcDriverAllowanceRate(Number(option.getAttribute("data-da") || 500));
                          setCalcVehicleName(option.getAttribute("data-name") || "");
                        }}
                      >
                        <option value="38" data-da="500" data-name="Force Urbania 17 Seater VIP">Force Urbania 17 Seater VIP (₹38/KM)</option>
                        <option value="28" data-da="500" data-name="Tempo Traveller 17 Seater AC">Tempo Traveller 17 Seater AC (₹28/KM)</option>
                        <option value="34" data-da="600" data-name="Tempo Traveller 26 Seater AC">Tempo Traveller 26 Seater AC (₹34/KM)</option>
                        <option value="52" data-da="800" data-name="BharatBenz 36 Seater Sleeper">BharatBenz 36 Seater Sleeper (₹52/KM)</option>
                        <option value="65" data-da="1000" data-name="Volvo 9600 Multi-Axle 49 Seater">Volvo 9600 Multi-Axle 49 Seater (₹65/KM)</option>
                        <option value="19" data-da="400" data-name="Toyota Innova Crysta 7 Seater">Toyota Innova Crysta 7 Seater (₹19/KM)</option>
                      </select>
                    </div>

                    <div className="calc-slider-group">
                      <div className="slider-label-row">
                        <span>Estimated Total Distance</span>
                        <strong id="kmDisplay">{calcKm} KM</strong>
                      </div>
                      <input
                        type="range"
                        id="kmSlider"
                        min="150"
                        max="2500"
                        step="25"
                        value={calcKm}
                        onChange={(e) => setCalcKm(Number(e.target.value))}
                        className="custom-slider"
                      />
                      <div className="slider-marks">
                        <span>150 KM</span>
                        <span>1200 KM</span>
                        <span>2500 KM</span>
                      </div>
                    </div>

                    <div className="calc-slider-group">
                      <div className="slider-label-row">
                        <span>Duration of Trip</span>
                        <strong id="daysDisplay">{calcDays} Days</strong>
                      </div>
                      <input
                        type="range"
                        id="daysSlider"
                        min="1"
                        max="14"
                        step="1"
                        value={calcDays}
                        onChange={(e) => setCalcDays(Number(e.target.value))}
                        className="custom-slider"
                      />
                      <div className="slider-marks">
                        <span>1 Day</span>
                        <span>7 Days</span>
                        <span>14 Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="estimator-right">
                  <div className="fare-breakdown-box">
                    <div className="breakdown-header">
                      <h3>Estimated Quotation</h3>
                      <span className="live-pill">⚡ Real-time Estimate</span>
                    </div>
                    <div className="vehicle-selected-name">
                      {calcVehicleName}
                    </div>
                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <span>Base Distance Fare ({calcKm} KM @ ₹{calcVehicleRate}/km)</span>
                        <strong>₹{calculatedBaseFare.toLocaleString()}</strong>
                      </div>
                      <div className="breakdown-item">
                        <span>Driver Allowance ({calcDays} Days @ ₹{calcDriverAllowanceRate}/day)</span>
                        <strong>₹{calculatedDriverAllowance.toLocaleString()}</strong>
                      </div>
                      <div className="breakdown-item">
                        <span>State Border Tax & Cleanliness Kit</span>
                        <span className="tag-free">Included</span>
                      </div>
                      <div className="breakdown-item">
                        <span>GST (5% Transport Slab)</span>
                        <strong>₹{calculatedGst.toLocaleString()}</strong>
                      </div>
                      <div className="breakdown-divider"></div>
                      <div className="breakdown-item total-item">
                        <span>Total Estimated Cost</span>
                        <strong className="total-price">₹{calculatedTotalFare.toLocaleString()}</strong>
                      </div>
                    </div>
                    <p className="fare-note">* Tolls and parking receipts payable as actuals or bundled on request.</p>
                    <div className="breakdown-actions">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => {
                          const target = VEHICLES.find((v) => v.name.includes(calcVehicleName.split(" ")[0])) || VEHICLES[0];
                          setSelectedVehicleForBooking(target);
                          setIsBookingModalOpen(true);
                        }}
                      >
                        Lock Price & Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us / Safety & Trust */}
          <section className="section trust-section" id="why-choose-us">
            <div className="container">
              <div className="section-header">
                <span className="section-eyebrow">UNCOMPROMISING PASSENGER SAFETY</span>
                <h2 className="section-title">Why Thousands of Travelers Trust RoyalVoyage</h2>
                <p className="section-desc">
                  Synthesized from the rigorous standards of Mahaveer, Vishal, and Shivam bus operators.
                </p>
              </div>

              <div className="trust-grid">
                <div className="trust-item">
                  <div className="trust-icon-wrap">🛡️</div>
                  <h4>Police-Verified Drivers</h4>
                  <p>100% background checked drivers with minimum 7+ years of accident-free highway experience and commercial heavy badges.</p>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">📍</div>
                  <h4>Real-Time GPS & Telemetry</h4>
                  <p>Every coach transmits live satellite telemetry to our central 24/7 journey control desk with remote speed limit alerts.</p>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">💰</div>
                  <h4>Transparent Pricing</h4>
                  <p>Clear rate cards with zero hidden surprises. You get detailed itemized quotations before paying even one rupee.</p>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">🎧</div>
                  <h4>24/7 Journey Control Room</h4>
                  <p>A human support team monitors every single trip in real time to assist with breakdowns, rest-stops, and roadside queries.</p>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">♀️</div>
                  <h4>Special Women's Safety</h4>
                  <p>In-cabin SOS panic buttons, GPS tracking link shareable with family members, and verified highway safety-stop points.</p>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">✅</div>
                  <h4>RTO Registered & Insured</h4>
                  <p>All buses maintain active RTO fitness certificates, all-India commercial tourist permits, and comprehensive passenger insurance.</p>
                </div>
              </div>

              {/* Stats & Certifications Bar (Wireframe Section) */}
              <div className="stats-counter-bar">
                <div className="stat-card">
                  <span className="stat-number">48+</span>
                  <span className="stat-label">Luxury Vehicles</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">25,000+</span>
                  <span className="stat-label">Completed Trips</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">21+</span>
                  <span className="stat-label">Years of Trust</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">99.8%</span>
                  <span className="stat-label">On-Time Departure</span>
                </div>
              </div>

              <div className="certifications-row">
                <span className="cert-title">Official Accreditations:</span>
                <div className="cert-badge">Member: Gujarat Tourist Vehicle Operators Association (GTVOA)</div>
                <div className="cert-badge">All Gujarat Pravasi Vahan Sanchalak Mandal (AGPVSM)</div>
                <div className="cert-badge">ISO 9001:2015 Transport Quality Standard</div>
                <div className="cert-badge">Ministry of Road Transport & Highways Compliant</div>
              </div>
            </div>
          </section>

          {/* Testimonials / Customer Reviews */}
          <section className="section testimonials-section" id="testimonials">
            <div className="container">
              <div className="section-header">
                <span className="section-eyebrow">WHAT OUR CLIENTS SAY</span>
                <h2 className="section-title">Verified Reviews from Happy Travelers</h2>
                <p className="section-desc">
                  Over 5,200+ five-star reviews from wedding parties, corporate travel admins, and pilgrim groups.
                </p>
              </div>

              <div className="testimonials-carousel" id="reviewsContainer">
                {REVIEWS.map((rev) => (
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

          {/* Digital Features & Live GPS Demo Callout */}
          <section className="section digital-app-section">
            <div className="container">
              <div className="digital-box">
                <div className="digital-text">
                  <span className="badge-gold">⚡ SMART PASSENGER TELEMETRY</span>
                  <h2>Experience Real-Time Journey Tracking & Digital E-Tickets</h2>
                  <p>
                    Every booking comes with a live GPS tracking link you can share with loved ones, automated WhatsApp driver alerts, and quick digital cancellation.
                  </p>
                  <div className="feature-bullets">
                    <div className="fb-item">✓ Live bus speedometer and satellite map</div>
                    <div className="fb-item">✓ Automated driver contact card on WhatsApp</div>
                    <div className="fb-item">✓ Printable E-Ticket with verifiable QR code</div>
                    <div className="fb-item">✓ 24/7 in-ride emergency SOS alert</div>
                  </div>
                  <div className="cta-actions">
                    <button
                      className="btn btn-secondary-light"
                      onClick={() => setIsTrackerModalOpen(true)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="10 8 16 12 10 16 10 8"/>
                      </svg>
                      Launch Live GPS Simulator
                    </button>
                    <a href="#booking-widget" className="btn btn-primary">Book Your Trip Now</a>
                  </div>
                </div>

                <div className="digital-preview">
                  <div className="phone-mockup">
                    <div className="phone-header">
                      <span>RoyalVoyage Live Tracking</span>
                      <span className="live-dot-pulse">● LIVE</span>
                    </div>
                    <div className="mockup-route">
                      <strong>Ahmedabad → Jaipur</strong>
                      <small>Volvo 9600 Multi-Axle • GJ-01-BX-9080</small>
                    </div>
                    <div className="mockup-progress-bar">
                      <div className="mockup-fill" style={{ width: `${trackerBusProgress}%` }}></div>
                    </div>
                    <div className="mockup-stats">
                      <div><span>Current Speed</span><strong>{trackerSpeed} km/h</strong></div>
                      <div><span>Next Halt</span><strong>Ratanpur Plaza</strong></div>
                      <div><span>ETA</span><strong>05:45 PM</strong></div>
                    </div>
                    <div className="mockup-driver">
                      <div className="driver-avatar">👨‍✈️</div>
                      <div>
                        <strong>Surajbhai Solanki (Verified)</strong>
                        <p>★ 4.96 rating • 12 yrs exp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Main Footer (Wireframe Structure) */}
      <footer className="main-footer">
        <div className="container footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="logo-brand footer-logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="3" y="6" width="18" height="12" rx="3"/>
                  <circle cx="7" cy="18" r="2"/>
                  <circle cx="17" cy="18" r="2"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-main text-white">RoyalVoyage</span>
                <span className="logo-sub text-gold">Travels & Fleet Rentals</span>
              </div>
            </div>
            <p className="footer-about">
              Synthesized from premier fleet operators (Mahaveer, Vishal & Shivam), RoyalVoyage provides high-standard bus rentals, luxury tempo travellers, and corporate transportation with certified safety.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">FB</a>
              <a href="#" className="social-icon" aria-label="Instagram">IG</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">IN</a>
              <a href="#" className="social-icon" aria-label="YouTube">YT</a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#our-fleet">Our Fleet Inventory</a></li>
              <li><a href="#popular-routes">Top Routes & Tariffs</a></li>
              <li><a href="#services">Corporate & Wedding Services</a></li>
              <li><a href="#fare-calculator">Fare Estimator</a></li>
              <li><a href="#why-choose-us">Safety Standards</a></li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Headquarters & Support</h4>
            <div className="footer-contact-item">
              <span className="icon">📍</span>
              <div>
                <strong>Corporate Terminal:</strong><br />
                Plot 42, Transport Nagar, Near S.G. Highway, Ahmedabad - 380054
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="icon">📞</span>
              <div>
                <strong>24/7 Booking Helpline:</strong><br />
                +91 98765 43210 / +91 98765 43211
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="icon">💬</span>
              <div>
                <strong>WhatsApp Support:</strong><br />
                +91 98765 43210
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="icon">✉️</span>
              <div>
                <strong>Email Bookings:</strong><br />
                reservations@royalvoyagetravels.com
              </div>
            </div>
          </div>

          {/* Col 4: Quick Query Form */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Quote Query</h4>
            <p className="query-note">Need a quick custom proposal? Submit your details:</p>
            <form
              className="footer-query-form"
              onSubmit={(e) => {
                e.preventDefault();
                showToast("Quick quote enquiry submitted! An agent will call within 10 mins.", "success");
                e.currentTarget.reset();
              }}
            >
              <input type="text" placeholder="Your Full Name" required />
              <input type="tel" placeholder="Mobile / WhatsApp Number" required />
              <textarea rows={2} placeholder="Route, Date, & Passengers..." required></textarea>
              <button type="submit" className="btn btn-primary btn-block">Send Enquiry</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>© 2026 RoyalVoyage Travels & Rental Platform. All Rights Reserved. Compliant with RTO & Motor Vehicles Act.</p>
            <div className="footer-legal-links">
              <a href="#">Terms & Conditions</a>
              <span>•</span>
              <a href="#">Cancellation & Refund Policy</a>
              <span>•</span>
              <a href="#">Privacy Policy</a>
              <span>•</span>
              <a href="#">Driver Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-fab-container">
        {/* Call Button (Left) */}
        <a href="tel:+919876543210" className="fab-btn fab-call" aria-label="Call Now" title="Call Reservations Helpline">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="fab-label">Call Now</span>
        </a>

        {/* WhatsApp Button (Right) */}
        <button
          className="fab-btn fab-whatsapp"
          onClick={() => setIsWaModalOpen(!isWaModalOpen)}
          aria-label="Chat on WhatsApp"
          title="Chat with Booking Agent"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.192 8.192 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
          </svg>
          <span className="fab-label">WhatsApp</span>
        </button>
      </div>

      {/* WhatsApp Interactive Modal */}
      {isWaModalOpen && (
        <div className="whatsapp-chat-modal">
          <div className="wa-header">
            <div className="wa-avatar">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Agent"
                className="wa-avatar-img"
              />
              <span className="wa-online-dot"></span>
            </div>
            <div className="wa-header-info">
              <strong>RoyalVoyage Booking Desk</strong>
              <p>Typically replies in under 2 minutes</p>
            </div>
            <button className="wa-close-btn" onClick={() => setIsWaModalOpen(false)} aria-label="Close Chat">✕</button>
          </div>
          <div className="wa-body">
            {waMessages.map((msg, idx) => (
              <div key={idx} className={`wa-message ${msg.sender === "bot" ? "received" : "sent"}`}>
                <p>{msg.text}</p>
                <span className="wa-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="wa-quick-replies">
            <button className="wa-chip" onClick={() => handleSendWaMessage("Get Volvo Bus quote for Wedding")}>💍 Wedding Bus</button>
            <button className="wa-chip" onClick={() => handleSendWaMessage("Tempo Traveller for Outstation Trip")}>🚐 Tempo Traveller</button>
            <button className="wa-chip" onClick={() => handleSendWaMessage("Corporate Transport Inquiry")}>🏢 Corporate Shuttle</button>
          </div>
          <form
            className="wa-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendWaMessage(waInputText);
            }}
          >
            <input
              type="text"
              placeholder="Type your inquiry here..."
              value={waInputText}
              onChange={(e) => setWaInputText(e.target.value)}
              required
            />
            <button type="submit" className="wa-send-btn">➤</button>
          </form>
        </div>
      )}

      {/* Booking Details & Reservation Modal (SRS FR 3.1, 3.2, 3.3) */}
      {isBookingModalOpen && selectedVehicleForBooking && (
        <div className="modal-backdrop">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <h3>Reserve Luxury Vehicle</h3>
                <span className="badge-gold">{selectedVehicleForBooking.name}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setIsBookingModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-section-grid">
                <div className="modal-vehicle-preview">
                  <img src={selectedVehicleForBooking.image} alt={selectedVehicleForBooking.name} className="modal-img" />
                  <div className="modal-amenities-tags">
                    {selectedVehicleForBooking.amenities.map((a, i) => (
                      <span key={i} className="amenity-pill">✓ {a}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-tariff-card">
                  <h4>Fare & Tariff Policy</h4>
                  <div className="tariff-line"><span>Rate Per KM:</span> <strong>₹{selectedVehicleForBooking.ratePerKm}/km</strong></div>
                  <div className="tariff-line"><span>Min. Billing / Day:</span> <strong>{selectedVehicleForBooking.minKmPerDay} km</strong></div>
                  <div className="tariff-line"><span>Driver Allowance:</span> <strong>₹{selectedVehicleForBooking.driverAllowancePerDay} / day</strong></div>
                  <div className="tariff-line"><span>Seating Capacity:</span> <strong>{selectedVehicleForBooking.capacity}</strong></div>
                  <div className="tariff-line text-success"><span>Included:</span> <strong>RTO Tax & Sanitization Kit</strong></div>
                </div>
              </div>

              <form className="reservation-form" onSubmit={handleConfirmReservation}>
                <h4 className="form-subhead">Passenger Details & Journey Schedule</h4>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input type="text" name="custName" defaultValue="Rajesh Sharma" required />
                  </div>
                  <div className="form-field">
                    <label>Mobile Number (WhatsApp) *</label>
                    <input type="tel" name="custPhone" defaultValue="9876543210" required />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Email Address</label>
                    <input type="email" name="custEmail" defaultValue="rajesh.travels@example.com" required />
                  </div>
                  <div className="form-field">
                    <label>Number of Passengers</label>
                    <input type="number" name="custPassengers" defaultValue={selectedVehicleForBooking.seatsNum > 17 ? 22 : 12} min={1} max={selectedVehicleForBooking.seatsNum} required />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Pickup Location / Address *</label>
                    <input type="text" name="custPickupAddress" defaultValue="SG Highway, Iscon Cross Road, Ahmedabad" required />
                  </div>
                  <div className="form-field">
                    <label>Pickup Time *</label>
                    <input type="time" name="custPickupTime" defaultValue="06:30" required />
                  </div>
                </div>

                <div className="form-field">
                  <label>Special Notes / Luggage / Multiple Stops</label>
                  <input type="text" name="custSpecialNotes" placeholder="e.g. 15 medium suitcases, wedding decoration requested" />
                </div>

                {/* Payment Selection Mode (SRS FR 3.3) */}
                <div className="payment-selection-box">
                  <h4>Payment & Confirmation Mode (SRS FR 3.3)</h4>
                  <div className="payment-options">
                    <label className="pay-option">
                      <input type="radio" name="paymentType" value="advance" defaultChecked />
                      <div className="pay-option-content">
                        <strong>20% Token Advance (Pay ₹3,500 Now)</strong>
                        <small>Balance payable to driver at trip start</small>
                      </div>
                    </label>
                    <label className="pay-option">
                      <input type="radio" name="paymentType" value="full" />
                      <div className="pay-option-content">
                        <strong>Pay Full Amount (Instant 5% Discount)</strong>
                        <small>All-inclusive receipt and fast-track dispatch</small>
                      </div>
                    </label>
                    <label className="pay-option">
                      <input type="radio" name="paymentType" value="paylater" />
                      <div className="pay-option-content">
                        <strong>Pay Later / UPI on Boarding</strong>
                        <small>Verification call required from booking desk</small>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="modal-footer-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setIsBookingModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary glow-effect">
                    Confirm Reservation & Generate E-Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Digital E-Ticket Modal (SRS FR 3.4) */}
      {isTicketModalOpen && confirmedBookingData && (
        <div className="modal-backdrop">
          <div className="modal-dialog ticket-dialog">
            <div className="modal-header ticket-modal-header">
              <div className="ticket-status-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                BOOKING CONFIRMED & E-TICKET ISSUED
              </div>
              <button className="modal-close-btn" onClick={() => setIsTicketModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body ticket-print-body" id="eTicketContent">
              <div className="ticket-card">
                <div className="ticket-card-header">
                  <div className="ticket-brand">
                    <h3>RoyalVoyage Travels</h3>
                    <p>Certified Bus & Tourist Rental Services</p>
                  </div>
                  <div className="ticket-pnr-box">
                    <span className="pnr-label">PNR / BOOKING ID</span>
                    <strong className="pnr-val">{confirmedBookingData.pnr}</strong>
                  </div>
                </div>

                <div className="ticket-route-strip">
                  <div className="route-point">
                    <span className="label">FROM</span>
                    <h4>{confirmedBookingData.from}</h4>
                  </div>
                  <div className="route-arrow">
                    <span>➔</span>
                    <small>Outstation Rental</small>
                  </div>
                  <div className="route-point">
                    <span className="label">TO</span>
                    <h4>{confirmedBookingData.to}</h4>
                  </div>
                </div>

                <div className="ticket-details-grid">
                  <div className="detail-cell">
                    <span className="cell-label">Passenger Name</span>
                    <strong>{confirmedBookingData.customerName}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Contact</span>
                    <strong>+91 {confirmedBookingData.phone}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Journey Date</span>
                    <strong>{confirmedBookingData.date}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Vehicle Assigned</span>
                    <strong>{confirmedBookingData.vehicleName}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Pickup Address</span>
                    <strong>{confirmedBookingData.pickup}</strong>
                  </div>
                  <div className="detail-cell">
                    <span className="cell-label">Payment Mode</span>
                    <strong className="text-success">{confirmedBookingData.paymentMode}</strong>
                  </div>
                </div>

                <div className="ticket-driver-section">
                  <div className="driver-info">
                    <span className="cell-label">Assigned Chauffeur</span>
                    <strong>Surajbhai Solanki (Verified Heavy License)</strong>
                    <small>📞 +91 98250 88712 • Vehicle: GJ-01-ET-4490</small>
                  </div>
                  <div className="qr-code-box">
                    <div className="qr-placeholder">
                      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        <rect x="15" y="15" width="2" height="2"/>
                        <rect x="18" y="18" width="2" height="2"/>
                        <rect x="15" y="18" width="2" height="2"/>
                      </svg>
                    </div>
                    <span>Scan to Track</span>
                  </div>
                </div>

                <div className="ticket-instructions">
                  <p>
                    <strong>Travel Instructions:</strong> Chauffeur will contact you 2 hours prior to departure. A complimentary sanitization kit and water bottles are provided. In case of emergency or breakdown, contact the 24/7 central desk at <strong>+91 98765 43210</strong>.
                  </p>
                </div>
              </div>

              <div className="ticket-actions">
                <button className="btn btn-outline" onClick={() => window.print()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Print / Save PDF
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsTicketModalOpen(false);
                    setIsTrackerModalOpen(true);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="10 8 16 12 10 16 10 8"/>
                  </svg>
                  Track Live Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live GPS Telemetry Simulator Modal (SRS FR 6.1) */}
      {isTrackerModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog tracker-dialog">
            <div className="modal-header">
              <div>
                <h3>🛰️ Live GPS Vehicle Telemetry</h3>
                <p>Real-time vehicle position, satellite telemetry, and speed governor status</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsTrackerModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body tracker-body">
              <div className="simulated-map-container">
                <div className="map-highway-line">
                  <div className="map-progress-highlight" style={{ width: `${trackerBusProgress}%` }}></div>
                  <div className="map-bus-marker" style={{ left: `${trackerBusProgress}%` }}>
                    <div className="marker-tooltip">
                      <span>Volvo 9600 [GJ-01]</span><br />
                      <strong>{trackerSpeed} km/h</strong>
                    </div>
                    <div className="marker-icon">🚌</div>
                  </div>
                  <div className="map-city-point origin-point">
                    <span className="city-dot"></span>
                    <strong>{fromCity}</strong>
                    <small>Departed 06:30 AM</small>
                  </div>
                  <div className="map-city-point dest-point">
                    <span className="city-dot"></span>
                    <strong>{toCity}</strong>
                    <small>ETA 05:45 PM</small>
                  </div>
                </div>
                <div className="map-live-tag">
                  <span className="blinking-dot"></span> GPS SATELLITE LOCK: ACTIVE (12 SATS)
                </div>
              </div>

              <div className="telemetry-grid">
                <div className="telemetry-card">
                  <span>Speed Governor</span>
                  <strong>{trackerSpeed} km/h</strong>
                  <small className="text-success">Within Safe Limit (&lt;80)</small>
                </div>
                <div className="telemetry-card">
                  <span>Distance Covered</span>
                  <strong>{Math.round((670 * trackerBusProgress) / 100)} / 670 KM</strong>
                  <small>{trackerBusProgress}% Journey Completed</small>
                </div>
                <div className="telemetry-card">
                  <span>Next Rest Stop</span>
                  <strong>Ratanpur Food Plaza</strong>
                  <small>ETA: in 28 mins</small>
                </div>
                <div className="telemetry-card">
                  <span>Emergency SOS Desk</span>
                  <button
                    className="btn-sos-call"
                    onClick={() => showToast("🚨 SOS Alert sent to 24/7 Journey Control Room!", "warning")}
                  >
                    🚨 TRIGGER SOS
                  </button>
                </div>
              </div>

              <div className="driver-comm-box">
                <div className="driver-meta">
                  <div className="driver-img">👨‍✈️</div>
                  <div>
                    <strong>Surajbhai Solanki (Lead Chauffeur)</strong>
                    <p>RTO Commercial Badge: DL-GJ-2012-9908 • Vaccinated & Verified</p>
                  </div>
                </div>
                <div className="driver-actions">
                  <a href="tel:+919825088712" className="btn btn-outline btn-sm">📞 Call Driver</a>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => showToast("Live tracking link copied to clipboard & shared via SMS!", "success")}
                  >
                    📲 Share Live Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-container">
          <div className={`toast toast-${toastMessage.type}`}>
            <span>{toastMessage.type === "success" ? "✓" : toastMessage.type === "warning" ? "⚠️" : "ℹ️"}</span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </>
  );
}
