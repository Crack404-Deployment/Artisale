// components/HomeCatalog.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DiamondSeparator } from "./ui/DiamondSeparator";

interface HomeCatalogProps {
  products?: any[];
  onAddToCart?: (product: any) => void;
}

const catalogs = [
  {
    name: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800",
    items: ["Shirts", "T-Shirts", "Pants", "Suits & Blazers", "Outerwear"],
  },
  {
    name: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800",
    items: ["Dresses", "Tops & Blouses", "Pants & Denim", "Skirts", "Outerwear"],
  },
  {
    name: "Baby & Kids",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=800",
    items: ["Clothing Sets", "Tops & Bodysuits", "Bottoms"],
  },
  {
    name: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800",
    items: ["Handbags & Totes", "Backpacks", "Travel & Luggage", "Clutches & Wallets"],
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
    items: ["Timepieces & Watches", "Fine Jewelry", "Sunglasses", "Belts & Leather"],
  },
  {
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800",
    items: ["Sneakers", "Formal Shoes", "Heels & Pumps", "Boots"],
  },
];

export const HomeCatalog = ({}: HomeCatalogProps) => {
  return (
    <section id="catalog" className="py-24 bg-eerie-1 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
            Our Offerings
          </span>
          <div className="my-2 flex items-center justify-center space-x-3">
            <DiamondSeparator />
            <h2 className="font-forum text-4xl text-white md:text-5xl">Explore Categories</h2>
            <DiamondSeparator />
          </div>
          <p className="text-sm text-quicksilver max-w-lg mx-auto">
            Discover our curated selection of premium handcrafted goods and authentic luxury items.
          </p>
        </motion.div>

        {/* 2-Column Grid with 3D Perspective & Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {catalogs.map((catalog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1],
                delay: (index % 2) * 0.1 // Slight stagger for the right column
              }}
              className="group relative h-[350px] sm:h-[400px] w-full [perspective:2000px] cursor-default"
            >
              {/* Inner wrapper that performs the actual rotation */}
              <div className="relative h-full w-full transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">
                
                {/* 1. FRONT OF CARD (Image Only) */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-sm bg-eerie-2">
                  <Image
                    src={catalog.image}
                    alt={catalog.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle dark gradient overlay to keep it feeling luxurious */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                </div>

                {/* 2. BACK OF CARD (Text & Bullets) */}
                {/* [transform:rotateY(180deg)] starts it flipped away from the user */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-sm bg-eerie-2 border border-gold-crayola/40 p-8 flex flex-col items-center justify-center">
                  
                  {/* Decorative corner accents for luxury feel */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-crayola/50" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-crayola/50" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-crayola/50" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-crayola/50" />

                  {/* Category Title */}
                  <h3 className="text-3xl md:text-4xl font-forum text-white mb-8 relative tracking-wide text-center">
                    {catalog.name}
                    <span className="absolute -bottom-4 left-1/2 w-16 h-[2px] bg-gold-crayola -translate-x-1/2"></span>
                  </h3>
                  
                  {/* Bulleted Products List */}
                  <ul className="space-y-3 mt-4 text-sm md:text-base text-quicksilver">
                    {catalog.items.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-gold-crayola text-lg leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};