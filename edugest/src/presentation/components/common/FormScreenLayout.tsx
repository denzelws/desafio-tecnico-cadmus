// src/presentation/components/common/FormScreenLayout.tsx
import { GBox, GHStack, GPressable, GText } from "@/lib/gluestack";
import { colors } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FormScreenLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const FormScreenLayout: React.FC<FormScreenLayoutProps> = ({
  title,
  children,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <GBox flex={1} bg="$white">
      <GBox pt={insets.top} bg="$trueGray50">
        <GHStack
          alignItems="center"
          px="$4"
          py="$4"
          borderBottomWidth={1}
          borderBottomColor="$trueGray100"
        >
          <GPressable onPress={() => router.back()} mr="$3">
            <Ionicons name="arrow-back" size={24} color={colors.on_surface} />
          </GPressable>
          <GText fontSize="$xl" fontWeight="$bold" color="$trueGray800">
            {title}
          </GText>
        </GHStack>
      </GBox>

      <ScrollView keyboardShouldPersistTaps="handled">
        <GBox pt="$6">{children}</GBox>
      </ScrollView>
    </GBox>
  );
};
