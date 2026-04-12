import { GBox } from "@/lib/gluestack";
import { colors } from "@/presentation/theme/token";
import React from "react";
import { ActivityIndicator } from "react-native";

export const LoadingSpinner: React.FC = () => (
  <GBox flex={1} alignItems="center" justifyContent="center">
    <ActivityIndicator size="large" color={colors.primary} />
  </GBox>
);
