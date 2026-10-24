"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Compass,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  Copy,
  ChevronRight,
  ExternalLink,
  Info,
  Car,
  Bus,
  Check,
  Sparkles
} from "lucide-react";
import {
  SITE_CONFIG,
  VEHICLES,
  PACKAGES,
  ROUTES,
  REVIEWS,
  FAQS,
  calculateFare,
  type VehicleRate,
  type PackageTour
} from "@/data/travel-data";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Booking Form State
  const [tripType, setTripType] = useState<"outstation" | "local" | "airport">("outstation");
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [pickup, setPickup] = useState("Pune (Swargate / Hinjewadi / Baner)");
  const [dropoff, setDropoff] = useState("Mahabaleshwar");
  const [startDate, setStartDate] = useState("2026-10-25");
  const [returnDate, setReturnDate] = useState("2026-10-27");
  const [passengerCount, setPassengerCount] = useState("14-17");
  const [recommendedVehicle, setRecommendedVehicle] = useState("Force Urbania VIP (17 Seater) / AC Tempo");
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [showCopyFallbackModal, setShowCopyFallbackModal] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Update recommended vehicle based on passenger count
  useEffect(() => {
    switch (passengerCount) {
      case "1-6":
        setRecommendedVehicle("Toyota Innova Crysta (6-7 Seats)");
        break;
      case "7-13":
        setRecommendedVehicle("Force Urbania VIP Maharaja (13 Seats)");
        break;
      case "14-17":
        setRecommendedVehicle("Force Urbania VIP / 17-Seater AC Tempo");
        break;
      case "18-20":
        setRecommendedVehicle("Force Tempo Traveller AC (20 Seater)");
        break;
      case "21-26":
        setRecommendedVehicle("Force Tempo Traveller AC (26 Seater)");
        break;
      case "27-32":
        setRecommendedVehicle("Executive Mini Bus (32 Seater AC)");
        break;
      case "33-49":
        setRecommendedVehicle("Volvo B11R Multi-Axle Luxury Coach (49 Seater)");
        break;
      default:
        setRecommendedVehicle("Force Urbania VIP (17 Seater)");
    }
  }, [passengerCount]);

  // Packages Active Vehicle per card
  const [packageVehicles, setPackageVehicles] = useState<{ [key: string]: "tempo17" | "urbania" | "innova" }>({
    "pkg-ashtavinayak": "tempo17",
    "pkg-jyotirlinga": "tempo17",
    "pkg-mahabaleshwar": "tempo17",
    "pkg-shirdi": "tempo17",
    "pkg-konkan": "tempo17",
    "pkg-shaktipeeth": "tempo17"
  });
  const [packageFilter, setPackageFilter] = useState<string>("all");

  // Fleet Filter State
  const [fleetFilter, setFleetFilter] = useState<string>("all");

  // Fare Estimator State
  const [calcRoutePreset, setCalcRoutePreset] = useState<string>("custom");
  const [calcKm, setCalcKm] = useState<number>(350);
  const [calcDays, setCalcDays] = useState<number>(2);
  const [calcVehicleId, setCalcVehicleId] = useState<string>("urbania-17");
  const [isReturnTrip, setIsReturnTrip] = useState<boolean>(true);
  const [isExclusionsOpen, setIsExclusionsOpen] = useState<boolean>(false);

  // FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Toast System
  const [toast, setToast] = useState<string | null>(null);

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Find active vehicle for estimator
  const activeCalcVehicle = VEHICLES.find((v) => v.id === calcVehicleId) || VEHICLES[0];
  const estimatorResult = calculateFare(
    calcKm,
    calcDays,
    activeCalcVehicle.ratePerKm,
    activeCalcVehicle.minKmPerDay,
    activeCalcVehicle.driverAllowancePerDay,
    0.05
  );

  // Preset route selector in estimator
  const handleRoutePresetChange = (preset: string) => {
    setCalcRoutePreset(preset);
    if (preset === "pune-mumbai") {
      setCalcKm(300);
      setCalcDays(1);
    } else if (preset === "pune-mahabaleshwar") {
      setCalcKm(260);
      setCalcDays(2);
    } else if (preset === "pune-shirdi") {
      setCalcKm(450);
      setCalcDays(2);
    } else if (preset === "pune-ashtavinayak") {
      setCalcKm(650);
      setCalcDays(2);
    } else if (preset === "pune-goa") {
      setCalcKm(950);
      setCalcDays(4);
    }
  };

  // Build formatted WhatsApp message
  const getBookingMessage = () => {
    const pnr = "VT-" + Math.floor(100000 + Math.random() * 900000);
    return `*TRIP RESERVATION REQUEST (REF: ${pnr})*
*Vishal Travels Pune - Official Booking Desk*
--------------------------------------------
*Passenger Name:* ${custName || "Valued Passenger"}
*Contact Phone:* ${custPhone || "Provided on WhatsApp"}
*Trip Type:* ${tripType === "outstation" ? "Outstation Tour" : tripType === "local" ? "Pune Local (8 Hr)" : "Airport Transfer"}
*Pickup Landmark:* ${pickup}
*Destination:* ${dropoff}
*Start Date:* ${startDate}
*Return Date:* ${returnDate || "Same Day"}
*Passengers:* ${passengerCount} (${recommendedVehicle})
--------------------------------------------
_Namaskar Vishal Travels! Please check vehicle availability for my journey and share the all-inclusive quotation._`;
  };

  const handleHeroBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = getBookingMessage();
    const waUrl = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  const handleCopyMessage = () => {
    const msg = getBookingMessage();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(msg);
      setCopiedText(true);
      triggerToast("Booking details copied to clipboard!");
      setTimeout(() => setCopiedText(false), 3000);
    }
  };

  // Filtered packages
  const filteredPackages =
    packageFilter === "all"
      ? PACKAGES
      : PACKAGES.filter((p) => p.category === packageFilter);

  // Filtered fleet
  const filteredFleet =
    fleetFilter === "all"
      ? VEHICLES
      : VEHICLES.filter((v) => v.category === fleetFilter);

  return (
    <>
      {/* 1. TOP BAR - Single Slim Line */}
      <div className="site-topbar">
        <div className="container topbar-content">
          <div className="topbar-permit">
            <ShieldCheck size={16} strokeWidth={1.75} />
            <span>Permit: {SITE_CONFIG.PERMIT} • All-India Commercial Tourist Fleet</span>
          </div>

          <div className="topbar-contact-group">
            <a href={SITE_CONFIG.PHONE_TEL} className="topbar-phone-link">
              <Phone size={16} strokeWidth={1.75} />
              <span>{SITE_CONFIG.PHONE}</span>
            </a>
            <a
              href={SITE_CONFIG.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-wa-link"
            >
              <MessageCircle size={16} strokeWidth={1.75} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER - Logo Left, 5 Simple Links, Call & Orange Get Quote */}
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-content">
          <a href="#home" className="header-logo">
            <div className="logo-badge">
              <Bus size={22} strokeWidth={1.75} />
            </div>
            <div>
              <div className="logo-name">
                Vishal <span>Travels</span>
              </div>
              <span className="logo-tagline">EXECUTIVE FLEET • PUNE</span>
            </div>
          </a>

          {/* 5 Simple Links - Zero Dropdowns */}
          <nav className="header-nav">
            <a href="#tour-packages" className="header-nav-link">Packages</a>
            <a href="#routes-trips" className="header-nav-link">Routes</a>
            <a href="#our-fleet" className="header-nav-link">Fleet</a>
            <a href="#fare-calculator" className="header-nav-link">Fare</a>
            <a href="#faq" className="header-nav-link">FAQ</a>
          </nav>

          <div className="header-cta-group">
            <a href={SITE_CONFIG.PHONE_TEL} className="btn btn-secondary">
              <Phone size={18} strokeWidth={1.75} />
              <span>Call</span>
            </a>
            <a href="#booking-form-section" className="btn btn-primary">
              <span>Get Quote</span>
            </a>
            <button
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <Compass size={24} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Mobile Simple Drawer */}
        {mobileMenuOpen && (
          <div style={{ background: "#ffffff", borderTop: "1px solid #E5E7EB", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="#tour-packages" className="header-nav-link" onClick={() => setMobileMenuOpen(false)}>Packages</a>
            <a href="#routes-trips" className="header-nav-link" onClick={() => setMobileMenuOpen(false)}>Routes</a>
            <a href="#our-fleet" className="header-nav-link" onClick={() => setMobileMenuOpen(false)}>Our Fleet</a>
            <a href="#fare-calculator" className="header-nav-link" onClick={() => setMobileMenuOpen(false)}>Fare Estimator</a>
            <a href="#faq" className="header-nav-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              <a href={SITE_CONFIG.PHONE_TEL} className="btn btn-secondary" style={{ minHeight: "44px" }}>Call Desk</a>
              <a href="#booking-form-section" className="btn btn-primary" style={{ minHeight: "44px" }} onClick={() => setMobileMenuOpen(false)}>Get Quote</a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - 2 Columns Desktop (#home & #booking-form-section) */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Headline, 3 Benefits, Trust Row */}
            <div className="hero-content">
              <h1 className="hero-title">
                Executive Bus &amp; Tempo Traveller{" "}
                <span className="gradient-text">Rental in Pune</span>
              </h1>
              <p className="hero-lead">
                Premium group mobility for pilgrimages, corporate offsites, and weddings across Maharashtra.
                Force Urbania VIP, luxury AC Tempo Travellers (13–26 seater), and Volvo coaches with verified chauffeurs.
              </p>

              {/* 3 Short Benefit Bullets */}
              <ul className="hero-benefit-list">
                <li className="hero-benefit-item">
                  <span className="hero-benefit-icon">
                    <CheckCircle2 size={16} strokeWidth={2.2} />
                  </span>
                  <span>Doorstep pickup anywhere in Pune &amp; PCMC with clean AC fleet</span>
                </li>
                <li className="hero-benefit-item">
                  <span className="hero-benefit-icon">
                    <CheckCircle2 size={16} strokeWidth={2.2} />
                  </span>
                  <span>Commercial RTO licensed drivers with 8+ years ghat experience</span>
                </li>
                <li className="hero-benefit-item">
                  <span className="hero-benefit-icon">
                    <CheckCircle2 size={16} strokeWidth={2.2} />
                  </span>
                  <span>Transparent per-km rate card with minimum billing clarity</span>
                </li>
              </ul>

              {/* Compact Trust Row */}
              <div className="hero-trust-compact">
                <div className="hero-trust-item">
                  <Star size={16} className="star" fill="#FBBF24" />
                  <strong>{SITE_CONFIG.RATING}/5 on Google</strong>
                  <span style={{ color: "#CBD5E1" }}>({SITE_CONFIG.REVIEWS_COUNT} Reviews)</span>
                </div>
                <div className="hero-trust-divider"></div>
                <div className="hero-trust-item">
                  <strong>{SITE_CONFIG.YEARS} in Pune</strong>
                  <span style={{ color: "#CBD5E1" }}>(Since 2011)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating White Booking Card */}
            <div className="hero-booking-card" id="booking-form-section">
              <div className="booking-card-top-strip"></div>
              <div className="booking-card-body">
                <div className="card-title-row">
                  <h2>Instant Quote &amp; Reserve</h2>
                  <span className="card-fast-badge">Fast Dispatch</span>
                </div>

                {/* Segmented Control - Sleek */}
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
                    onClick={() => {
                      setTripType("local");
                      setDropoff("Pune Local (8 Hr / 80 KM)");
                    }}
                  >
                    Local 8hr
                  </button>
                  <button
                    type="button"
                    className={`segment-btn ${tripType === "airport" ? "active" : ""}`}
                    onClick={() => {
                      setTripType("airport");
                      setDropoff("Mumbai Airport (T2)");
                    }}
                  >
                    Airport
                  </button>
                </div>

                <form onSubmit={handleHeroBookingSubmit}>
                  {/* Row 1: Name & Phone */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="formCustName">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        id="formCustName"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Rahul Patil"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="formCustPhone">
                        Phone <span className="req">*</span>
                      </label>
                      <input
                        id="formCustPhone"
                        type="tel"
                        className="form-input"
                        placeholder="e.g. 98220 12345"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Pickup & Destination */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="formPickup">
                        Pickup (Pune) <span className="req">*</span>
                      </label>
                      <input
                        id="formPickup"
                        type="text"
                        className="form-input"
                        placeholder="Swargate / Hinjewadi"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="formDropoff">
                        Destination <span className="req">*</span>
                      </label>
                      <input
                        id="formDropoff"
                        type="text"
                        className="form-input"
                        placeholder="Mahabaleshwar / Shirdi"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Travel Date & Passengers */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <div className="label-with-toggle">
                        <label className="form-label" htmlFor="formStartDate">
                          Start Date <span className="req">*</span>
                        </label>
                        {!showReturnDate && tripType === "outstation" && (
                          <button
                            type="button"
                            className="btn-text-link"
                            onClick={() => setShowReturnDate(true)}
                          >
                            + Return
                          </button>
                        )}
                      </div>
                      <input
                        id="formStartDate"
                        type="date"
                        className="form-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="formPassengers">
                        Passengers <span className="req">*</span>
                      </label>
                      <select
                        id="formPassengers"
                        className="form-select"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(e.target.value)}
                      >
                        <option value="1-6">1–6 (Innova Crysta)</option>
                        <option value="7-13">7–13 (Urbania 13S)</option>
                        <option value="14-17">14–17 (Urbania / 17S)</option>
                        <option value="18-20">18–20 (Tempo 20S)</option>
                        <option value="21-26">21–26 (Tempo 26S)</option>
                        <option value="27-32">27–32 (Mini Bus 32S)</option>
                        <option value="33-49">33–49 (Volvo 49S)</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Return Date if expanded */}
                  {showReturnDate && tripType === "outstation" && (
                    <div className="form-group form-return-date-row">
                      <div className="label-with-toggle">
                        <label className="form-label" htmlFor="formReturnDate">
                          Return Date <small style={{ color: "#64748B" }}>(Optional)</small>
                        </label>
                        <button
                          type="button"
                          className="btn-text-link"
                          onClick={() => {
                            setShowReturnDate(false);
                            setReturnDate("");
                          }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                      <input
                        id="formReturnDate"
                        type="date"
                        className="form-input"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Micro Suggestion Tag */}
                  <div className="suggested-fleet-micro">
                    <Sparkles size={13} strokeWidth={2.2} style={{ flexShrink: 0 }} />
                    <span>Suggested: <strong>{recommendedVehicle}</strong></span>
                  </div>

                  {/* Action Buttons: WhatsApp & Direct Call */}
                  <div className="booking-card-actions">
                    <button type="submit" className="btn btn-whatsapp booking-action-btn">
                      <MessageCircle size={18} strokeWidth={2} />
                      <span>WhatsApp Quote</span>
                    </button>
                    <a
                      href={SITE_CONFIG.PHONE_TEL}
                      className="btn btn-call booking-action-btn"
                      title={`Call ${SITE_CONFIG.PHONE}`}
                    >
                      <Phone size={17} strokeWidth={2} />
                      <span>Call Desk</span>
                    </a>
                  </div>

                  {/* Helper and Fallback combined */}
                  <div className="booking-card-footer-compact">
                    <span>We reply within ~30 minutes</span>
                    <span className="dot">•</span>
                    <button
                      type="button"
                      onClick={() => setShowCopyFallbackModal(true)}
                      className="fallback-link"
                    >
                      No WhatsApp? Copy / Call
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST STRIP - 4 Stats with Tinted Icon Circles (Overlapping Hero by ~40px) */}
      <section className="trust-strip-section">
        <div className="container">
          <div className="trust-strip-card">
            <div className="trust-strip-grid">
              <div className="trust-strip-item">
                <div className="trust-strip-icon-circle">
                  <Star size={22} strokeWidth={2} />
                </div>
                <div className="trust-strip-text">
                  <strong>{SITE_CONFIG.RATING} / 5 Rating</strong>
                  <span>{SITE_CONFIG.REVIEWS_COUNT} Google Reviews</span>
                </div>
              </div>

              <div className="trust-strip-item">
                <div className="trust-strip-icon-circle">
                  <Clock size={22} strokeWidth={2} />
                </div>
                <div className="trust-strip-text">
                  <strong>{SITE_CONFIG.YEARS} in Pune</strong>
                  <span>Serving Since 2011</span>
                </div>
              </div>

              <div className="trust-strip-item">
                <div className="trust-strip-icon-circle">
                  <Users size={22} strokeWidth={2} />
                </div>
                <div className="trust-strip-text">
                  <strong>{SITE_CONFIG.CUSTOMERS}</strong>
                  <span>{SITE_CONFIG.TRIPS} Completed</span>
                </div>
              </div>

              <div className="trust-strip-item">
                <div className="trust-strip-icon-circle">
                  <ShieldCheck size={22} strokeWidth={2} />
                </div>
                <div className="trust-strip-text">
                  <strong>{SITE_CONFIG.FLEET_SIZE} Vehicles</strong>
                  <span>RTO Commercial Permit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PACKAGES - Card Grid with Category Colour Coding & Top Border (#tour-packages) */}
      <section className="section-pad" id="tour-packages">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">POPULAR OUTSTATION PACKAGES</span>
            <h2 className="section-title">Handcrafted Pilgrimage &amp; Holiday Tours</h2>
            <p className="section-desc">
              All package fares are generated strictly from the rate card formula with seasoned ghat drivers.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="packages-filter-bar">
            <button
              type="button"
              className={`filter-chip ${packageFilter === "all" ? "active" : ""}`}
              onClick={() => setPackageFilter("all")}
            >
              All Packages ({PACKAGES.length})
            </button>
            <button
              type="button"
              className={`filter-chip ${packageFilter === "pilgrimage" ? "active" : ""}`}
              onClick={() => setPackageFilter("pilgrimage")}
              style={packageFilter === "pilgrimage" ? { background: "#C2410C", borderColor: "#C2410C" } : {}}
            >
              Pilgrimage Circuits
            </button>
            <button
              type="button"
              className={`filter-chip ${packageFilter === "hill-station" ? "active" : ""}`}
              onClick={() => setPackageFilter("hill-station")}
              style={packageFilter === "hill-station" ? { background: "#047857", borderColor: "#047857" } : {}}
            >
              Hill Stations
            </button>
            <button
              type="button"
              className={`filter-chip ${packageFilter === "beach" ? "active" : ""}`}
              onClick={() => setPackageFilter("beach")}
              style={packageFilter === "beach" ? { background: "#0E7490", borderColor: "#0E7490" } : {}}
            >
              Coastal &amp; Beach
            </button>
          </div>

          <div className="packages-grid">
            {filteredPackages.map((pkg) => {
              const activeV = packageVehicles[pkg.id] || "tempo17";
              const currentPrice = pkg.prices[activeV];
              const vehicleLabel = activeV === "tempo17" ? "17-Str Tempo" : activeV === "urbania" ? "Force Urbania VIP" : "Innova Crysta";

              return (
                <div
                  key={pkg.id}
                  className="package-card"
                  style={{ borderTop: `5px solid ${pkg.categoryColor}` }}
                >
                  <div className="package-img-wrap">
                    <img src={pkg.image} alt={pkg.title} className="package-img" loading="lazy" />
                    <span
                      className="package-chip"
                      style={{ background: pkg.categoryColor, color: "#ffffff" }}
                    >
                      {pkg.categoryLabel}
                    </span>
                  </div>

                  <div className="package-body">
                    <div className="package-meta-row">
                      <span className="package-meta-item">
                        <Clock size={15} strokeWidth={2} />
                        {pkg.duration}
                      </span>
                      <span className="package-meta-item">
                        <Compass size={15} strokeWidth={2} />
                        {pkg.distanceKm} KM Route
                      </span>
                    </div>

                    <h3 className="package-title">{pkg.title}</h3>
                    <p className="package-subtitle">{pkg.subtitle}</p>

                    <ul className="package-highlights">
                      {pkg.highlights.map((h, i) => (
                        <li key={i}>
                          <Check size={14} color={pkg.categoryColor} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tinted Bottom Price Panel in Category Colour */}
                    <div
                      className="package-bottom-panel"
                      style={{ background: pkg.categoryBg, border: `1px solid ${pkg.categoryBorder}` }}
                    >
                      {/* Vehicle Selector Pills */}
                      <div className="package-v-chips">
                        <button
                          type="button"
                          className={`package-v-chip ${activeV === "innova" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "innova" })}
                        >
                          Innova (7s)
                        </button>
                        <button
                          type="button"
                          className={`package-v-chip ${activeV === "tempo17" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "tempo17" })}
                        >
                          17-Str Tempo
                        </button>
                        <button
                          type="button"
                          className={`package-v-chip ${activeV === "urbania" ? "active" : ""}`}
                          onClick={() => setPackageVehicles({ ...packageVehicles, [pkg.id]: "urbania" })}
                        >
                          Urbania VIP
                        </button>
                      </div>

                      <div className="package-price-actions-row">
                        <div className="package-price-col">
                          <span>From ₹{currentPrice.toLocaleString()} · {vehicleLabel}</span>
                          <strong>₹{currentPrice.toLocaleString()}</strong>
                        </div>

                        <div className="package-action-btns">
                          <a
                            href={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20reserve%20the%20${encodeURIComponent(pkg.title)}%20package%20(${vehicleLabel}%20at%20₹${currentPrice.toLocaleString()}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="package-wa-icon-btn"
                            aria-label={`WhatsApp Enquiry for ${pkg.title}`}
                          >
                            <MessageCircle size={20} strokeWidth={2} />
                          </a>
                          <a href="#booking-form-section" className="btn btn-secondary" style={{ minHeight: "44px", padding: "0 14px", fontSize: "0.86rem" }}>
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

      {/* 6. ROUTES - Scannable List / Rows (#routes-trips) */}
      <section className="section-pad" id="routes-trips" style={{ background: "#ffffff" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">HIGHWAY CORRIDORS</span>
            <h2 className="section-title">Popular Outstation Routes from Pune</h2>
            <p className="section-desc">
              Fast-scanning fixed tariff schedule. Each route clearly defines one-way drop vs round-trip and vehicle category.
            </p>
          </div>

          <div className="routes-table-wrap">
            {ROUTES.map((r) => (
              <div key={r.id} className="route-table-row">
                <div className="route-name-cell">
                  <span className={`route-badge ${r.tripType === "One-Way Drop" ? "oneway" : "round"}`}>
                    {r.tripType}
                  </span>
                  <span>{r.route}</span>
                </div>

                <div className="route-meta-cell">
                  <span>Distance</span>
                  <strong>{r.distanceKm} KM</strong>
                </div>

                <div className="route-meta-cell">
                  <span>Duration</span>
                  <strong>{r.duration}</strong>
                </div>

                <div className="route-price-cell">
                  ₹{r.estimatedFare.toLocaleString()}
                  <span>{r.vehicleModel}</span>
                </div>

                <div className="route-action-cell">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20book%20the%20${encodeURIComponent(r.route)}%20route%20(${r.tripType}%20in%20${encodeURIComponent(r.vehicleModel)}%20at%20₹${r.estimatedFare.toLocaleString()}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ minHeight: "44px", padding: "0 16px" }}
                  >
                    <MessageCircle size={16} strokeWidth={2} />
                    <span>Book Route</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FLEET - Color-Coded Cards & 2x2 Specs (#our-fleet) */}
      <section className="section-pad" id="our-fleet">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">VERIFIED PUNE FLEET</span>
            <h2 className="section-title">Our Executive Fleet in Pune</h2>
            <p className="section-desc">
              From Force Urbania VIPs to 49-seater Volvo coaches, colour-coded by category with honest per-km tariffs.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="packages-filter-bar">
            <button
              type="button"
              className={`filter-chip ${fleetFilter === "all" ? "active" : ""}`}
              onClick={() => setFleetFilter("all")}
            >
              All Vehicles ({VEHICLES.length})
            </button>
            <button
              type="button"
              className={`filter-chip ${fleetFilter === "urbania" ? "active" : ""}`}
              onClick={() => setFleetFilter("urbania")}
              style={fleetFilter === "urbania" ? { background: "#6D28D9", borderColor: "#6D28D9" } : {}}
            >
              Force Urbania
            </button>
            <button
              type="button"
              className={`filter-chip ${fleetFilter === "tempo" ? "active" : ""}`}
              onClick={() => setFleetFilter("tempo")}
              style={fleetFilter === "tempo" ? { background: "#1E3A8A", borderColor: "#1E3A8A" } : {}}
            >
              Tempo Travellers
            </button>
            <button
              type="button"
              className={`filter-chip ${fleetFilter === "minibus" ? "active" : ""}`}
              onClick={() => setFleetFilter("minibus")}
              style={fleetFilter === "minibus" ? { background: "#0E7490", borderColor: "#0E7490" } : {}}
            >
              Mini Bus
            </button>
            <button
              type="button"
              className={`filter-chip ${fleetFilter === "luxury-bus" ? "active" : ""}`}
              onClick={() => setFleetFilter("luxury-bus")}
              style={fleetFilter === "luxury-bus" ? { background: "#BE185D", borderColor: "#BE185D" } : {}}
            >
              Volvo &amp; Sleeper Coaches
            </button>
          </div>

          <div className="fleet-grid">
            {filteredFleet.map((vehicle) => (
              <div
                key={vehicle.id}
                className="fleet-card"
                style={{ borderTop: `4px solid ${vehicle.badgeColor}` }}
              >
                <div className="fleet-img-wrap">
                  <img src={vehicle.image} alt={vehicle.name} className="fleet-img" loading="lazy" />
                  <span
                    className="fleet-badge"
                    style={{ background: vehicle.badgeColor }}
                  >
                    {vehicle.categoryLabel}
                  </span>
                </div>

                <div className="fleet-body">
                  <h3 className="fleet-name">{vehicle.name}</h3>
                  <p className="fleet-submodel">{vehicle.submodel}</p>

                  {/* 2x2 Specs Grid */}
                  <div className="fleet-specs-grid">
                    <div className="spec-item">
                      <Users size={16} strokeWidth={2} />
                      <span>{vehicle.seatingText}</span>
                    </div>
                    <div className="spec-item">
                      <Briefcase size={16} strokeWidth={2} />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="spec-item">
                      <Compass size={16} strokeWidth={2} />
                      <span>Min {vehicle.minKmPerDay} km/day</span>
                    </div>
                    <div className="spec-item">
                      <Clock size={16} strokeWidth={2} />
                      <span>DA ₹{vehicle.driverAllowancePerDay}/day</span>
                    </div>
                  </div>

                  {/* Best For Tag */}
                  <div className="fleet-bestfor-tag">
                    <strong>Best for:</strong> {vehicle.bestFor}
                  </div>

                  <div className="fleet-footer-row">
                    <div className="fleet-rate-display">
                      <span>Rate Per KM</span>
                      <strong>₹{vehicle.ratePerKm} <small style={{ fontSize: "0.82rem", fontWeight: 600 }}>/ KM</small></strong>
                    </div>

                    <a
                      href={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20want%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}.`}
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

      {/* 8. FARE ESTIMATOR - Dark Gradient Section with White Card (#fare-calculator) */}
      <section className="estimator-dark-section" id="fare-calculator">
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}>
              RATE CARD CALCULATOR
            </span>
            <h2 className="section-title">Bus &amp; Tempo Traveller Fare Estimator</h2>
            <p className="section-desc">
              Calculate your road travel estimate based on official Pune minimum billing rules (300 km/day baseline).
            </p>
          </div>

          <div className="estimator-white-card">
            <div className="estimator-layout-grid">
              {/* Left Inputs */}
              <div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--blue-900)", marginBottom: "4px" }}>
                  Configure Your Journey
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "18px" }}>
                  Select a popular route preset or adjust distance and days manually.
                </p>

                {/* Popular Route Selector to Auto-fill distance */}
                <div className="form-group">
                  <label className="form-label" htmlFor="calcRoutePreset">Route Auto-Fill Preset</label>
                  <select
                    id="calcRoutePreset"
                    className="form-select"
                    value={calcRoutePreset}
                    onChange={(e) => handleRoutePresetChange(e.target.value)}
                  >
                    <option value="custom">Custom Distance (Enter via slider below)</option>
                    <option value="pune-mumbai">Pune ➔ Mumbai / Airport (300 KM Round-Trip / 1 Day)</option>
                    <option value="pune-mahabaleshwar">Pune ➔ Mahabaleshwar Weekend (260 KM / 2 Days)</option>
                    <option value="pune-shirdi">Pune ➔ Shirdi Sai Darshan (450 KM / 2 Days)</option>
                    <option value="pune-ashtavinayak">Pune ➔ Ashtavinayak Yatra (650 KM / 2 Days)</option>
                    <option value="pune-goa">Pune ➔ Goa Coastal Vacation (950 KM / 4 Days)</option>
                  </select>
                </div>

                {/* Vehicle Model Selector */}
                <div className="form-group">
                  <label className="form-label" htmlFor="calcVehicleSelect">Select Vehicle</label>
                  <select
                    id="calcVehicleSelect"
                    className="form-select"
                    value={calcVehicleId}
                    onChange={(e) => setCalcVehicleId(e.target.value)}
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} (₹{v.ratePerKm}/KM • Min {v.minKmPerDay} km/day)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Distance Slider */}
                <div className="estimator-slider-group">
                  <div className="estimator-slider-header">
                    <span>Estimated Distance</span>
                    <strong style={{ color: "var(--blue-900)" }}>{calcKm} KM</strong>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="2000"
                    step="25"
                    value={calcKm}
                    onChange={(e) => {
                      setCalcKm(Number(e.target.value));
                      setCalcRoutePreset("custom");
                    }}
                    className="range-input"
                    aria-label="Distance Slider"
                  />
                </div>

                {/* Trip Duration Days Slider */}
                <div className="estimator-slider-group">
                  <div className="estimator-slider-header">
                    <span>Trip Duration</span>
                    <strong style={{ color: "var(--blue-900)" }}>{calcDays} Days</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={calcDays}
                    onChange={(e) => setCalcDays(Number(e.target.value))}
                    className="range-input"
                    aria-label="Trip Duration Slider"
                  />
                </div>

                {/* Round Trip Return Toggle */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", padding: "12px", background: "#F3F4F6", borderRadius: "8px" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--blue-900)" }}>
                    Round-Trip Return to Pune
                  </span>
                  <input
                    type="checkbox"
                    checked={isReturnTrip}
                    onChange={(e) => setIsReturnTrip(e.target.checked)}
                    style={{ width: "20px", height: "20px", accentColor: "var(--blue-800)" }}
                    aria-label="Round Trip Toggle"
                  />
                </div>

                {/* Explanatory Rule Banner */}
                {estimatorResult.isMinKmApplied && (
                  <div style={{ marginTop: "16px", background: "#FFF7ED", border: "1px solid #FFEDD5", borderRadius: "8px", padding: "12px", fontSize: "0.82rem", color: "#C2410C", lineHeight: 1.5 }}>
                    <strong>Minimum Billing Rule Applied:</strong> Pune outstation guidelines require a minimum of {activeCalcVehicle.minKmPerDay} km/day ({calcDays} days = {estimatorResult.minBillableKm} KM). Your entered distance of {calcKm} KM is billed at the {estimatorResult.minBillableKm} KM baseline.
                  </div>
                )}
              </div>

              {/* Right Sticky Receipt Summary */}
              <div className="estimator-receipt-box">
                <div className="receipt-header-row">
                  <h3 className="receipt-title">Fare Quotation Summary</h3>
                  <span className="receipt-vehicle-sub">{activeCalcVehicle.name}</span>
                </div>

                <div className="receipt-item-list">
                  <div className="receipt-item-row">
                    <span>Billable Distance ({estimatorResult.billableKm} KM @ ₹{activeCalcVehicle.ratePerKm}/km)</span>
                    <strong>₹{estimatorResult.baseFare.toLocaleString()}</strong>
                  </div>

                  <div className="receipt-item-row">
                    <span>Driver Allowance ({calcDays} Days @ ₹{activeCalcVehicle.driverAllowancePerDay}/day)</span>
                    <strong>₹{estimatorResult.driverAllowance.toLocaleString()}</strong>
                  </div>

                  <div className="receipt-item-row">
                    <span>Sanitization &amp; GPS Telemetry</span>
                    <strong style={{ color: "#047857" }}>Included Free</strong>
                  </div>

                  <div className="receipt-item-row">
                    <span>GST (5% Road Transport SAC 9964)</span>
                    <strong>₹{estimatorResult.gst.toLocaleString()}</strong>
                  </div>

                  <div className="receipt-divider"></div>

                  <div className="receipt-total-row">
                    <span>Estimated Total:</span>
                    <strong className="gradient-total-num">₹{estimatorResult.total.toLocaleString()}</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=Namaskar%20Vishal%20Travels!%20I%20got%20an%20Estimate%20of%20₹${estimatorResult.total.toLocaleString()}%20for%20${encodeURIComponent(activeCalcVehicle.name)}%20(${estimatorResult.billableKm}%20KM,%20${calcDays}%20Days).%20Please%20verify%20availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ width: "100%", minHeight: "48px" }}
                >
                  <span>Lock Estimate on WhatsApp</span>
                </a>

                {/* Collapsed "What is NOT included" Note */}
                <div style={{ marginTop: "16px", borderTop: "1px solid #E5E7EB", paddingTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsExclusionsOpen(!isExclusionsOpen)}
                    style={{ background: "none", border: "none", color: "var(--blue-800)", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
                  >
                    <span>What is NOT included? (Paid at actuals)</span>
                    <span>{isExclusionsOpen ? "−" : "+"}</span>
                  </button>

                  {isExclusionsOpen && (
                    <div className="receipt-not-included-box">
                      <strong>Not Included (paid at actuals by client):</strong>
                      <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                        <li>Highway Fastag toll plaza charges (settled against receipts)</li>
                        <li>Parking tickets at monuments, hotels, and airports</li>
                        <li>Interstate border entry taxes (if crossing outside Maharashtra)</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW IT WORKS - 3 Numbered Circles Joined by Dotted Line */}
      <section className="section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">EFFORTLESS JOURNEY</span>
            <h2 className="section-title">How Vishal Travels Works</h2>
            <p className="section-desc">
              Three simple steps from vehicle recommendation to doorstep pickup.
            </p>
          </div>

          <div className="steps-timeline-grid">
            <div className="step-item-card">
              <div className="step-circle num-1">1</div>
              <h3 className="step-title">Select Fleet &amp; Route</h3>
              <p className="step-desc">
                Choose your ideal passenger count. Our console recommends the best Force Urbania, Tempo, or Coach.
              </p>
            </div>

            <div className="step-item-card">
              <div className="step-circle num-2">2</div>
              <h3 className="step-title">Transparent Fare Lock</h3>
              <p className="step-desc">
                Receive an itemized quote with standard minimum km guidelines, driver allowance, and GST invoice.
              </p>
            </div>

            <div className="step-item-card">
              <div className="step-circle num-3">3</div>
              <h3 className="step-title">Chauffeur &amp; GPS Dispatch</h3>
              <p className="step-desc">
                Get driver details and live GPS tracking 2 hours before trip. Chilled AC doorstep pickup guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS - Pastel Background, Coloured Initial Avatars (#reviews) */}
      <section className="section-pad reviews-section-pastel" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">PASSENGER TESTIMONIALS</span>
            <h2 className="section-title">Verified Customer Experiences</h2>
            <p className="section-desc">
              Over {SITE_CONFIG.CUSTOMERS} satisfied travelers across Maharashtra family pilgrimages, weddings, and corporate trips.
            </p>
          </div>

          <div className="reviews-two-col">
            {/* Left Rating Summary Badge Card */}
            <div className="reviews-summary-badge-card">
              <div className="reviews-big-score">{SITE_CONFIG.RATING}</div>
              <div className="reviews-stars-wrap">★★★★★</div>
              <p className="reviews-meta-count">Based on {SITE_CONFIG.REVIEWS_COUNT} Verified Google Reviews</p>
              <a
                href={SITE_CONFIG.MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: "100%", minHeight: "44px", fontSize: "0.85rem" }}
              >
                <span>View on Google Maps</span>
                <ExternalLink size={15} strokeWidth={2} />
              </a>
            </div>

            {/* Right Testimonials Grid */}
            <div className="reviews-cards-grid">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="review-testimonial-card">
                  <div className="review-meta-top">
                    <span className="review-stars-row">★★★★★</span>
                    <span className="google-source-badge">
                      <Star size={11} fill="#1E3A8A" />
                      Google Verified
                    </span>
                  </div>

                  <p className="review-text-quote">&ldquo;{rev.text}&rdquo;</p>

                  <div className="review-author-row">
                    <div
                      className="review-initials-circle"
                      style={{ background: rev.avatarBg }}
                    >
                      {rev.initials}
                    </div>
                    <div className="review-author-info">
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

      {/* 11. FAQ - Accordion with Orange Left Border on Active (#faq) */}
      <section className="section-pad" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">HELP &amp; POLICIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about outstation billing, advance tokens, and cancellation policies.
            </p>
          </div>

          <div className="faq-list-wrap">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-header-btn"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-symbol">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="faq-content-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. FOOTER - Navy with Gradient Top Bar */}
      <footer className="site-footer">
        <div className="footer-top-gradient-bar"></div>
        <div className="container footer-inner-content">
          <div className="footer-4-columns">
            {/* Col 1: Brand & Permit Details */}
            <div className="footer-brand">
              <h3>
                Vishal <span>Travels</span>
              </h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#94A3B8" }}>
                Licensed commercial passenger transport fleet operator in Pune, Maharashtra. Force Urbanias, AC tempo travellers, mini buses, and luxury coaches for pilgrimages, weddings, and corporate logistics.
              </p>

              <div className="footer-permit-card">
                <div><strong>GSTIN:</strong> {SITE_CONFIG.GSTIN}</div>
                <div><strong>RTO Permit:</strong> {SITE_CONFIG.PERMIT}</div>
                <div><strong>Type:</strong> All-India Tourist Contract Carriage</div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-nav-list">
                <li><a href="#tour-packages">Tour Packages</a></li>
                <li><a href="#routes-trips">Popular Routes</a></li>
                <li><a href="#our-fleet">Our Fleet (13–49 Seater)</a></li>
                <li><a href="#fare-calculator">Fare Estimator</a></li>
                <li><a href="#faq">FAQ &amp; Cancellation Policy</a></li>
              </ul>
            </div>

            {/* Col 3: Contact & Helplines (All 3 Phone Numbers Located Here) */}
            <div>
              <h4 className="footer-heading">Contact &amp; Helplines</h4>
              <div className="footer-contact-info">
                <div>
                  <strong>Head Office (Swargate):</strong>
                  {SITE_CONFIG.ADDRESS}
                </div>
                <div>
                  <strong>Hinjewadi Yard:</strong>
                  {SITE_CONFIG.HINJEWADI_ADDRESS}
                </div>
                <div>
                  <strong>Dispatch Phone Numbers:</strong>
                  <div style={{ marginTop: "4px" }}>
                    <a href={SITE_CONFIG.PHONE_TEL} style={{ color: "#ffffff", fontWeight: 700 }}>
                      {SITE_CONFIG.PHONE} (Primary 24/7)
                    </a>
                  </div>
                  <div>
                    <a href="tel:+919822044556" style={{ color: "#CBD5E1" }}>
                      {SITE_CONFIG.PHONE_HINJEWADI} (Hinjewadi Desk)
                    </a>
                  </div>
                  <div>
                    <a href="tel:+919822044557" style={{ color: "#CBD5E1" }}>
                      {SITE_CONFIG.PHONE_CORPORATE} (Corporate Bookings)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Map Embed & Social Icon Buttons */}
            <div>
              <h4 className="footer-heading">Swargate Office Map</h4>
              <div className="footer-map-embed">
                <iframe
                  title="Vishal Travels Swargate Pune Location"
                  src="https://maps.google.com/maps?q=Swargate%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="footer-social-btns">
                <a
                  href="https://www.facebook.com/share/14X2F187jBq/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-btn"
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
                  className="social-icon-btn"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={SITE_CONFIG.MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-btn"
                  aria-label="Google Maps"
                  title="Google Maps"
                >
                  <MapPin size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <span>© 2026 Vishal Travels. All Rights Reserved. Pune, Maharashtra. (GSTIN: {SITE_CONFIG.GSTIN})</span>
            <span>RTO Tourist Permit: {SITE_CONFIG.PERMIT} • 100% Fastag Verified Commercial Fleet</span>
          </div>
        </div>
      </footer>

      {/* 13. MOBILE FIXED BOTTOM BAR - Call (blue), WhatsApp (green), Get Quote (orange) */}
      <div className="mobile-fixed-bottom-bar">
        <div className="mobile-bar-grid">
          <a
            href={SITE_CONFIG.PHONE_TEL}
            className="btn btn-secondary mobile-dock-btn"
            style={{ color: "var(--blue-800)", borderColor: "var(--blue-800)" }}
          >
            <Phone size={16} strokeWidth={2} />
            <span>Call</span>
          </a>

          <a
            href={SITE_CONFIG.WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mobile-dock-btn"
          >
            <MessageCircle size={16} strokeWidth={2} />
            <span>WhatsApp</span>
          </a>

          <a
            href="#booking-form-section"
            className="btn btn-primary mobile-dock-btn"
          >
            <span>Get Quote</span>
          </a>
        </div>
      </div>

      {/* Fallback Copy/Call Modal for Users Without WhatsApp */}
      {showCopyFallbackModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(11,31,58,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "24px", maxWidth: "480px", width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--blue-900)", marginBottom: "8px" }}>
              Alternative Booking Options
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              If you don&apos;t have WhatsApp or are on desktop, you can copy your booking details or call our Swargate desk directly:
            </p>

            <div style={{ background: "#F3F4F6", padding: "12px", borderRadius: "8px", fontSize: "0.8rem", whiteSpace: "pre-line", maxHeight: "160px", overflowY: "auto", border: "1px solid #E5E7EB", marginBottom: "16px" }}>
              {getBookingMessage()}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="btn btn-secondary"
                style={{ minHeight: "44px", fontSize: "0.85rem" }}
              >
                {copiedText ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedText ? "Copied!" : "Copy Details"}</span>
              </button>

              <a
                href={SITE_CONFIG.PHONE_TEL}
                className="btn btn-primary"
                style={{ minHeight: "44px", fontSize: "0.85rem" }}
              >
                <Phone size={16} />
                <span>Call Dispatch</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setShowCopyFallbackModal(false)}
              style={{ width: "100%", background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.82rem", cursor: "pointer", padding: "6px" }}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Floating Quick Action Buttons (Call & WhatsApp) for Desktop */}
      <div className="floating-quick-actions" aria-label="Quick contact buttons">
        <a
          href={SITE_CONFIG.PHONE_TEL}
          className="floating-action-btn floating-btn-call"
          title={`Call Vishal Travels at ${SITE_CONFIG.PHONE}`}
          aria-label="Call Dispatch Desk"
        >
          <Phone size={22} strokeWidth={2} />
          <span className="floating-badge">Call {SITE_CONFIG.PHONE}</span>
        </a>
        <a
          href={SITE_CONFIG.WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action-btn floating-btn-wa"
          title="Chat with Vishal Travels on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} strokeWidth={2} />
          <span className="floating-badge">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div style={{ position: "fixed", bottom: "85px", right: "20px", background: "var(--blue-900)", color: "#ffffff", padding: "12px 18px", borderRadius: "8px", boxShadow: "0 6px 20px rgba(0,0,0,0.25)", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "8px", zIndex: 1001 }}>
          <Check size={16} color="#86EFAC" />
          <span>{toast}</span>
        </div>
      )}
    </>
  );
}
