import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { CheckCircle2, Circle } from "lucide-react-native";

interface Props {
  checked: boolean;
}

export const AnimatedCheckbox = ({ checked }: Props) => {
  const anim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      speed: 18,
      bounciness: 10,
    }).start();
  }, [checked]);

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        marginRight: 12,
      }}
    >
      {checked ? (
        <CheckCircle2 size={24} color="#10b981" />
      ) : (
        <Circle size={24} color="#94a3b8" />
      )}
    </Animated.View>
  );
};
