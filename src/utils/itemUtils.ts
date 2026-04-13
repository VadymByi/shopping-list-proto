import { ShoppingItem } from "../types";

// DATA PROCESSING
export const sortShoppingItems = (items: ShoppingItem[]): ShoppingItem[] => {
  return [...items].sort((a, b) => {
    // Sort by completion status first
    if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;

    // Sort by date (newest first)
    const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    return timeB - timeA;
  });
};

// CALCULATIONS
export const calculateProgress = (items: ShoppingItem[]): number => {
  if (items.length === 0) return 0;
  const completedCount = items.filter((i) => i.isCompleted).length;
  return (completedCount / items.length) * 100;
};
