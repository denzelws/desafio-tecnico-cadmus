import { colors } from "@/presentation/theme/token";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  mt?: number | string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height = 16,
  borderRadius = 8,
  mt,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const style: ViewStyle = {
    width: width ?? "100%",
    height,
    borderRadius,
    backgroundColor: colors.surface_dim,
    opacity,
    marginTop: mt as number,
  };

  return <Animated.View style={style} />;
};
