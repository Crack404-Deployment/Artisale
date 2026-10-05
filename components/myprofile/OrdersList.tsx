// components/orders/OrdersList.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Truck, CheckCircle2, Clock, ExternalLink, RotateCcw } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

interface OrderItem {
  id: string;
  name: string;
  artisan: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled";
  total: number;
  trackingNumber: string;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: "ART-98241",
    date: "October 12, 2026",
    status: "In Transit",
    total: 1450,
    trackingNumber: "TRK982410982X",
    items: [
      {
        id: "item-1",
        name: "Handcrafted Italian Silk Scarf",
        artisan: "Atelier Firenze",
        price: 450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=300&auto=format&fit=crop",
      },
      {
        id: "item-2",
        name: "Minimalist Solid Gold Signet Ring",
        artisan: "Aurum Guild",
        price: 1000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ART-97102",
    date: "September 28, 2026",
    status: "Delivered",
    total: 890,
    trackingNumber: "TRK971028371X",
    items: [
      {
        id: "item-3",
        name: "Artisanal Vintage Leather Tote",
        artisan: "Bespoke Heritage",
        price: 890,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ART-95430",
    date: "August 14, 2026",
    status: "Delivered",
    total: 2300,
    trackingNumber: "TRK954301129X",
    items: [
      {
        id: "item-4",
        name: "Sculptural Ceramic Vase Collection",
        artisan: "Studio Clay & Co.",
        price: 2300,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=300&auto=format&fit=crop",
      },
    ],
  },
];

export const OrdersList = () => {
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Delivered">("All");
  const pathname = usePathname();

  const navigationTabs = [
    { name: "Profile", path: "/myprofile/profile" },
    { name: "Orders", path: "/myprofile/orders" },
    { name: "Wishlist", path: "/myprofile/wishlist" },
  ];

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === "Active") return order.status === "In Transit" || order.status === "Processing";
    if (activeTab === "Delivered") return order.status === "Delivered";
    return true;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest rounded-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case "In Transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-crayola/10 border border-gold-crayola/30 text-gold-crayola text-[10px] uppercase tracking-widest rounded-xs font-semibold">
            <Truck className="w-3.5 h-3.5" /> In Transit
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] uppercase tracking-widest rounded-xs font-semibold">
            <Clock className="w-3.5 h-3.5" /> Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] uppercase tracking-widest rounded-xs font-semibold">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-crayola/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-forum text-3xl sm:text-4xl tracking-widest text-white">
              My Orders<span className="text-gold-crayola">.</span>
            </h1>
            <p className="text-xs text-quicksilver uppercase tracking-widest mt-2">
              Track active shipments & view past purchases
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xs">
            {(["All", "Active", "Delivered"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-widest transition-all rounded-xs cursor-pointer ${
                  activeTab === tab
                    ? "bg-gold-crayola text-black font-bold"
                    : "text-quicksilver hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* PAGE NAVIGATION TABS */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-px overflow-x-auto w-full mb-8 pt-2">
          {navigationTabs.map((tab) => {
            const isActive = pathname === tab.path || (tab.path === "/profile" && pathname === "/myprofile/profile");
            return (
              <Link
                key={tab.name}
                href={tab.path}
                className={`text-xs uppercase tracking-widest pb-3 whitespace-nowrap transition-all ${
                  isActive
                    ? "text-gold-crayola font-bold border-b-2 border-gold-crayola"
                    : "text-quicksilver hover:text-white border-b-2 border-transparent hover:border-white/30"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 border border-white/10 bg-white/5 backdrop-blur-xl rounded-xs">
            <Package className="w-12 h-12 text-quicksilver mx-auto mb-4 opacity-50" />
            <p className="text-sm text-quicksilver uppercase tracking-widest">No orders found</p>
            <Link href="/marketplace" className="inline-block mt-4">
              <LuxuryButton className="px-6 py-2.5 text-xs uppercase tracking-widest">
                Explore Marketplace
              </LuxuryButton>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] rounded-xs overflow-hidden transition-all hover:border-white/25"
              >
                {/* Order Top Header */}
                <div className="p-4 sm:p-6 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-quicksilver uppercase text-[10px] tracking-wider block">Order ID</span>
                      <span className="font-mono text-white font-semibold">#{order.id}</span>
                    </div>
                    <div>
                      <span className="text-quicksilver uppercase text-[10px] tracking-wider block">Date Placed</span>
                      <span className="text-white">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-quicksilver uppercase text-[10px] tracking-wider block">Total Amount</span>
                      <span className="text-gold-crayola font-semibold">${order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {getStatusBadge(order.status)}
                </div>

                {/* Items List */}
                <div className="p-4 sm:p-6 divide-y divide-white/10">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 border border-white/15 rounded-xs overflow-hidden bg-black/40">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-medium text-white tracking-wide">
                            {item.name}
                          </h3>
                          <p className="text-xs text-quicksilver mt-0.5">By {item.artisan}</p>
                          <p className="text-xs text-gold-crayola mt-1.5 font-mono">
                            ${item.price} <span className="text-quicksilver/60">× {item.quantity}</span>
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/marketplace`}
                        className="text-xs text-quicksilver hover:text-gold-crayola transition-colors hidden sm:flex items-center gap-1"
                      >
                        Buy Again <RotateCcw className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="p-4 sm:px-6 sm:py-4 bg-black/30 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="text-quicksilver text-[11px] flex items-center gap-1.5">
                    <span>Tracking Number:</span>
                    <span className="font-mono text-white">{order.trackingNumber}</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {order.status === "In Transit" && (
                      <button
                        type="button"
                        onClick={() => alert(`Tracking status for ${order.trackingNumber}`)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gold-crayola/10 border border-gold-crayola/40 text-gold-crayola hover:bg-gold-crayola hover:text-black transition-all text-xs font-medium tracking-wider uppercase rounded-xs"
                      >
                        Track Shipment
                      </button>
                    )}
                    <button
                      type="button"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-white/20 hover:border-white text-white transition-all text-xs tracking-wider uppercase rounded-xs"
                    >
                      Invoice <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};