// components/ArtisanGuild.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Award,
    Compass,
    ShieldCheck,
    Hammer,
    Star,
    CheckCircle
} from "lucide-react";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { mockVendors } from "@/data/marketplaceData";
import { LuxuryButton } from "./ui/LuxuryButton";

const guildPillars = [
    {
        icon: Hammer,
        subtitle: "Uncompromising Heritage",
        title: "Master Craftsmanship",
        description:
            "Every guild member represents generations of refined technique, creating bespoke pieces with peerless attention to detail.",
    },
    {
        icon: ShieldCheck,
        subtitle: "Digital Provenance",
        title: "Verified Lineage",
        description:
            "Immutable digital passports cryptographically verify the authenticity, rare material lineage, and origin of each piece.",
    },
    {
        icon: Compass,
        subtitle: "Direct Atelier Access",
        title: "Bespoke Commissions",
        description:
            "Engage directly with legendary ateliers and master artisans to commission tailored creations unique to your specifications.",
    },
    {
        icon: Award,
        subtitle: "Sustainable Luxury",
        title: "Ethical Standards",
        description:
            "Strict enforcement of sustainable sourcing, fair artisan compensation, and zero mass-production protocols.",
    },
];

export const ArtisanGuild = () => {
    return (
        <div className="w-full mt-12">
            {/* ================= SECTION 1: THE ARTISAN GUILD ================= */}
            <section className="relative py-24 bg-smoky-2 border-t border-white/10 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
                            The Elite Circle
                        </span>
                        <div className="my-2 flex items-center justify-center space-x-3">
                            <DiamondSeparator />
                            <h1 className="font-forum text-4xl text-white md:text-5xl">The Artisan Guild</h1>
                            <DiamondSeparator />
                        </div>
                        <p className="text-sm text-quicksilver max-w-xl mx-auto leading-relaxed">
                            An exclusive global alliance uniting legendary craftspeople, ateliers, and independent masters of rare heritage crafts.
                        </p>
                    </motion.div>

                    {/* Guild Pillars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {guildPillars.map((pillar, idx) => {
                            const IconComponent = pillar.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-30px" }}
                                    transition={{ duration: 0.7, delay: idx * 0.12 }}
                                    className="group relative border border-white/10 bg-eerie-1/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold-crayola/50 hover:bg-eerie-1"
                                >
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-crayola/30 bg-gold-crayola/10 text-gold-crayola transition-transform duration-300 group-hover:scale-110">
                                        <IconComponent className="h-6 w-6" />
                                    </div>

                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-crayola mb-1">
                                        {pillar.subtitle}
                                    </span>
                                    <h2 className="font-forum text-2xl text-white mb-3">
                                        {pillar.title}
                                    </h2>
                                    <p className="text-xs text-quicksilver leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= SECTION 2: FEATURED ARTISANS ================= */}
            <section className="py-24 bg-eerie-1 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
                            Master Craftspeople
                        </span>
                        <div className="my-2 flex items-center justify-center space-x-3">
                            <DiamondSeparator />
                            <h2 className="font-forum text-4xl text-white md:text-5xl">Featured Artisans</h2>
                            <DiamondSeparator />
                        </div>
                        <p className="text-sm text-quicksilver max-w-lg mx-auto">
                            Direct access to private workshops and master craftspeople across the globe.
                        </p>
                    </div>

                    {/* Artisans Grid (No Browse All Button) */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {mockVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="group relative border border-white/10 bg-smoky-3 p-8 text-center transition-all duration-500 hover:border-gold-crayola hover:-translate-y-1"
                            >
                                <div className="relative mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-2 border-gold-crayola">
                                    <Image
                                        src={vendor.avatar}
                                        alt={vendor.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="flex items-center justify-center space-x-2">
                                    <h3 className="font-forum text-2xl text-white">{vendor.name}</h3>
                                    {vendor.verified && <CheckCircle className="h-4 w-4 text-gold-crayola" />}
                                </div>

                                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gold-crayola">
                                    {vendor.badge}
                                </p>

                                <div className="my-4 flex items-center justify-center space-x-1 text-xs text-amber-400">
                                    <Star className="h-3.5 w-3.5 fill-current" />
                                    <span className="font-bold text-white">{vendor.rating}</span>
                                    <span className="text-quicksilver">(120+ authentic reviews)</span>
                                </div>

                                <Link href={`/artisanshop?vendor=${vendor.id}`}>
                                    <LuxuryButton>
                                        <span>Visit Boutique</span>
                                    </LuxuryButton>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};