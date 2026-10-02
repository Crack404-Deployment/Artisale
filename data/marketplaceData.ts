import { Product, Vendor } from "@/types/marketplace";

export const mockVendors: Vendor[] = [
  { id: "v1", name: "Aethelgard Horology", badge: "Master Artisan", rating: 4.9, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", verified: true },
  { id: "v2", name: "Maison De Cuir", badge: "Leathersmith", rating: 4.8, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", verified: true },
  { id: "v3", name: "Solaris Fine Jewels", badge: "Goldsmith", rating: 5.0, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", verified: true },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Tourbillon Celestial Gold Watch",
    category: "Timepieces",
    price: 3450.00,
    originalPrice: 4200.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    vendor: mockVendors[0],
    tag: "Featured",
    description: "Handcrafted 18k rose gold case with skeletonized mechanical movement."
  },
  {
    id: "p2",
    title: "Hand-Stitched Leather Travel Holdall",
    category: "Leather Goods",
    price: 890.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    vendor: mockVendors[1],
    tag: "Best Seller",
    description: "Full-grain Italian calfskin with solid brass hardware."
  },
  {
    id: "p3",
    title: "Elysian Emerald Cut Diamond Ring",
    category: "Fine Jewelry",
    price: 5200.00,
    originalPrice: 6000.00,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    vendor: mockVendors[2],
    tag: "Limited",
    description: "Ethically sourced 2.5ct emerald cut diamond set in platinum."
  },
  {
    id: "p4",
    title: "Artisanal Silk Evening Kimono",
    category: "Apparel",
    price: 640.00,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    vendor: mockVendors[1],
    tag: "New",
    description: "Pure mulberry silk with hand-painted gold leaf botanical motifs."
  }
];