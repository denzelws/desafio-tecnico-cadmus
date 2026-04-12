import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { render } from "@testing-library/react-native";
import React from "react";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <GluestackUIProvider config={config}>{ui}</GluestackUIProvider>,
  );
}
