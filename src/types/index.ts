export interface ShoppingItem {
  id: string;
  title: string;
  amount: number;     
  isCompleted: boolean;
}

export type CreateShoppingItem = Omit<ShoppingItem, 'id'>;