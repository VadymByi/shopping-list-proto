import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Check, X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
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
  // HOOKS & TRANSLATION
  const { t } = useTranslation();
  const { addItem, updateItem } = useShoppingItems();
  const { isDark } = useTheme();

  // FORM INITIALIZATION
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

  // CACHING LOGIC
  const watchedValues = watch();
  const { clearCache } = useFormCache(
    watchedValues as FormOutput,
    setValue,
    !!editingItem,
  );

  // EDIT MODE SYNC
  useEffect(() => {
    if (editingItem) {
      setValue("title", editingItem.title);
      setValue("amount", Number(editingItem.amount));
    }
  }, [editingItem, setValue]);

  // FORM HANDLERS
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
    <View className="mb-4 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
      {/* HEADER SECTION */}
      <View className="flex-row items-center justify-between mb-1 px-1">
        <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          {editingItem ? t("form.edit_title") : t("form.new_item")}
        </Text>

        {editingItem && (
          <TouchableOpacity onPress={handleCancel}>
            <X size={16} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      {/* INPUTS ROW */}
      <View className="flex-row items-start space-x-2">
        {/* TITLE INPUT */}
        <View className="flex-[3]">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 dark:bg-slate-900 px-3 h-[42px] rounded-xl border ${
                  errors.title
                    ? "border-red-400"
                    : "border-slate-100 dark:border-slate-700"
                } text-slate-800 dark:text-slate-100`}
                placeholder={t("form.placeholder")}
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
                blurOnSubmit={false}
              />
            )}
          />
          {errors.title && (
            <Text className="text-[9px] text-red-500 mt-0.5 ml-1">
              {errors.title?.message && t(errors.title.message)}
            </Text>
          )}
        </View>

        {/* AMOUNT INPUT */}
        <View className="flex-1 mx-1">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 dark:bg-slate-900 px-1 h-[42px] rounded-xl border ${
                  errors.amount
                    ? "border-red-400"
                    : "border-slate-100 dark:border-slate-700"
                } text-slate-800 dark:text-slate-100 text-center`}
                keyboardType="numeric"
                placeholder={t("form.amount")}
                placeholderTextColor={isDark ? "#475569" : "#94a3b8"}
                onBlur={onBlur}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  onChange(cleaned);
                }}
                value={value?.toString()}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          {errors.amount && (
            <Text className="text-[9px] text-red-500 mt-0.5 text-center leading-3">
              {errors.amount?.message && t(errors.amount.message)}
            </Text>
          )}
        </View>

        {/* ACTION BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`px-4 h-[42px] rounded-xl justify-center items-center ${
            editingItem ? "bg-green-500" : "bg-indigo-600 dark:bg-indigo-500"
          }`}
        >
          {editingItem ? (
            <Check size={20} color="white" />
          ) : (
            <Plus size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
