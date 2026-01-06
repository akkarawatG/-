// src/types/index.ts

export interface UserProfile {
  name: string;
  email: string;
  token?: string; // เผื่ออนาคตมี Token จาก Backend
}

export interface Attraction {
  id: number;
  name: string;
  kind: string;
  lat: number;
  lon: number;
  rating?: number;
  reviews?: number;
  image?: string; 
  wikidataId?: string;
  description?: string;
}