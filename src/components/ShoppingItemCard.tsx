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
      className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border transition-all duration-300 ease-in-out ${
        item.isCompleted
          ? "bg-slate-50 border-slate-200 opacity-60 scale-[0.98]"
          : "bg-white border-slate-100 shadow-sm shadow-slate-200 scale-100"
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
            className={`text-lg font-bold ${
              item.isCompleted
                ? "line-through text-slate-400"
                : "text-slate-800"
            }`}
          >
            {item.title}
          </Text>
          <Text className="text-xs text-slate-500 font-medium">
            Кількість: {item.amount}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={onEdit}
          className="p-2.5 bg-slate-100 rounded-xl mr-2"
        >
          <Edit3 size={16} color="#64748b" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="p-2.5 bg-red-50 rounded-xl"
        >
          <Trash2 size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
