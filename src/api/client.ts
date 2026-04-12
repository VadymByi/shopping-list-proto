import axios from "axios";
import { ShoppingItem, CreateShoppingItem } from "../types";

// TYPES & INTERFACES
interface UpdateItemArgs extends Partial<ShoppingItem> {
  id: string;
}

// CONFIGURATION & BASE URL
const apiIp = process.env.EXPO_PUBLIC_API_IP || "localhost";
const BASE_URL = `http://${apiIp}:3000`;

console.log("🚀 API Connect to:", BASE_URL);

// AXIOS INSTANCE
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API METHODS
export const fetchItems = async () => {
  const { data } = await apiClient.get<ShoppingItem[]>("/items");
  return data;
};

export const addItem = async (item: CreateShoppingItem) => {
  const { data } = await apiClient.post<ShoppingItem>("/items", item);
  return data;
};

export const updateItem = async ({ id, ...updates }: UpdateItemArgs) => {
  const { data } = await apiClient.patch<ShoppingItem>(`/items/${id}`, updates);
  return data;
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`/items/${id}`);
};
