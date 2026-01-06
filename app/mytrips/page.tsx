// src/app/mytrips/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Eye, Edit3, Share2, Trash2, MoreHorizontal, MapPin } from "lucide-react";
import { MY_TRIPS, ITINERARIES, SAVED_PLACES, Trip } from "../../data/mockData";
import TripViewModal from "../../components/TripViewModal";

export default function MyTripsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("map"); // 'map' | 'itinerary'
  const [viewTrip, setViewTrip] = useState<Trip | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-gray-800 pb-20">
      
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* --- Tabs Header --- */}
        <div className="flex gap-10 border-b border-gray-200 mb-10">
           <button 
             onClick={() => setActiveTab("map")}
             className={`pb-4 text-lg font-bold border-b-4 transition-all ${activeTab === "map" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
           >
             My Travel Map
           </button>
           <button 
             onClick={() => setActiveTab("itinerary")}
             className={`pb-4 text-lg font-bold border-b-4 transition-all ${activeTab === "itinerary" ? "border-[#8B5CF6] text-[#8B5CF6]" : "border-transparent text-gray-400 hover:text-gray-600"}`}
           >
             Itinerary
           </button>
        </div>

        {/* =========================================
            TAB 1: MY TRAVEL MAP
           ========================================= */}
        {activeTab === "map" && (
          <div className="bg-white border-2 border-sky-400 rounded-2xl p-8 min-h-[600px] shadow-sm relative animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                 <div className="flex items-center gap-3">
                    <span className="text-3xl">📚</span>
                    <h1 className="text-2xl font-black text-gray-800">My Travel Templates</h1>
                 </div>
                 <button onClick={() => router.push("/mytrips/create")} className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-lg shadow-sky-200">
                    <Plus className="w-5 h-5" /> Create New
                 </button>
              </div>

              {/* Grid Cards */}
              <div className="space-y-6">
                 {MY_TRIPS.map((trip) => (
                    <div key={trip.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-20 h-14 bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200 flex-shrink-0">
                               <img src={trip.flagImage} alt="Flag" className="w-full h-full object-cover"/>
                            </div>
                            <div>
                               <h2 className="text-xl font-black text-gray-800 mb-1">{trip.title}</h2>
                               <p className="text-sm text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-md inline-block">{trip.date}</p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-5 flex justify-around mb-6 border border-gray-100">
                            <div className="text-center">
                               <p className="text-2xl font-black text-sky-500">{trip.stats.regions}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Regions</p>
                            </div>
                            <div className="text-center border-l border-gray-200 pl-8">
                               <p className="text-2xl font-black text-sky-500">{trip.stats.places}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Places</p>
                            </div>
                            <div className="text-center border-l border-gray-200 pl-8">
                               <p className="text-2xl font-black text-sky-500">{trip.stats.photos}</p>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Photos</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* ปุ่ม View -> เปิด Modal */}
                            <button onClick={() => setViewTrip(trip)} className="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-md shadow-sky-100">
                               <Eye className="w-4 h-4" /> View
                            </button>
                            {/* ปุ่ม Edit -> ไปหน้าแผนที่ */}
                            <button onClick={() => router.push(`/mytrips/edit/${trip.id}`)} className="flex-1 bg-white border-2 border-sky-400 text-sky-500 hover:bg-gray-200 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition">
                               <Edit3 className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex-1 bg-white border-2 border-sky-400 text-sky-500 hover:bg-gray-200 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition">
                               <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition ml-2">
                               <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                 ))}
              </div>
          </div>
        )}

        {/* =========================================
            TAB 2: ITINERARY
           ========================================= */}
        {activeTab === "itinerary" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-16">
             
             {/* Section 1: Itinerary Header & List */}
             <div>
                <div className="flex justify-between items-end mb-8">
                   <div>
                      <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Itinerary</h2>
                      <p className="text-gray-500 text-lg">Plan your trips and view upcoming journeys.</p>
                   </div>
                   <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-200 transition transform hover:-translate-y-0.5">
                      <Plus className="w-5 h-5" /> Add New Trip
                   </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {ITINERARIES.map((item) => (
                      <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                         <div className="h-56 rounded-2xl overflow-hidden mb-5 relative">
                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wide">
                                {item.status}
                            </div>
                         </div>
                         <div className="px-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                                📅 {item.date}
                            </p>
                            <div className="flex gap-3">
                                <button className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-3 rounded-xl font-bold text-sm transition shadow-md shadow-purple-100">View Details</button>
                                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition"><Edit3 className="w-5 h-5"/></button>
                                <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition"><Trash2 className="w-5 h-5"/></button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Section 2: Saved Places */}
             <div>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-black text-gray-900">Saved places</h2>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">{SAVED_PLACES.length}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {SAVED_PLACES.map((place) => (
                      <div key={place.id} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-lg transition border border-gray-100 flex gap-5 items-center group cursor-pointer">
                         <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 relative">
                            <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                         </div>
                         <div className="flex-1 min-w-0 pr-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{place.name}</h3>
                                <MoreHorizontal className="w-5 h-5 text-gray-300 hover:text-gray-600"/>
                            </div>
                            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                                <MapPin className="w-3 h-3"/> {place.location}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-purple-100">
                                {place.type}
                                </span>
                                <button className="bg-[#8B5CF6] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md shadow-purple-200 hover:bg-[#7C3AED] transition">
                                Added
                                </button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

          </div>
        )}

      </div>

      {/* View Modal */}
      {viewTrip && (
        <TripViewModal trip={viewTrip} onClose={() => setViewTrip(null)} />
      )}

    </div>
  );
}