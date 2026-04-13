import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

interface ListProgressBarProps {
  progress: number;
}

export const ListProgressBar = ({ progress }: ListProgressBarProps) => {
  // HOOKS
  const { t } = useTranslation();

  // RENDER
  return (
    <View className="mb-6 px-2">
      {/* LABEL SECTION */}
      <View className="flex-row justify-between mb-2">
        <Text className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {t("progress")}
        </Text>
        <Text className="text-indigo-600 dark:text-indigo-400 font-black">
          {Math.round(progress)}%
        </Text>
      </View>

      {/* TRACK SECTION */}
      <View className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <View
          className="h-full bg-indigo-500"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};
