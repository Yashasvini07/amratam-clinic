import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amratamclinic.com"),
  title: "Dr. Abhilasha Chourasiya | Electrohomeopathy & Bachflower",
  description: "Holistic healthcare through Electrohomeopathy and Bachflower. Personalized treatment plans focused on natural healing and long-term wellness.",

  keywords: [
    "Electrohomeopathy",
    "Bachflower",
    "Holistic Medicine",
    "Natural Healing",
    "Wellness Clinic",
    "Alternative Medicine",
    "Dr. Abhilasha Chourasiya",
  ],

  authors: [
    {
      name: "Dr. Abhilasha Chourasiya",
    },
  ],

  creator: "Dr. Abhilasha Chourasiya",

  openGraph: {
    title: "Dr. Abhilasha Chourasiya",
    description:
      "Holistic healthcare through Electrohomeopathy and Bachflower.",
    url: "https://www.amratamclinic.com",
    siteName: "Amratam Clinic",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amratam Clinic",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. Abhilasha Chourasiya",
    description:
      "Holistic healthcare through Electrohomeopathy and Bachflower.",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
