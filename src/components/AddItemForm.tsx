import React, { useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Check, X } from "lucide-react-native";
import * as z from "zod";

import { useShoppingItems } from "../hooks/useShoppingItems";
import { useFormCache } from "../hooks/useFormCache";
import { itemSchema } from "../schemas/itemSchema";
import { ShoppingItem } from "../types";

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
  const { addItem, updateItem } = useShoppingItems();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", amount: 1 },
  });

  const watchedValues = watch();

  const { clearCache } = useFormCache(watchedValues, setValue, !!editingItem);

  useEffect(() => {
    if (editingItem) {
      setValue("title", editingItem.title);
      setValue("amount", editingItem.amount);
    }
  }, [editingItem, setValue]);

  const onSubmit = async (data: FormOutput) => {
    const validatedData = {
      title: data.title.trim(),
      amount: data.amount,
    };

    if (editingItem) {
      updateItem({ ...editingItem, ...validatedData });
      setEditingItem(null);
    } else {
      addItem({ ...validatedData, isCompleted: false });
    }

    await clearCache();
    reset({ title: "", amount: 1 });
  };

  const handleCancel = async () => {
    setEditingItem(null);
    await clearCache();
    reset({ title: "", amount: 1 });
  };

  return (
    <View className="mb-6 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
      <View className="flex-row items-center justify-between mb-2 px-1">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {editingItem ? "Редагування" : "Новий товар"}
        </Text>

        {editingItem && (
          <TouchableOpacity onPress={handleCancel}>
            <X size={18} color="#94a3b8" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row space-x-2">
        {/* TITLE */}
        <View className="flex-[3]">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 p-3 rounded-xl border ${
                  errors.title ? "border-red-400" : "border-slate-100"
                } text-slate-800`}
                placeholder="Що купити?"
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

        {/* AMOUNT */}
        <View className="flex-1 mx-2">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-slate-50 p-3 rounded-xl border ${
                  errors.amount ? "border-red-400" : "border-slate-100"
                } text-slate-800 text-center`}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
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

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`p-3 h-[48px] rounded-xl justify-center items-center ${
            editingItem ? "bg-green-500" : "bg-indigo-600"
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
