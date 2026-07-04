import type { Metadata } from "next";
import { Inter, Syne, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VYQOR LABS",
  description:
    "VYQOR LABS delivers innovative digital solutions that help businesses thrive in a rapidly evolving technological landscape.",
  icons: {
    icon: "/logo_vyqor.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${syne.variable} ${outfit.variable} antialiased`}
      >
        {/* Navbar */}
        <Navbar />
        {children}
        <Toaster />
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
