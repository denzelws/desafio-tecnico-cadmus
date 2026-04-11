import { useClasses } from "@/application/hooks/useClasses";
import type { CreateClassInput } from "@/domain/schemas/classSchema";
import {
  GBox,
  GHStack,
  GPressable,
  GText,
  GToast,
  GToastTitle,
} from "@/lib/gluestack";
import { ClassForm } from "@/presentation/components/classes/ClassForm";

import { Ionicons } from "@expo/vector-icons";
import { useToast } from "@gluestack-ui/themed";

import { useClassStore } from "@/application/store/classStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";

export default function EditClassScreen() {
  const { id, classId } = useLocalSearchParams<{
    id: string;
    classId: string;
  }>();
  const router = useRouter();
  const toast = useToast();
  const { editClass } = useClasses(id);
  const cls = useClassStore((s) =>
    (s.classesBySchool[id] ?? []).find((c) => c.id === classId),
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateClassInput) => {
    try {
      setIsLoading(true);
      await editClass(classId, data);
      toast.show({
        placement: "top",
        render: () => (
          <GToast action="success">
            <GToastTitle>Turma atualizada com sucesso!</GToastTitle>
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
              {err instanceof Error ? err.message : "Erro ao atualizar turma"}
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
          Editar Turma
        </GText>
      </GHStack>

      <ScrollView keyboardShouldPersistTaps="handled">
        <GBox pt="$6">
          <ClassForm
            defaultValues={{
              name: cls?.name,
              shift: cls?.shift,
              academicYear: cls?.academicYear,
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Salvar Alterações"
          />
        </GBox>
      </ScrollView>
    </GBox>
  );
}
