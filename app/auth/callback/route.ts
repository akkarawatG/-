import { NextResponse } from 'next/server'
// เรียกใช้ createClient จากไฟล์ server ที่เราเพิ่งสร้างเมื่อกี้
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // เช็คว่ามี param "next" ส่งมาไหม ถ้ามีให้ใช้เป็นปลายทาง (ถ้าไม่มีให้ไปหน้า home /)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Login สำเร็จ! ส่ง User ไปยังหน้าปลายทาง
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // ถ้า Code ผิด หรือ Login ไม่ผ่าน ให้เด้งไปหน้า Error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}