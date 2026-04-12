import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Moon, Sun } from "lucide-react-native";
import { AddItemForm } from "../components/AddItemForm";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { useTheme } from "../hooks/useTheme";
import { ShoppingItemCard } from "../components/ShoppingItemCard";
import { ShoppingListSkeleton } from "../components/ShoppingListSkeleton";
import { ShoppingItem } from "../types";

export const ShoppingListScreen = () => {
  // HOOKS & DATA
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

  // SORTING LOGIC
  const sortedItems = useMemo(() => {
    return [...items].sort((a: ShoppingItem, b: ShoppingItem) => {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }, [items]);

  // PROGRESS CALCULATION
  const completedCount = items.filter((i) => i.isCompleted).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  // ERROR STATE
  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Помилка завантаження даних</Text>
      </View>
    );

  // RENDER
  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
      <SafeAreaView
        className="flex-1 bg-white dark:bg-slate-900"
        edges={["top"]}
      >
        <View className="flex-1 bg-slate-100 dark:bg-slate-900 items-center">
          {/* MAIN CONTAINER */}
          <View className="flex-1 w-full max-w-[600px] bg-slate-50 dark:bg-slate-900 shadow-xl">
            {/* HEADER SECTION */}
            <View className="px-4 py-4 md:px-6 md:pt-10 md:pb-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Мій список 🛒
                  </Text>
                  <Text className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {items.length} ТОВАРІВ
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggleTheme}
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

            {/* CONTENT SECTION */}
            <View className="flex-1 px-4 pt-6">
              {isLoading ? (
                <ShoppingListSkeleton />
              ) : (
                <>
                  <AddItemForm
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                  />

                  {/* PROGRESS BAR */}
                  {items.length > 0 && (
                    <View className="mb-6 px-2">
                      <View className="flex-row justify-between mb-2">
                        <Text className="text-[10px] font-bold text-slate-400 uppercase">
                          Прогрес
                        </Text>
                        <Text className="text-indigo-600 font-black">
                          {Math.round(progress)}%
                        </Text>
                      </View>
                      <View className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-indigo-500"
                          style={{ width: `${progress}%` }}
                        />
                      </View>
                    </View>
                  )}

                  {/* LIST SECTION */}
                  <FlatList
                    data={sortedItems}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <ShoppingItemCard
                        item={item}
                        onToggle={() =>
                          updateItem({
                            ...item,
                            isCompleted: !item.isCompleted,
                          })
                        }
                        onDelete={() => deleteItem(item.id)}
                        onEdit={() => setEditingItem(item)}
                      />
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
