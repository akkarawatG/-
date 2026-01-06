import axios from "axios";

export const geoService = {
  getCoordinates: async (city: string) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: city, format: "json", limit: 1, "accept-language": "en-US" }
      });
      if (res.data && res.data.length > 0) {
        return { lat: res.data[0].lat, lon: res.data[0].lon };
      }
      return null;
    } catch (error) {
      console.error("Geo Service Error:", error);
      return null;
    }
  }
};