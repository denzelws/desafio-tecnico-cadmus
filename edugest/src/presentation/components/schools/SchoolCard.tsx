import type { School } from "@/domain/entities/School";
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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ConfirmDialog } from "../common/ConfirmDialog";

import {
  selectFilteredClasses,
  useClassStore,
} from "@/application/store/classStore";
import { useShallow } from "zustand/react/shallow";

interface SchoolCardProps {
  school: School;
  onDelete: (id: string) => Promise<void>;
}

export const SchoolCard: React.FC<SchoolCardProps> = ({ school, onDelete }) => {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const classes = useClassStore(useShallow(selectFilteredClasses(school.id)));
  const realClassCount = classes.length;

  return (
    <>
      <GPressable
        onPress={() => router.push(`/schools/${school.id}`)}
        testID={`school-card-${school.id}`}
      >
        <GBox
          bg="$white"
          borderRadius="$xl"
          p="$4"
          mb="$3"
          mx="$4"
          shadowColor="$trueGray900"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.08}
          shadowRadius={8}
          elevation={2}
        >
          <GHStack justifyContent="space-between" alignItems="flex-start">
            <GVStack flex={1} mr="$2">
              <GText
                fontSize="$md"
                fontWeight="$semibold"
                color="$trueGray800"
                numberOfLines={2}
              >
                {school.name}
              </GText>
              <GHStack alignItems="center" mt="$1" space="xs">
                <Ionicons name="location-outline" size={14} color="#64748B" />
                <GText
                  fontSize="$sm"
                  color="$trueGray500"
                  numberOfLines={1}
                  flex={1}
                >
                  {school.address}
                </GText>
              </GHStack>
              <GHStack mt="$2">
                <GBadge action="info" variant="solid" borderRadius="$full">
                  <GBadgeText>
                    {realClassCount} {realClassCount === 1 ? "turma" : "turmas"}
                  </GBadgeText>
                </GBadge>
              </GHStack>
            </GVStack>

            <GMenu
              trigger={(triggerProps: any) => (
                <GPressable
                  {...triggerProps}
                  p="$1"
                  testID={`school-menu-${school.id}`}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color="#94A3B8"
                  />
                </GPressable>
              )}
            >
              <GMenuItem
                key="edit"
                textValue="Editar"
                onPress={() => router.push(`/schools/${school.id}/edit`)}
              >
                <Ionicons name="pencil-outline" size={16} color="#3B82F6" />
                <GMenuItemLabel ml="$2">Editar</GMenuItemLabel>
              </GMenuItem>
              <GMenuItem
                key="delete"
                textValue="Excluir"
                onPress={() => setShowDeleteDialog(true)}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                <GMenuItemLabel ml="$2" color="$red600">
                  Excluir
                </GMenuItemLabel>
              </GMenuItem>
            </GMenu>
          </GHStack>
        </GBox>
      </GPressable>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onDelete(school.id)}
        title="Excluir escola"
        message={`Deseja excluir "${school.name}"? Todas as turmas vinculadas também serão excluídas.`}
        confirmLabel="Excluir"
        isDestructive
      />
    </>
  );
};
