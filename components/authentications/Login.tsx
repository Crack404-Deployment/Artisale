// components/authentications/Login.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black p-4 overflow-hidden">
      
      {/* Edge-to-Edge Fullscreen Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/authbg.png"
          alt="Luxury Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      {/* True Glassmorphic Transparent Card */}
      <div className="relative z-10 w-full max-w-md border border-white/20 bg-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="font-forum text-3xl font-normal tracking-widest text-white inline-block mb-2">
            Artisale<span className="text-gold-crayola">.</span>
          </Link>
          <p className="text-xs text-quicksilver uppercase tracking-widest">
            Welcome back to luxury
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
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

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-10 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola transition-all rounded-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-quicksilver hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-quicksilver hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded-xs border-white/20 bg-black/30 text-gold-crayola focus:ring-gold-crayola focus:ring-offset-0 accent-gold-crayola cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/authentications/forgot-password"
              className="text-gold-crayola hover:underline transition-all"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <LuxuryButton type="submit" className="w-full py-3 text-xs tracking-widest uppercase">
            Sign In
          </LuxuryButton>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-quicksilver">
          Don't have an account?{" "}
          <Link
            href="/authentications/signup"
            className="text-gold-crayola hover:underline font-semibold transition-all ml-1"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};