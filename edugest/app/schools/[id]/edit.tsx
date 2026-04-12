import { useSchools } from "@/application/hooks/useSchools";
import type { CreateSchoolInput } from "@/domain/schemas/schoolSchema";
import { GToast, GToastTitle } from "@/lib/gluestack";
import { FormScreenLayout } from "@/presentation/components/common/FormScreenLayout";
import { SchoolForm } from "@/presentation/components/schools/SchoolForm";
import { useToast } from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

export default function EditSchoolScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const { schools, editSchool } = useSchools();
  const school = schools.find((s) => s.id === id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateSchoolInput) => {
    try {
      setIsLoading(true);
      await editSchool(id, data);
      toast.show({
        placement: "top",
        render: () => (
          <GToast action="success">
            <GToastTitle>Escola atualizada com sucesso!</GToastTitle>
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
              {err instanceof Error ? err.message : "Erro ao atualizar escola"}
            </GToastTitle>
          </GToast>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormScreenLayout title="Editar Escola">
      <SchoolForm
        defaultValues={{
          name: school?.name,
          address: school?.address,
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Salvar Alterações"
      />
    </FormScreenLayout>
  );
}
