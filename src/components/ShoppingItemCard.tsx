import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Trash2, Edit3 } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { ShoppingItem } from "../types";
import { AnimatedCheckbox } from "./AnimatedCheckbox";
import { usePressAnimation } from "../hooks/usePressAnimation";

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
  const { scale, handlePressIn, handlePressOut } = usePressAnimation();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={() => handlePressOut(handlePress)}
      >
        <View
          className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${
            item.isCompleted
              ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
              : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm shadow-slate-200 dark:shadow-none"
          }`}
        >
          <View className="flex-row items-center flex-1">
            <AnimatedCheckbox checked={item.isCompleted} />

            <View className="flex-1">
              <Text
                className={`text-lg font-bold ${
                  item.isCompleted
                    ? "line-through text-emerald-700 dark:text-emerald-300"
                    : "text-slate-900 dark:text-white"
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
              onPress={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl mr-2"
            >
              <Edit3
                size={16}
                color={item.isCompleted ? "#94a3b8" : "#64748b"}
              />
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
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
