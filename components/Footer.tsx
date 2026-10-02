// components/Footer.tsx
import Link from "next/link";
import { Globe } from "lucide-react";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-eerie-3 text-quicksilver">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Brand Identity & Social Links Block */}
          <div className="space-y-6 lg:col-span-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-crayola/40 bg-eerie-1 text-gold-crayola shadow-lg">
                <span className="font-forum text-xl font-bold">A</span>
              </div>
              <Link href="/" className="font-forum text-3xl font-normal tracking-widest text-white">
                Artisale<span className="text-gold-crayola">.</span>
              </Link>
            </div>

            <p className="text-xs leading-relaxed text-quicksilver max-w-sm">
              The premiere global multi-vendor destination for independent master artisans, fine jewelers, and luxury craft houses.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://crack404.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-eerie-1 text-white transition-all duration-300 hover:border-gold-crayola hover:text-gold-crayola hover:scale-105 focus:outline-none focus:ring-1 focus:ring-gold-crayola"
              >
                <Globe className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/crack404/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-eerie-1 text-white transition-all duration-300 hover:border-gold-crayola hover:text-gold-crayola hover:scale-105 focus:outline-none focus:ring-1 focus:ring-gold-crayola"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/people/Crack404/61564752971614/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-eerie-1 text-white transition-all duration-300 hover:border-gold-crayola hover:text-gold-crayola hover:scale-105 focus:outline-none focus:ring-1 focus:ring-gold-crayola"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="font-forum text-lg text-white mb-4">Marketplace</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Timepieces & Horology</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Fine Jewelry</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Leather Atelier</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Haute Couture</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-forum text-lg text-white mb-4">Artisans & Guilds</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Become a Vendor</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Seller Standards</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Provenance Verification</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Artisan Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-forum text-lg text-white mb-4">Client Care</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">VIP Concierge Service</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Global Shipping & Insurance</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Authentication Guarantee</Link></li>
                <li><Link href="#" className="hover:text-gold-crayola transition-colors">Private Viewing Appointments</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Luxury Button CTA */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-8 text-xs gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Artisale Luxury Marketplace. All rights reserved.</p>
          
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-gold-crayola transition-colors">Privacy Policy</Link>
            <DiamondSeparator />
            <Link href="#" className="hover:text-gold-crayola transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};