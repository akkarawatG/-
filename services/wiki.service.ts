import axios from "axios";
import { Attraction } from "../types";

export const wikiService = {
  // ดึงที่เที่ยวพร้อมรูปจาก Wikipedia (สำหรับหน้า Home)
  getAttractions: async (lat: number, lon: number): Promise<Attraction[]> => {
    try {
      const res = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: "query", generator: "geosearch", ggscoord: `${lat}|${lon}`, ggsradius: "10000",
          ggslimit: "50", prop: "pageimages|coordinates|description|extracts", exintro: true,
          exsentences: 2, explaintext: true, pithumbsize: "600", format: "json", origin: "*"
        }
      });

      const pages = res.data?.query?.pages;
      if (!pages) return [];

      return Object.values(pages).map((item: any) => ({
        id: item.pageid,
        name: item.title,
        kind: item.description || "Interesting Place",
        image: item.thumbnail?.source ?? "https://placehold.co/600x400?text=No+Image",
        lat: item.coordinates?.[0]?.lat ?? 0,
        lon: item.coordinates?.[0]?.lon ?? 0,
        description: item.extract,
        rating: 4.5,
        reviews: 500
      })).filter((p: any) => p.lat !== 0);
    } catch (error) {
      console.error("Wiki Service Error:", error);
      return [];
    }
  },

  // ดึงรูปภาพจาก Wikidata (สำหรับหน้า Explore ที่ใช้ OSM)
  getImagesForOSM: async (attractions: Attraction[]): Promise<Attraction[]> => {
    const itemsWithWiki = attractions.filter(a => a.wikidataId);
    if (itemsWithWiki.length === 0) return attractions;

    try {
      const wikiIds = itemsWithWiki.map(i => i.wikidataId).slice(0, 50).join("|");
      const res = await axios.get(`https://www.wikidata.org/w/api.php`, {
        params: { action: "wbgetentities", ids: wikiIds, props: "claims", languages: "en", format: "json", origin: "*" }
      });

      const entities = res.data.entities;
      return attractions.map(item => {
        if (item.wikidataId && entities[item.wikidataId]?.claims?.P18) {
          const fileName = entities[item.wikidataId].claims.P18[0].mainsnak.datavalue.value;
          const newImage = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=600`;
          return { ...item, image: newImage };
        }
        return item;
      });
    } catch (error) {
      console.error("Wikidata Image Error:", error);
      return attractions;
    }
  }
};