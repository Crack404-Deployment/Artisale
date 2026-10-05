"use client"; // <-- Add this at the top

import { useState } from "react";
import { Header } from "@/components/Header";
import { Profile } from "@/components/myprofile/Profile";
import { Footer } from "@/components/Footer";

export default function ProfilePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col justify-between bg-black">
      <Header 
        cartCount={0} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      <Profile />
      <Footer />
    </main>
  );
}