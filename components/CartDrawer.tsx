// components/CartDrawer.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types/marketplace";
import { LuxuryButton } from "./ui/LuxuryButton";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove,
  onUpdateQuantity 
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-smoky-1 p-6 flex flex-col justify-between border-l border-white/10">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-gold-crayola" />
              <h2 className="font-forum text-2xl text-white">Your Selection</h2>
            </div>
            <button onClick={onClose} className="p-1 text-quicksilver hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {items.length === 0 ? (
              <p className="text-center text-sm text-quicksilver py-12">
                Your cart is currently empty.
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-4 border-b border-white/5 pb-4"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 bg-eerie-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-forum text-base text-white">{item.product.title}</h4>
                    <p className="text-xs text-gold-crayola mb-2">{item.product.vendor.name}</p>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-white/20 rounded-xs bg-black/20">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-quicksilver hover:text-white disabled:opacity-30 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        
                        <span className="text-xs text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-quicksilver hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs text-quicksilver">
                        @ ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="text-davysgrey hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-semibold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="uppercase tracking-widest text-quicksilver">Subtotal</span>
            <span className="font-forum text-2xl text-gold-crayola">${subtotal.toFixed(2)}</span>
          </div>
          <LuxuryButton className="w-full">Proceed To Checkout</LuxuryButton>
        </div>
      </div>
    </div>
  );
};