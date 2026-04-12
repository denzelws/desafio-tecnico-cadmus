// src/presentation/components/common/SchoolCardSkeleton.tsx
import { GBox, GHStack, GVStack } from "@/lib/gluestack";
import React from "react";
import { Skeleton } from "./Skeleton";

export const SchoolCardSkeleton: React.FC = () => (
  <GBox bg="$white" borderRadius="$xl" p="$4" mb="$3" mx="$4">
    <GHStack justifyContent="space-between">
      <GVStack flex={1}>
        <Skeleton width={200} height={20} borderRadius={4} />
        <Skeleton width={250} height={16} borderRadius={4} mt="$2" />
        <Skeleton width={80} height={24} borderRadius={12} mt="$3" />
      </GVStack>
      <Skeleton width={24} height={24} borderRadius={4} />
    </GHStack>
  </GBox>
);
