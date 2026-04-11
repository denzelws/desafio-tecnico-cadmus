import { GButton, GButtonText, GHeading, GText } from "@/lib/gluestack";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@gluestack-ui/themed";
import React from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmar",
  isDestructive = false,
}) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent>
      <AlertDialogHeader>
        <GHeading size="lg">{title}</GHeading>
      </AlertDialogHeader>
      <AlertDialogBody>
        <GText size="sm">{message}</GText>
      </AlertDialogBody>
      <AlertDialogFooter>
        <GButton variant="outline" action="secondary" onPress={onClose} mr="$3">
          <GButtonText>Cancelar</GButtonText>
        </GButton>
        <GButton
          action={isDestructive ? "negative" : "primary"}
          onPress={() => {
            onConfirm();
            onClose();
          }}
        >
          <GButtonText>{confirmLabel}</GButtonText>
        </GButton>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
