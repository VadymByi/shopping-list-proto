import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useShoppingItems } from "../hooks/useShoppingItems";
import { Plus, Check, X } from "lucide-react-native";
import { ShoppingItem } from "../types";

interface AddItemFormProps {
  editingItem: ShoppingItem | null;
  setEditingItem: (item: ShoppingItem | null) => void;
}

export const AddItemForm = ({
  editingItem,
  setEditingItem,
}: AddItemFormProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("1");

  const { addItem, updateItem } = useShoppingItems();

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setAmount(editingItem.amount.toString());
    }
  }, [editingItem]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingItem) {
      updateItem({
        ...editingItem,
        title,
        amount: Number(amount),
      });
      setEditingItem(null);
    } else {
      addItem({
        title,
        amount: Number(amount),
        isCompleted: false,
      });
    }

    setTitle("");
    setAmount("1");
  };

  const handleCancel = () => {
    setEditingItem(null);
    setTitle("");
    setAmount("1");
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
        <View className="flex-[3]">
          <TextInput
            className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-800"
            placeholder="Що купити?"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="flex-1 mx-2">
          <TextInput
            className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-800 text-center"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className={`p-3 rounded-xl justify-center items-center ${
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
