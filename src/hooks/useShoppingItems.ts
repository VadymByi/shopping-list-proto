import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem, deleteItem, fetchItems, updateItem } from "../api/client";
import { useState } from "react";
import { ShoppingItem } from "../types";
import * as Haptics from "expo-haptics";

export const useShoppingItems = () => {
  const queryClient = useQueryClient();

  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
  };

  const itemsQuery = useQuery({
    queryKey: ["shopping-items"],
    queryFn: fetchItems,
  });

  const addMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      onSuccess();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    onError: () =>
      alert("Не вдалося додати товар. Перевірте підключення до сервера."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      onSuccess();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    onError: () => alert("Помилка при видаленні. Спробуйте ще раз"),
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: onSuccess,
    onError: () => alert("Не вдалося оновити товар"),
  });

  const { data, isLoading, error } = itemsQuery;

  return {
    items: data ?? [],
    isLoading,
    error,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
    updateItem: updateMutation.mutate,
    editingItem,
    setEditingItem,
    cancelEdit: () => setEditingItem(null),
  };
};
