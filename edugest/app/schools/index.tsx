import { useSchools } from "@/application/hooks/useSchools";
import {
  GBox,
  GFab,
  GFabIcon,
  GFabLabel,
  GHStack,
  GText,
} from "@/lib/gluestack";
import { EmptyState } from "@/presentation/components/common/EmptyState";
import { LoadingSpinner } from "@/presentation/components/common/LoadingSpinner";
import { SearchBar } from "@/presentation/components/common/SearchBar";
import { SchoolCard } from "@/presentation/components/schools/SchoolCard";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, RefreshControl } from "react-native";

export default function SchoolsScreen() {
  const router = useRouter();
  const {
    schools,
    isLoading,
    searchQuery,
    setSearchQuery,
    fetchSchools,
    deleteSchool,
  } = useSchools();

  return (
    <SafeAreaView flex={1} bg="$trueGray50">
      <GBox
        bg="$white"
        px="$4"
        pt="$4"
        pb="$2"
        borderBottomWidth={1}
        borderBottomColor="$trueGray100"
      >
        <GHStack justifyContent="space-between" alignItems="center">
          <GBox>
            <GText fontSize="$2xl" fontWeight="$bold" color="$trueGray800">
              EduGest+
            </GText>
            <GText fontSize="$sm" color="$trueGray500">
              {schools.length} escola{schools.length !== 1 ? "s" : ""}{" "}
              encontrada{schools.length !== 1 ? "s" : ""}
            </GText>
          </GBox>
          <Ionicons name="school-outline" size={28} color="#3B82F6" />
        </GHStack>
      </GBox>

      <GBox bg="$white" pb="$2">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar escola por nome ou endereço..."
        />
      </GBox>

      {isLoading && !schools.length ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={schools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SchoolCard school={item} onDelete={deleteSchool} />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="school-outline"
              title={
                searchQuery
                  ? "Nenhuma escola encontrada"
                  : "Nenhuma escola cadastrada"
              }
              description={
                searchQuery
                  ? "Tente um termo diferente"
                  : "Toque no botão + para adicionar a primeira escola"
              }
            />
          }
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchSchools} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <GFab
        size="lg"
        placement="bottom right"
        onPress={() => router.push("/schools/new")}
        bg="$blue600"
        testID="add-school-fab"
      >
        <GFabIcon as={() => <Ionicons name="add" size={24} color="white" />} />
        <GFabLabel>Nova Escola</GFabLabel>
      </GFab>
    </SafeAreaView>
  );
}
