"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Wishlist, WishlistItem } from "@/components/myprofile/Wishlist";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { CartItem, Product } from "@/types/marketplace";

export default function ProfilePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Calculate total items count in cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle adding wishlist item to cart
  const handleAddToCart = (wishlistItem: WishlistItem) => {
    // Convert WishlistItem format to Product format
    const product: Product = {
      id: wishlistItem.id,
      title: wishlistItem.title,
      price: wishlistItem.price,
      originalPrice: wishlistItem.originalPrice,
      image: wishlistItem.image,
      category: wishlistItem.category,
      vendor: { name: wishlistItem.vendor },
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prevItems, { product, quantity: 1 }];
    });

    // The cart drawer will no longer open automatically here
  };

  // Handle removing an item from cart
  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Handle updating cart item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-black">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <Wishlist onAddToCart={handleAddToCart} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <Footer />
    </main>
  );
}