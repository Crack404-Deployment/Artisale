// components/authentications/ForgotPasswordOTP.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const ForgotPasswordOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Auto-focus previous input on Backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6).split("");
    
    if (pastedData.some(char => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    console.log("Verifying Password Reset OTP:", otpValue);
    
    // Redirect to reset password page
    router.push("/authentications/reset-password");
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
          <p className="text-xs text-quicksilver uppercase tracking-widest mt-2">
            Verify Password Reset OTP
          </p>
          <p className="text-[11px] text-quicksilver/70 mt-2">
            Enter the 6-digit code sent to your email address to reset your password.
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Individual OTP Fields */}
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-12 sm:w-12 sm:h-14 bg-black/30 border border-white/20 text-xl text-center text-white placeholder-quicksilver/30 outline-none focus:border-gold-crayola transition-all rounded-xs font-medium"
              />
            ))}
          </div>

          {/* Submit Button */}
          <LuxuryButton type="submit" className="w-full py-3 text-xs tracking-widest uppercase">
            Verify & Continue
          </LuxuryButton>
        </form>

        {/* Resend Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-quicksilver flex flex-col space-y-3">
          <div>
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-gold-crayola hover:underline font-semibold transition-all ml-1 cursor-pointer"
              onClick={() => alert("OTP Resent!")}
            >
              Resend OTP
            </button>
          </div>
          <div>
            <Link
              href="/authentications/login"
              className="text-quicksilver/70 hover:text-white transition-all underline"
            >
              Back to Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};