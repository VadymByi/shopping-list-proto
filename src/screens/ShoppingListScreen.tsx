import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Moon, Sun } from "lucide-react-native";

import { AddItemForm } from "../components/AddItemForm";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { useTheme } from "../hooks/useTheme";
import { ShoppingItemCard } from "../components/ShoppingItemCard";
import { ShoppingListSkeleton } from "../components/ShoppingListSkeleton";

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

  const { isDark, toggleTheme } = useTheme();

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  const sortedItems = [...items].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  if (isLoading) {
    return <ShoppingListSkeleton />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-950">
        <Text className="text-red-500 font-bold">
          Помилка завантаження даних
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />

      <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
        <View className="flex-1 bg-slate-100 dark:bg-slate-900 items-center">
          <View className="flex-1 w-full max-w-[600px] bg-slate-50 dark:bg-slate-900 shadow-xl shadow-slate-300 dark:shadow-none">
            {/* HEADER */}
            <View className="px-4 py-4 md:px-6 md:pt-10 md:pb-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Мій список 🛒
                  </Text>
                  <Text className="text-[10px] md:text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">
                    {items.length} ТОВАРІВ
                  </Text>
                </View>

                {/* THEME TOGGLE */}
                <TouchableOpacity
                  onPress={toggleTheme}
                  activeOpacity={0.7}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700"
                >
                  {isDark ? (
                    <Sun size={22} color="#facc15" />
                  ) : (
                    <Moon size={22} color="#475569" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-1 px-4 pt-6">
              {/* FORM */}
              <AddItemForm
                editingItem={editingItem}
                setEditingItem={setEditingItem}
              />

              {/* PROGRESS BAR */}
              {items.length > 0 && (
                <View className="px-2 mb-6">
                  <View className="flex-row justify-between items-end mb-2">
                    <Text className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                      Прогрес покупок
                    </Text>
                    <Text className="text-indigo-600 dark:text-indigo-400 font-black text-sm">
                      {Math.round(progress)}%
                    </Text>
                  </View>
                  <View className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-indigo-500 transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                </View>
              )}

              {/* LIST */}
              <FlatList
                data={sortedItems}
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
                    <Text className="text-slate-400 dark:text-slate-600 text-lg font-medium italic">
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
