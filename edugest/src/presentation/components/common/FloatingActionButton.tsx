import { colors, radius, spacing } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, Pressable } from "react-native";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = "add",
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        position: "absolute",
        bottom: 90,
        right: spacing.xl,
      }}
    >
      <Animated.View
        style={{
          width: 64,
          height: 64,
          borderRadius: radius.full,
          backgroundColor: colors.primary,
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: scaleValue }],
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <Ionicons name={icon} size={32} color={colors.on_primary} />
      </Animated.View>
    </Pressable>
  );
};
