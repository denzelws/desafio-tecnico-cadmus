import { makeServer } from "@/infrastructure/mirage/server";
import { server } from "@/infrastructure/mock/server.stub";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

if (__DEV__) {
  AsyncStorage.clear()
    .then(() => console.log("[Dev] AsyncStorage limpo"))
    .catch(() => console.log("[Dev] AsyncStorage vazio, nada a limpar"));
  makeServer();
  console.log("[Mirage] Ativo:", !!server);
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
