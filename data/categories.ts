// src/data/categories.ts

export interface SubCategory {
  id: string;
  name: string;
  osmTags: string[]; // เก็บ Tag ของ OSM สำหรับหมวดนี้โดยเฉพาะ
}

export interface Category {
  id: string;
  name: string;
  label_th: string;
  icon: string;
  color: string;
  subCategories: SubCategory[];
}

export const ATTRACTION_CATEGORIES: Category[] = [
  {
    id: "nature_outdoors",
    name: "Nature & Outdoors",
    label_th: "ธรรมชาติ",
    icon: "🏔️",
    color: "bg-emerald-100 text-emerald-700",
    subCategories: [
      { id: "all", name: "All Nature", osmTags: ['node["natural"]', 'node["leisure"="nature_reserve"]', 'node["waterway"="waterfall"]', 'node["natural"="beach"]'] },
      { id: "mountain", name: "Mountains", osmTags: ['node["natural"="peak"]', 'node["natural"="volcano"]'] },
      { id: "waterfall", name: "Waterfalls", osmTags: ['node["waterway"="waterfall"]'] },
      { id: "beach", name: "Beaches", osmTags: ['node["natural"="beach"]'] },
      { id: "park", name: "National Parks", osmTags: ['node["leisure"="nature_reserve"]', 'node["boundary"="national_park"]'] },
      { id: "cave", name: "Caves", osmTags: ['node["natural"="cave_entrance"]'] }
    ]
  },
  {
    id: "history_culture",
    name: "History & Culture",
    label_th: "ประวัติศาสตร์",
    icon: "🏯",
    color: "bg-amber-100 text-amber-700",
    subCategories: [
      { id: "all", name: "All History", osmTags: ['node["historic"]', 'node["amenity"="place_of_worship"]', 'node["tourism"="museum"]'] },
      { id: "temple", name: "Temples & Shrines", osmTags: ['node["amenity"="place_of_worship"]'] },
      { id: "museum", name: "Museums", osmTags: ['node["tourism"="museum"]'] },
      { id: "historic", name: "Historic Sites", osmTags: ['node["historic"]', 'node["historic"="ruins"]'] },
      { id: "monument", name: "Monuments", osmTags: ['node["historic"="monument"]', 'node["historic"="memorial"]'] }
    ]
  },
  {
    id: "landmarks_sightseeing",
    name: "Landmarks & Views",
    label_th: "จุดชมวิว",
    icon: "📸",
    color: "bg-indigo-100 text-indigo-700",
    subCategories: [
      { id: "all", name: "All Landmarks", osmTags: ['node["tourism"="viewpoint"]', 'node["tourism"="attraction"]'] },
      { id: "viewpoint", name: "Viewpoints", osmTags: ['node["tourism"="viewpoint"]'] },
      { id: "attraction", name: "Tourist Attractions", osmTags: ['node["tourism"="attraction"]'] },
      { id: "square", name: "City Squares", osmTags: ['node["place"="square"]'] }
    ]
  },
  {
    id: "shopping_lifestyle",
    name: "Shopping",
    label_th: "ช้อปปิ้ง",
    icon: "🛍️",
    color: "bg-pink-100 text-pink-700",
    subCategories: [
      { id: "all", name: "All Shopping", osmTags: ['node["shop"="mall"]', 'node["amenity"="marketplace"]'] },
      { id: "mall", name: "Malls", osmTags: ['node["shop"="mall"]', 'node["shop"="department_store"]'] },
      { id: "market", name: "Markets", osmTags: ['node["amenity"="marketplace"]'] }
    ]
  },
  {
    id: "food_dining",
    name: "Food & Dining",
    label_th: "อาหาร",
    icon: "🍜",
    color: "bg-orange-100 text-orange-700",
    subCategories: [
      { id: "all", name: "All Food", osmTags: ['node["amenity"="restaurant"]', 'node["amenity"="cafe"]', 'node["amenity"="fast_food"]'] },
      { id: "restaurant", name: "Restaurants", osmTags: ['node["amenity"="restaurant"]'] },
      { id: "cafe", name: "Cafes", osmTags: ['node["amenity"="cafe"]'] },
      { id: "food_court", name: "Food Courts", osmTags: ['node["amenity"="food_court"]'] }
    ]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    label_th: "บันเทิง",
    icon: "🎡",
    color: "bg-purple-100 text-purple-700",
    subCategories: [
      { id: "all", name: "All Entertainment", osmTags: ['node["tourism"="theme_park"]', 'node["tourism"="zoo"]', 'node["leisure"="water_park"]'] },
      { id: "theme_park", name: "Theme Parks", osmTags: ['node["tourism"="theme_park"]'] },
      { id: "zoo", name: "Zoos & Aquariums", osmTags: ['node["tourism"="zoo"]', 'node["tourism"="aquarium"]'] }
    ]
  }
];