import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, StatusBar, StyleSheet } from "react-native";
import { ShoppingListScreen } from "./src/screens/ShoppingListScreen";
import { NativeWindStyleSheet } from "nativewind";

// NATIVEWIND CONFIGURATION
NativeWindStyleSheet.setOutput({
  default: "native",
});

// REACT QUERY INITIALIZATION
const queryClient = new QueryClient();

export default function App() {
  // RENDER
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ShoppingListScreen />
      </View>
    </QueryClientProvider>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});
