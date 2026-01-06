"use client";
import { X, MapPin } from "lucide-react";
import { Trip } from "../data/mockData";

interface TripViewModalProps {
  trip: Trip;
  onClose: () => void;
}

export default function TripViewModal({ trip, onClose }: TripViewModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative z-10 font-sans transform scale-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-white">
            <div>
                <h2 className="text-3xl font-black text-gray-900 mb-1">{trip.title}</h2>
                <p className="text-sm text-gray-400 font-bold">Created {trip.date}</p>
            </div>
            <button onClick={onClose} className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"><X className="w-6 h-6" /></button>
        </div>

        <div className="p-8 bg-white">
            {/* Stats Card */}
            <div className="bg-gray-50 rounded-2xl p-6 flex items-center gap-6 mb-10 border border-gray-100 shadow-sm">
                <div className="w-20 h-14 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex-shrink-0">
                    <img src={trip.flagImage} className="w-full h-full object-cover" alt="Flag" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Thailand</h3> 
                    <div className="flex gap-8">
                        <div><span className="text-3xl font-black text-[#3B82F6] block leading-none mb-1">{trip.stats.regions}</span><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Regions</span></div>
                        <div><span className="text-3xl font-black text-[#10B981] block leading-none mb-1">{trip.stats.places}</span><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Places</span></div>
                        <div><span className="text-3xl font-black text-[#F59E0B] block leading-none mb-1">{trip.stats.photos}</span><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Photos</span></div>
                    </div>
                </div>
            </div>

            {/* Regions Visited List */}
            <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-5">
                    <MapPin className="w-5 h-5 text-red-500 fill-red-500" /> Regions Visited
                </h4>
                
                {/* List Item */}
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center bg-white hover:shadow-md transition duration-300">
                    
                    {/* 1. กล่องสี */}
                    <div className="w-12 h-12 bg-[#4CAF50] rounded-xl shadow-sm flex-shrink-0 mr-4"></div>
                    
                    {/* 2. เนื้อหา (ชื่อจังหวัด) */}
                    <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-gray-900 text-base truncate">เชียงใหม่ (Chiang Mai)</h5>
                        <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                            <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" /> 
                            <span className="truncate">-Doi suthep🏔️</span>
                        </div>
                    </div>

                    {/* 3. ขวาสุด (ป้าย + ปุ่ม Delete) */}
                    <div className="flex flex-col items-end gap-1 ml-auto pl-4"> {/* ✅ ใช้ ml-auto ดันชิดขวาสุด */}
                        <span className="bg-[#4CAF50] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm">
                            Visited
                        </span>
                        <button className="bg-[#B5140E] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm">
                            Delete
                        </button>
                    </div>

                </div>

            </div>
        </div>
      </div>
    </div>
  );
}