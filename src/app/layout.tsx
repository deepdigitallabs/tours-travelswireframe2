import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bus Rental in Pune | Tempo Traveller Hire | Vishal Travels",
  description:
    "Hire Force Urbania VIP, AC Tempo Travellers (13–26 seater) & luxury buses in Pune. Verified drivers, GPS fleet & upfront tariff. Call +91 98220 44555.",
  metadataBase: new URL("https://vishaltravelspune.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bus Rental in Pune | Tempo Traveller Hire | Vishal Travels",
    description:
      "Hire Force Urbania VIP, AC Tempo Travellers (13–26 seater) & luxury coaches in Pune. 100% transparent pricing & GPS fleet.",
    url: "https://vishaltravelspune.com",
    siteName: "Vishal Travels Pune",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero_fleet.jpg",
        width: 1200,
        height: 630,
        alt: "Vishal Travels Pune Executive Fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bus Rental in Pune | Tempo Traveller Hire | Vishal Travels",
    description:
      "Executive Force Urbania VIP, AC Tempo Travellers & Luxury Buses in Pune. Call +91 98220 44555.",
    images: ["/images/hero_fleet.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://vishaltravelspune.com/#agency",
        name: "Vishal Travels Pune",
        url: "https://vishaltravelspune.com",
        logo: "https://vishaltravelspune.com/images/hero_fleet.jpg",
        image: "https://vishaltravelspune.com/images/hero_fleet.jpg",
        description:
          "Licensed passenger transport service in Pune offering Force Urbania VIP, AC Tempo Travellers (13-26 seater), mini buses, and luxury Volvo coaches.",
        telephone: "+919822044555",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop No. 14, Ground Floor, Pune-Satara Road, Near Swargate Bus Stand, Swargate",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411042",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "18.5018",
          longitude: "73.8596",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          ratingCount: "1420",
          reviewCount: "1420",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
