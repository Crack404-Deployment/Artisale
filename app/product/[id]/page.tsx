// app/product/[id]/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductDetails } from "@/components/ProductDetails";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CartItem } from "@/types/marketplace";

export default function ProductPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-eerie-1 text-white">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
      <ProductDetails />
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
      />
    </main>
  );
}