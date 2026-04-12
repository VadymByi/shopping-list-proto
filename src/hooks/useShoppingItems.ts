import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem, deleteItem, fetchItems, updateItem } from "../api/client";
import { useState } from "react";
import { ShoppingItem, CreateShoppingItem } from "../types";
import * as Haptics from "expo-haptics";

export const useShoppingItems = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const itemsQuery = useQuery({
    queryKey: ["shopping-items"],
    queryFn: fetchItems,
  });

  const prepareOptimistic = async () => {
    await queryClient.cancelQueries({ queryKey: ["shopping-items"] });
    return queryClient.getQueryData<ShoppingItem[]>(["shopping-items"]);
  };

  // ADD MUTATION
  const addMutation = useMutation({
    mutationFn: addItem,
    onMutate: async (newItemData: CreateShoppingItem) => {
      const previousItems = await prepareOptimistic();

      const optimisticItem: ShoppingItem = {
        ...newItemData,
        id: Math.random().toString(),
      };

      queryClient.setQueryData<ShoppingItem[]>(["shopping-items"], (old) => [
        optimisticItem,
        ...(old || []),
      ]);

      return { previousItems };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(["shopping-items"], context?.previousItems);
      alert("Не вдалося додати товар.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
  });

  // DELETE MUTATION
  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onMutate: async (id: string) => {
      const previousItems = await prepareOptimistic();

      queryClient.setQueryData<ShoppingItem[]>(["shopping-items"], (old) =>
        old?.filter((item) => item.id !== id),
      );

      return { previousItems };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["shopping-items"], context?.previousItems);
      alert("Помилка при видаленні.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
  });

  // UPDATE MUTATION
  const updateMutation = useMutation({
    mutationFn: updateItem,
    onMutate: async (updatedFields) => {
      const previousItems = await prepareOptimistic();

      queryClient.setQueryData<ShoppingItem[]>(["shopping-items"], (old) =>
        old?.map((item) =>
          item.id === updatedFields.id
            ? ({ ...item, ...updatedFields } as ShoppingItem)
            : item,
        ),
      );

      return { previousItems };
    },
    onError: (err, updatedFields, context) => {
      queryClient.setQueryData(["shopping-items"], context?.previousItems);
      alert("Не вдалося оновити товар.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
    },
  });

  return {
    items: itemsQuery.data ?? [],
    isLoading: itemsQuery.isLoading,
    error: itemsQuery.error,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
    updateItem: updateMutation.mutate,
    editingItem,
    setEditingItem,
    cancelEdit: () => setEditingItem(null),
  };
};
