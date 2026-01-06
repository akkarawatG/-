// src/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { createServerClient } from '@supabase/ssr';

async function getUser() {
  const cookieStore = await cookies();

  // สร้าง Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) { 
            try {
                // ใน Server Component (Layout) เราเซ็ต cookie ไม่ได้ แต่ใส่ไว้กัน error
            } catch {}
        }
      },
    }
  );

  // 1. ดึงข้อมูล User จาก Supabase Auth
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // 2. ดึงข้อมูลเพิ่มเติมจากตาราง profiles (ถ้ามี)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // ✅ จุดสำคัญ: Logic การเลือกรูปภาพ (Avatar URL)
  // ลำดับที่ 1: รูปที่ User อัปโหลดเองในตาราง profiles (avatar_url ใน DB)
  // ลำดับที่ 2: รูปจาก Google Login (avatar_url ใน metadata)
  // ลำดับที่ 3: รูปสำรองอื่นๆ (picture)
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
  
  // ✅ Logic การเลือกชื่อ
  const displayName = profile?.username || user.user_metadata?.full_name || user.user_metadata?.name || user.email;

  // ส่งข้อมูลกลับไปให้ Navbar
  return {
    id: user.id,
    name: displayName,
    email: user.email,
    image: avatarUrl, // ส่ง URL รูปภาพไปตรงนี้
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        {/* Navbar จะได้รับ user.image ที่ถูกต้องจาก getUser() ด้านบน */}
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}