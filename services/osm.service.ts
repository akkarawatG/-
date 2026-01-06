// src/services/osm.service.ts
import axios from "axios";
import { Attraction } from "../types";
import { ATTRACTION_CATEGORIES } from "../data/categories";

const OVERPASS_INSTANCES = [
  "https://overpass-api.de/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
];

export const osmService = {
  getAttractions: async (lat: number, lon: number, categoryId: string, subCategoryId: string = "all"): Promise<Attraction[]> => {
    
    let tagQuery = "";

    if (categoryId === "all") {
      // กรณีเลือก All Categories (หน้าแรกสุด) - ดึงแบบกว้างๆ
      tagQuery = `
        node["tourism"~"museum|attraction|viewpoint"](around:5000,${lat},${lon});
        node["amenity"="place_of_worship"](around:5000,${lat},${lon});
        node["leisure"="park"](around:5000,${lat},${lon});
      `;
    } else {
      // หาหมวดหมู่หลัก
      const category = ATTRACTION_CATEGORIES.find(c => c.id === categoryId);
      if (category) {
        // หาหมวดหมู่ย่อย
        const subCategory = category.subCategories.find(s => s.id === subCategoryId);
        
        // ถ้าเลือกหมวดหมู่ย่อยเจาะจง ให้ใช้ tag ของมัน
        // ถ้าเลือก "all" (ของหมวดนั้น) หรือหาไม่เจอ ให้ใช้ tag ของ subCategory ตัวแรก (ซึ่งเราตั้งให้เป็น All ไว้)
        const tagsToUse = subCategory ? subCategory.osmTags : category.subCategories[0].osmTags;
        
        tagQuery = tagsToUse.map(tag => `${tag}(around:5000,${lat},${lon});`).join("\n");
      }
    }

    // Query Template
    const query = `
      [out:json][timeout:25];
      (
        ${tagQuery}
      );
      out center 60; 
    `;

    for (const server of OVERPASS_INSTANCES) {
      try {
        const res = await axios.get(server, { params: { data: query }, timeout: 15000 });
        if (res.data && res.data.elements) {
          return res.data.elements.map((item: any) => {
            // Map Kind (Simple mapping for display)
            let kind = "Attraction";
            const t = item.tags;
            if (t.natural === "peak") kind = "Mountain";
            else if (t.waterway === "waterfall") kind = "Waterfall";
            else if (t.natural === "beach") kind = "Beach";
            else if (t.amenity === "place_of_worship") kind = "Temple";
            else if (t.tourism === "museum") kind = "Museum";
            else if (t.amenity === "restaurant") kind = "Restaurant";
            else if (t.amenity === "cafe") kind = "Cafe";
            else if (t.shop === "mall") kind = "Mall";

            return {
              id: item.id,
              name: item.tags.name || item.tags["name:en"] || "Unknown Place",
              kind: kind,
              lat: item.lat,
              lon: item.lon,
              wikidataId: item.tags.wikidata,
              rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)),
              reviews: Math.floor(Math.random() * 500) + 50,
              image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&q=80"
            };
          }).filter((p: any) => p.name !== "Unknown Place");
        }
      } catch (error) {
        console.warn(`OSM Fetch Error (${server}):`, error);
        continue;
      }
    }
    return [];
  }
};