// components/ui/LuxuryButton.tsx
"use client";

import React from "react";

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const isPrimary = variant === "primary";

  return (
    <button
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden border-2 border-gold-crayola px-8 py-3.5 text-xs font-bold uppercase tracking-[3px] transition-colors duration-500 z-10 ${
        isPrimary ? "text-gold-crayola bg-transparent" : "bg-gold-crayola text-black"
      } ${className}`}
      {...props}
    >
      <span
        className={`absolute bottom-full left-1/2 -z-10 h-[200%] w-[200%] -translate-x-1/2 rounded-full transition-all duration-500 group-hover:bottom-[-50%] ${
          isPrimary ? "bg-gold-crayola" : "bg-smoky-1"
        }`}
      />
      <span
        className={`inline-block transition-transform duration-300 group-hover:-translate-y-10 ${
          isPrimary ? "text-gold-crayola" : "text-black"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 group-hover:top-1/2 group-hover:-translate-y-1/2 ${
          isPrimary ? "text-smoky-1" : "text-white"
        }`}
        aria-hidden="true"
      >
        {children}
      </span>
    </button>
  );
};