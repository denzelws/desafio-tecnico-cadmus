import type { Class } from "@/domain/entities/Class";
import { SHIFT_COLORS, SHIFT_LABELS } from "@/domain/entities/Class";
import { Ionicons } from "@expo/vector-icons";

import {
  GBadge,
  GBadgeText,
  GBox,
  GHStack,
  GMenu,
  GMenuItem,
  GMenuItemLabel,
  GPressable,
  GText,
  GVStack,
} from "@/lib/gluestack";
import { colors } from "@/presentation/theme/token";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ConfirmDialog } from "../common/ConfirmDialog";

interface ClassCardProps {
  cls: Class;
  onDelete: (classId: string) => Promise<void>;
}

export const ClassCard: React.FC<ClassCardProps> = ({ cls, onDelete }) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <GBox
        bg="$white"
        borderRadius="$xl"
        p="$4"
        mb="$3"
        mx="$4"
        shadowColor="$trueGray900"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.06}
        shadowRadius={6}
        elevation={1}
        testID={`class-card-${cls.id}`}
      >
        <GHStack justifyContent="space-between" alignItems="flex-start">
          <GVStack flex={1}>
            <GText fontSize="$md" fontWeight="$semibold" color="$trueGray800">
              {cls.name}
            </GText>
            <GText fontSize="$sm" color="$trueGray500" mt="$1">
              Ano letivo: {cls.academicYear}
            </GText>
            <GHStack mt="$2" space="xs">
              <GBadge
                action={SHIFT_COLORS[cls.shift] as any}
                variant="outline"
                borderRadius="$full"
              >
                <GBadgeText>{SHIFT_LABELS[cls.shift]}</GBadgeText>
              </GBadge>
            </GHStack>
          </GVStack>

          <GMenu
            trigger={(triggerProps: any) => (
              <GPressable {...triggerProps} p="$1">
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={colors.on_surface_muted}
                />
              </GPressable>
            )}
          >
            <GMenuItem
              key="edit"
              textValue="Editar"
              onPress={() =>
                router.push(`/schools/${cls.schoolId}/classes/${cls.id}/edit`)
              }
            >
              <Ionicons
                name="pencil-outline"
                size={16}
                color={colors.primary}
              />
              <GMenuItemLabel ml="$2">Editar</GMenuItemLabel>
            </GMenuItem>
            <GMenuItem
              key="delete"
              textValue="Excluir"
              onPress={() => setShowDeleteDialog(true)}
            >
              <Ionicons name="trash-outline" size={16} color={colors.error} />
              <GMenuItemLabel ml="$2" color="$red600">
                Excluir
              </GMenuItemLabel>
            </GMenuItem>
          </GMenu>
        </GHStack>
      </GBox>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onDelete(cls.id)}
        title="Excluir turma"
        message={`Deseja excluir a turma "${cls.name}"?`}
        confirmLabel="Excluir"
        isDestructive
      />
    </>
  );
};
