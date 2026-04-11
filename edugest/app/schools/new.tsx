import { useSchools } from "@/application/hooks/useSchools";
import type { CreateSchoolInput } from "@/domain/schemas/schoolSchema";
import {
  GBox,
  GHStack,
  GPressable,
  GText,
  GToast,
  GToastTitle,
} from "@/lib/gluestack";
import { SchoolForm } from "@/presentation/components/schools/SchoolForm";
import { Ionicons } from "@expo/vector-icons";
import { useToast } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";

export default function NewSchoolScreen() {
  const router = useRouter();
  const toast = useToast();
  const { createSchool } = useSchools();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateSchoolInput) => {
    try {
      setIsLoading(true);
      await createSchool(data);
      toast.show({
        placement: "top",
        render: () => (
          <GToast action="success">
            <GToastTitle>Escola cadastrada com sucesso!</GToastTitle>
          </GToast>
        ),
      });
      router.back();
    } catch (err) {
      toast.show({
        placement: "top",
        render: () => (
          <GToast action="error">
            <GToastTitle>
              {err instanceof Error ? err.message : "Erro ao cadastrar escola"}
            </GToastTitle>
          </GToast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GBox flex={1} bg="$white">
      {/* Header */}
      <GHStack
        alignItems="center"
        px="$4"
        py="$4"
        borderBottomWidth={1}
        borderBottomColor="$trueGray100"
      >
        <GPressable onPress={() => router.back()} mr="$3">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </GPressable>
        <GText fontSize="$xl" fontWeight="$bold" color="$trueGray800">
          Nova Escola
        </GText>
      </GHStack>

      <ScrollView keyboardShouldPersistTaps="handled">
        <GBox pt="$6">
          <SchoolForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Cadastrar Escola"
          />
        </GBox>
      </ScrollView>
    </GBox>
  );
}
