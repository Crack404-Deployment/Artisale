// components/myprofile/profile.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Save, 
  Edit3, 
  KeyRound, 
  Lock, 
  Trash2, 
  AlertTriangle,
  X
} from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/authbg.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Navigation Tabs
  const tabs = [
    { name: "Profile", path: "/myprofile/profile" },
    { name: "Orders", path: "/myprofile/orders" },
    { name: "Wishlist", path: "/myprofile/wishlist" },
  ];

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 000-1234",
    address: "742 Evergreen Terrace, New York, NY",
    bio: "Passionate collector of fine luxury goods and artisanal craftsmanship.",
  });

  // Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCredentials, setDeleteCredentials] = useState({
    email: "",
    password: "",
  });

  // Disable background scrolling when Delete Account Modal is open
  useEffect(() => {
    if (isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDeleteModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeleteCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setAvatarUrl(newImageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Updated Profile Data:", profileData);
  };

  const handleDeleteAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account deletion requested:", deleteCredentials);
    alert("Account deletion request submitted.");
    setIsDeleteModalOpen(false);
    setDeleteCredentials({ email: "", password: "" });
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-crayola/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        {/* Header Title */}
        <div className="text-center sm:text-left">
          <h1 className="font-forum text-3xl sm:text-4xl tracking-widest text-white">
            My Account<span className="text-gold-crayola">.</span>
          </h1>
          <p className="text-xs text-quicksilver uppercase tracking-widest mt-2">
            Manage your personal profile and preferences
          </p>
        </div>

        {/* PAGE NAVIGATION TABS */}
        <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-px overflow-x-auto w-full mb-8 pt-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || (tab.path === "/profile" && pathname === "/myprofile/profile");
            return (
              <Link
                key={tab.name}
                href={tab.path}
                className={`text-xs uppercase tracking-widest pb-3 whitespace-nowrap transition-all ${
                  isActive
                    ? "text-gold-crayola font-bold border-b-2 border-gold-crayola"
                    : "text-quicksilver hover:text-white border-b-2 border-transparent hover:border-white/30"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* MAIN PROFILE CARD */}
        <div className="border border-white/20 bg-white/5 backdrop-blur-xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
          
          {/* Avatar & Member Status Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* Profile Avatar Container */}
              <div
                onClick={handleAvatarClick}
                className={`relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold-crayola/60 transition-all ${
                  isEditing ? "group cursor-pointer hover:border-gold-crayola" : ""
                }`}
              >
                <Image
                  src={avatarUrl}
                  alt="Profile Avatar"
                  fill
                  className="object-cover"
                />

                {/* Hover overlay active ONLY during edit mode */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-gold-crayola" />
                    <span className="text-[9px] uppercase tracking-wider text-gold-crayola mt-1 font-semibold">
                      Upload
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-medium tracking-wide text-white">{profileData.name}</h2>
                <p className="text-xs text-quicksilver mt-1">{profileData.email}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-gold-crayola/10 border border-gold-crayola/30 text-gold-crayola text-[10px] uppercase tracking-widest rounded-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> VIP Member
                </div>
              </div>
            </div>

            {/* Toggle Edit Mode */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-crayola border border-gold-crayola/40 hover:border-gold-crayola px-4 py-2.5 transition-all rounded-xs cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola disabled:opacity-60 transition-all rounded-xs"
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
                    name="email"
                    disabled={!isEditing}
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola disabled:opacity-60 transition-all rounded-xs"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
                  <input
                    type="text"
                    name="phone"
                    disabled={!isEditing}
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola disabled:opacity-60 transition-all rounded-xs"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                  Shipping Address
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 h-4 w-4 text-gold-crayola pointer-events-none" />
                  <input
                    type="text"
                    name="address"
                    disabled={!isEditing}
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola disabled:opacity-60 transition-all rounded-xs"
                  />
                </div>
              </div>

            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                Short Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                disabled={!isEditing}
                value={profileData.bio}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 p-3 text-sm text-white placeholder-quicksilver/50 outline-none focus:border-gold-crayola disabled:opacity-60 transition-all rounded-xs resize-none"
              />
            </div>

            {/* Save Button (Visible only when editing) */}
            {isEditing && (
              <div className="pt-4 flex justify-end">
                <LuxuryButton type="submit" className="px-8 py-3 text-xs tracking-widest uppercase flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </LuxuryButton>
              </div>
            )}

          </form>

        </div>

        {/* SECTION 1: CHANGE PASSWORD (REDIRECTS TO FORGOT PASSWORD PAGE) */}
        <div className="border border-white/20 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium tracking-wide text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-gold-crayola" /> Change Password
              </h3>
              <p className="text-xs text-quicksilver mt-1">
                Redirect to password recovery to securely reset your credentials.
              </p>
            </div>

            <Link href="/authentications/forgot-password">
              <LuxuryButton
                type="button"
                className="px-6 py-2.5 text-xs tracking-widest uppercase shrink-0"
              >
                Change Password
              </LuxuryButton>
            </Link>
          </div>
        </div>

        {/* SECTION 2: DELETE ACCOUNT (RED THEMED) */}
        <div className="border border-red-500/30 bg-red-950/10 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium tracking-wide text-red-500 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Delete Account
              </h3>
              <p className="text-xs text-quicksilver mt-1">
                Permanently delete your account and remove all personal data.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-6 py-2.5 text-xs uppercase tracking-widest shrink-0 border border-red-500/60 hover:border-red-400 text-red-500 hover:text-red-400 bg-red-950/20 hover:bg-red-950/40 transition-all rounded-xs cursor-pointer font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* DELETE ACCOUNT CONFIRMATION POPUP MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md border border-red-500/40 bg-black/95 p-6 sm:p-8 rounded-xs shadow-[0_8px_32px_0_rgba(239,68,68,0.2)] relative space-y-6">
            
            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-quicksilver hover:text-white transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium tracking-wide text-red-500 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Delete Account
              </h3>
              <p className="text-xs text-quicksilver leading-relaxed">
                Please enter your email address and password to verify ownership before permanently deleting your account.
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleDeleteAccountSubmit} className="space-y-4">
              
              {/* Confirm Email */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                  Confirm Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4 w-4 text-red-500 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={deleteCredentials.email}
                    onChange={handleDeleteChange}
                    className="w-full bg-black/60 border border-red-500/30 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/40 outline-none focus:border-red-500 transition-all rounded-xs"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-[11px] uppercase tracking-widest text-quicksilver font-medium">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 h-4 w-4 text-red-500 pointer-events-none" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    value={deleteCredentials.password}
                    onChange={handleDeleteChange}
                    className="w-full bg-black/60 border border-red-500/30 py-3 pl-10 pr-4 text-sm text-white placeholder-quicksilver/40 outline-none focus:border-red-500 transition-all rounded-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2.5 text-xs uppercase tracking-widest text-quicksilver hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs uppercase tracking-widest flex items-center gap-2 border border-red-500 bg-red-950/40 hover:bg-red-600 text-white font-medium transition-all rounded-xs cursor-pointer shadow-lg shadow-red-900/30"
                >
                  <Trash2 className="w-4 h-4 text-white" /> Confirm Delete
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};