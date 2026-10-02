// components/HomeCatalog.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star, CheckCircle, X } from "lucide-react";
import { Product } from "@/types/marketplace";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";

interface HomeCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const HomeCatalog = ({ products, onAddToCart }: HomeCatalogProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="catalog" className="py-20 bg-eerie-1">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
            Curated Collection
          </span>
          <div className="my-2 flex items-center justify-center space-x-3">
            <DiamondSeparator />
            <h2 className="font-forum text-4xl text-white md:text-5xl">Featured Products</h2>
            <DiamondSeparator />
          </div>
          <p className="text-sm text-quicksilver max-w-lg mx-auto">
            Discover authenticated timepieces, jewelry, and leather goods directly from master craftspeople.
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-sm">
            <p className="text-sm text-quicksilver">No luxury items currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col border border-white/10 bg-smoky-3 p-4 transition-all duration-300 hover:border-gold-crayola/50 hover:shadow-2xl"
              >
                {/* Product Image Box */}
                <div className="relative aspect-square w-full overflow-hidden bg-eerie-4">
                  {product.tag && (
                    <span className="absolute top-3 left-3 z-10 bg-gold-crayola px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-eerie-1">
                      {product.tag}
                    </span>
                  )}

                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Single ADD Button Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-eerie-1/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex w-full items-center justify-center space-x-2 border border-gold-crayola bg-eerie-1/90 py-2.5 text-xs font-bold uppercase tracking-widest text-gold-crayola transition-all hover:bg-gold-crayola hover:text-eerie-1"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    {/* Vendor Badge */}
                    <div className="flex items-center justify-between text-xs text-quicksilver mb-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-semibold text-white">{product.vendor.name}</span>
                        {product.vendor.verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-gold-crayola" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-[11px] font-bold text-white">{product.vendor.rating}</span>
                      </div>
                    </div>

                    {/* Clickable Product Name */}
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="font-forum text-xl text-white transition-colors hover:text-gold-crayola cursor-pointer line-clamp-2"
                      title="Click to view details"
                    >
                      {product.title}
                    </h3>

                    <p className="mt-2 text-xs text-quicksilver line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline space-x-3 border-t border-white/5 pt-3">
                    <span className="font-forum text-2xl font-bold text-gold-crayola">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-quicksilver line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Browse All Products CTA */}
        <div className="mt-14 flex justify-center">
          <Link href="/marketplace">
            <LuxuryButton variant="primary">
              Browse All Products
            </LuxuryButton>
          </Link>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl border border-gold-crayola/40 bg-eerie-1 p-6 md:p-8 rounded-sm shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 text-quicksilver hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-square w-full overflow-hidden border border-white/10">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-crayola">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-forum text-3xl text-white mt-1">{selectedProduct.title}</h2>
                  
                  <div className="my-3 flex items-center space-x-2 text-xs text-quicksilver">
                    <span>Crafted by {selectedProduct.vendor.name}</span>
                    <CheckCircle className="h-3.5 w-3.5 text-gold-crayola" />
                  </div>

                  <p className="text-xs text-quicksilver leading-relaxed my-4">
                    {selectedProduct.description}
                  </p>

                  <div className="flex items-baseline space-x-3 mb-6">
                    <span className="font-forum text-3xl font-bold text-gold-crayola">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-quicksilver line-through">
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <LuxuryButton
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Add To Cart
                </LuxuryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};