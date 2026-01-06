"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal"; 
import { UserProfile } from "../data/mockData"; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginSuccess = (u: UserProfile) => {
    setUser(u);
    setShowAuthModal(false);
  };

  return (
    // ✅ ใช้ min-h-screen เพื่อให้ความสูงยืดตามเนื้อหา (แก้ปัญหา Scroll)
    // ❌ ในไฟล์นี้ห้ามมี <html> หรือ <body>
    <div className="min-h-screen bg-white flex flex-col relative">
      
      {/* Navbar */}
      <Navbar 
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={() => setUser(null)}
      />

      {/* เนื้อหา Page */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Login Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
      
    </div>
  );
}