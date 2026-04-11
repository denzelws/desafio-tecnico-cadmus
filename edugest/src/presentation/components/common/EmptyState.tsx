import { GBox, GText, GVStack } from "@/lib/gluestack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "folder-open-outline",
  title,
  description,
}) => (
  <GBox flex={1} alignItems="center" justifyContent="center" py="$16">
    <GVStack alignItems="center" gap="$4">
      <Ionicons name={icon} size={64} color="#CBD5E1" />

      <GText size="lg" fontWeight="$semibold" color="$trueGray500">
        {title}
      </GText>

      {description ? (
        <GText size="sm" color="$trueGray400" textAlign="center" px="$8">
          {description}
        </GText>
      ) : null}
    </GVStack>
  </GBox>
);
