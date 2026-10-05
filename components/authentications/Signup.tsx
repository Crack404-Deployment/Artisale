// components/authentications/Signup.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const Signup = () => {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation to check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({ name, email, password });
    
    // Redirect to verify OTP page
    router.push("/authentications/verifyotp");
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
            Create your account
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
              <input
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola transition-all rounded-xs"
              />
            </div>
          </div>
          
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
                className="absolute right-3.5 text-quicksilver hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-10 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola transition-all rounded-xs"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-quicksilver hover:text-white transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <LuxuryButton type="submit" className="w-full py-3 text-xs tracking-widest uppercase">
            Sign Up
          </LuxuryButton>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-quicksilver">
          Have an account?{" "}
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