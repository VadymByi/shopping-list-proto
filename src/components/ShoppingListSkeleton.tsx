import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../hooks/useTheme";

export const ShoppingListSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <SafeAreaProvider>
      {/* STATUS BAR SYNC */}
      <StatusBar style={isDark ? "light" : "dark"} />

      <SafeAreaView
        className="flex-1 bg-white dark:bg-slate-950"
        edges={["top"]}
      >
        <View className="flex-1 bg-slate-100 dark:bg-slate-900 items-center">
          <View className="flex-1 w-full max-w-[600px] bg-slate-50 dark:bg-slate-900 p-4">
            {/* HEADER PLACEHOLDER */}
            <View className="px-2 pt-6 mb-8">
              <View className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            </View>

            {/* FORM PLACEHOLDER */}
            <View className="h-28 w-full bg-slate-200 dark:bg-slate-800 rounded-3xl mb-10 animate-pulse" />

            {/* PROGRESS BAR PLACEHOLDER */}
            <View className="px-2 mb-8">
              <View className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded-full mb-3 animate-pulse" />
              <View className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
            </View>

            {/* LIST ITEMS PLACEHOLDERS */}
            <View className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  className="h-20 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"
                  style={{ opacity: 1 - i * 0.15 }}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
