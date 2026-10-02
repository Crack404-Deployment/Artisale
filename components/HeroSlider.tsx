"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { LuxuryButton } from "./ui/LuxuryButton";

const slides = [
  {
    subtitle: "Curated Artisan Marketplace",
    title: "Mastery Beyond\nExpectations",
    description: "Explore bespoke creations directly from world-renowned independent vendors and master artisans.",
    cta: "Explore Collections",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
  },
  {
    subtitle: "Exclusive Flash Drop",
    title: "Timeless Crafts &\nHorology",
    description: "Handcrafted timepieces and fine jewelry certified with digital provenance authentications.",
    cta: "View Drop",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600",
  },
];

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

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-eerie-1">
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
            <div className="absolute inset-0 bg-gradient-to-t from-eerie-1 via-black/60 to-black/30" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center text-center">
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
                className="whitespace-pre-line font-forum text-4xl font-normal leading-tight text-white md:text-6xl lg:text-7xl"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mx-auto my-6 max-w-xl text-sm font-normal text-quicksilver md:text-base"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                <LuxuryButton>{slides[current].cta}</LuxuryButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold-crayola/30 bg-black/40 backdrop-blur-md">
          <Award className="h-8 w-8 text-gold-crayola animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-gold-crayola animate-spin-slow border-t-transparent" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-6">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black"
        >
          <ChevronLeft className="-rotate-45 h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="flex h-12 w-12 rotate-45 items-center justify-center border border-gold-crayola text-gold-crayola transition-all hover:bg-gold-crayola hover:text-black"
        >
          <ChevronRight className="-rotate-45 h-5 w-5" />
        </button>
      </div>
    </section>
  );
};