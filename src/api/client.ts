import axios from "axios";
import { ShoppingItem, CreateShoppingItem } from "../types";

interface UpdateItemArgs extends Partial<ShoppingItem> {
  id: string;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const fetchItems = async () => {
  const { data } = await apiClient.get<ShoppingItem[]>("/items");
  return data;
};

export const addItem = async (item: CreateShoppingItem) => {
  const { data } = await apiClient.post<ShoppingItem>("items", item);
  return data;
};

export const updateItem = async ({ id, ...updates }: UpdateItemArgs) => {
  const { data } = await apiClient.patch<ShoppingItem>(`/items/${id}`, updates);
  return data;
};

export const deleteItem = async (id: string) => {
  await apiClient.delete(`/items/${id}`);
};
