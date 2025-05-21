import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footbar from "@/components/Footbar";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Buyzaar - Ecommerce Platform",
  description: "This is Buyzaar a fully functional e-commerce webapp",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">
          {children}
          </main>
          <Footbar />
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
