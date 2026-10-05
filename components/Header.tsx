// components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Search, X, Menu } from "lucide-react";
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
    
    // Profile Dropdown States
    const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
    
    const desktopProfileRef = useRef<HTMLDivElement>(null);
    const mobileProfileRef = useRef<HTMLDivElement>(null);
    
    const router = useRouter();

    // User Data
    const userProfile = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    };

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (desktopProfileRef.current && !desktopProfileRef.current.contains(event.target as Node)) {
                setIsDesktopProfileOpen(false);
            }
            if (mobileProfileRef.current && !mobileProfileRef.current.contains(event.target as Node)) {
                setIsMobileProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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

    // Icon button styles
    const iconBtnClass = `shrink-0 flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:border-gold-crayola hover:text-gold-crayola ${
        isScrolled || isMobileSearchOpen || isMobileMenuOpen
            ? "border-white/10 bg-eerie-2 text-white"
            : "border-white/20 bg-black/20 text-white backdrop-blur-sm"
    }`;

    // Reusable Profile Menu Component
    const ProfileMenu = ({
        closeMenu,
        positionClass,
    }: {
        closeMenu: () => void;
        positionClass: string;
    }) => (
        <div
            className={`${positionClass} w-64 rounded-sm border border-white/15 bg-eerie-1/95 backdrop-blur-2xl shadow-2xl z-50 py-5 flex flex-col items-center text-white transition-all`}
        >
            {/* Avatar */}
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold-crayola/60 mb-3 shadow-md">
                <Image
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* User Name & Email */}
            <h3 className="font-forum text-xl font-medium tracking-wide text-white">
                {userProfile.name}
            </h3>
            <p className="text-xs text-quicksilver mb-4">{userProfile.email}</p>

            <div className="w-full border-t border-white/10 mb-2" />

            {/* Menu Items */}
            <div className="w-full flex flex-col text-sm font-medium tracking-wide">
                <Link
                    href="myprofile/profile"
                    onClick={closeMenu}
                    className="w-full px-6 py-2.5 text-left text-quicksilver hover:text-gold-crayola hover:bg-white/5 transition-colors"
                >
                    My Profile
                </Link>
                <Link
                    href="myprofile/orders"
                    onClick={closeMenu}
                    className="w-full px-6 py-2.5 text-left text-quicksilver hover:text-gold-crayola hover:bg-white/5 transition-colors"
                >
                    My orders
                </Link>
                <Link
                    href="myprofile/wishlist"
                    onClick={closeMenu}
                    className="w-full px-6 py-2.5 text-left text-quicksilver hover:text-gold-crayola hover:bg-white/5 transition-colors"
                >
                    Wishlist
                </Link>
                <button
                    onClick={closeMenu}
                    className="w-full px-6 py-2.5 text-left text-quicksilver hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
                isScrolled || isMobileSearchOpen || isMobileMenuOpen
                    ? "bg-eerie-1 shadow-2xl border-b border-white/10"
                    : "bg-eerie-1/40 backdrop-blur-md border-b border-white/10"
            }`}
        >
            {/* ========================================================================= */}
            {/* DESKTOP VIEW */}
            {/* ========================================================================= */}
            <div className="hidden md:block">
                <div className="container mx-auto flex h-20 items-center justify-between px-6 relative" ref={desktopProfileRef}>
                    
                    {/* LEFT: Logo */}
                    <Link href="/" className="font-forum text-3xl font-normal tracking-widest text-white hover:text-gold-crayola transition-colors shrink-0">
                        Artisale<span className="text-gold-crayola">.</span>
                    </Link>

                    {/* CENTER: Compact Responsive Search Bar */}
                    <form 
                        onSubmit={handleSearch} 
                        className="w-44 md:w-52 lg:w-64 xl:w-72 mx-3 lg:mx-6 relative flex items-center shrink-0 transition-all duration-300"
                    >
                        <button type="submit" className="absolute left-3.5 z-10 cursor-pointer text-gold-crayola hover:text-white transition-colors" aria-label="Submit Search">
                            <Search className="h-4 w-4" />
                        </button>
                        
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/15 py-2 pl-10 pr-8 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs shadow-inner"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 z-10 cursor-pointer text-quicksilver hover:text-white"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </form>

                    {/* RIGHT: Navlinks & Icons */}
                    <div className="flex items-center shrink-0">
                        <nav className="flex items-center space-x-4 lg:space-x-6 text-xs font-medium uppercase tracking-widest text-quicksilver mr-4 lg:mr-6 border-r border-white/10 pr-4 lg:pr-6">
                            <Link href="/marketplace" className="hover:text-gold-crayola transition-colors">Marketplace</Link>
                            <Link href="/artisanguild" className="hover:text-gold-crayola transition-colors">Artisans</Link>
                            <Link href="/spotlight" className="hover:text-gold-crayola transition-colors">Spotlight</Link>
                            <Link href="/sale" className="hover:text-gold-crayola transition-colors">Sales</Link>
                        </nav>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setIsDesktopProfileOpen(!isDesktopProfileOpen)}
                                className={`${iconBtnClass} overflow-hidden p-0 border-white/30 hover:border-gold-crayola cursor-pointer`}
                                aria-label="User Profile"
                            >
                                <Image src={userProfile.avatar} alt="Profile" width={36} height={36} className="object-cover h-full w-full" />
                            </button>

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

                    {/* Desktop Dropdown */}
                    {isDesktopProfileOpen && (
                        <ProfileMenu
                            closeMenu={() => setIsDesktopProfileOpen(false)}
                            positionClass="absolute right-6 top-full mt-2"
                        />
                    )}
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MOBILE VIEW */}
            {/* ========================================================================= */}
            <div className="md:hidden">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 relative" ref={mobileProfileRef}>
                    <Link href="/" className="font-forum text-2xl font-normal tracking-widest text-white hover:text-gold-crayola transition-colors">
                        Artisale<span className="text-gold-crayola">.</span>
                    </Link>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-2">
                        <button onClick={toggleMobileSearch} className={iconBtnClass} aria-label="Toggle Search">
                            {isMobileSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        </button>

                        <button 
                            onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)} 
                            className={`${iconBtnClass} overflow-hidden p-0 border-white/30 hover:border-gold-crayola cursor-pointer`} 
                            aria-label="User Profile"
                        >
                            <Image src={userProfile.avatar} alt="Profile" width={36} height={36} className="object-cover h-full w-full" />
                        </button>

                        <button onClick={onOpenCart} className={`relative ${iconBtnClass}`} aria-label="Open Cart">
                            <ShoppingBag className="h-4 w-4" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-crayola text-[9px] font-bold text-eerie-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button onClick={toggleMobileMenu} className={iconBtnClass} aria-label="Toggle Mobile Menu">
                            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Mobile Dropdown */}
                    {isMobileProfileOpen && (
                        <ProfileMenu
                            closeMenu={() => setIsMobileProfileOpen(false)}
                            positionClass="absolute right-4 top-full mt-2"
                        />
                    )}
                </div>

                {/* MOBILE SEARCH DROPDOWN */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-eerie-2/95 backdrop-blur-xl ${
                        isMobileSearchOpen ? "max-h-20 border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 py-3 flex justify-center">
                        <form onSubmit={handleSearch} className="relative flex items-center w-full">
                            <button type="submit" className="absolute left-4 z-10 cursor-pointer text-gold-crayola hover:text-white transition-colors" aria-label="Submit Search">
                                <Search className="h-4 w-4" />
                            </button>
                            
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
                                    className="absolute right-4 z-10 p-1 cursor-pointer text-quicksilver hover:text-white"
                                    aria-label="Clear Search"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* MOBILE MENU DROPDOWN */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-eerie-2/95 backdrop-blur-xl ${
                        isMobileMenuOpen ? "max-h-72 border-t border-white/10 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-6 pt-3 pb-4 space-y-4">
                        <nav className="flex flex-col space-y-3 text-xs font-medium uppercase tracking-widest text-quicksilver">
                            <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Marketplace</Link>
                            <Link href="/artisanguild" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Artisans</Link>
                            <Link href="/spotlight" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Spotlight</Link>
                            <Link href="/sale" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-gold-crayola transition-colors py-1">Sales</Link>
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