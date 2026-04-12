import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

if (__DEV__) {
  import("@/infrastructure/mock/server")
    .then(({ server }) => {
      server.listen({ onUnhandledRequest: "bypass" });
      console.log("[MSW] Servidor iniciado");
    })
    .catch(() => {
      console.warn("[MSW] Indisponível — usando mock em memória");
    });
}

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="schools" />
      </Stack>
    </GluestackUIProvider>
  );
}
