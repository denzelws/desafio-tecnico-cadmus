import { useClasses } from "@/application/hooks/useClasses";
import { useSchoolStore } from "@/application/store/schoolStore";
import { SHIFT_LABELS, type Shift } from "@/domain/entities/Class";
import {
  GBadge,
  GBadgeText,
  GBox,
  GFab,
  GFabIcon,
  GHStack,
  GPressable,
  GText,
  GVStack,
} from "@/lib/gluestack";
import { ClassCard } from "@/presentation/components/classes/ClassCard";
import { EmptyState } from "@/presentation/components/common/EmptyState";
import { LoadingSpinner } from "@/presentation/components/common/LoadingSpinner";
import { SearchBar } from "@/presentation/components/common/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl } from "react-native";

const SHIFTS = ["morning", "afternoon", "evening", "full"] as const;

export default function SchoolDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const school = useSchoolStore((s) => s.schools.find((sc) => sc.id === id));
  const {
    classes,
    isLoading,
    searchQuery,
    shiftFilter,
    setSearchQuery,
    setShiftFilter,
    fetchClasses,
    deleteClass,
  } = useClasses(id);

  return (
    <SafeAreaView flex={1} bg="$trueGray50">
      <GBox
        bg="$white"
        px="$4"
        pt="$4"
        pb="$3"
        borderBottomWidth={1}
        borderBottomColor="$trueGray100"
      >
        <GHStack alignItems="center" mb="$2">
          <GPressable onPress={() => router.back()} mr="$3">
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </GPressable>
          <GVStack flex={1}>
            <GText
              fontSize="$lg"
              fontWeight="$bold"
              color="$trueGray800"
              numberOfLines={1}
            >
              {school?.name ?? "Escola"}
            </GText>
            <GText fontSize="$xs" color="$trueGray500" numberOfLines={1}>
              {school?.address}
            </GText>
          </GVStack>
          <GPressable
            onPress={() => router.push(`/schools/${id}/edit`)}
            ml="$2"
          >
            <Ionicons name="pencil-outline" size={20} color="#3B82F6" />
          </GPressable>
        </GHStack>
      </GBox>

      <GBox bg="$white" pb="$2">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar turma..."
        />

        <GHStack px="$4" space="xs" flexWrap="wrap">
          <GPressable onPress={() => setShiftFilter("")}>
            <GBadge
              action={!shiftFilter ? "info" : "muted"}
              variant={!shiftFilter ? "solid" : "outline"}
              borderRadius="$full"
              mr="$1"
              mb="$1"
            >
              <GBadgeText>Todos</GBadgeText>
            </GBadge>
          </GPressable>

          {SHIFTS.map((s) => (
            <GPressable
              key={s}
              onPress={() => setShiftFilter(s === shiftFilter ? "" : s)}
            >
              <GBadge
                action={shiftFilter === s ? "info" : "muted"}
                variant={shiftFilter === s ? "solid" : "outline"}
                borderRadius="$full"
                mr="$1"
                mb="$1"
              >
                <GBadgeText>{SHIFT_LABELS[s as Shift]}</GBadgeText>
              </GBadge>
            </GPressable>
          ))}
        </GHStack>
      </GBox>

      <GBox px="$4" py="$2">
        <GText fontSize="$sm" fontWeight="$semibold" color="$trueGray600">
          TURMAS ({classes.length})
        </GText>
      </GBox>

      {isLoading && !classes.length ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ClassCard cls={item} onDelete={deleteClass} />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="people-outline"
              title="Nenhuma turma encontrada"
              description="Toque em + para adicionar a primeira turma"
            />
          }
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchClasses} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <GFab
        size="md"
        placement="bottom right"
        onPress={() => router.push(`/schools/${id}/classes/new`)}
        bg="$blue600"
        testID="add-class-fab"
      >
        <GFabIcon as={() => <Ionicons name="add" size={24} color="white" />} />
      </GFab>
    </SafeAreaView>
  );
}
