// components/HeroSlider.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Shirt, 
  Sparkles, 
  Footprints, 
  Backpack, 
  Watch, 
  Star, 
  Baby 
} from "lucide-react";
import Link from "next/link";
import { LuxuryButton } from "./ui/LuxuryButton";

const slides = [
  {
    subtitle: "Bespoke Tailoring",
    title: "Men's\nCollection",
    description: "Discover masterfully crafted men's clothing, from classic suits to elevated casual wear.",
    cta: "View Men's Clothing",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1600",
    category: "Men's Clothing",
    icon: Shirt,
  },
  {
    subtitle: "Elegance Redefined",
    title: "Women's\nCollection",
    description: "Explore exquisite dresses, tops, and outerwear designed for timeless sophistication.",
    cta: "View Women's Clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600",
    category: "Women's Clothing",
    icon: Sparkles,
  },
  {
    subtitle: "Step Into Luxury",
    title: "Artisan\nFootwear",
    description: "Exquisite craftsmanship meets unparalleled comfort in our curated shoe collection.",
    cta: "Shop Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600",
    category: "Shoes",
    icon: Footprints,
  },
  {
    subtitle: "Luxury Carry",
    title: "Designer\nBags",
    description: "Handcrafted leather totes, clutches, and travel luggage for every occasion.",
    cta: "Explore Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1600",
    category: "Bags",
    icon: Backpack,
  },
  {
    subtitle: "Timeless Crafts & Horology",
    title: "Fine\nAccessories",
    description: "Handcrafted timepieces, fine jewelry, and sunglasses certified with digital provenance.",
    cta: "View Accessories",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600",
    category: "Accessories",
    icon: Watch,
  },
  {
    subtitle: "Radiant Wellness",
    title: "Personal\nCare",
    description: "Indulge in luxurious perfumes, body oils, and artisan skincare essentials.",
    cta: "Shop Personal Care",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600",
    category: "Personal Care",
    icon: Star,
  },
  {
    subtitle: "Gentle & Joyful",
    title: "Baby & Kids\nBoutique",
    description: "Premium, artisan-crafted clothing sets and accessories for the little ones.",
    cta: "Shop Baby & Kids",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1600",
    category: "Baby & Kids",
    icon: Baby,
  },
];

// Fixed angles positioning 3 icons on the right (-60°, 0°, 60°) and 3 on the left (120°, 180°, 240°)
const angles = [-60, 0, 60, 120, 180, 240];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Active center icon
  const ActiveIcon = slides[current].icon;

  // Filter out current active slide to get the remaining 6 categories
  const otherCategories = slides
    .map((slide, index) => ({ ...slide, originalIndex: index }))
    .filter((_, index) => index !== current);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-eerie-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-eerie-1 via-black/50 to-black/80" />
          </motion.div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center pt-24">
            <div className="container mx-auto px-6">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-4 inline-block text-xs font-bold uppercase tracking-[4px] text-gold-crayola"
              >
                {slides[current].subtitle}
              </motion.span>

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="whitespace-pre-line font-forum text-5xl font-normal leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mx-auto my-6 max-w-xl text-sm font-normal text-quicksilver md:text-base drop-shadow-md"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <Link href={`/marketplace?category=${encodeURIComponent(slides[current].category)}`}>
                  <LuxuryButton>{slides[current].cta}</LuxuryButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DYNAMIC CIRCULAR NAVIGATION (BOTTOM RIGHT) */}
      <div className="absolute bottom-16 right-16 hidden lg:block z-30">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-gold-crayola/30 bg-black/50 backdrop-blur-md shadow-2xl">
          
          {/* CENTER ICON (Active Category) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.4 }}
              className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gold-crayola/10 border border-gold-crayola shadow-inner"
            >
              <ActiveIcon className="h-6 w-6 text-gold-crayola" />
            </motion.div>
          </AnimatePresence>

          {/* 6 SURROUNDING ICONS (3 Right, 3 Left) */}
          {otherCategories.map((item, idx) => {
            const angle = angles[idx];
            const radius = 68; // Radius distance from center
            const radian = (angle * Math.PI) / 180;
            
            // .toFixed(2) prevents hydration mismatch errors between SSR & Client JS runtime
            const x = (Math.cos(radian) * radius).toFixed(2);
            const y = (Math.sin(radian) * radius).toFixed(2);

            const IconComponent = item.icon;

            return (
              <button
                key={item.originalIndex}
                onClick={() => setCurrent(item.originalIndex)}
                title={item.category}
                className="group absolute left-1/2 top-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold-crayola/40 bg-eerie-1 text-quicksilver transition-all duration-300 hover:scale-125 hover:border-gold-crayola hover:bg-gold-crayola hover:text-black shadow-lg"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <IconComponent className="h-4 w-4 transition-transform group-hover:scale-110" />
              </button>
            );
          })}

        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-6 z-20">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black bg-black/20 backdrop-blur-sm"
        >
          <ChevronLeft className="-rotate-45 h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black bg-black/20 backdrop-blur-sm"
        >
          <ChevronRight className="-rotate-45 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};