// components/VendorSpotlight.tsx
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import { mockVendors } from "@/data/marketplaceData";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";

export const VendorSpotlight = () => {
  return (
    <section id="vendors" className="py-24 bg-eerie-1">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
            Artisanal Guilds
          </span>
          <div className="my-2 flex items-center justify-center space-x-3">
            <DiamondSeparator />
            <h2 className="font-forum text-4xl text-white md:text-5xl">Featured Artisans</h2>
            <DiamondSeparator />
          </div>
          <p className="text-sm text-quicksilver max-w-lg mx-auto">
            Direct access to private workshops and master craftspeople across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {mockVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group relative border border-white/10 bg-smoky-3 p-8 text-center transition-all duration-500 hover:border-gold-crayola hover:-translate-y-1"
            >
              <div className="relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-gold-crayola">
                <Image
                  src={vendor.avatar}
                  alt={vendor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex items-center justify-center space-x-2">
                <h3 className="font-forum text-2xl text-white">{vendor.name}</h3>
                {vendor.verified && <CheckCircle className="h-4 w-4 text-gold-crayola" />}
              </div>

              <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gold-crayola">
                {vendor.badge}
              </p>

              <div className="my-4 flex items-center justify-center space-x-1 text-xs text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="font-bold text-white">{vendor.rating}</span>
                <span className="text-quicksilver">(120+ authentic reviews)</span>
              </div>

              <button className="mt-4 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-white transition-colors group-hover:text-gold-crayola">
                <span>Visit Boutique</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Browse All Artisans Luxury Button */}
        <div className="flex justify-center">
          <Link href="/artisanguild">
            <LuxuryButton>Browse All Artisans</LuxuryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};