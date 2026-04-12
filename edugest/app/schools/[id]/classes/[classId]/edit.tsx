import { useClasses } from "@/application/hooks/useClasses";
import { useClassStore } from "@/application/store/classStore";
import type { CreateClassInput } from "@/domain/schemas/classSchema";
import { GToast, GToastTitle } from "@/lib/gluestack";
import { ClassForm } from "@/presentation/components/classes/ClassForm";
import { FormScreenLayout } from "@/presentation/components/common/FormScreenLayout";
import { useToast } from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

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
    <FormScreenLayout title="Editar Turma">
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
    </FormScreenLayout>
  );
}
