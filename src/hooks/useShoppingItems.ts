import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem, deleteItem, fetchItems, updateItem } from "../api/client";
import { useState } from "react";
import { ShoppingItem, CreateShoppingItem } from "../types";
import * as Haptics from "expo-haptics";

// TYPES & INTERFACES
interface MutationContext {
  previousItems: ShoppingItem[] | undefined;
}

export const useShoppingItems = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  // FETCH DATA
  const itemsQuery = useQuery({
    queryKey: ["shopping-items"],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5,
  });

  // OPTIMISTIC UPDATE PREPARATION
  const prepareOptimistic = async () => {
    await queryClient.cancelQueries({ queryKey: ["shopping-items"] });
    return queryClient.getQueryData<ShoppingItem[]>(["shopping-items"]);
  };

  // ADD ITEM MUTATION
  const addMutation = useMutation<
    ShoppingItem,
    Error,
    CreateShoppingItem,
    MutationContext
  >({
    mutationFn: addItem,
    onMutate: async (newItemData) => {
      const previousItems = (await prepareOptimistic()) || [];
      const now = new Date().toISOString();
      const normalizedTitle = newItemData.title.toLowerCase().trim();

      const existingItem = previousItems.find(
        (item) => item.title.toLowerCase().trim() === normalizedTitle,
      );

      if (existingItem) {
        // REACTIVATE EXISTING ITEM
        const updatedItem: ShoppingItem = {
          ...existingItem,
          amount: newItemData.amount,
          isCompleted: false,
          updatedAt: now,
        };
        const filtered = previousItems.filter((i) => i.id !== existingItem.id);
        queryClient.setQueryData(
          ["shopping-items"],
          [updatedItem, ...filtered],
        );

        updateMutation.mutate({
          id: existingItem.id,
          amount: newItemData.amount,
          isCompleted: false,
        });

        throw new Error("HandledAsUpdate");
      }

      // CREATE OPTIMISTIC NEW ITEM
      const optimisticItem: ShoppingItem = {
        ...newItemData,
        id: Math.random().toString(),
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
      };

      queryClient.setQueryData(
        ["shopping-items"],
        [optimisticItem, ...previousItems],
      );
      return { previousItems };
    },
    onError: (err, _, context) => {
      if (err.message !== "HandledAsUpdate") {
        queryClient.setQueryData(["shopping-items"], context?.previousItems);
      }
    },
    onSettled: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
  });

  // UPDATE ITEM MUTATION
  const updateMutation = useMutation<
    ShoppingItem,
    Error,
    Partial<ShoppingItem> & { id: string },
    MutationContext
  >({
    mutationFn: updateItem,
    onMutate: async (updatedFields) => {
      const previousItems = await prepareOptimistic();
      const now = new Date().toISOString();

      queryClient.setQueryData<ShoppingItem[]>(["shopping-items"], (old) => {
        return (old || []).map((item) =>
          item.id === updatedFields.id
            ? { ...item, ...updatedFields, updatedAt: now }
            : item,
        );
      });
      return { previousItems };
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] }),
  });

  // DELETE ITEM MUTATION
  const deleteMutation = useMutation<void, Error, string, MutationContext>({
    mutationFn: deleteItem,
    onMutate: async (id) => {
      const previousItems = await prepareOptimistic();
      queryClient.setQueryData<ShoppingItem[]>(["shopping-items"], (old) =>
        (old || []).filter((item) => item.id !== id),
      );
      return { previousItems };
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] }),
  });

  // EXPOSED METHODS & STATE
  return {
    items: itemsQuery.data ?? [],
    isLoading: itemsQuery.isLoading,
    error: itemsQuery.error,
    addItem: addMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,
    editingItem,
    setEditingItem,
    cancelEdit: () => setEditingItem(null),
  };
};
