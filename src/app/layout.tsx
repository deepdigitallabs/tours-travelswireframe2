import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bus Rental in Pune | Tempo Traveller & Luxury Coach Hire – Vishal Travels",
  description:
    "Hire AC tempo travellers (9–27 seater), mini buses, Force Urbanias & luxury coaches in Pune. Police-verified drivers, GPS-tracked fleet, 24/7 availability. Call Vishal Travels: +91 9764564699",
  keywords: [
    "bus rental pune",
    "tempo traveller hire pune",
    "vishal travels pune",
    "force urbania rental pune",
    "luxury bus hire pune",
    "ashtavinayak darshan bus",
    "5 jyotirlinga yatra from pune",
    "pune to mumbai bus rental",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
