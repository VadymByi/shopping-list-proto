import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Trash2, Edit3 } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ShoppingItem } from "../types";
import { usePressAnimation } from "../hooks/usePressAnimation";
import { AnimatedCheckbox } from "./AnimatedCheckbox";

// TYPES
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
  // HOOKS
  const { t } = useTranslation();
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

  // RENDER
  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onToggle}
        className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${
          item.isCompleted
            ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-70"
            : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm"
        }`}
      >
        {/* LEFT SECTION: CHECKBOX & TITLE */}
        <View className="flex-row items-center flex-1">
          <View className="mr-3">
            <AnimatedCheckbox isCompleted={item.isCompleted} />
          </View>

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
              {t("form.amount")}: {item.amount}
            </Text>
          </View>
        </View>

        {/* RIGHT SECTION: ACTIONS */}
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl mr-2"
          >
            <Edit3 size={16} color={item.isCompleted ? "#94a3b8" : "#64748b"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2.5 bg-red-50 dark:bg-red-900/20 rounded-xl"
          >
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
};
