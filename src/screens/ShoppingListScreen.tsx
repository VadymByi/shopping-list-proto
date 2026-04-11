import React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { AddItemForm } from "../components/AddItemForm";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { ShoppingItem } from "../types";
import { ShoppingItemCard } from "../components/ShoppingItemCard";

export const ShoppingListScreen = () => {
  const { items, isLoading, error, deleteItem, updateItem } =
    useShoppingItems();

  const handleEdit = (item: ShoppingItem) => {
    if (Platform.OS === "web") {
      const newTitle = window.prompt("Змінити назву:", item.title);
      const newAmount = window.prompt(
        "Змінити кількість:",
        item.amount.toString(),
      );

      if (newTitle && newAmount) {
        updateItem({
          id: item.id,
          title: newTitle,
          amount: parseInt(newAmount),
        });
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Ошибка загрузки</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Мій список</Text>

        <AddItemForm />

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ShoppingItemCard
              item={item}
              onToggle={() =>
                updateItem({ id: item.id, isCompleted: !item.isCompleted })
              }
              onDelete={() => deleteItem(item.id)}
              onEdit={() => handleEdit(item)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Список порожній</Text>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#f8fafc",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  emptyText: { textAlign: "center", color: "#94a3b8", marginTop: 40 },
});

// import { useQuery } from "@tanstack/react-query";
// import { fetchItems } from "../api/client";
// import { ActivityIndicator, View, Text, FlatList } from "react-native";

// export const ShoppingListScreen = () => {
//   const {
//     data: items,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["shopping-items"],
//     queryFn: fetchItems,
//   });

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" color="#0ea5e9" />
//       </View>
//     );
//   }
//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center p-4">
//         <Text className="text-red-500 text-center">Помилка завантаженння</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 p-4">
//       <Text className="text-3xl font-bold mb-6 text-slate-800">Мій список</Text>
//       <FlatList
//         data={items}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-slate-100">
//             <Text
//               className={`text-lg ${item.isCompleted ? "line-through text-slate-400" : "text-slate-800"}`}
//             >
//               {item.title} - {item.amount} шт.
//             </Text>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text className="text-center text-slate-500 mt-10">
//             Список порожній
//           </Text>
//         }
//       />
//     </View>
//   );
// };
