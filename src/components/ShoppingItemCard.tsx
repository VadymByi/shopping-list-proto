import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ShoppingItem } from "../types";

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const ShoppingItemCard = ({
  item,
  onToggle,
  onDelete,
  onEdit,
}: ShoppingItemCardProps) => {
  return (
    <View style={[styles.card, { flexDirection: "row", alignItems: "center" }]}>
      <TouchableOpacity style={{ flex: 1 }} onPress={onToggle}>
        <Text
          style={[styles.itemText, item.isCompleted && styles.completedText]}
        >
          {item.isCompleted ? "✅ " : "⬜ "}
          {item.title} — {item.amount} шт.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Text style={{ color: "#64748b" }}>✎</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    elevation: 2,
  },
  itemText: { fontSize: 18, color: "#334155" },
  completedText: { textDecorationLine: "line-through", color: "#94a3b8" },
  deleteButton: {
    padding: 8,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonText: { color: "#ef4444", fontWeight: "bold" },
  editButton: {
    padding: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    marginLeft: 5,
  },
});
