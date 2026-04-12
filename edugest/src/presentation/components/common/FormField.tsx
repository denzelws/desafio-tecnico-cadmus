import {
  GFormControl,
  GFormControlError,
  GFormControlErrorText,
  GFormControlLabel,
  GFormControlLabelText,
  GInput,
  GInputField,
} from "@/lib/gluestack";
import { colors, radius } from "@/presentation/theme/token";
import React from "react";
import { Controller } from "react-hook-form";

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  error?: any;
  isNumeric?: boolean;
  testID?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  error,
  isNumeric = false,
  testID,
}) => {
  return (
    <GFormControl isInvalid={!!error}>
      <GFormControlLabel mb="$2">
        <GFormControlLabelText color={colors.on_surface} fontWeight="$bold">
          {label}
        </GFormControlLabelText>
      </GFormControlLabel>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <GInput
            bg={colors.surface_bright}
            borderRadius={radius.md}
            borderWidth={0}
            h={50}
          >
            <GInputField
              placeholder={placeholder}
              placeholderTextColor={colors.on_surface_muted}
              value={isNumeric ? String(value ?? "") : value}
              onChangeText={(text: string) => {
                if (isNumeric) {
                  const numeric = text.replace(/[^0-9]/g, "");
                  onChange(numeric ? Number(numeric) : 0);
                } else {
                  onChange(text);
                }
              }}
              onBlur={onBlur}
              blurOnSubmit={false}
              returnKeyType="done"
              keyboardType={isNumeric ? "numeric" : "default"}
              testID={testID}
              color={colors.on_surface}
            />
          </GInput>
        )}
      />

      {error && (
        <GFormControlError mt="$1">
          <GFormControlErrorText color={colors.error}>
            {error.message}
          </GFormControlErrorText>
        </GFormControlError>
      )}
    </GFormControl>
  );
};
