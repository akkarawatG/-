"use client";
import { useState } from "react";
import { X, User, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "./Navbar"; 

interface EditProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProfileModal({ user, onClose, onSuccess }: EditProfileModalProps) {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(user.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.image || null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user.id) throw new Error("User ID not found");

      let avatarUrl = user.image;

      // 1. Upload รูป (ถ้ามี)
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrl;
      }

      // 2. บันทึกข้อมูล (เปลี่ยนเป็น UPDATE)
      // เราใช้ .update() และระบุ .eq('id', user.id) เพื่อบอกว่าแก้ยูสเซอร์คนนี้เท่านั้น
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id); // ⚠️ สำคัญ: ต้องระบุว่าจะแก้แถวไหน

      if (updateError) throw updateError;

      onSuccess(); 
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-[400px] rounded-2xl shadow-xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
             Complete Your Profile
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              
              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-all transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.91l-.495 3.762a1 1 0 0 0 1.08 1.08l3.762-.495a2 2 0 0 0 .91-.5l13.573-13.577z"/></svg>
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>
            <p className="text-xs text-gray-500">Click icon to change photo</p>
          </div>

          {/* Username Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="Display name"
            />
          </div>

          {/* Action Buttons */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#194473] hover:bg-[#14365d] text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}