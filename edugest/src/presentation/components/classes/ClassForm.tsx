import {
  CreateClassInput,
  createClassSchema,
} from "@/domain/schemas/classSchema";
import {
  GFormControl,
  GFormControlError,
  GFormControlErrorText,
  GFormControlLabel,
  GFormControlLabelText,
  GSelect,
  GSelectBackdrop,
  GSelectContent,
  GSelectDragIndicator,
  GSelectDragIndicatorWrapper,
  GSelectInput,
  GSelectItem,
  GSelectPortal,
  GSelectTrigger,
} from "@/lib/gluestack";
import { colors, radius } from "@/presentation/theme/token";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { FormContainer } from "../common/FormContainer";
import { FormField } from "../common/FormField";

type ClassFormData = {
  name: string;
  shift: "morning" | "afternoon" | "evening" | "full";
  academicYear: number;
};

interface ClassFormProps {
  defaultValues?: Partial<CreateClassInput>;
  onSubmit: (data: CreateClassInput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export const ClassForm: React.FC<ClassFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar Turma",
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ClassFormData>({
    resolver: zodResolver(createClassSchema) as Resolver<ClassFormData>,
    mode: "onChange",
    defaultValues: {
      name: "",
      shift: "morning",
      academicYear: new Date().getFullYear(),
      ...defaultValues,
    },
  });

  const getShiftLabel = (val: string) =>
    shiftOptions.find((opt) => opt.value === val)?.label || "";

  const shiftOptions = [
    { label: "Matutino", value: "morning" },
    { label: "Vespertino", value: "afternoon" },
    { label: "Noturno", value: "evening" },
    { label: "Integral", value: "full" },
  ];

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
        label="Nome da turma *"
        placeholder="Ex: 1º Ano A"
        error={errors.name}
        testID="class-name-input"
      />

      <GFormControl isInvalid={!!errors.shift}>
        <GFormControlLabel mb="$2">
          <GFormControlLabelText color={colors.on_surface} fontWeight="$bold">
            Turno *
          </GFormControlLabelText>
        </GFormControlLabel>

        <Controller
          control={control}
          name="shift"
          render={({ field: { onChange, value } }) => (
            <GSelect selectedValue={value} onValueChange={onChange}>
              <GSelectTrigger
                variant="outline"
                size="md"
                bg={colors.surface_bright}
                borderRadius={radius.md}
                borderWidth={0}
                h={50}
              >
                <GSelectInput
                  placeholder="Selecione o turno"
                  value={getShiftLabel(value)}
                  color={colors.on_surface}
                />
              </GSelectTrigger>

              <GSelectPortal>
                <GSelectBackdrop />
                <GSelectContent>
                  <GSelectDragIndicatorWrapper>
                    <GSelectDragIndicator />
                  </GSelectDragIndicatorWrapper>

                  {shiftOptions.map((option) => (
                    <GSelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </GSelectContent>
              </GSelectPortal>
            </GSelect>
          )}
        />

        {errors.shift && (
          <GFormControlError mt="$1">
            <GFormControlErrorText color={colors.error}>
              {errors.shift.message}
            </GFormControlErrorText>
          </GFormControlError>
        )}
      </GFormControl>

      <FormField
        control={control}
        name="academicYear"
        label="Ano letivo *"
        placeholder={String(new Date().getFullYear())}
        error={errors.academicYear}
        isNumeric={true}
        testID="class-year-input"
      />
    </FormContainer>
  );
};
