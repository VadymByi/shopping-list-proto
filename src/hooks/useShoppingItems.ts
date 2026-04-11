import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem, deleteItem, fetchItems, updateItem } from "../api/client";

export const useShoppingItems = () => {
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ["shopping-items"] });

  const itemsQuery = useQuery({
    queryKey: ["shopping-items"],
    queryFn: fetchItems,
  });

  const addMutation = useMutation({
    mutationFn: addItem,
    onSuccess: onSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: onSuccess,
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: onSuccess,
  });

  const { data, isLoading, error } = itemsQuery;
  return {
    items: data ?? [],
    isLoading: isLoading,
    error: error,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
    updateItem: updateMutation.mutate,
  };
};
