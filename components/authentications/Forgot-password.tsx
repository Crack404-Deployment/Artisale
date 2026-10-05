// components/authentications/ForgotPassword.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending OTP to:", email);
    // Redirect to OTP verification page
    router.push("/authentications/forgot-password-otp");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/authbg.png"
          alt="Luxury Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10 w-full max-w-md border border-white/20 bg-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
        
        <div className="text-center mb-8">
          <Link href="/" className="font-forum text-3xl font-normal tracking-widest text-white inline-block mb-2">
            Artisale<span className="text-gold-crayola">.</span>
          </Link>
          <p className="text-xs text-quicksilver uppercase tracking-widest mt-2">
            Forgot Password
          </p>
          <p className="text-[11px] text-quicksilver/70 mt-2">
            Enter your email address and we'll send you a 6-digit code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola transition-all rounded-xs"
              />
            </div>
          </div>

          <LuxuryButton type="submit" className="w-full py-3 text-xs tracking-widest uppercase">
            Send Reset Code
          </LuxuryButton>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-quicksilver">
          Remember your password?{" "}
          <Link
            href="/authentications/login"
            className="text-gold-crayola hover:underline font-semibold transition-all ml-1"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};