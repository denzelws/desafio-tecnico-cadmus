import { GBox } from "@/lib/gluestack";
import React from "react";
import { ActivityIndicator } from "react-native";

export const LoadingSpinner: React.FC = () => (
  <GBox flex={1} alignItems="center" justifyContent="center">
    <ActivityIndicator size="large" color="#3B82F6" />
  </GBox>
);
