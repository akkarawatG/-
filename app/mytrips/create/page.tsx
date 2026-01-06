"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, ChevronLeft } from "lucide-react";
import { COUNTRIES_DATA } from "../../../data/mockData"; // ใช้ข้อมูลประเทศที่เรามี

export default function CreateTripPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // รวมประเทศทั้งหมดจากทุกทวีปมาเป็น Array เดียว
  const allCountries = Object.values(COUNTRIES_DATA).flat();

  // กรองตามคำค้นหา
  const filteredCountries = allCountries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = (countryName: string) => {
    // ในอนาคต: ส่งข้อมูลไปสร้างทริปใน Database
    // ตอนนี้: จำลองการสร้างสำเร็จ แล้วเด้งกลับไปหน้า My Trips
    alert(`Created a new trip to ${countryName}! 🎉`);
    router.push("/mytrips");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-20">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-10">
         <button 
           onClick={() => router.back()} 
           className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition"
         >
            <ChevronLeft className="w-5 h-5" /> Back
         </button>

         <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-black text-gray-900">Select a Country</h1>
         </div>
         <p className="text-gray-500 mb-8 ml-11">Choose which country you want to map your travels</p>

         {/* Search Bar */}
         <div className="relative mb-10">
            <input 
              type="text" 
              placeholder="Search countries..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />
            <Search className="absolute left-4 top-4.5 w-5 h-5 text-gray-400" />
         </div>

         {/* Countries Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country, index) => (
               <button 
                 key={`${country.name}-${index}`}
                 onClick={() => handleSelectCountry(country.name)}
                 className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg hover:bg-blue-50/30 transition-all duration-300 group"
               >
                  {/* Flag Image (Circle or Rounded Rect) */}
                  <div className="w-20 h-14 mb-4 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                     <img 
                       src={`https://flagcdn.com/w320/${getCountryCode(country.name)}.png`} 
                       alt={country.name} 
                       className="w-full h-full object-cover"
                       // Fallback for flags
                       onError={(e) => (e.target as HTMLImageElement).src = "https://placehold.co/100x70?text=Flag"}
                     />
                  </div>
                  
                  <span className="font-bold text-lg text-gray-800 group-hover:text-blue-700">
                    {country.name}
                  </span>
               </button>
            ))}

            {filteredCountries.length === 0 && (
               <div className="col-span-full text-center py-20 text-gray-400">
                  No countries found matching "{searchQuery}"
               </div>
            )}
         </div>

      </div>
    </div>
  );
}

// Helper: แปลงชื่อประเทศเป็นรหัสธงชาติ (ISO 2-char code แบบง่ายๆ)
// ในโปรเจกต์จริงอาจต้องใช้ Library หรือ Mapping ที่แม่นยำกว่านี้
function getCountryCode(countryName: string) {
  const map: Record<string, string> = {
    "Thailand": "th", "Japan": "jp", "China": "cn", "South Korea": "kr", 
    "United States": "us", "United Kingdom": "gb", "France": "fr", "Italy": "it",
    "Germany": "de", "Spain": "es", "Australia": "au", "Canada": "ca",
    "Brazil": "br", "Mexico": "mx", "Vietnam": "vn", "India": "in"
  };
  return map[countryName] || "un"; // un = unknown flag
}