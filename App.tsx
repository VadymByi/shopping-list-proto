import "./src/styles/global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    // Вместо style={styles.container} используем className
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Text className="text-white text-2xl font-bold">
        NativeWind + Tailwind
      </Text>
      <Text className="text-slate-400 mt-2">
        Если фон темный, значит всё ок!
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
