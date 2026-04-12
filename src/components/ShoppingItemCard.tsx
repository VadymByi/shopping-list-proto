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
          className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border transition-colors ${
            item.isCompleted
              ? "bg-emerald-50 dark:bg-slate-900/40 border-emerald-100 dark:border-slate-800 opacity-70"
              : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm shadow-slate-200 dark:shadow-none"
          }`}
        >
          <View className="flex-row items-center flex-1">
            <AnimatedCheckbox checked={item.isCompleted} />

            <View className="flex-1">
              <Text
                className={`text-lg font-bold ${
                  item.isCompleted
                    ? "line-through text-emerald-700 dark:text-slate-500"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {item.title}
              </Text>

              <Text className="text-xs text-slate-500 dark:text-slate-500 font-medium">
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
              className="p-2.5 bg-slate-100 dark:bg-slate-700/50 rounded-xl mr-2"
            >
              <Edit3
                size={16}
                color={item.isCompleted ? "#64748b" : "#94a3b8"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2.5 bg-red-50 dark:bg-red-900/10 rounded-xl"
            >
              <Trash2
                size={16}
                color={item.isCompleted ? "#ef444480" : "#ef4444"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
