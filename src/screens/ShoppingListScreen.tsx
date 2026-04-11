import React from "react";
import { ActivityIndicator, View, Text, FlatList } from "react-native";
import { AddItemForm } from "../components/AddItemForm";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { ShoppingItemCard } from "../components/ShoppingItemCard";

export const ShoppingListScreen = () => {
  const {
    items,
    isLoading,
    error,
    deleteItem,
    updateItem,
    editingItem,
    setEditingItem,
  } = useShoppingItems();

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <Text className="text-red-500 font-bold">
          Помилка завантаження даних
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100 items-center">
      <View className="flex-1 w-full max-w-[600px] bg-slate-50 shadow-xl shadow-slate-300">
        <View className="px-6 pt-10 pb-6 bg-white border-b border-slate-200">
          <Text className="text-3xl font-extrabold text-slate-900">
            Мій список 🛒
          </Text>
          <Text className="text-slate-500 mt-1 font-medium">
            {items.length} товарів у базі
          </Text>
        </View>

        <View className="flex-1 px-4 pt-6">
          <AddItemForm
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />

          {/* Прогресс-бар */}
          {items.length > 0 && (
            <View className="px-2 mb-6">
              <View className="flex-row justify-between items-end mb-2">
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Прогрес покупок
                </Text>
                <Text className="text-indigo-600 font-black text-sm">
                  {Math.round(progress)}%
                </Text>
              </View>
              <View className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <View
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </View>
            </View>
          )}

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ShoppingItemCard
                item={item}
                onToggle={() =>
                  updateItem({ ...item, isCompleted: !item.isCompleted })
                }
                onDelete={() => deleteItem(item.id)}
                onEdit={() => setEditingItem(item)}
              />
            )}
            ListEmptyComponent={
              <View className="items-center mt-20">
                <Text className="text-slate-400 text-lg font-medium italic">
                  Ваш список порожній...
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};
