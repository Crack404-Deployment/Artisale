// components/BrandValues.tsx
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified Authenticity",
    description: "Every artisan and creation undergoes rigorous multi-tier physical and provenance inspection.",
  },
  {
    icon: Truck,
    title: "White-Glove Insured Delivery",
    description: "Complimentary global express courier with full valuation insurance and signature verification.",
  },
  {
    icon: Headphones,
    title: "24/7 VIP Concierge",
    description: "Dedicated personal advisors available around the clock for bespoke requests and sourcing.",
  },
  {
    icon: Sparkles,
    title: "Digital Provenance Passports",
    description: "Encrypted digital certificates of ownership ensuring immutable lineage for rare pieces.",
  },
];

export const BrandValues = () => {
  return (
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
                transition={{ 
                  duration: 0.7, 
                  ease: [0.23, 1, 0.32, 1],
                  delay: idx * 0.15 // Creates the staggered 1-2-3-4 pop-up effect
                }}
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
};