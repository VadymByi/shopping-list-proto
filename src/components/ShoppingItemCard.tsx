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
      className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border transition-all duration-300 ${
        item.isCompleted
          ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60 scale-[0.98]"
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm shadow-slate-200 dark:shadow-none scale-100"
      }`}
    >
      <View className="flex-row items-center flex-1">
        {/* CHECKBOX */}
        <TouchableOpacity onPress={onToggle} className="mr-3">
          {item.isCompleted ? (
            <CheckCircle2 size={24} color="#10b981" />
          ) : (
            <Circle size={24} color="#94a3b8" />
          )}
        </TouchableOpacity>

        {/* INFO */}
        <View className="flex-1">
          <Text
            className={`text-lg font-bold ${
              item.isCompleted
                ? "line-through text-slate-400 dark:text-slate-600"
                : "text-slate-800 dark:text-slate-100"
            }`}
          >
            {item.title}
          </Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Кількість: {item.amount}
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={onEdit}
          className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl mr-2"
        >
          <Edit3 size={16} color={item.isCompleted ? "#94a3b8" : "#64748b"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl"
        >
          <Trash2 size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
