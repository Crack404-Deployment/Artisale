"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Search, X } from "lucide-react";
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
        
        items.push({
          id: `prod-${idCount}`,
          title: `${sub} Exclusive ${i}`,
          price: price,
          originalPrice: price + 150,
          category: cat.name,
          subcategory: sub,
          description: `A masterfully crafted ${sub.toLowerCase()} piece. Highly restricted allocation.`,
          image: imageUrl,
          // SAME LOGIC AS MARKETPLACE: Every 7th item is Limited
          tag: i % 4 === 0 ? "New Arrival" : idCount % 7 === 0 ? "Limited" : undefined,
          vendor: vendors[idCount % vendors.length],
        } as any);
        idCount++;
      }
    });
  });

  return items;
};

const STATIC_PRODUCTS = generateMockProducts();

interface SpotlightProps {
  onAddToCart?: (product: Product) => void;
}

export const Spotlight = ({ onAddToCart }: SpotlightProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Filter ONLY for the limited edition items and apply search query
  const filteredLimitedItems = useMemo(() => {
    const limitedItems = STATIC_PRODUCTS.filter(product => product.tag === "Limited");
    const query = searchQuery.trim().toLowerCase();

    if (!query) return limitedItems;

    return limitedItems.filter((product: any) => {
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
            <Clock className="h-4 w-4" /> The Vault
          </span>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <DiamondSeparator />
            <h1 className="font-forum text-4xl md:text-6xl">Limited Edition</h1>
            <DiamondSeparator />
          </div>
          <p className="text-sm text-quicksilver max-w-xl mx-auto mb-8">
            A highly curated selection of rare, small-batch, and highly allocated pieces. Once these are acquired, they will not return.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search exclusive pieces..."
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
        {filteredLimitedItems.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-xs bg-smoky-3">
            <p className="text-sm text-quicksilver">No limited edition items matched your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 cursor-pointer text-xs uppercase tracking-widest text-gold-crayola underline"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {/* REMAINING LIMITED EDITION GRID */}
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-forum text-2xl text-white">Rare Finds</h3>
              <span className="text-xs text-quicksilver uppercase tracking-widest">{filteredLimitedItems.length} Pieces Found</span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredLimitedItems.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden border border-white/10 bg-smoky-3 transition-all duration-300 hover:border-gold-crayola/50 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-eerie-4">
                    <span className="absolute top-3 left-3 z-10 border border-gold-crayola bg-eerie-1/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-crayola backdrop-blur-sm">
                      1 of 50
                    </span>

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
                      <div className="flex items-baseline space-x-2">
                        <span className="font-forum text-xl font-bold text-white">
                          ${product.price.toLocaleString()}
                        </span>
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
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};