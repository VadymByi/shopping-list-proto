import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseFormSetValue, Path, FieldValues } from "react-hook-form";

// CONSTANTS
const FORM_CACHE_KEY = "shopping_form_draft";

export const useFormCache = <T extends FieldValues>(
  watchedValues: T,
  setValue: UseFormSetValue<T>,
  isEditing: boolean,
) => {
  // LOAD DRAFT ON MOUNT
  useEffect(() => {
    const loadDraft = async () => {
      if (isEditing) return;
      try {
        const saved = await AsyncStorage.getItem(FORM_CACHE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          Object.keys(parsed).forEach((key) => {
            setValue(key as Path<T>, parsed[key]);
          });
        }
      } catch (e) {
        console.error("Cache load error", e);
      }
    };
    loadDraft();
  }, [isEditing, setValue]);

  // SAVE DRAFT ON CHANGE
  useEffect(() => {
    const saveDraft = async () => {
      if (!isEditing && (watchedValues.title || watchedValues.amount)) {
        try {
          await AsyncStorage.setItem(
            FORM_CACHE_KEY,
            JSON.stringify(watchedValues),
          );
        } catch (e) {
          console.error("Cache save error", e);
        }
      }
    };
    saveDraft();
  }, [watchedValues, isEditing]);

  // CACHE MANIPULATION METHODS
  const clearCache = async () => {
    try {
      await AsyncStorage.removeItem(FORM_CACHE_KEY);
    } catch (e) {
      console.error("Cache clear error", e);
    }
  };

  return { clearCache };
};
