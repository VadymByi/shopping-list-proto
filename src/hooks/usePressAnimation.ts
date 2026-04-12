import { useRef } from "react";
import { Animated } from "react-native";

export const usePressAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = (onPress?: () => void) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();

    onPress && onPress();
  };

  return {
    scale,
    handlePressIn,
    handlePressOut,
  };
};
