import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Trash2, Edit3, CheckCircle2, Circle } from "lucide-react-native";
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
    <View
      className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${
        item.isCompleted
          ? "bg-slate-50 border-slate-200 opacity-60"
          : "bg-white border-slate-100 shadow-sm shadow-slate-200"
      }`}
    >
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={onToggle} className="mr-3">
          {item.isCompleted ? (
            <CheckCircle2 size={24} color="#10b981" />
          ) : (
            <Circle size={24} color="#94a3b8" />
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <Text
            className={`text-lg font-medium ${
              item.isCompleted
                ? "line-through text-slate-400"
                : "text-slate-800"
            }`}
          >
            {item.title}
          </Text>
          <Text className="text-sm text-slate-500 font-medium">
            Кількість: {item.amount}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          onPress={onEdit}
          className="p-2 bg-slate-100 rounded-xl"
        >
          <Edit3 size={18} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="p-2 bg-red-50 rounded-xl ml-2"
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
