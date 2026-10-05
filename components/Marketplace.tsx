"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  X,
  SlidersHorizontal,
  Heart
} from "lucide-react";
import { Product } from "@/types/marketplace";
import { DiamondSeparator } from "./ui/DiamondSeparator";
import { LuxuryButton } from "./ui/LuxuryButton";

interface MarketplaceProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

// Sidebar Category Taxonomy
interface CategoryStructure {
  name: string;
  subcategories: string[];
}

const CATEGORY_TREE: CategoryStructure[] = [
  {
    name: "Men's Clothing",
    subcategories: ["Shirts", "T-Shirts", "Pants", "Suits & Blazers", "Outerwear"],
  },
  {
    name: "Women's Clothing",
    subcategories: ["Dresses", "Tops & Blouses", "Pants & Denim", "Skirts", "Outerwear"],
  },
  {
    name: "Shoes",
    subcategories: ["Sneakers", "Formal Shoes", "Heels & Pumps", "Boots"],
  },
  {
    name: "Bags",
    subcategories: ["Handbags & Totes", "Backpacks", "Travel & Luggage", "Clutches & Wallets"],
  },
  {
    name: "Accessories",
    subcategories: ["Timepieces & Watches", "Fine Jewelry", "Sunglasses", "Belts & Leather"],
  },
  {
    name: "Personal Care",
    subcategories: ["Perfumes & Fragrances", "Face Care", "Hair Care", "Body Lotions & Oils"],
  },
  {
    name: "Baby & Kids",
    subcategories: ["Clothing Sets", "Tops & Bodysuits", "Bottoms"],
  },
];

