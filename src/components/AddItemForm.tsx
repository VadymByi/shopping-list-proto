import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Check, X } from "lucide-react-native";
import * as z from "zod";

import { useShoppingItems } from "../hooks/useShoppingItems";
import { useFormCache } from "../hooks/useFormCache";
import { useTheme } from "../hooks/useTheme";
import { itemSchema } from "../schemas/itemSchema";
import { ShoppingItem } from "../types";

// TYPES
interface AddItemFormProps {
  editingItem: ShoppingItem | null;
  setEditingItem: (item: ShoppingItem | null) => void;
}

type FormInput = z.input<typeof itemSchema>;
type FormOutput = z.output<typeof itemSchema>;

export const AddItemForm = ({
  editingItem,
  setEditingItem,
}: AddItemFormProps) => {
  // HOOKS & STATE
  const { addItem, updateItem } = useShoppingItems();
  const { isDark } = useTheme();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      amount: 1,
    },
  });

  const watchedValues = watch();
  const { clearCache } = useFormCache(
    watchedValues as FormOutput,
    setValue,
    !!editingItem,
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (editingItem) {
      setValue("title", editingItem.title);
      setValue("amount", Number(editingItem.amount));
    }
  }, [editingItem, setValue]);

  // HANDLERS
  const onSubmit: SubmitHandler<FormOutput> = (data) => {
    const title = data.title.trim();
    const amount = String(data.amount);

    if (editingItem) {
      updateItem({
        id: editingItem.id,
        title,
        amount,
        isCompleted: editingItem.isCompleted,
      });
      setEditingItem(null);
    } else {
      addItem({ title, amount });
    }

    clearCache();
    reset({ title: "", amount: 1 });
  };

  const handleCancel = () => {
    setEditingItem(null);
    clearCache();
    reset({ title: "", amount: 1 });
  };

  // RENDER
  return (
    <View className="mb-6 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
      {/* HEADER SECTION */}
      <View className="flex-row items-center justify-between mb-2 px-1">
        <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {editingItem ? "Редагування" : "Новий товар"}
        </Text>

        {editingItem && (
          <TouchableOpacity onPress={handleCancel}>
            <X size={18} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* INPUTS ROW */}
      <View className="flex-row space-x-2">
        {/* TITLE INPUT */}
        <View className="flex-[3]">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border ${
                  errors.title
                    ? "border-red-400"
                    : "border-slate-100 dark:border-slate-700"
                } text-slate-800 dark:text-slate-100`}
                placeholder="Що купити?"
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.title && (
            <Text className="text-[10px] text-red-500 mt-1 ml-1">
              {errors.title.message}
            </Text>
          )}
        </View>

        {/* AMOUNT INPUT */}
        <View className="flex-1 mx-2">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border ${
                  errors.amount
                    ? "border-red-400"
                    : "border-slate-100 dark:border-slate-700"
                } text-slate-800 dark:text-slate-100 text-center`}
                keyboardType="numeric"
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                onBlur={onBlur}
                // PROHIBIT NON-NUMERIC INPUT
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  onChange(cleaned);
                }}
                value={value?.toString()}
              />
            )}
          />
          {errors.amount && (
            <Text className="text-[10px] text-red-500 mt-1 text-center">
              {errors.amount.message}
            </Text>
          )}
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`p-3 h-[48px] rounded-xl justify-center items-center ${
            editingItem ? "bg-green-500" : "bg-indigo-600 dark:bg-indigo-500"
          }`}
        >
          {editingItem ? (
            <Check size={24} color="white" />
          ) : (
            <Plus size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
