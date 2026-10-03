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

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileSearchOpen) setIsMobileSearchOpen(false);
    };

    // Shared icon style classes
    const iconBtnClass = `shrink-0 flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${isScrolled || isMobileSearchOpen || isMobileMenuOpen
            ? "border-white/10 bg-eerie-2 text-white"
            : "border-white/20 bg-black/20 text-white backdrop-blur-sm"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${isScrolled || isMobileSearchOpen || isMobileMenuOpen
                    ? "bg-eerie-1 shadow-2xl border-b border-white/10"
                    : "bg-eerie-1/40 backdrop-blur-md border-b border-white/10"
                }`}
        >
            {/* ========================================================================= */}
            {/* DESKTOP VIEW: STYLE 2 (TWO-LAYER HEADER WITH UNIFORM BLURRY TRANSPARENCY) */}
            {/* ========================================================================= */}
            <div className="hidden md:block">
                {/* DESKTOP LAYER 1: BRAND LOGO (LEFT) & NAV LINKS + LOGIN (RIGHT) */}
                <div className="border-b border-white/10">
                    <div className="container mx-auto flex h-16 items-center justify-between px-6">
                        {/* Left: Brand Logo */}
                        <Link href="/" className="font-forum text-3xl font-normal tracking-widest text-white hover:text-gold-crayola transition-colors">
                            Artisale<span className="text-gold-crayola">.</span>
                        </Link>

                        {/* Right: Nav Links & Login Button */}
                        <nav className="flex items-center space-x-8 text-xs font-medium uppercase tracking-widest text-quicksilver">
                            <Link href="/marketplace" className="hover:text-gold-crayola transition-colors">Marketplace</Link>
                            <Link href="/artisanguild" className="hover:text-gold-crayola transition-colors">Artisans</Link>
                            <Link href="/spotlight" className="hover:text-gold-crayola transition-colors">Spotlight</Link>
                            <Link href="/sales" className="hover:text-gold-crayola transition-colors">Sales</Link>

                            <div className="pl-4 border-l border-white/10">
                                <Link href="/authentications/login">
                                    <LuxuryButton className="px-4 py-1.5 text-xs font-semibold tracking-wider">
                                        Login
                                    </LuxuryButton>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* DESKTOP LAYER 2: PERMANENT SEARCH BAR (LEFT) & PROFILE/CART (RIGHT) */}
                <div className="container mx-auto flex h-14 items-center justify-between px-6">
                    {/* Search Bar on Left */}
                    <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md">
                        <Search className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search dresses, shirts, bags, rings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/15 py-2 pl-10 pr-8 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs shadow-inner backdrop-blur-sm"
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
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/profile"
                            className={iconBtnClass}
                            aria-label="User Profile"
                        >
                            <User className="h-4 w-4" />
                        </Link>

                        <button
                            onClick={onOpenCart}
                            className={`relative ${iconBtnClass}`}
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
            </div>

            {/* ========================================================================= */}
            {/* MOBILE VIEW: STYLE 1 (SINGLE-LAYER TOP BAR WITH TOGGLEABLE DROPDOWNS)    */}
            {/* ========================================================================= */}
            <div className="md:hidden">
                {/* MOBILE MAIN HEADER BAR */}
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Left: Brand Logo */}
                    <Link href="/" className="font-forum text-2xl font-normal tracking-widest text-white hover:text-gold-crayola transition-colors">
                        Artisale<span className="text-gold-crayola">.</span>
                    </Link>

                    {/* Right: Icons (Search, Profile, Cart, Mobile Menu) */}
                    <div className="flex items-center space-x-2">
                        {/* Search Icon */}
                        <button onClick={toggleMobileSearch} className={iconBtnClass} aria-label="Toggle Search">
                            {isMobileSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        </button>

                        {/* Profile Icon */}
                        <Link href="/profile" className={iconBtnClass} aria-label="User Profile">
                            <User className="h-4 w-4" />
                        </Link>

                        {/* Cart Icon */}
                        <button onClick={onOpenCart} className={`relative ${iconBtnClass}`} aria-label="Open Cart">
                            <ShoppingBag className="h-4 w-4" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-crayola text-[9px] font-bold text-eerie-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Hamburger Menu Icon */}
                        <button onClick={toggleMobileMenu} className={iconBtnClass} aria-label="Toggle Mobile Menu">
                            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {/* MOBILE SEARCH DROPDOWN LAYER */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-eerie-2/95 backdrop-blur-xl ${isMobileSearchOpen ? "max-h-20 border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="px-4 py-3 flex justify-center">
                        <form onSubmit={handleSearch} className="relative flex items-center w-full">
                            <Search className="absolute left-4 h-4 w-4 text-gold-crayola pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search dresses, shirts, bags, rings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-eerie-1 border border-white/10 py-2.5 pl-12 pr-10 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs shadow-inner"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 p-1 text-quicksilver hover:text-white"
                                    aria-label="Clear Search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* MOBILE MENU DROPDOWN LAYER */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-eerie-2/95 backdrop-blur-xl ${isMobileMenuOpen ? "max-h-72 border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="px-6 pt-3 pb-4 space-y-4">
                        <nav className="flex flex-col space-y-3 text-xs font-medium uppercase tracking-widest text-quicksilver">
                            <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Marketplace</Link>
                            <Link href="/artisanguild" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Artisans</Link>
                            <Link href="/spotlight" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Spotlight</Link>
                            <Link href="/sales" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Sales</Link>
                        </nav>
                        <div className="pt-2 border-t border-white/10">
                            <Link href="/authentications/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <LuxuryButton className="w-full py-2 text-xs">
                                    Login
                                </LuxuryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};