const generateMockProducts = (): Product[] => {
  const vendors = [
    { name: "Solaris Fine Jewels", rating: 5.0, verified: true },
    { name: "Aurelius Couture", rating: 4.9, verified: true },
    { name: "Maison de Luxe", rating: 4.8, verified: true },
    { name: "Velvet & Stone", rating: 4.9, verified: false },
    { name: "Aethelgard Horology", rating: 4.9, verified: true },
    { name: "Maison De Cuir", rating: 4.8, verified: true },
  ];

  const productTemplates: Record<string, string[]> = {
    "Shirts": ["Oxford Shirt", "Dress Shirt", "Linen Shirt", "Cotton Shirt"],
    "T-Shirts": ["Basic Tee", "Graphic T-Shirt", "Boxy Tee", "Cashmere T-Shirt"],
    "Pants": ["Wool Trousers", "Chinos", "Dress Pants", "Joggers"],
    "Suits & Blazers": ["Wool Suit", "Blue Blazer", "Summer Suit", "Tuxedo"],
    "Outerwear": ["Overcoat", "Leather Jacket", "Trench Coat", "Peacoat"],
    "Dresses": ["Evening Gown", "Summer Dress", "Cocktail Dress", "Maxi Dress"],
    "Tops & Blouses": ["Ruffle Blouse", "Camisole", "Peplum Top", "Silk Button-Up"],
    "Pants & Denim": ["Wide Leg Jeans", "Leather Leggings", "Flared Pants", "Straight Jeans"],
    "Skirts": ["Midi Skirt", "Mini Skirt", "Slip Skirt", "Denim Skirt"],
    "Sneakers": ["Designer Sneakers", "High-Top Sneakers", "Slip-On Sneakers", "Leather Trainers"],
    "Formal Shoes": ["Oxford Shoes", "Derby Shoes", "Monk Strap", "Loafers"],
    "Heels & Pumps": ["Stiletto Heels", "Block Pumps", "Slingback Heels", "Wedge Sandals"],
    "Boots": ["Chelsea Boots", "Ankle Boots", "Knee-High Boots", "Desert Boots"],
    "Timepieces & Watches": ["Gold Watch", "Quartz Watch", "Aviator Watch", "Automatic Watch"],
    "Fine Jewelry": ["Diamond Ring", "Gold Necklace", "Pearl Earrings", "Sapphire Ring"],
    "Sunglasses": ["Aviator Sunglasses", "Cat-Eye Sunglasses", "Wayfarer Shades", "Vintage Glasses"],
    "Belts & Leather": ["Leather Belt", "Suede Belt", "Dress Belt", "Logo Belt"],
    "Handbags & Totes": ["Canvas Tote", "Crossbody Bag", "Top-Handle Bag", "Hobo Bag"],
    "Backpacks": ["Leather Backpack", "Hiking Backpack", "Commuter Backpack", "Mini Backpack"],
    "Travel & Luggage": ["Travel Bag", "Carry-On Suitcase", "Duffle Bag", "Leather Trunk"],
    "Clutches & Wallets": ["Evening Clutch", "Leather Wallet", "Cardholder", "Wristlet"],
    "Perfumes & Fragrances": ["Oud Perfume", "Floral Perfume", "Summer Cologne", "Vanilla Fragrance"],
    "Face Care": ["Face Serum", "Night Cream", "Face Scrub", "Radiance Oil"],
    "Hair Care": ["Hair Mask", "Shampoo", "Conditioner", "Hair Serum"],
    "Body Lotions & Oils": ["Body Lotion", "Body Oil", "Body Butter", "Massage Oil"],
    "Clothing Sets": ["Play Set", "Knit Set", "Suit Set", "Pajamas"],
    "Tops & Bodysuits": ["Cotton Bodysuit", "Long-Sleeve Top", "Baby Top", "Graphic Tee"],
    "Bottoms": ["Kids Chinos", "Overalls", "Leggings", "Bloomers"],
  };

  const imageMap: Record<string, string> = {
    "Shirts": "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&q=80&w=600",
    "T-Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
    "Pants": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600",
    "Suits & Blazers": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600",
    "Outerwear": "https://images.unsplash.com/photo-1551028719-0125fd6b7fc8?auto=format&fit=crop&q=80&w=600",
    "Dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    "Tops & Blouses": "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=600",
    "Pants & Denim": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    "Skirts": "https://images.unsplash.com/photo-1583496924845-dbb0d024fc8b?auto=format&fit=crop&q=80&w=600",
    "Sneakers": "https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=600",
    "Formal Shoes": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    "Heels & Pumps": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600",
    "Boots": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600",
    "Timepieces & Watches": "https://images.unsplash.com/photo-1524592094714-0f0654ece975?auto=format&fit=crop&q=80&w=600",
    "Fine Jewelry": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    "Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    "Belts & Leather": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=600",
    "Handbags & Totes": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
    "Backpacks": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
    "Travel & Luggage": "https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&q=80&w=600",
    "Clutches & Wallets": "https://images.unsplash.com/photo-1628149462157-55df93c5d648?auto=format&fit=crop&q=80&w=600",
    "Perfumes & Fragrances": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    "Face Care": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    "Hair Care": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600",
    "Body Lotions & Oils": "https://images.unsplash.com/photo-1608248593842-8021c62ce870?auto=format&fit=crop&q=80&w=600",
    "Clothing Sets": "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=600",
    "Tops & Bodysuits": "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=600",
    "Bottoms": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600",
  };

  const items: Product[] = [];
  let idCount = 1;

  CATEGORY_TREE.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      const templates = productTemplates[sub] || [`${sub} Item`];
      const imageUrl = imageMap[sub] || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600";
      
      templates.forEach((template) => {
        for (let i = 1; i <= 2; i++) {
          const price = ((idCount * 137) % 800) + 120;
          const originalPrice = price + ((idCount * 43) % 200) + 50;

          items.push({
            id: `prod-${idCount}`,
            title: `${template}${i === 2 ? ' (Special Edition)' : ''}`,
            price: price,
            originalPrice: originalPrice,
            category: cat.name,
            subcategory: sub,
            description: `A beautiful ${sub.toLowerCase()} piece. Premium materials designed for elegance and longevity.`,
            image: imageUrl,
            tag: i % 4 === 0 ? "New Arrival" : i % 7 === 0 ? "Limited" : undefined,
            vendor: vendors[idCount % vendors.length],
          } as any);
          idCount++;
        }
      });
    });
  });

  return items;
};

const STATIC_PRODUCTS = generateMockProducts();
const ITEMS_PER_PAGE = 50;

