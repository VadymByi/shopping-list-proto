import "./src/i18n";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, StatusBar } from "react-native";
import { ShoppingListScreen } from "./src/screens/ShoppingListScreen";
import { NativeWindStyleSheet } from "nativewind";

// IMPORT I18N CONFIGURATION
import "./src/i18n";

// NATIVEWIND CONFIGURATION
NativeWindStyleSheet.setOutput({
  default: "native",
});

// REACT QUERY INITIALIZATION
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1 bg-slate-50 dark:bg-slate-900">
        <StatusBar barStyle="dark-content" />
        <ShoppingListScreen />
      </View>
    </QueryClientProvider>
  );
}
