// app/product/[id]/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductDetails, ProductDetailType } from "@/components/ProductDetails";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CartItem } from "@/types/marketplace";

export default function ProductPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle adding an item from the Product Details page
  const handleAddToCart = (productDetails: ProductDetailType, quantity: number, color: string, size: string) => {
    // Map the detail type to the standard CartItem product type
    const productForCart = {
      id: productDetails.id,
      title: `${productDetails.title} - ${color} / ${size}`,
      price: productDetails.price,
      image: productDetails.images[0], // Extract first image for cart
      vendor: { name: productDetails.vendor.name }
    } as any;

    setCart((prevCart) => {
      // Check if this exact product variation is already in the cart
      const existingItem = prevCart.find((item) => item.product.id === productForCart.id);
      
      if (existingItem) {
        // Increment quantity if it already exists
        return prevCart.map((item) =>
          item.product.id === productForCart.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Otherwise, add new item
      return [...prevCart, { product: productForCart, quantity }];
    });
    
    // Automatically open the cart drawer when an item is added
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Implement the missing quantity update logic
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) => 
      prev.map((item) => 
        item.product.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-eerie-1 text-white">
      <Header cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      {/* Pass the function as a prop */}
      <ProductDetails onAddToCart={handleAddToCart} />
      
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