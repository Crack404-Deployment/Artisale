// components/myprofile/Wishlist.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { DiamondSeparator } from "@/components/ui/DiamondSeparator";

export interface WishlistItem {
  id: string;
  title: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  category: string;
}

const MOCK_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "wish-1",
    title: "Handcrafted Emerald Solitaire Pendant",
    vendor: "Solaris Fine Jewels",
    price: 2850,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
    inStock: true,
    category: "Fine Jewelry",
  },
  {
    id: "wish-2",
    title: "Royal Velvet Tailored Double-Breasted Blazer",
    vendor: "Aurelius Couture",
    price: 1420,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200",
    inStock: true,
    category: "Men's Clothing",
  },
  {
    id: "wish-3",
    title: "Tourbillon Chronograph Sapphire Timepiece",
    vendor: "Maison de Luxe",
    price: 8900,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654ece975?auto=format&fit=crop&q=80&w=1200",
    inStock: false,
    category: "Timepieces",
  },
  {
    id: "wish-4",
    title: "Hand-Burnished Tuscan Leather Travel Holdall",
    vendor: "Bespoke Heritage",
    price: 1150,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200",
    inStock: true,
    category: "Accessories",
  },
];

interface WishlistProps {
  onAddToCart?: (item: WishlistItem) => void;
  onAddProductClick?: () => void;
}

export const Wishlist = ({ onAddToCart, onAddProductClick }: WishlistProps) => {
  const [items, setItems] = useState<WishlistItem[]>(MOCK_WISHLIST_ITEMS);
  const pathname = usePathname();

  const navigationTabs = [
    { name: "Profile", path: "/myprofile/profile" },
    { name: "Orders", path: "/myprofile/orders" },
    { name: "Wishlist", path: "/myprofile/wishlist" },
  ];

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAcquire = (item: WishlistItem) => {
    if (!item.inStock) return;
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <section className="min-h-screen bg-eerie-1 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-crayola/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
       

        {/* TOP BANNER / HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola flex items-center gap-2">
              <Heart className="h-4 w-4 fill-gold-crayola/20" /> Curated Collection
            </span>
            <div className="flex items-center space-x-3">
              <DiamondSeparator />
              <h1 className="font-forum text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
                My Wishlist<span className="text-gold-crayola">.</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-quicksilver max-w-xl">
              Your personal archive of coveted luxury pieces, reserved for future acquisition.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link href="/marketplace" onClick={onAddProductClick}>
              <LuxuryButton className="cursor-pointer group flex items-center gap-2 bg-gold-crayola/10 border border-gold-crayola text-gold-crayola px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-gold-crayola hover:text-black hover:shadow-[0_0_20px_rgba(229,195,123,0.4)]">
                Add Product
              </LuxuryButton>
            </Link>
          </div>
        </div>

         {/* PAGE NAVIGATION TABS */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-px overflow-x-auto w-full mb-8 pt-2">
          {navigationTabs.map((tab) => {
            const isActive = pathname === tab.path || (tab.path === "/profile" && pathname === "/myprofile/profile");
            return (
              <Link
                key={tab.name}
                href={tab.path}
                className={`text-xs uppercase tracking-widest pb-3 whitespace-nowrap transition-all ${
                  isActive
                    ? "text-gold-crayola font-bold border-b-2 border-gold-crayola"
                    : "text-quicksilver hover:text-white border-b-2 border-transparent hover:border-white/30"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* WISHLIST STATS BAR */}
        <div className="flex items-center justify-between text-xs text-quicksilver uppercase tracking-widest py-2 px-1 border-b border-white/5">
          <span>{items.length} Saved {items.length === 1 ? "Piece" : "Pieces"}</span>
          <span className="hidden sm:block">Priority Insured Shipping Available</span>
        </div>

        {/* WISHLIST GRID */}
        {items.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-xs bg-smoky-3/50 backdrop-blur-md max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-crayola/10 flex items-center justify-center border border-gold-crayola/30">
              <Heart className="w-8 h-8 text-gold-crayola opacity-60" />
            </div>
            <div className="space-y-2">
              <h3 className="font-forum text-2xl text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-quicksilver max-w-md mx-auto">
                Explore our exclusive catalog and archive items you wish to acquire later.
              </p>
            </div>
            <Link href="/marketplace">
              <LuxuryButton className="cursor-pointer inline-flex items-center gap-2 bg-transparent border border-gold-crayola px-8 py-3 text-xs font-bold uppercase tracking-widest text-gold-crayola hover:bg-gold-crayola hover:text-black transition-all duration-300">
                Explore Catalog <ArrowRight className="w-4 h-4" />
              </LuxuryButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const discount = item.originalPrice
                ? Math.round((1 - item.price / item.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden border border-white/10 bg-smoky-3 backdrop-blur-xl transition-all duration-500 hover:border-gold-crayola/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.8)] rounded-xs"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-eerie-4">
                    <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                      {discount > 0 ? (
                        <span className="bg-gold-crayola px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-eerie-1">
                          {discount}% OFF
                        </span>
                      ) : (
                        <span className="bg-white/10 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white border border-white/15">
                          {item.category}
                        </span>
                      )}

                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-xs border ${
                          item.inStock
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                            : "bg-red-500/10 border-red-500/40 text-red-400"
                        }`}
                      >
                        {item.inStock ? "Available" : "Out of Stock"}
                      </span>
                    </div>

                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <button
                      onClick={() => removeItem(item.id)}
                      title="Remove from wishlist"
                      className="absolute bottom-3 right-3 z-10 cursor-pointer p-2 bg-black/60 backdrop-blur-md border border-white/20 text-quicksilver hover:text-red-400 hover:border-red-400/50 transition-all rounded-xs opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[2px] text-gold-crayola block mb-1">
                        {item.vendor}
                      </span>

                      <Link href={`/product/${item.id}`} className="cursor-pointer block">
                        <h3 className="font-forum text-lg text-white transition-colors hover:text-gold-crayola line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-quicksilver uppercase tracking-wider mb-0.5">Valuation</span>
                          <div className="flex items-baseline space-x-2">
                            <span className="font-forum text-xl font-bold text-white">
                              ${item.price.toLocaleString()}
                            </span>
                            {item.originalPrice && (
                              <span className="text-[11px] text-quicksilver line-through">
                                ${item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.inStock ? (
                        <LuxuryButton
                          onClick={() => handleAcquire(item)}
                          className="group/btn cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-gold-crayola bg-transparent text-gold-crayola hover:bg-gold-crayola hover:text-eerie-1 hover:shadow-[0_0_20px_rgba(229,195,123,0.4)] hover:scale-[1.02]"
                        >
                          Acquire
                        </LuxuryButton>
                      ) : (
                        <button
                          disabled
                          type="button"
                          className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-quicksilver/40 cursor-not-allowed pointer-events-none rounded-xs select-none"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-quicksilver/40" />
                          Out Of Stock
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;