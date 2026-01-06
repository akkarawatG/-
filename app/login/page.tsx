"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowLeft, Facebook } from "lucide-react"; // เพิ่ม Facebook icon
import { authService } from "../../services/auth.service";

// Google Icon (SVG แบบ Custom เพราะ Lucide ไม่มีโลโก้ Google สีๆ)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
    <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
    <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.0344664 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = isLogin 
        ? await authService.login(formData.email, formData.password)
        : await authService.register(formData.email, formData.password, formData.username);
      
      authService.saveUser(user);
      router.push("/"); // ล็อกอินเสร็จเด้งกลับหน้าแรก
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันจำลองการล็อกอินด้วย Social Media
  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    // จำลองการดีเลย์และการได้ข้อมูล User กลับมา
    setTimeout(() => {
        const mockUser = {
            name: `${provider === 'Google' ? 'Google' : 'Facebook'} User`,
            email: `user@${provider.toLowerCase()}.com`
        };
        authService.saveUser(mockUser);
        router.push("/");
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative p-8">
        
        <button onClick={() => router.back()} className="absolute top-6 left-6 text-gray-400 hover:text-black transition">
           <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mt-8">
           <h2 className="text-3xl font-black text-gray-900 mb-2">{isLogin ? "Welcome Back" : "Join Travel+"}</h2>
           <p className="text-gray-500 mb-6">{isLogin ? "Enter your details to sign in" : "Start your journey with us today"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative"><User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input type="text" required placeholder="Username" className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black/5" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}/>
            </div>
          )}
          <div className="relative"><Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input type="email" required placeholder="Email" className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black/5" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/>
          </div>
          <div className="relative"><Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input type="password" required placeholder="Password" className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-black/5" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition flex justify-center items-center gap-2 shadow-lg shadow-black/20 transform active:scale-95">
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        {/* --- เส้นแบ่ง (Divider) --- */}
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
            </div>
        </div>

        {/* --- ปุ่ม Social Login --- */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition transform active:scale-95"
            >
                <GoogleIcon /> Google
            </button>
            <button 
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center justify-center gap-2 w-full bg-[#1877F2] text-white font-bold py-3 rounded-xl hover:bg-[#166fe5] transition transform active:scale-95 shadow-md shadow-blue-200"
            >
                <Facebook className="w-5 h-5 fill-current" /> Facebook
            </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "No account? " : "Have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-black hover:underline">{isLogin ? "Sign up" : "Log in"}</button>
        </div>
      </div>
    </div>
  );
}