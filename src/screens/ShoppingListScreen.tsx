import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, fetchItems, updateItem } from "../api/client";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AddItemForm } from "../components/AddItemForm";

export const ShoppingListScreen = () => {
  const queryClient = useQueryClient();

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shopping-items"],
    queryFn: fetchItems,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
      updateItem(id, { isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
    },
  });

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
    <View style={styles.container}>
      <Text style={styles.title}>Мій список</Text>

      <AddItemForm />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() =>
                toggleMutation.mutate({
                  id: item.id,
                  isCompleted: !item.isCompleted,
                })
              }
            >
              <Text
                style={[
                  styles.itemText,
                  item.isCompleted && styles.completedText,
                ]}
              >
                {item.title} — {item.amount} шт.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteMutation.mutate(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Список порожній</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fafc" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2, // для Android
  },
  itemText: { fontSize: 18, color: "#334155" },
  completedText: { textDecorationLine: "line-through", color: "#94a3b8" },
  emptyText: { textAlign: "center", color: "#94a3b8", marginTop: 20 },
  deleteButton: {
    padding: 8,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonText: { color: "#ef4444", fontWeight: "bold" },
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
