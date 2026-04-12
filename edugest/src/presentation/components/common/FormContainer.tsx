import {
  GBox,
  GButton,
  GButtonSpinner,
  GButtonText,
  GText,
  GVStack,
} from "@/lib/gluestack";
import { colors, radius, spacing } from "@/presentation/theme/token";
import React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  onSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  submitLabel: string;
  footerText?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  isLoading,
  isValid,
  submitLabel,
  footerText = "* Campos obrigatórios para o registro oficial.",
}) => {
  return (
    <GBox px={spacing.xl} pt={spacing.xl}>
      <GVStack
        space="xl"
        bg={colors.surface_container_low}
        p={spacing.xl}
        borderRadius={radius.xl}
      >
        {children}

        <GButton
          onPress={onSubmit}
          isDisabled={isLoading || !isValid}
          mt="$4"
          h={56}
          bg={isValid ? colors.primary : colors.surface_container_high}
          borderRadius={radius.lg}
        >
          {isLoading ? (
            <GButtonSpinner mr="$2" color={colors.on_primary} />
          ) : null}
          <GButtonText
            color={isValid ? colors.on_primary : colors.on_surface_muted}
            fontWeight="$bold"
          >
            {isLoading ? "Salvando..." : submitLabel}
          </GButtonText>
        </GButton>
      </GVStack>

      <GText
        fontSize="$xs"
        color={colors.on_surface_muted}
        textAlign="center"
        mt={spacing.lg}
        fontStyle="italic"
      >
        {footerText}
      </GText>
    </GBox>
  );
};
