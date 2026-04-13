import axios from "axios";
import { ShoppingItem, CreateShoppingItem } from "../types";
import { API_CONFIG } from "../constants/api"; // IMPORT CONFIG

// TYPES & INTERFACES
interface UpdateItemArgs extends Partial<ShoppingItem> {
  id: string;
}

// AXIOS INSTANCE
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API METHODS
export const fetchItems = async () => {
  const { data } = await apiClient.get<ShoppingItem[]>(
    API_CONFIG.ENDPOINTS.ITEMS,
  );
  return data;
};

export const addItem = async (item: CreateShoppingItem) => {
  const { data } = await apiClient.post<ShoppingItem>(
    API_CONFIG.ENDPOINTS.ITEMS,
    item,
  );
  return data;
};

export const updateItem = async ({ id, ...updates }: UpdateItemArgs) => {
  const { data } = await apiClient.patch<ShoppingItem>(
    `${API_CONFIG.ENDPOINTS.ITEMS}/${id}`,
    updates,
  );
  return data;
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`${API_CONFIG.ENDPOINTS.ITEMS}/${id}`);
};
