// components/ArtisanShop.tsx
"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Star, 
  CheckCircle, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck 
} from "lucide-react";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";
import { mockVendors, mockProducts } from "@/data/marketplaceData";

interface ArtisanShopProps {
  onAddToCart?: (product: any) => void;
}

function ArtisanShopContent({ onAddToCart }: ArtisanShopProps) {
  const searchParams = useSearchParams();
  const vendorParam = searchParams.get("vendor");

  // Find vendor matching query ID or default to first vendor
  const vendor = mockVendors.find(
    (v) => String(v.id) === String(vendorParam)
  ) || mockVendors[0];

  // Filter products for this vendor
  const vendorProducts = mockProducts.filter(
    (p: any) => String(p.vendorId) === String(vendor.id) || p.vendor === vendor.name
  );

  // Fallback to all mock products if no vendor match is found
  const displayProducts = vendorProducts.length > 0 ? vendorProducts : mockProducts;

  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(displayProducts.map((p: any) => p.category)))];

  const filteredProducts = activeCategory === "All" 
    ? displayProducts 
    : displayProducts.filter((p: any) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* ================= ATELIER HERO BANNER ================= */}
      <section className="relative h-[280px] md:h-[360px] w-full overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop"
          alt="Atelier Banner"
          fill
          className="object-cover object-center filter brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eerie-1 via-eerie-1/60 to-transparent" />
      </section>

      {/* ================= VENDOR PROFILE HEADER ================= */}
      <section className="relative container mx-auto px-4 md:px-8 -mt-20 z-10 pb-16 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 bg-smoky-3/95 border border-white/10 p-6 md:p-8 backdrop-blur-md shadow-2xl">
          {/* Avatar & Details */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 text-center md:text-left">
            <div className="relative h-24 w-24 md:h-28 md:w-28 overflow-hidden rounded-full border-2 border-gold-crayola shadow-xl shrink-0">
              <Image
                src={vendor.avatar}
                alt={vendor.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="font-forum text-3xl md:text-4xl text-white">{vendor.name}</h1>
                {vendor.verified && <CheckCircle className="h-5 w-5 text-gold-crayola" />}
              </div>

              <p className="text-xs font-bold uppercase tracking-widest text-gold-crayola">
                {vendor.badge || "Master Artisan Guild Member"}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-quicksilver pt-1">
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-white">{vendor.rating || "4.9"}</span>
                  <span className="text-quicksilver">(140+ Authentic Reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-gold-crayola" />
                  <span>Florence, Italy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-crayola" />
                  <span>Verified Lineage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats & Action */}
          <div className="flex flex-col items-center md:items-end space-y-3 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
            <div className="flex space-x-6 text-center">
              <div>
                <span className="block font-forum text-2xl text-white">{displayProducts.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-quicksilver">Creations</span>
              </div>
              <div className="border-r border-white/10 h-8 my-auto" />
              <div>
                <span className="block font-forum text-2xl text-white">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-quicksilver">Handcrafted</span>
              </div>
            </div>

            <LuxuryButton className="px-6 py-2 text-xs">
              Follow Atelier
            </LuxuryButton>
          </div>
        </div>

        {/* About Bio Section */}
        <div className="mt-8 max-w-3xl">
          <h2 className="font-forum text-2xl text-white mb-2">About the Atelier</h2>
          <p className="text-xs text-quicksilver leading-relaxed">
            Preserving centuries of heritage technique, this private workshop specializes in bespoke luxury creations crafted with rare, ethically sourced materials. Each masterwork carries a unique digital passport verifying its origin and craftsmanship.
          </p>
        </div>
      </section>

      {/* ================= PRODUCTS MARKETPLACE ================= */}
      <section className="py-16 bg-eerie-1">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
              Bespoke Collection
            </span>
            <div className="my-2 flex items-center justify-center space-x-3">
              <DiamondSeparator />
              <h2 className="font-forum text-4xl text-white">Available Creations</h2>
              <DiamondSeparator />
            </div>
          </div>

          {/* Category Filter Tabs */}
          {categories.length > 1 && (
            <div className="flex items-center justify-center space-x-3 mb-10 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-xs border ${
                    activeCategory === category
                      ? "border-gold-crayola bg-gold-crayola/10 text-gold-crayola"
                      : "border-white/10 bg-smoky-3 text-quicksilver hover:border-white/30 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Product Cards Grid — EXACT SAME CARD DESIGN AS MARKETPLACE */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product: any) => {
              const vendorData = product.vendor || {
                name: vendor.name,
                verified: vendor.verified,
                rating: vendor.rating || 4.9,
              };

              const numericPrice = typeof product.price === "number" ? product.price : parseFloat(product.price) || 0;
              const numericOriginalPrice = product.originalPrice 
                ? (typeof product.originalPrice === "number" ? product.originalPrice : parseFloat(product.originalPrice))
                : null;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col border border-white/10 bg-smoky-3 p-4 transition-all duration-300 hover:border-gold-crayola/50 hover:shadow-2xl"
                >
                  {/* Image Container & Tag */}
                  <div className="relative aspect-square w-full overflow-hidden bg-eerie-4">
                    {product.tag && (
                      <span className="absolute top-3 left-3 z-10 bg-gold-crayola px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-eerie-1">
                        {product.tag}
                      </span>
                    )}

                    <Link href={`/product/${product.id}`} className="cursor-pointer block h-full w-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Hover Add to Cart Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eerie-1/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                      <button
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className="cursor-pointer flex w-full items-center justify-center space-x-2 border border-gold-crayola bg-eerie-1/90 py-2.5 text-xs font-bold uppercase tracking-widest text-gold-crayola transition-all hover:bg-gold-crayola hover:text-eerie-1 pointer-events-auto"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>ADD To Cart</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-quicksilver mb-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-semibold text-white">{vendorData.name}</span>
                          {vendorData.verified && (
                            <CheckCircle className="h-3.5 w-3.5 text-gold-crayola" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-amber-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-[11px] font-bold text-white">{vendorData.rating}</span>
                        </div>
                      </div>

                      <Link href={`/productdetails?id=${product.id}`} className="cursor-pointer block">
                        <h3
                          className="font-forum text-xl text-white transition-colors hover:text-gold-crayola line-clamp-2"
                          title={product.title}
                        >
                          {product.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-quicksilver line-clamp-2 leading-relaxed">
                        {product.description || "A beautiful handcrafted piece. Premium materials designed for elegance and longevity."}
                      </p>
                    </div>

                    <div className="mt-4 flex items-baseline space-x-3 border-t border-white/5 pt-3">
                      <span className="font-forum text-2xl font-bold text-gold-crayola">
                        ${numericPrice.toFixed(2)}
                      </span>
                      {numericOriginalPrice && (
                        <span className="text-xs text-quicksilver line-through">
                          ${numericOriginalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export const ArtisanShop = (props: ArtisanShopProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 w-full items-center justify-center text-gold-crayola">
          Loading Atelier...
        </div>
      }
    >
      <ArtisanShopContent {...props} />
    </Suspense>
  );
};