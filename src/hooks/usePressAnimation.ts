import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export const usePressAnimation = () => {
  // ANIMATION STATE
  const scale = useSharedValue(1);

  // ANIMATED STYLES
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // INTERACTION HANDLERS
  const onPressIn = () => {
    scale.value = withSpring(0.96);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return { animatedStyle, onPressIn, onPressOut };
};
