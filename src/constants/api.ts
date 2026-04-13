// API CONFIGURATION
const API_IP = process.env.EXPO_PUBLIC_API_IP || "localhost";
const API_PORT = "3000";

export const API_CONFIG = {
  BASE_URL: `http://${API_IP}:${API_PORT}`,
  TIMEOUT: 5000,
  ENDPOINTS: {
    ITEMS: "/items",
  },
};
