import { useSchools } from "@/application/hooks/useSchools";
import type { CreateSchoolInput } from "@/domain/schemas/schoolSchema";
import { GToast, GToastTitle } from "@/lib/gluestack";
import { FormScreenLayout } from "@/presentation/components/common/FormScreenLayout";
import { SchoolForm } from "@/presentation/components/schools/SchoolForm";
import { useToast } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";

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
    <FormScreenLayout title="Nova Escola">
      <SchoolForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Cadastrar Escola"
      />
    </FormScreenLayout>
  );
}
