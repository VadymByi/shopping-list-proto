import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Moon, Sun, Languages } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import { AddItemForm } from "../components/AddItemForm";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { useTheme } from "../hooks/useTheme";
import { ShoppingItemCard } from "../components/ShoppingItemCard";
import { ShoppingListSkeleton } from "../components/ShoppingListSkeleton";
import { ListProgressBar } from "../components/ListProgressBar";
import { sortShoppingItems, calculateProgress } from "../utils/itemUtils";

export const ShoppingListScreen = () => {
  // HOOKS
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const {
    items,
    isLoading,
    error,
    deleteItem,
    updateItem,
    editingItem,
    setEditingItem,
  } = useShoppingItems();

  // HANDLERS
  const toggleLanguage = async () => {
    const newLang = i18n.language === "uk" ? "en" : "uk";
    await i18n.changeLanguage(newLang);
  };

  // DATA PROCESSING
  const sortedItems = useMemo(() => sortShoppingItems(items), [items]);
  const progress = useMemo(() => calculateProgress(items), [items]);

  // ERROR STATE
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50 dark:bg-slate-900">
        <Text className="text-red-500 font-bold">{t("error")}</Text>
      </View>
    );
  }

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
            <View className="px-4 py-3 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {t("title")}
                  </Text>
                  <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {t("items_count", { count: items.length })}
                  </Text>
                </View>

                {/* CONTROLS */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={toggleLanguage}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 items-center justify-center"
                  >
                    <Languages size={20} color={isDark ? "#fff" : "#475569"} />
                    <View className="absolute -bottom-1 -right-1 bg-indigo-500 px-1 rounded-md">
                      <Text className="text-[7px] font-black text-white uppercase">
                        {i18n.language}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={toggleTheme}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700"
                  >
                    {isDark ? (
                      <Sun size={20} color="#facc15" />
                    ) : (
                      <Moon size={20} color="#475569" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* CONTENT SECTION */}
            <View className="flex-1 px-4 pt-2">
              {isLoading ? (
                <ShoppingListSkeleton />
              ) : (
                <>
                  <AddItemForm
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                  />

                  {items.length > 0 && <ListProgressBar progress={progress} />}

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
