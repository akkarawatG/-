"use client";
import { Star, MapPin, Share2, Heart, Lightbulb, Accessibility, Bus, User } from "lucide-react";
import { Attraction } from "../data/mockData";

interface AttractionDetailContentProps {
  attraction: Attraction;
  country: string;
  onBack: () => void;
}

export default function AttractionDetailContent({ attraction, country, onBack }: AttractionDetailContentProps) {
  // Tags สีพาสเทลตามรูปต้นฉบับ
  const tags = [
    { text: "Landmark", color: "bg-pink-100 text-pink-700" },
    { text: "Water Art", color: "bg-cyan-100 text-cyan-700" },
    { text: "Photography", color: "bg-yellow-100 text-yellow-700" },
    { text: "Must Visit", color: "bg-emerald-100 text-emerald-700" }
  ];

  // Mock รีวิวให้เหมือนรูป
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      date: "Reviewed 2 weeks ago",
      rating: 5,
      text: "Absolutely breathtaking! The views from the promenade are worth every step. We went at sunset and the city lights were magical. A must-do experience!"
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      date: "Reviewed 1 month ago",
      rating: 5,
      text: "An iconic landmark for a reason. Taking the ferry is a cheap and amazing way to see both sides. It gets very crowded, so be prepared for that."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-2 uppercase tracking-wide font-semibold">
        <span className="cursor-pointer hover:text-black" onClick={onBack}>Home</span> / 
        <span className="cursor-pointer hover:text-black">{country}</span> / 
        <span className="text-black font-bold border-b-2 border-black pb-0.5">{attraction.name}</span>
      </div>

      {/* Header Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight">{attraction.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{country}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm bg-white">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900">{attraction.rating}</span>
              <span className="text-gray-400 text-xs">({attraction.reviews?.toLocaleString()} reviews)</span>
           </div>
           <button className="p-2 text-gray-400 hover:text-black transition hover:bg-gray-50 rounded-full"><Share2 className="w-5 h-5"/></button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[450px] mb-8 rounded-2xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative group cursor-pointer">
           <img src={attraction.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        {[1,2,3].map(i => (
          <div key={i} className="col-span-1 row-span-1 relative group cursor-pointer bg-gray-100">
             <img src={`https://source.unsplash.com/random/600x400?${attraction.kind},travel,${i}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" onError={(e) => (e.target as HTMLImageElement).src = attraction.image!} />
          </div>
        ))}
        <div className="col-span-1 row-span-1 relative group cursor-pointer bg-gray-100">
           <img src={`https://source.unsplash.com/random/600x400?${attraction.kind},travel,4`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" onError={(e) => (e.target as HTMLImageElement).src = attraction.image!} />
           <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="bg-white text-black font-bold px-4 py-2 rounded-full text-xs shadow-md">View all photos</span>
           </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
         {tags.map((tag, idx) => (
           <span key={idx} className={`${tag.color} px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap`}>{tag.text}</span>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* --- LEFT COLUMN: Main Info --- */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* About */}
            <section>
               <h3 className="text-xl font-bold text-gray-900 mb-3">About {attraction.name}</h3>
               <p className="text-gray-600 leading-relaxed font-light text-justify text-lg">
                  {attraction.description || `Victoria Harbour is a natural landform harbour separating Hong Kong Island in the south from the Kowloon Peninsula to the north. The harbour's deep, sheltered waters and its strategic location on the South China Sea were instrumental in Hong Kong's establishment as a British colony and its subsequent development as a trading centre.`}
               </p>
            </section>

            {/* Visitor Tips */}
            <section className="bg-emerald-50 p-6 rounded-xl flex gap-4 items-start border border-emerald-100">
               <div className="p-2 bg-white rounded-full text-emerald-600 shadow-sm">
                  <Lightbulb className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-900 mb-1">Best time for photos</h4>
                  <p className="text-sm text-gray-600">For stunning panoramic shots, visit during the "Golden Hour" just before sunset. Stay for the "Symphony of Lights" show at 8 PM daily for a spectacular multimedia experience across the skyline.</p>
               </div>
            </section>

            {/* Location Map */}
            <section>
               <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
               <div className="h-80 w-full rounded-2xl overflow-hidden bg-teal-500/10 relative group border border-gray-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition" />
                  {/* Mock Map View */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition">
                         <MapPin className="w-4 h-4 text-red-500" />
                         <span className="text-sm font-bold text-gray-800">Open Map View</span>
                      </div>
                  </div>
               </div>
            </section>

            {/* Ratings & Reviews */}
            <section>
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Ratings & Reviews</h3>
               </div>
               
               <div className="flex items-start gap-10 mb-10">
                  <div className="text-center">
                     <div className="text-6xl font-black text-gray-900 tracking-tighter leading-none">{attraction.rating}</div>
                     <div className="flex text-yellow-400 justify-center my-2 text-sm gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current"/>)}
                     </div>
                     <p className="text-xs text-gray-400 font-medium">{attraction.reviews?.toLocaleString()} reviews</p>
                  </div>
                  
                  {/* Rating Bars */}
                  <div className="flex-1 space-y-2 pt-1">
                     {[5,4,3,2,1].map((star, idx) => (
                        <div key={star} className="flex items-center gap-3 text-xs">
                           <span className="font-bold w-3 text-gray-400">{star}</span>
                           <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{width: `${idx === 0 ? 68 : idx === 1 ? 22 : idx === 2 ? 5 : 2}%`}}></div>
                           </div>
                           <span className="w-6 text-right text-gray-400">{idx === 0 ? '68%' : idx === 1 ? '22%' : '5%'}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Reviews List */}
               <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-t border-gray-100 pt-6">
                       <div className="flex items-center gap-3 mb-3">
                          <img src={review.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-200" alt={review.name}/>
                          <div>
                             <h5 className="font-bold text-sm text-gray-900">{review.name}</h5>
                             <p className="text-xs text-gray-400">{review.date}</p>
                          </div>
                          <div className="ml-auto flex text-yellow-400 text-xs">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                             ))}
                          </div>
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         {/* --- RIGHT COLUMN: Sticky Sidebar --- */}
         <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-6 shadow-xl shadow-gray-100/50">
               <div className="mb-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Entry</p>
                  <h2 className="text-3xl font-black text-gray-900">Free</h2>
                  <p className="text-xs text-gray-400 mt-1 font-medium">(Ticket prices may vary)</p>
               </div>

               <div className="space-y-5 mb-8">
                  <div className="flex gap-3 items-start">
                     <Accessibility className="w-5 h-5 text-teal-600 mt-0.5" />
                     <div>
                        <p className="font-bold text-sm text-gray-900">Accessibility</p>
                        <p className="text-xs text-gray-500">Open 24/7</p>
                     </div>
                  </div>
                  <div className="flex gap-3 items-start">
                     <Bus className="w-5 h-5 text-teal-600 mt-0.5" />
                     <div>
                        <p className="font-bold text-sm text-gray-900">Transport</p>
                        <p className="text-xs text-gray-500">MTR (Train), Bus, Taxi, Ferry</p>
                     </div>
                  </div>
               </div>

               {/* Buttons */}
               <button className="w-full bg-[#008f7a] hover:bg-[#007a68] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-600/20 mb-3 transition transform active:scale-[0.98]">
                  Book a Harbour Tour
               </button>
               <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3.5 rounded-xl transition">
                  Add to Itinerary
               </button>
            </div>
         </div>

      </div>
    </div>
  );
}