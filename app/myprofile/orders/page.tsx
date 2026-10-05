// app/orders/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { OrdersList } from "@/components/myprofile/OrdersList";
import { Footer } from "@/components/Footer";

export default function OrdersPage() {
  const [cartCount, setCartCount] = useState(0);

  const handleOpenCart = () => {
    console.log("Cart Opened");
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-black">
      <Header cartCount={cartCount} onOpenCart={handleOpenCart} />
      <OrdersList />
      <Footer />
    </main>
  );
}