import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RoyalVoyage Travels | Luxury Bus & Travel Rental Booking Platform",
  description:
    "Unified Bus & Travel Rental Booking Platform. Hire luxury sleeper buses (Volvo 9600), Force Urbania, executive Tempo Travellers, and wedding fleet across India with live GPS tracking and verified drivers.",
  keywords: [
    "bus rental",
    "tempo traveller hire",
    "volvo 9600 rental",
    "wedding bus booking",
    "corporate staff transport",
    "outstation travels",
    "royalvoyage",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
