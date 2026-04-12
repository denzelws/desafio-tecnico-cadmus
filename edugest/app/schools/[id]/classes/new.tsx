import { useClasses } from "@/application/hooks/useClasses";
import type { CreateClassInput } from "@/domain/schemas/classSchema";
import { GToast, GToastTitle } from "@/lib/gluestack";
import { ClassForm } from "@/presentation/components/classes/ClassForm";
import { FormScreenLayout } from "@/presentation/components/common/FormScreenLayout";
import { useToast } from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

export default function NewClassScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const { createClass } = useClasses(id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateClassInput) => {
    try {
      setIsLoading(true);
      await createClass(data);
      toast.show({
        placement: "top",
        render: () => (
          <GToast action="success">
            <GToastTitle>Turma cadastrada com sucesso!</GToastTitle>
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
              {err instanceof Error ? err.message : "Erro ao cadastrar turma"}
            </GToastTitle>
          </GToast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormScreenLayout title="Nova Turma">
      <ClassForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Cadastrar Turma"
      />
    </FormScreenLayout>
  );
}
