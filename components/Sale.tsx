// components/Sale.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Search, X, Clock, Flame, Sparkles } from "lucide-react";
import { Product } from "@/types/marketplace";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";

// 1. We use the exact same generation logic to ensure data consistency
const CATEGORY_TREE = [
  {
    name: "Men's Clothing",
    subcategories: ["Shirts", "T-Shirts", "Pants", "Suits & Blazers", "Outerwear"],
  },
  {
    name: "Women's Clothing",
    subcategories: ["Dresses", "Tops & Blouses", "Pants & Denim", "Skirts", "Outerwear"],
  },
  {
    name: "Accessories",
    subcategories: ["Timepieces & Watches", "Fine Jewelry", "Sunglasses", "Belts & Leather"],
  }
];

const generateMockProducts = (): Product[] => {
  const vendors = [
    { name: "Solaris Fine Jewels", rating: 5.0, verified: true },
    { name: "Aurelius Couture", rating: 4.9, verified: true },
    { name: "Maison de Luxe", rating: 4.8, verified: true },
  ];

  const imageMap: Record<string, string> = {
    "Suits & Blazers": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200",
    "Dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200",
    "Timepieces & Watches": "https://images.unsplash.com/photo-1524592094714-0f0654ece975?auto=format&fit=crop&q=80&w=1200",
    "Fine Jewelry": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
  };

  const items: Product[] = [];
  let idCount = 1;

  CATEGORY_TREE.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      const imageUrl = imageMap[sub] || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800";
      
      for (let i = 1; i <= 4; i++) {
        const price = ((idCount * 137) % 800) + 120;
        const originalPrice = price + ((idCount * 43) % 200) + 50;
        
        items.push({
          id: `prod-${idCount}`,
          title: `${sub} Exclusive ${i}`,
          price: price,
          originalPrice: originalPrice,
          category: cat.name,
          subcategory: sub,
          description: `A masterfully crafted ${sub.toLowerCase()} piece. Available now at an exceptional value.`,
          image: imageUrl,
          tag: i % 3 === 0 ? "Sale" : idCount % 7 === 0 ? "Limited" : undefined,
          vendor: vendors[idCount % vendors.length],
        } as any);
        idCount++;
      }
    });
  });

  return items;
};

const STATIC_PRODUCTS = generateMockProducts();

interface SaleProps {
  onAddToCart?: (product: Product) => void;
}

