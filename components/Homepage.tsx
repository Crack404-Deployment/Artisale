// components/Homepage.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Baby,
  ShieldCheck,
  Truck,
  Headphones
} from "lucide-react";

// Shared Components & Data
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { DiamondSeparator } from "@/components/ui/DiamondSeparator";
import { CartItem, Product } from "@/types/marketplace";

// ==========================================
// DATA CONSTANTS
// ==========================================

const slides = [
  { subtitle: "Bespoke Tailoring", title: "Men's\nCollection", description: "Discover masterfully crafted men's clothing, from classic suits to elevated casual wear.", cta: "View Men's Clothing", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1600", category: "Men's Clothing", icon: Shirt },
  { subtitle: "Elegance Redefined", title: "Women's\nCollection", description: "Explore exquisite dresses, tops, and outerwear designed for timeless sophistication.", cta: "View Women's Clothing", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600", category: "Women's Clothing", icon: Sparkles },
  { subtitle: "Step Into Luxury", title: "Artisan\nFootwear", description: "Exquisite craftsmanship meets unparalleled comfort in our curated shoe collection.", cta: "Shop Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600", category: "Shoes", icon: Footprints },
  { subtitle: "Luxury Carry", title: "Designer\nBags", description: "Handcrafted leather totes, clutches, and travel luggage for every occasion.", cta: "Explore Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1600", category: "Bags", icon: Backpack },
  { subtitle: "Timeless Crafts & Horology", title: "Fine\nAccessories", description: "Handcrafted timepieces, fine jewelry, and sunglasses certified with digital provenance.", cta: "View Accessories", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600", category: "Accessories", icon: Watch },
  { subtitle: "Radiant Wellness", title: "Personal\nCare", description: "Indulge in luxurious perfumes, body oils, and artisan skincare essentials.", cta: "Shop Personal Care", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600", category: "Personal Care", icon: Star },
  { subtitle: "Gentle & Joyful", title: "Baby & Kids\nBoutique", description: "Premium, artisan-crafted clothing sets and accessories for the little ones.", cta: "Shop Baby & Kids", image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1600", category: "Baby & Kids", icon: Baby },
];

const angles = [-60, 0, 60, 120, 180, 240];

const features = [
  { icon: ShieldCheck, title: "100% Verified Authenticity", description: "Every artisan and creation undergoes rigorous multi-tier physical and provenance inspection." },
  { icon: Truck, title: "White-Glove Insured Delivery", description: "Complimentary global express courier with full valuation insurance and signature verification." },
  { icon: Headphones, title: "24/7 VIP Concierge", description: "Dedicated personal advisors available around the clock for bespoke requests and sourcing." },
  { icon: Sparkles, title: "Digital Provenance Passports", description: "Encrypted digital certificates of ownership ensuring immutable lineage for rare pieces." },
];

const catalogs = [
  { name: "Men's Clothing", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800", items: ["Shirts", "T-Shirts", "Pants", "Suits & Blazers", "Outerwear"] },
  { name: "Women's Clothing", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800", items: ["Dresses", "Tops & Blouses", "Pants & Denim", "Skirts", "Outerwear"] },
  { name: "Baby & Kids", image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=800", items: ["Clothing Sets", "Tops & Bodysuits", "Bottoms"] },
  { name: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800", items: ["Handbags & Totes", "Backpacks", "Travel & Luggage", "Clutches & Wallets"] },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800", items: ["Timepieces & Watches", "Fine Jewelry", "Sunglasses", "Belts & Leather"] },
  { name: "Shoes", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800", items: ["Sneakers", "Formal Shoes", "Heels & Pumps", "Boots"] },
];

const brands = [
  "Solaris Fine Jewels", "Aurelius Couture", "Maison de Luxe", "Velvet & Stone", 
  "Aethelgard Horology", "Maison De Cuir", "Elysian Tailors", "Lumière Paris", 
  "Novus Atelier", "Kronos & Co."
];
const marqueeBrands = [...brands, ...brands];

const featuredDestinations = [
  {
    title: "Spotlight",
    subtitle: "Limited Edition Rarities",
    description: "Discover our most exclusive, highly coveted pieces crafted in strictly limited quantities.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200", 
    link: "/spotlight",
    buttonText: "Explore Spotlight"
  },
  {
    title: "Flash Sale",
    subtitle: "Curated Seasonal Highlights",
    description: "An exclusive invitation to acquire archival masterpieces and seasonal highlights.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200", 
    link: "/sale",
    buttonText: "Shop the Sale"
  }
];

// ==========================================
// INITIAL LOADING SCREEN COMPONENT
// ==========================================

const InitialLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState<"show" | "split">("show");

  useEffect(() => {
    // Wait 2.0 seconds before splitting (original timing)
    const timer1 = setTimeout(() => setStep("split"), 2000);
    // Wait 2.8 seconds total before unmounting (original timing)
    const timer2 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden bg-black select-none pointer-events-none">
      {/* Left Curtain - Holds "ART" */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: step === "split" ? "-100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="relative h-full w-1/2 bg-black flex items-center justify-end pr-3 sm:pr-5 md:pr-7"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-forum text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#FFF3A8] to-[#AA771C] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        >
          ART
        </motion.span>
      </motion.div>

      {/* Right Curtain - Holds "SALE" */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: step === "split" ? "100%" : 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="relative h-full w-1/2 bg-black flex items-center justify-start pl-3 sm:pl-5 md:pl-7"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-forum text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider bg-gradient-to-r from-[#AA771C] via-[#FFF3A8] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
        >
          SALE
        </motion.span>
      </motion.div>

      {/* Center 'I' Overlay */}
      <AnimatePresence>
        {step === "show" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.25 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-forum text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider bg-gradient-to-b from-[#FFF3A8] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(252,246,186,0.6)]">
              I
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// INTERNAL SECTION COMPONENTS
// ==========================================

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const ActiveIcon = slides[current].icon;
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
          <div className="absolute inset-0 flex items-center justify-center text-center pt-10">
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
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}>
                <Link href={`/marketplace?category=${encodeURIComponent(slides[current].category)}`}>
                  <LuxuryButton>{slides[current].cta}</LuxuryButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-16 right-16 hidden lg:block z-30">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-gold-crayola/30 bg-black/50 backdrop-blur-md shadow-2xl">
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

          {otherCategories.map((item, idx) => {
            const angle = angles[idx];
            const radius = 68;
            const radian = (angle * Math.PI) / 180;
            const x = (Math.cos(radian) * radius).toFixed(2);
            const y = (Math.sin(radian) * radius).toFixed(2);
            const IconComponent = item.icon;

            return (
              <button
                key={item.originalIndex}
                onClick={() => setCurrent(item.originalIndex)}
                title={item.category}
                className="group absolute left-1/2 top-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-gold-crayola/40 bg-eerie-1 text-quicksilver transition-all duration-300 hover:scale-125 hover:border-gold-crayola hover:bg-gold-crayola hover:text-black shadow-lg"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <IconComponent className="h-4 w-4 transition-transform group-hover:scale-110" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-6 z-20">
        <button onClick={prevSlide} className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black bg-black/20 backdrop-blur-sm">
          <ChevronLeft className="-rotate-45 h-5 w-5" />
        </button>
        <button onClick={nextSlide} className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black bg-black/20 backdrop-blur-sm">
          <ChevronRight className="-rotate-45 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

const BrandValues = () => (
  <section className="border-y border-white/5 bg-smoky-2 py-20 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: idx * 0.15 }}
              className="group flex flex-col items-center text-center p-6 rounded-sm border border-transparent transition-all duration-300 hover:border-gold-crayola/30 hover:bg-eerie-2/50"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-crayola/40 bg-eerie-1 text-gold-crayola transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-forum text-xl text-white mb-2">{item.title}</h3>
              <p className="text-xs text-quicksilver leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const HomeCatalog = () => (
  <section id="catalog" className="py-24 bg-eerie-1 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">Our Offerings</span>
        <div className="my-2 flex items-center justify-center space-x-3">
          <DiamondSeparator />
          <h2 className="font-forum text-4xl text-white md:text-5xl">Explore Categories</h2>
          <DiamondSeparator />
        </div>
        <p className="text-sm text-quicksilver max-w-lg mx-auto">
          Discover our curated selection of premium handcrafted goods and authentic luxury items.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
        {catalogs.map((catalog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: (index % 3) * 0.15 }}
            className="group relative h-[350px] sm:h-[400px] w-full [perspective:2000px] cursor-default"
          >
            <div className="relative h-full w-full transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">
              <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] overflow-hidden rounded-sm bg-eerie-2">
                <Image src={catalog.image} alt={catalog.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              </div>
              <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-sm bg-eerie-2 border border-gold-crayola/40 p-8 flex flex-col items-center justify-center">
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold-crayola/50" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold-crayola/50" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold-crayola/50" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold-crayola/50" />
                <h3 className="text-3xl md:text-4xl font-forum text-white mb-8 relative tracking-wide text-center">
                  {catalog.name}
                  <span className="absolute -bottom-4 left-1/2 w-16 h-[2px] bg-gold-crayola -translate-x-1/2"></span>
                </h3>
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

const BrandName = () => (
  <section className="py-16 bg-smoky-3 border-y border-white/5 overflow-hidden">
    <style>{`
      @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 40s linear infinite; display: flex; width: max-content; }
      .pause-on-hover:hover .animate-marquee { animation-play-state: paused; }
    `}</style>
    <div className="container mx-auto px-6 mb-12 text-center">
      <span className="text-[10px] font-bold uppercase tracking-[4px] text-gold-crayola">Authentic Heritage</span>
      <div className="my-2 flex items-center justify-center space-x-3">
        <DiamondSeparator />
        <h2 className="font-forum text-3xl text-white md:text-4xl">Our Master Ateliers</h2>
        <DiamondSeparator />
      </div>
    </div>
    <div className="pause-on-hover relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-smoky-3 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-smoky-3 after:to-transparent">
      <div className="animate-marquee flex items-center py-4">
        {marqueeBrands.map((brand, idx) => (
          <div key={idx} className="group flex items-center justify-center cursor-pointer">
            <span className="px-10 font-forum text-3xl md:text-4xl lg:text-5xl text-quicksilver/40 transition-colors duration-500 group-hover:text-gold-crayola whitespace-nowrap">
              {brand}
            </span>
            <span className="text-gold-crayola/30 text-[10px]">♦</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ExclusiveDestinations = () => (
  <section className="py-20 bg-eerie-1 relative overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">Curated Destinations</span>
        <div className="my-2 flex items-center justify-center space-x-3">
          <DiamondSeparator />
          <h2 className="font-forum text-3xl text-white md:text-4xl">Explore the Collections</h2>
          <DiamondSeparator />
        </div>
        <p className="text-sm text-quicksilver max-w-lg mx-auto">
          Navigate our most sought-after realms, from ultra-rare, limited-edition runs to unparalleled values in our archive.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {featuredDestinations.map((dest, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="group relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden rounded-sm border border-white/5 bg-smoky-3 cursor-pointer"
          >
            {/* Background Image with Hover Scale & Darken */}
            <div className="absolute inset-0">
              <Image 
                src={dest.image} 
                alt={dest.title} 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-40" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            {/* Inner Border Frame (reveals on hover) */}
            <div className="absolute inset-4 border border-gold-crayola/0 transition-all duration-700 group-hover:border-gold-crayola/30 group-hover:scale-[0.98]" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col items-center justify-center text-center">
              
              {/* Animated Text Content */}
              <div className="transition-transform duration-700 transform translate-y-8 group-hover:translate-y-0 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-crayola mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {dest.subtitle}
                </span>
                
                <h3 className="font-forum text-3xl md:text-4xl text-white mb-4 tracking-wide drop-shadow-md">
                  {dest.title}
                </h3>
                
                <p className="text-xs md:text-sm text-quicksilver max-w-xs mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 leading-relaxed mb-6">
                  {dest.description}
                </p>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  <Link href={dest.link} className="inline-block">
                    <LuxuryButton variant="secondary">{dest.buttonText}</LuxuryButton>
                  </Link>
                </div>
              </div>
              
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="relative overflow-hidden bg-smoky-1 py-24 border-t border-white/5">
    <div className="container mx-auto px-6 text-center relative z-10">
      <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">Private Circle</span>
      <div className="my-3 flex items-center justify-center space-x-3">
        <DiamondSeparator />
        <h2 className="font-forum text-4xl text-white md:text-5xl">Unlock Private Allocations</h2>
        <DiamondSeparator />
      </div>
      <p className="mx-auto max-w-xl text-sm text-quicksilver mb-10">
        Subscribe to receive private invitations to limited artisan drops, bespoke order windows, and private auction viewings.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
        <input type="email" placeholder="Enter your email address" className="flex-1 border border-white/20 bg-eerie-1 px-5 py-3.5 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola" required />
        <LuxuryButton type="submit" variant="secondary">Join Circle</LuxuryButton>
      </form>
    </div>
  </section>
);

// ==========================================
// EXPORTED HOMEPAGE COMPONENT
// ==========================================

export const Homepage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Check if the user has visited in this session
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {showLoader && <InitialLoader onComplete={() => setShowLoader(false)} />}
      <main className="min-h-screen bg-eerie-1 text-white">
        <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
        <HeroSlider />
        <BrandValues />
        <HomeCatalog />
        <BrandName />
        <ExclusiveDestinations />
        <Newsletter />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </main>
    </>
  );
};

export default Homepage;