// CORE INTERFACES
export interface ShoppingItem {
  id: string;
  title: string;
  amount: string; // HANDLED AS STRING FROM API
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// DERIVED TYPES
export type CreateShoppingItem = Pick<ShoppingItem, "title" | "amount">;
