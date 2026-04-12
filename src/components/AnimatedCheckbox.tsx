import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { CheckCircle2, Circle } from "lucide-react-native";
import { View } from "react-native";

// TYPES
interface Props {
  isCompleted: boolean;
}

export const AnimatedCheckbox = ({ isCompleted }: Props) => {
  // ANIMATION STATE
  const progress = useSharedValue(isCompleted ? 1 : 0);

  // SIDE EFFECTS
  useEffect(() => {
    progress.value = withTiming(isCompleted ? 1 : 0, { duration: 200 });
  }, [isCompleted]);

  // ANIMATED STYLES
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: progress.value }],
    };
  });

  // RENDER
  return (
    <View className="relative w-7 h-7 items-center justify-center">
      {/* BACKGROUND CIRCLE */}
      <View className="absolute">
        <Circle size={24} color="#94a3b8" />
      </View>

      {/* ANIMATED OVERLAY ICON */}
      <Animated.View style={animatedStyle}>
        <CheckCircle2 size={24} color="#10b981" />
      </Animated.View>
    </View>
  );
};
