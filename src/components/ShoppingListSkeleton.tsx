import React from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const ShoppingListSkeleton = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <View className="flex-1 bg-slate-100 items-center">
          <View className="flex-1 w-full max-w-[600px] bg-slate-50 p-4">
            <View className="px-2 pt-6 mb-8">
              <View className="h-10 w-48 bg-slate-200 rounded-xl animate-pulse" />
            </View>

            <View className="h-28 w-full bg-slate-200 rounded-3xl mb-10 animate-pulse" />

            <View className="px-2 mb-8">
              <View className="h-3 w-24 bg-slate-200 rounded-full mb-3 animate-pulse" />
              <View className="h-2 w-full bg-slate-200 rounded-full animate-pulse" />
            </View>

            <View className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <View
                  key={i}
                  className="h-20 w-full bg-slate-200 rounded-2xl animate-pulse"
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
