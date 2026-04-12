import {
  createSchoolSchema,
  type CreateSchoolInput,
} from "@/domain/schemas/schoolSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "../common/FormContainer";
import { FormField } from "../common/FormField";

interface SchoolFormProps {
  defaultValues?: Partial<CreateSchoolInput>;
  onSubmit: (data: CreateSchoolInput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateSchoolInput>({
    resolver: zodResolver(createSchoolSchema),
    mode: "onChange",
    defaultValues: { name: "", address: "", ...defaultValues },
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      isValid={isValid}
      submitLabel={submitLabel}
    >
      <FormField
        control={control}
        name="name"
        label="Nome da escola *"
        placeholder="Ex: Escola Municipal João Pessoa"
        error={errors.name}
        testID="school-name-input"
      />

      <FormField
        control={control}
        name="address"
        label="Endereço *"
        placeholder="Ex: Rua das Flores, 100"
        error={errors.address}
        testID="school-address-input"
      />
    </FormContainer>
  );
};
