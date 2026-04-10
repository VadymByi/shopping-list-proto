import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../api/client";

export const AddItemForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("1");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping-items"] });
      setTitle("");
      setAmount("1");
    },
  });

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Что купить?"
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Кол-во"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            mutation.mutate({
              title,
              amount: Number(amount),
              isCompleted: false,
            })
          }
        >
          <Text style={styles.buttonText}>Додати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 24,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: { flexDirection: "row", gap: 10 },
  button: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
