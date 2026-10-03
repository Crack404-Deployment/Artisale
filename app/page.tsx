// app/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { HomeCatalog } from "@/components/HomeCatalog";
import { BrandValues } from "@/components/BrandValues";
import { BrandName } from "@/components/BrandName";
import { VendorSpotlight } from "@/components/VendorSpotlight";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { mockProducts } from "@/data/marketplaceData";
import { CartItem, Product } from "@/types/marketplace";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-eerie-1 text-white">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
      <HeroSlider />
      <BrandValues />
      <HomeCatalog />
      <BrandName />
      <VendorSpotlight />
      <Newsletter />
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </main>
  );
}