export const Sale = ({ onAddToCart }: SaleProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  // Animated Live Countdown Effect
  useEffect(() => {
    // Fixed target time set to 3 days, 14 hours from current session initiation
    const targetTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (42 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter ONLY for the Sale items and apply search query
  const filteredSaleItems = useMemo(() => {
    const saleItems = STATIC_PRODUCTS.filter(product => product.tag === "Sale");
    const query = searchQuery.trim().toLowerCase();

    if (!query) return saleItems;

    return saleItems.filter((product: any) => {
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <section className="min-h-screen bg-eerie-1 text-white pt-24 pb-16 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* PAGE HEADER */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola flex items-center justify-center gap-2 mb-4">
            <Tag className="h-4 w-4" /> Private Archive
          </span>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <DiamondSeparator />
            <h1 className="font-forum text-4xl md:text-6xl">Seasonal Sale</h1>
            <DiamondSeparator />
          </div>
          <p className="text-sm text-quicksilver max-w-xl mx-auto mb-8">
            An exclusive opportunity to acquire rare archival pieces and seasonal markdowns at exceptional value.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search sale pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-eerie-2 border border-white/20 py-3.5 pl-12 pr-10 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs shadow-inner"
              />
              <Search className="absolute left-4 h-4 w-4 text-gold-crayola pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 cursor-pointer text-quicksilver hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CONDITIONAL RENDER: Empty State vs Grid */}
        {filteredSaleItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-xs bg-smoky-3">
            <p className="text-sm text-quicksilver">No sale items matched your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 cursor-pointer text-xs uppercase tracking-widest text-gold-crayola underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {/* SALE GRID */}
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-forum text-2xl text-white">Curated Markdowns</h3>
              <span className="text-xs text-quicksilver uppercase tracking-widest">{filteredSaleItems.length} Pieces Found</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredSaleItems.map((product) => {
                // Calculate discount percentage
                const discount = product.originalPrice 
                  ? Math.round((1 - product.price / product.originalPrice) * 100) 
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden border border-white/10 bg-smoky-3 transition-all duration-300 hover:border-gold-crayola/50 hover:shadow-2xl"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-eerie-4">
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 z-10 bg-gold-crayola px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-eerie-1">
                          {discount}% OFF
                        </span>
                      )}

                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[2px] text-gold-crayola block mb-1">
                          {product.vendor.name}
                        </span>
                        
                        <Link href={`/product/${product.id}`} className="cursor-pointer block w-fit">
                          <h3 className="font-forum text-lg text-white transition-colors hover:text-gold-crayola line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                      </div>

                      <div className="mt-6 flex flex-col items-start justify-between border-t border-white/10 pt-4 gap-4">
                        <div className="flex flex-col">
                          <span className="block text-[10px] text-quicksilver uppercase tracking-wider mb-0.5">Sale Price</span>
                          <div className="flex items-baseline space-x-2">
                            <span className="font-forum text-xl font-bold text-white">
                              ${product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-quicksilver line-through">
                                ${product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <LuxuryButton
                          onClick={() => onAddToCart && onAddToCart(product)}
                          className="cursor-pointer flex items-center justify-center bg-transparent border border-gold-crayola px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-gold-crayola transition-all hover:bg-gold-crayola hover:text-eerie-1 w-full"
                        >
                          Acquire Now
                        </LuxuryButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* ANIMATED COUNTDOWN TIMER BANNER SECTION */}
        {/* ========================================================================= */}
        <div className="mt-24 relative overflow-hidden border border-white/15 bg-gradient-to-br from-eerie-2 via-black to-eerie-1 p-8 sm:p-12 lg:p-16 rounded-xs shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
          
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-crayola/10 blur-[130px] pointer-events-none rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[250px] h-[250px] bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="text-center lg:text-left max-w-lg space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-crayola/10 border border-gold-crayola/30 text-gold-crayola text-[10px] font-bold uppercase tracking-[3px] rounded-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-crayola opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-crayola"></span>
                </span>
                Limited Time Vault Access
              </div>

              <h2 className="font-forum text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                Flash Event Ending<span className="text-gold-crayola">.</span>
              </h2>

              <p className="text-xs sm:text-sm text-quicksilver leading-relaxed">
                Once the countdown reaches zero, all private markdowns will be withdrawn and restored to original catalog valuations.
              </p>
            </div>

            {/* Right: Animated Digital Clock Cards */}
            <div className="flex flex-col items-center lg:items-end space-y-6">
              
              <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
                
                {/* DAYS */}
                <div className="relative group overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl p-3 sm:p-5 rounded-xs min-w-[70px] sm:min-w-[100px] shadow-lg transition-all duration-300 hover:border-gold-crayola/60">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <span className="font-forum text-2xl sm:text-4xl lg:text-5xl text-white font-light block tracking-tight">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[2px] text-gold-crayola mt-1 sm:mt-2 block">
                    Days
                  </span>
                </div>

                {/* HOURS */}
                <div className="relative group overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl p-3 sm:p-5 rounded-xs min-w-[70px] sm:min-w-[100px] shadow-lg transition-all duration-300 hover:border-gold-crayola/60">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <span className="font-forum text-2xl sm:text-4xl lg:text-5xl text-white font-light block tracking-tight">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[2px] text-gold-crayola mt-1 sm:mt-2 block">
                    Hours
                  </span>
                </div>

                {/* MINUTES */}
                <div className="relative group overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl p-3 sm:p-5 rounded-xs min-w-[70px] sm:min-w-[100px] shadow-lg transition-all duration-300 hover:border-gold-crayola/60">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  <span className="font-forum text-2xl sm:text-4xl lg:text-5xl text-white font-light block tracking-tight">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[2px] text-gold-crayola mt-1 sm:mt-2 block">
                    Mins
                  </span>
                </div>

                {/* SECONDS */}
                <div className="relative group overflow-hidden border border-gold-crayola/40 bg-gold-crayola/5 backdrop-blur-xl p-3 sm:p-5 rounded-xs min-w-[70px] sm:min-w-[100px] shadow-lg transition-all duration-300 hover:border-gold-crayola">
                  <div className="absolute inset-0 bg-gradient-to-b from-gold-crayola/10 to-transparent pointer-events-none" />
                  <span className="font-forum text-2xl sm:text-4xl lg:text-5xl text-gold-crayola font-light block tracking-tight animate-pulse">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[2px] text-gold-crayola/80 mt-1 sm:mt-2 block">
                    Secs
                  </span>
                </div>

              </div>

              {/* Action Banner Button */}
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-gold-crayola animate-bounce" />
                <span className="text-xs font-medium uppercase tracking-widest text-quicksilver">
                  Complementary priority insured shipping included
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};