import axios from "axios";
import { ShoppingItem, CreateShoppingItem } from "../types";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchItems = async () => {
  const { data } = await api.get<ShoppingItem[]>("/items");
  return data;
};

export const addItem = async (item: CreateShoppingItem) => {
  const { data } = await api.post<ShoppingItem>("items", item);
  return data;
};

export const updateItem = async (
  id: string,
  updates: Partial<ShoppingItem>,
) => {
  const { data } = await api.patch<ShoppingItem>(`/items/${id}`, updates);
  return data;
};

export const deleteItem = async (id: string) => {
  await api.delete(`/items/${id}`);
};
