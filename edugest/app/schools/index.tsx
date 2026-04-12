import { useSchools } from "@/application/hooks/useSchools";
import { GBox, GHStack, GText } from "@/lib/gluestack";
import { EmptyState } from "@/presentation/components/common/EmptyState";
import { FloatingActionButton } from "@/presentation/components/common/FloatingActionButton";
import { LoadingSpinner } from "@/presentation/components/common/LoadingSpinner";
import { ScreenLayout } from "@/presentation/components/common/ScreenLayout";
import { SearchBar } from "@/presentation/components/common/SearchBar";
import { SchoolCard } from "@/presentation/components/schools/SchoolCard";
import { colors } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SchoolsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {
    schools,
    isLoading,
    searchQuery,
    setSearchQuery,
    fetchSchools,
    deleteSchool,
  } = useSchools();

  const Header = () => (
    <GBox bg={colors.primary} pt={insets.top} px="$4" pb="$6">
      <GHStack justifyContent="space-between" alignItems="center">
        <GText fontSize="$2xl" fontWeight="$bold" color={colors.on_primary}>
          EduGest+
        </GText>
        <Ionicons name="school-outline" size={28} color={colors.on_primary} />
      </GHStack>
      <GText fontSize="$sm" color={colors.on_primary} mt="$1">
        {schools.length} escola{schools.length !== 1 ? "s" : ""} encontrada
        {schools.length !== 1 ? "s" : ""}
      </GText>
    </GBox>
  );

  const SearchComponent = () => (
    <GBox bg="$white" pb="$2">
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar escola por nome ou endereço..."
      />
    </GBox>
  );

  return (
    <ScreenLayout
      header={
        <>
          <Header />
          <SearchComponent />
        </>
      }
      fab={<FloatingActionButton onPress={() => router.push("/schools/new")} />}
    >
      {isLoading && !schools.length ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={schools}
          keyExtractor={(item, index) => `${item.id}-${index}`}
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
                  : "Toque no botão + para adicionar"
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
    </ScreenLayout>
  );
}
