import {
  CreateClassOutput,
  createClassSchema,
  type CreateClassInput,
} from "@/domain/schemas/classSchema";

import {
  GBox,
  GButton,
  GButtonSpinner,
  GButtonText,
  GFormControl,
  GFormControlError,
  GFormControlErrorText,
  GFormControlLabel,
  GFormControlLabelText,
  GInput,
  GInputField,
  GSelect,
  GSelectBackdrop,
  GSelectContent,
  GSelectDragIndicator,
  GSelectDragIndicatorWrapper,
  GSelectInput,
  GSelectItem,
  GSelectPortal,
  GSelectTrigger,
  GVStack,
} from "@/lib/gluestack";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, Resolver, useForm } from "react-hook-form";

interface ClassFormProps {
  defaultValues?: Partial<CreateClassInput>;
  onSubmit: (data: CreateClassInput) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

type ClassFormData = Omit<CreateClassOutput, "schoolId">;

export const ClassForm: React.FC<ClassFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Salvar",
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormData>({
    resolver: zodResolver(createClassSchema) as Resolver<ClassFormData>,
    defaultValues: {
      name: "",
      shift: "morning",
      academicYear: new Date().getFullYear(),
      ...defaultValues,
    },
  });

  return (
    <GBox px="$4">
      <GVStack space="lg">
        <GFormControl isInvalid={!!errors.name}>
          <GFormControlLabel>
            <GFormControlLabelText>Nome da turma *</GFormControlLabelText>
          </GFormControlLabel>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <GInput>
                <GInputField
                  placeholder="Ex: 1º Ano A"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="class-name-GInput"
                />
              </GInput>
            )}
          />
          {errors.name && (
            <GFormControlError>
              <GFormControlErrorText>
                {errors.name.message}
              </GFormControlErrorText>
            </GFormControlError>
          )}
        </GFormControl>

        <GFormControl isInvalid={!!errors.shift}>
          <GFormControlLabel>
            <GFormControlLabelText>Turno *</GFormControlLabelText>
          </GFormControlLabel>
          <Controller
            control={control}
            name="shift"
            render={({ field: { onChange, value } }) => (
              <GSelect
                selectedValue={value}
                onValueChange={onChange}
                testID="class-shift-select"
              >
                <GSelectTrigger variant="outline" size="md">
                  <GSelectInput placeholder="Selecione o turno" />
                </GSelectTrigger>
                <GSelectPortal>
                  <GSelectBackdrop />
                  <GSelectContent>
                    <GSelectDragIndicatorWrapper>
                      <GSelectDragIndicator />
                    </GSelectDragIndicatorWrapper>
                    <GSelectItem label="Matutino" value="morning" />
                    <GSelectItem label="Vespertino" value="afternoon" />
                    <GSelectItem label="Noturno" value="evening" />
                    <GSelectItem label="Integral" value="full" />
                  </GSelectContent>
                </GSelectPortal>
              </GSelect>
            )}
          />
          {errors.shift && (
            <GFormControlError>
              <GFormControlErrorText>
                {errors.shift.message}
              </GFormControlErrorText>
            </GFormControlError>
          )}
        </GFormControl>

        <GFormControl isInvalid={!!errors.academicYear}>
          <GFormControlLabel>
            <GFormControlLabelText>Ano letivo *</GFormControlLabelText>
          </GFormControlLabel>
          <Controller
            control={control}
            name="academicYear"
            render={({ field: { onChange, onBlur, value } }) => (
              <GInput>
                <GInputField
                  placeholder={String(new Date().getFullYear())}
                  value={String(value)}
                  onChangeText={(v: string) => onChange(Number(v))}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  maxLength={4}
                  testID="class-year-GInput"
                />
              </GInput>
            )}
          />
          {errors.academicYear && (
            <GFormControlError>
              <GFormControlErrorText>
                {errors.academicYear.message}
              </GFormControlErrorText>
            </GFormControlError>
          )}
        </GFormControl>

        <GButton
          onPress={handleSubmit(onSubmit)}
          isDisabled={isLoading}
          mt="$4"
          testID="class-submit-button"
        >
          {isLoading ? <GButtonSpinner mr="$2" /> : null}
          <GButtonText>{isLoading ? "Salvando..." : submitLabel}</GButtonText>
        </GButton>
      </GVStack>
    </GBox>
  );
};
