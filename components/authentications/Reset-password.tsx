// components/authentications/ResetPassword.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const ResetPassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Updating password...");

    // Redirect to login page on successful reset
    router.push("/authentications/login");
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

      {/* Glassmorphic Transparent Card */}
      <div className="relative z-10 w-full max-w-md border border-white/20 bg-white/5 p-8 sm:p-10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-forum text-3xl font-normal tracking-widest text-white inline-block mb-2"
          >
            Artisale<span className="text-gold-crayola">.</span>
          </Link>
          <p className="text-xs text-quicksilver uppercase tracking-widest mt-2">
            Reset Password
          </p>
          <p className="text-[11px] text-quicksilver/70 mt-2">
            Please enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              New Password
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

          {/* Confirm New Password Field */}
          <div className="space-y-2">
            <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
              Confirm New Password
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

          {/* Submit Button */}
          <LuxuryButton type="submit" className="w-full py-3 text-xs tracking-widest uppercase">
            Update Password
          </LuxuryButton>
        </form>

        {/* Login Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-quicksilver">
          Remembered your password?{" "}
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