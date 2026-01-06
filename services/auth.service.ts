import { UserProfile } from "../types";

export const authService = {
  login: async (email: string, password: string): Promise<UserProfile> => {
    // 🔮 อนาคต: เปลี่ยนเป็น axios.post('/api/login', { email, password })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Traveler", // Mock data
          email: email
        });
      }, 1500);
    });
  },

  register: async (email: string, password: string, username: string): Promise<UserProfile> => {
    // 🔮 อนาคต: เปลี่ยนเป็น axios.post('/api/register', ...)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: username,
          email: email
        });
      }, 1500);
    });
  },

  logout: () => {
    localStorage.removeItem("travel_user");
  },

  getCurrentUser: (): UserProfile | null => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("travel_user");
    return saved ? JSON.parse(saved) : null;
  },

  saveUser: (user: UserProfile) => {
    localStorage.setItem("travel_user", JSON.stringify(user));
  }
};