// app/artisanguild/page.tsx
"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ArtisanGuild } from "@/components/ArtisanGuild";
import { Footer } from "@/components/Footer";

export default function ArtisanGuildPage() {
    const [cartCount, setCartCount] = useState(0);

    const handleOpenCart = () => {
        // Open cart drawer handler
        console.log("Open cart");
    };

    return (
        <div className="min-h-screen bg-eerie-1 text-white flex flex-col justify-between">
            <Header cartCount={cartCount} onOpenCart={handleOpenCart} />
            <ArtisanGuild />
            <Footer />
        </div>
    );
}