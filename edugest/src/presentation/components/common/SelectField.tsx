// src/presentation/components/common/SelectField.tsx
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
import React from "react";
import { Controller } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  control: any;
  name: string;
  label: string;
  options: SelectOption[];
  error?: any;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  options,
  error,
  placeholder = "Selecione uma opção",
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
                placeholder={placeholder}
                value={value}
                color={colors.on_surface}
              />
            </GSelectTrigger>

            <GSelectPortal>
              <GSelectBackdrop />
              <GSelectContent>
                <GSelectDragIndicatorWrapper>
                  <GSelectDragIndicator />
                </GSelectDragIndicatorWrapper>

                {options.map((option) => (
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
