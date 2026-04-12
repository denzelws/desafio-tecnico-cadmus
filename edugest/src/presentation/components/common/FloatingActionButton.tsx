import { GPressable } from "@/lib/gluestack";
import { colors, radius, spacing } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  bottom?: number;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = "add",
}) => {
  return (
    <GPressable
      position="absolute"
      bottom={90}
      right={spacing.xl}
      w={64}
      h={64}
      borderRadius={radius.full}
      bg={colors.primary}
      alignItems="center"
      justifyContent="center"
      softShadow="4"
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color={colors.on_primary} />
    </GPressable>
  );
};
