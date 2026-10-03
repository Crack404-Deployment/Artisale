// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, X, User, Menu } from "lucide-react";
import { LuxuryButton } from "./ui/LuxuryButton";

interface HeaderProps {
    cartCount: number;
    onOpenCart: () => void;
}

export const Header = ({ cartCount, onOpenCart }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    // Track scroll position to toggle solid background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileSearchOpen(false);
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
                isScrolled 
                    ? "bg-eerie-1 shadow-2xl border-b border-white/10" 
                    : "bg-eerie-1/40 backdrop-blur-md border-b border-transparent"
            }`}
        >
            {/* ================= LAYER 1: BRAND LOGO, NAV & LOGIN ================= */}
            <div className={`transition-colors duration-500 border-b border-white/10 ${
                isScrolled ? "bg-eerie-1" : "bg-transparent"
            }`}>
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                    {/* Brand Name / Emblem Logo */}
                    <Link href="/" className="font-forum text-2xl sm:text-3xl font-normal tracking-widest text-white">
                        Artisale<span className="text-gold-crayola">.</span>
                    </Link>

                    {/* Desktop Navigation Links & Login */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-quicksilver">
                            <Link href="/" className="hover:text-gold-crayola transition-colors">Home</Link>
                            <Link href="/marketplace" className="hover:text-gold-crayola transition-colors">Marketplace</Link>
                            <Link href="/#vendors" className="hover:text-gold-crayola transition-colors">Artisans</Link>
                        </nav>
                        <Link href="/authentications/login">
                            <LuxuryButton className="px-5 py-2 text-xs">
                                Login
                            </LuxuryButton>
                        </Link>
                    </div>

                    {/* Mobile Hamburger Bar Icon */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden flex h-10 w-10 items-center justify-center rounded-xs border transition-all ${
                            isScrolled 
                                ? "border-white/10 bg-eerie-2 text-white hover:border-gold-crayola" 
                                : "border-white/20 bg-black/20 text-white hover:border-gold-crayola"
                        }`}
                        aria-label="Toggle Mobile Menu"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Dropdown Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-eerie-2/95 px-6 py-4 space-y-4 backdrop-blur-xl">
                        <nav className="flex flex-col space-y-3 text-xs font-medium uppercase tracking-widest text-quicksilver">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-gold-crayola transition-colors py-1"
                            >
                                Home
                            </Link>
                            <Link
                                href="/marketplace"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-gold-crayola transition-colors py-1"
                            >
                                Marketplace
                            </Link>
                            <Link
                                href="/#vendors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="hover:text-gold-crayola transition-colors py-1"
                            >
                                Artisans
                            </Link>
                        </nav>
                        <div className="pt-2 border-t border-white/10">
                            <Link href="/authentications/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <LuxuryButton className="w-full py-2.5 text-xs">
                                    Login
                                </LuxuryButton>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* ================= LAYER 2: SEARCH, PROFILE & CART ================= */}
            <div className={`transition-colors duration-500 ${
                isScrolled ? "bg-eerie-2/60" : "bg-transparent"
            }`}>
                <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">

                    {/* DESKTOP LAYER 2 VIEW */}
                    <div className="hidden md:flex items-center justify-between w-full">
                        {/* Search Bar on Left */}
                        <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md">
                            <Search className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search dresses, shirts, bags, rings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full border py-2 pl-10 pr-8 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs ${
                                    isScrolled 
                                        ? "bg-eerie-1/80 border-white/15" 
                                        : "bg-black/20 border-white/20 backdrop-blur-sm"
                                }`}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 text-quicksilver hover:text-white"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </form>

                        {/* Profile & Cart Icons on Right */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/profile"
                                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
                                    isScrolled 
                                        ? "border-white/10 bg-eerie-1 text-white" 
                                        : "border-white/20 bg-black/20 text-white backdrop-blur-sm"
                                }`}
                                aria-label="User Profile"
                            >
                                <User className="h-4 w-4" />
                            </Link>

                            <button
                                onClick={onOpenCart}
                                className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
                                    isScrolled 
                                        ? "border-white/10 bg-eerie-1 text-white" 
                                        : "border-white/20 bg-black/20 text-white backdrop-blur-sm"
                                }`}
                                aria-label="Open Cart"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-crayola text-[9px] font-bold text-eerie-1">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* MOBILE LAYER 2 VIEW */}
                    <div className="md:hidden w-full flex items-center justify-between">
                        {isMobileSearchOpen ? (
                            /* Active Search Mode */
                            <form onSubmit={handleSearch} className="relative flex items-center w-full">
                                <Search className="absolute left-3 h-4 w-4 text-gold-crayola pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search dresses, shirts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    className="w-full bg-eerie-1 border border-gold-crayola py-2 pl-9 pr-10 text-xs text-white placeholder-quicksilver outline-none rounded-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="absolute right-3 p-1 text-gold-crayola hover:text-white"
                                    aria-label="Close Search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </form>
                        ) : (
                            /* Default Mode */
                            <div className="flex items-center justify-center w-full">
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setIsMobileSearchOpen(true)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
                                            isScrolled ? "border-white/10 bg-eerie-1 text-white" : "border-white/20 bg-black/20 text-white"
                                        }`}
                                    >
                                        <Search className="h-4 w-4" />
                                    </button>

                                    <Link
                                        href="/profile"
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
                                            isScrolled ? "border-white/10 bg-eerie-1 text-white" : "border-white/20 bg-black/20 text-white"
                                        }`}
                                    >
                                        <User className="h-4 w-4" />
                                    </Link>

                                    <button
                                        onClick={onOpenCart}
                                        className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
                                            isScrolled ? "border-white/10 bg-eerie-1 text-white" : "border-white/20 bg-black/20 text-white"
                                        }`}
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-crayola text-[9px] font-bold text-eerie-1">
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};