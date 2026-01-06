// src/components/ClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import { UserProfile } from "../data/mockData";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("travel_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem("travel_user", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("travel_user");
  };

  return (
    <>
      {/* Navbar อยู่ตรงนี้ ทีเดียวจบ */}
      <Navbar user={user} onLoginClick={() => setShowAuthModal(true)} onLogout={handleLogout} />
      
      {/* เนื้อหาของแต่ละหน้าจะมาโผล่ตรงนี้ */}
      {children}

      {/* Modal ล็อกอิน ก็แปะไว้ตรงนี้ทีเดียว */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={handleLogin} />}
    </>
  );
}