// Inner component logic requiring useSearchParams
const MarketplaceContent = ({ products, onAddToCart }: MarketplaceProps) => {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  // 1. Grab the search parameter from the URL
  const urlSearch = searchParams.get("search");

  const effectiveProducts =
    products && products.length > 4 ? products : STATIC_PRODUCTS;

  // 2. Initialize state with the URL parameter if it exists
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || "All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(urlCategory || null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Added Wishlist State
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // 3. Keep the local state synced if the URL search parameter changes 
  // (e.g. searching from the header again while already on the marketplace page)
  useEffect(() => {
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
      setCurrentPage(1);
    }
  }, [urlSearch]);

  const toggleAccordion = (catName: string) => {
    setExpandedCategory((prev) => (prev === catName ? null : catName));
  };

  const handleCategorySelect = (category: string, subcategory: string = "All") => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setCurrentPage(1); 
  };

  // Toggle wishlist item
  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in links later
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return effectiveProducts.filter((product: any) => {
      const matchesSearch =
        query === "" ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSubcategory =
        selectedSubcategory === "All" ||
        product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();

      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [effectiveProducts, searchQuery, selectedCategory, selectedSubcategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 mt-20">
      {/* HEADER & SEARCH BAR */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-[4px] text-gold-crayola">
          Exclusive Collection
        </span>
        <div className="my-2 flex items-center justify-center space-x-3">
          <DiamondSeparator />
          <h1 className="font-forum text-4xl text-white md:text-5xl">Marketplace</h1>
          <DiamondSeparator />
        </div>
        <p className="text-sm text-quicksilver max-w-lg mx-auto mb-8">
          Explore rare, artisan-crafted pieces certified for authenticity.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search shoes, bags, rings, dresses, shirts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-eerie-2 border border-white/20 py-3.5 pl-12 pr-10 text-xs text-white placeholder-quicksilver outline-none focus:border-gold-crayola transition-all rounded-xs shadow-inner"
            />
            <Search className="absolute left-4 h-4 w-4 text-gold-crayola pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 cursor-pointer text-quicksilver hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden mb-6 flex justify-between items-center">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="cursor-pointer flex items-center space-x-2 border border-gold-crayola bg-eerie-2 px-4 py-2 text-xs text-gold-crayola uppercase tracking-widest font-bold"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Categories & Filters</span>
        </button>
        <span className="text-xs text-quicksilver">
          Showing {filteredProducts.length} Results
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SIDEBAR */}
        <aside
          className={`w-full lg:w-[28%] bg-smoky-3 border border-white/10 p-5 rounded-xs transition-all duration-300 ${
            isMobileSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="font-forum text-xl text-white">Categories</h3>
            {(selectedCategory !== "All" || selectedSubcategory !== "All") && (
              <button
                onClick={() => handleCategorySelect("All", "All")}
                className="cursor-pointer text-[10px] text-gold-crayola uppercase tracking-wider hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="mb-2">
            <button
              onClick={() => handleCategorySelect("All", "All")}
              className={`cursor-pointer w-full text-left py-2 px-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xs ${
                selectedCategory === "All"
                  ? "bg-gold-crayola text-eerie-1"
                  : "text-quicksilver hover:bg-eerie-2 hover:text-white"
              }`}
            >
              All Products ({effectiveProducts.length})
            </button>
          </div>

          <div className="space-y-1">
            {CATEGORY_TREE.map((cat) => {
              const isExpanded = expandedCategory === cat.name;
              const isCatSelected = selectedCategory === cat.name;

              return (
                <div key={cat.name} className="border-b border-white/5 last:border-none">
                  <button
                    onClick={() => {
                      toggleAccordion(cat.name);
                      handleCategorySelect(cat.name, "All");
                    }}
                    className={`cursor-pointer w-full flex items-center justify-between py-3 px-3 text-xs font-semibold uppercase tracking-wider transition-all ${
                      isCatSelected
                        ? "text-gold-crayola font-bold"
                        : "text-white hover:text-gold-crayola"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gold-crayola" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-quicksilver" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="pl-4 pb-3 pt-1 space-y-1 bg-eerie-1/50 rounded-xs">
                      <button
                        onClick={() => handleCategorySelect(cat.name, "All")}
                        className={`cursor-pointer w-full text-left py-1.5 px-2 text-[11px] transition-colors ${
                          isCatSelected && selectedSubcategory === "All"
                            ? "text-gold-crayola font-bold"
                            : "text-quicksilver hover:text-white"
                        }`}
                      >
                        • All {cat.name}
                      </button>
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleCategorySelect(cat.name, sub)}
                          className={`cursor-pointer w-full text-left py-1.5 px-2 text-[11px] transition-colors ${
                            isCatSelected && selectedSubcategory === sub
                              ? "text-gold-crayola font-bold"
                              : "text-quicksilver hover:text-white"
                          }`}
                        >
                          • {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <main className="w-full lg:w-[72%]">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between border-b border-white/10 pb-4 text-xs text-quicksilver gap-2">
            <div>
              Showing <span className="text-white font-bold">{currentProducts.length}</span> of{" "}
              <span className="text-white font-bold">{filteredProducts.length}</span> products
              {selectedCategory !== "All" && (
                <span>
                  {" "}in <span className="text-gold-crayola font-semibold">{selectedCategory}</span>
                  {selectedSubcategory !== "All" && ` (${selectedSubcategory})`}
                </span>
              )}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-quicksilver">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {currentProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-white/10 rounded-xs bg-smoky-3">
              <p className="text-sm text-quicksilver">No products matched your search or category selection.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategorySelect("All", "All");
                }}
                className="mt-4 cursor-pointer text-xs uppercase tracking-widest text-gold-crayola underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden border border-white/10 bg-smoky-3 transition-all duration-300 hover:border-gold-crayola/50 hover:shadow-2xl"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-eerie-4">
                    
                    {/* HEART/WISHLIST ICON */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all cursor-pointer group/wishlist"
                      aria-label="Toggle Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                          wishlist.has(product.id)
                            ? "fill-red-500 text-red-500 scale-110"
                            : "text-white group-hover/wishlist:text-red-400 group-hover/wishlist:scale-110"
                        }`}
                      />
                    </button>

                    {product.tag && (
                      <span className="absolute top-3 left-3 z-10 bg-gold-crayola px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-eerie-1">
                        {product.tag}
                      </span>
                    )}

                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[2px] text-gold-crayola block mb-1">
                        {product.vendor.name}
                      </span>
                      
                      <Link href={`/product/${product.id}`} className="cursor-pointer block w-fit">
                        <h3
                          className="font-forum text-xl text-white transition-colors hover:text-gold-crayola line-clamp-2"
                          title={product.title}
                        >
                          {product.title}
                        </h3>
                      </Link>

                      <p className="mt-2 text-xs text-quicksilver line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-4 gap-4 sm:gap-2">
                      <div>
                        <span className="block text-[10px] text-quicksilver uppercase tracking-wider mb-0.5">Price</span>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-forum text-xl font-bold text-white">
                            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-quicksilver line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <LuxuryButton
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className="cursor-pointer flex items-center justify-center bg-gold-crayola px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-eerie-1 transition-all hover:bg-white hover:text-eerie-1 w-full sm:w-auto"
                      >
                        Acquire
                      </LuxuryButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center">
              <nav className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`cursor-pointer h-10 w-10 flex items-center justify-center border text-sm transition-colors ${
                    currentPage === 1
                      ? "border-white/10 text-white/20 cursor-not-allowed"
                      : "border-white/20 bg-eerie-2 text-white hover:border-gold-crayola hover:text-gold-crayola"
                  }`}
                  aria-label="Previous Page"
                >
                  «
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`cursor-pointer h-10 w-10 flex items-center justify-center border text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-gold-crayola border-gold-crayola text-eerie-1 shadow-md scale-105"
                          : "border-white/20 bg-eerie-2 text-white hover:border-gold-crayola hover:text-gold-crayola"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`cursor-pointer h-10 w-10 flex items-center justify-center border text-sm transition-colors ${
                    currentPage === totalPages
                      ? "border-white/10 text-white/20 cursor-not-allowed"
                      : "border-white/20 bg-eerie-2 text-white hover:border-gold-crayola hover:text-gold-crayola"
                  }`}
                  aria-label="Next Page"
                >
                  »
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Main Export Wrapped in Suspense for Next.js build compatibility
export const Marketplace = (props: MarketplaceProps) => {
  return (
    <section className="py-12 bg-eerie-1 min-h-screen text-white">
      <Suspense fallback={
        <div className="flex h-64 w-full items-center justify-center text-gold-crayola">
          Loading Exclusive Collection...
        </div>
      }>
        <MarketplaceContent {...props} />
      </Suspense>
    </section>
  );
};