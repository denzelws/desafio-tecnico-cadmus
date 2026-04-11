import {
  createSchoolSchema,
  type CreateSchoolInput,
} from "@/domain/schemas/schoolSchema";
import { GBox, GButton, GButtonSpinner, GVStack } from "@/lib/gluestack";
import {
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

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
    defaultValues: {
      name: "",
      address: "",
      ...defaultValues,
    },
  });

  return (
    <GBox px="$4">
      <GVStack space="lg">
        <FormControl isInvalid={!!errors.name}>
          <FormControlLabel>
            <FormControlLabelText>Nome da escola *</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Ex: Escola Municipal João Pessoa"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="school-name-input"
                />
              </Input>
            )}
          />
          {errors.name && (
            <FormControlError>
              <FormControlErrorText>{errors.name.message}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.address}>
          <FormControlLabel>
            <FormControlLabelText>Endereço *</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Ex: Rua das Flores, 100 - Centro"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="school-address-input"
                />
              </Input>
            )}
          />
          {errors.address && (
            <FormControlError>
              <FormControlErrorText>
                {errors.address.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <GButton
          onPress={handleSubmit(onSubmit)}
          isDisabled={isLoading || !isValid}
          mt="$4"
          testID="school-submit-button"
        >
          {isLoading ? <GButtonSpinner mr="$2" /> : null}
          <ButtonText>{isLoading ? "Salvando..." : submitLabel}</ButtonText>
        </GButton>
      </GVStack>
    </GBox>
  );
};
