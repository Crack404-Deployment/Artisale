// components/ProductDetails.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  MessageSquare, 
  Truck, 
  CreditCard, 
  RotateCcw, 
  Star, 
  CheckCircle, 
  Plus, 
  Minus, 
  X,
  Send
} from "lucide-react";
import { LuxuryButton } from "./ui/LuxuryButton";
import { DiamondSeparator } from "./ui/DiamondSeparator";

// Mock Product Type
interface ProductDetailType {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  features: string[];
  vendor: {
    name: string;
    verified: boolean;
    rating: number;
    responseTime: string;
  };
  delivery: {
    charge: string;
    time: string;
  };
  paymentMethods: string[];
  returnPolicy: string;
}

// Mock Data
const sampleProduct: ProductDetailType = {
  id: "1",
  title: "Elysian Emerald Cut Diamond Ring",
  price: 5200.0,
  originalPrice: 6000.0,
  images: [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  ],
  colors: [
    { name: "Platinum", hex: "#E5E4E2" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Yellow Gold", hex: "#E5C158" },
  ],
  sizes: ["5", "6", "7", "8", "9"],
  description:
    "Ethically sourced 2.5ct emerald cut diamond set in a handcrafted platinum halo band. Masterfully created by Solaris Fine Jewels using vintage stone-setting techniques for unrivaled radiance.",
  features: [
    "2.5ct Natural Emerald-Cut Diamond (VS1 Clarity, F Color)",
    "Handcrafted 950 Platinum & 18K Rose Gold Halo",
    "GIA Certified with Laser Inscription",
    "Includes Deluxe Velvet Presentation Box",
  ],
  vendor: {
    name: "Solaris Fine Jewels",
    verified: true,
    rating: 5.0,
    responseTime: "Usually replies in 1 hour",
  },
  delivery: {
    charge: "Complimentary Insured Shipping",
    time: "2 - 4 Business Days",
  },
  paymentMethods: ["Visa", "Mastercard", "Amex", "Apple Pay", "Cryptocurrency"],
  returnPolicy: "30-Day Complimentary Luxury Returns & Exchanges",
};

const mockReviews = [
  {
    id: "r1",
    author: "Lady Eleanor Vance",
    rating: 5,
    date: "October 12, 2025",
    comment: "Absolutely breathtaking craftsmanship. The diamond catches the light remarkably.",
  },
  {
    id: "r2",
    author: "Julian Sterling",
    rating: 5,
    date: "September 28, 2025",
    comment: "Delivered securely in a velvet vault box. Solaris Fine Jewels provided top-tier service.",
  },
];

const mockRelatedProducts = [
  {
    id: "rel-1",
    title: "Aura Solitaire Platinum Necklace",
    price: 3400.0,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "rel-2",
    title: "Celestial Sapphire Band",
    price: 4100.0,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=400",
  },
];

export const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(sampleProduct.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(sampleProduct.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{sender: "user" | "vendor", text: string}[]>([]);

  // Review Form State
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviewsList, setReviewsList] = useState(mockReviews);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    setReviewsList([
      {
        id: Date.now().toString(),
        author: newReview.name,
        rating: newReview.rating,
        date: "Just now",
        comment: newReview.comment,
      },
      ...reviewsList,
    ]);

    setNewReview({ name: "", rating: 5, comment: "" });
    setShowReviewModal(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory([...chatHistory, { sender: "user", text: chatMessage }]);
    setChatMessage("");

    // Simulate vendor response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: "vendor", text: "Thank you for your message. An artisan will be with you shortly." }]);
    }, 1000);
  };

  return (
    <div className="py-12 bg-eerie-1 text-white relative min-h-screen mt-24">
      <div className="container mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 text-xs text-quicksilver">
          <Link href="/marketplace" className="hover:text-gold-crayola transition-colors">
            Marketplace
          </Link>{" "}
          / <span className="text-white">{sampleProduct.title}</span>
        </div>

        {/* Main Product Info Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT SIDE: Product Image & Selection Controls */}
          <div className="flex flex-col space-y-6">
            {/* Main Product Image */}
            <div className="relative aspect-square w-full overflow-hidden border border-white/10 bg-eerie-2 rounded-sm">
              <Image
                src={sampleProduct.images[0]}
                alt={sampleProduct.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Details Header */}
            <div>
              <h1 className="font-forum text-3xl font-normal text-white md:text-4xl">
                {sampleProduct.title}
              </h1>

              <div className="mt-3 flex items-baseline space-x-4">
                <span className="font-forum text-3xl font-bold text-gold-crayola">
                  ${sampleProduct.price.toFixed(2)}
                </span>
                {sampleProduct.originalPrice && (
                  <span className="text-sm text-quicksilver line-through">
                    ${sampleProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-quicksilver block mb-2">
                Color: <span className="text-white">{selectedColor}</span>
              </label>
              <div className="flex items-center space-x-3">
                {sampleProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`cursor-pointer h-9 w-9 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color.name
                        ? "border-gold-crayola scale-110"
                        : "border-white/20 hover:border-white/50"
                    }`}
                    title={color.name}
                  >
                    <span
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-quicksilver block mb-2">
                Ring Size: <span className="text-white">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer h-10 min-w-10 px-4 text-xs font-bold transition-all rounded-sm border ${
                      selectedSize === size
                        ? "border-gold-crayola bg-gold-crayola text-eerie-1"
                        : "border-white/10 bg-eerie-2 text-quicksilver hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-quicksilver block mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-white/15 bg-eerie-2 rounded-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="cursor-pointer p-2.5 text-quicksilver hover:text-white transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="cursor-pointer p-2.5 text-quicksilver hover:text-white transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <LuxuryButton variant="primary" className="w-full py-4 text-sm mt-4">
              <span className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" /> Add To Cart
              </span>
            </LuxuryButton>
          </div>

          {/* RIGHT SIDE: Vendor, Shipping, Policies & Chat */}
          <div className="flex flex-col space-y-6">
            {/* Vendor Card */}
            <div className="border border-white/10 bg-smoky-3 p-6 rounded-sm">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-quicksilver block">
                    Curated Vendor
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <h3 className="font-forum text-xl text-white">
                      {sampleProduct.vendor.name}
                    </h3>
                    {sampleProduct.vendor.verified && (
                      <CheckCircle className="h-4 w-4 text-gold-crayola" />
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs font-bold text-white">
                    {sampleProduct.vendor.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Chat with Vendor Button (Updated to LuxuryButton) */}
              <div className="mt-4">
                <LuxuryButton 
                  onClick={() => setIsChatOpen(true)} 
                  variant="secondary" 
                  className="w-full text-xs"
                >
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" /> Chat with Vendor
                  </span>
                </LuxuryButton>
              </div>
              <p className="mt-3 text-center text-[11px] text-quicksilver">
                {sampleProduct.vendor.responseTime}
              </p>
            </div>

            {/* Delivery Information */}
            <div className="border border-white/10 bg-smoky-3 p-6 rounded-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-crayola">
                Delivery Information
              </h4>
              <div className="flex items-start space-x-3 text-xs text-quicksilver">
                <Truck className="h-5 w-5 text-gold-crayola shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{sampleProduct.delivery.charge}</p>
                  <p className="text-[11px]">Estimated delivery: {sampleProduct.delivery.time}</p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="border border-white/10 bg-smoky-3 p-6 rounded-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-crayola">
                Accepted Payment Options
              </h4>
              <div className="flex items-start space-x-3 text-xs text-quicksilver">
                <CreditCard className="h-5 w-5 text-gold-crayola shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {sampleProduct.paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="border border-white/10 bg-eerie-2 px-2.5 py-1 text-[10px] text-white rounded-xs"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Return Policy */}
            <div className="border border-white/10 bg-smoky-3 p-6 rounded-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gold-crayola">
                Return Policy
              </h4>
              <div className="flex items-start space-x-3 text-xs text-quicksilver">
                <RotateCcw className="h-5 w-5 text-gold-crayola shrink-0 mt-0.5" />
                <p className="leading-relaxed">{sampleProduct.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: TABS (Description & Reviews) */}
        <div className="mt-20 border-t border-white/10 pt-12">
          {/* Tab Buttons */}
          <div className="flex justify-center border-b border-white/10 pb-4 space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`cursor-pointer text-sm font-bold uppercase tracking-widest pb-2 transition-all relative ${
                activeTab === "description"
                  ? "text-gold-crayola after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-crayola"
                  : "text-quicksilver hover:text-white"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`cursor-pointer text-sm font-bold uppercase tracking-widest pb-2 transition-all relative ${
                activeTab === "reviews"
                  ? "text-gold-crayola after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-crayola"
                  : "text-quicksilver hover:text-white"
              }`}
            >
              Reviews ({reviewsList.length})
            </button>
          </div>

          {/* TAB 1: DESCRIPTION & RELATED PRODUCTS */}
          {activeTab === "description" && (
            <div className="mt-10 space-y-12 max-w-4xl mx-auto">
              {/* Product Description */}
              <div className="space-y-4 text-quicksilver text-sm leading-relaxed">
                <p>{sampleProduct.description}</p>
                <ul className="list-disc list-inside space-y-2 pt-2 text-white/90">
                  {sampleProduct.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Related Products */}
              <div className="pt-10 border-t border-white/10">
                <div className="text-center mb-8">
                  <DiamondSeparator />
                  <h3 className="font-forum text-2xl text-white mt-2">Related Products</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {mockRelatedProducts.map((item) => (
                    <div
                      key={item.id}
                      className="group flex border border-white/10 bg-smoky-3 p-3 space-x-4 items-center hover:border-gold-crayola/50 transition-all cursor-pointer"
                    >
                      <div className="relative h-20 w-20 shrink-0 bg-eerie-2 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="font-forum text-lg text-white group-hover:text-gold-crayola transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-forum text-gold-crayola font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="mt-10 max-w-3xl mx-auto space-y-8">
              {/* Header & Write Review Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h3 className="font-forum text-2xl text-white">Client Reviews</h3>
                  <p className="text-xs text-quicksilver mt-1">
                    Showing {reviewsList.length} verified buyer reviews
                  </p>
                </div>

                <LuxuryButton
                  onClick={() => setShowReviewModal(true)}
                  variant="primary"
                  className="text-xs"
                >
                  Write A Review
                </LuxuryButton>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="border border-white/10 bg-smoky-3 p-6 rounded-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm">{rev.author}</span>
                      <span className="text-xs text-quicksilver">{rev.date}</span>
                    </div>

                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>

                    <p className="text-xs text-quicksilver leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WRITE A REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md border border-gold-crayola/40 bg-eerie-1 p-6 rounded-sm shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="cursor-pointer absolute right-4 top-4 text-quicksilver hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-forum text-2xl text-white mb-4">Write a Review</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-widest text-quicksilver mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Lord Harrington"
                  className="w-full border border-white/15 bg-eerie-2 py-2.5 px-3 text-white outline-none focus:border-gold-crayola"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-quicksilver mb-1">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: Number(e.target.value) })
                  }
                  className="cursor-pointer w-full border border-white/15 bg-eerie-2 py-2.5 px-3 text-white outline-none focus:border-gold-crayola"
                >
                  <option value={5}>5 Stars - Exceptional</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Average</option>
                  <option value={2}>2 Stars - Poor</option>
                  <option value={1}>1 Star - Unsatisfactory</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-widest text-quicksilver mb-1">
                  Review Comment
                </label>
                <textarea
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your thoughts regarding the quality, craftsmanship, and delivery..."
                  className="w-full border border-white/15 bg-eerie-2 py-2.5 px-3 text-white outline-none focus:border-gold-crayola"
                />
              </div>

              <LuxuryButton type="submit" variant="primary" className="w-full">
                Submit Review
              </LuxuryButton>
            </form>
          </div>
        </div>
      )}

      {/* CHAT WINDOW */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 shadow-2xl flex flex-col rounded-sm overflow-hidden border border-gold-crayola/40 bg-eerie-1">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-smoky-3 p-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <h4 className="font-forum text-lg text-white leading-none">
                {sampleProduct.vendor.name}
              </h4>
              {sampleProduct.vendor.verified && (
                <CheckCircle className="h-3.5 w-3.5 text-gold-crayola" />
              )}
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-quicksilver hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 h-64 overflow-y-auto bg-eerie-2 flex flex-col space-y-3">
            <p className="text-[10px] text-quicksilver text-center uppercase tracking-widest mb-2">
              {sampleProduct.vendor.responseTime}
            </p>
            
            {chatHistory.length === 0 ? (
              <p className="text-xs text-quicksilver text-center my-auto">
                Send a message to inquire about custom sizing, materials, or delivery.
              </p>
            ) : (
              chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`max-w-[85%] rounded-sm p-3 text-xs ${
                    msg.sender === "user" 
                      ? "bg-gold-crayola text-eerie-1 self-end" 
                      : "bg-smoky-3 border border-white/10 text-white self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Chat Input Area */}
          <form 
            onSubmit={handleSendMessage} 
            className="border-t border-white/10 bg-smoky-3 p-3 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1 bg-eerie-2 border border-white/15 py-2 px-3 text-xs text-white outline-none focus:border-gold-crayola rounded-sm"
            />
            <button 
              type="submit"
              disabled={!chatMessage.trim()}
              className="cursor-pointer text-gold-crayola hover:text-white transition-colors disabled:opacity-50 p-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};