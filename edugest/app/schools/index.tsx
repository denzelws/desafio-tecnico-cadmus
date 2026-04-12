import { useSchools } from "@/application/hooks/useSchools";
import {
  GBox,
  GHStack,
  GInput,
  GInputField,
  GInputSlot,
  GText,
} from "@/lib/gluestack";
import { EmptyState } from "@/presentation/components/common/EmptyState";
import { FloatingActionButton } from "@/presentation/components/common/FloatingActionButton";
import { LoadingSpinner } from "@/presentation/components/common/LoadingSpinner";
import { ScreenLayout } from "@/presentation/components/common/ScreenLayout";
import { SchoolCard } from "@/presentation/components/schools/SchoolCard";
import { colors } from "@/presentation/theme/token";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  schoolCount: number;
  insetTop: number;
}

const Header: React.FC<HeaderProps> = ({ schoolCount, insetTop }) => (
  <GBox bg={colors.primary} pt={insetTop} px="$4" pb="$6">
    <GHStack justifyContent="space-between" alignItems="center">
      <GText fontSize="$2xl" fontWeight="$bold" color={colors.on_primary}>
        EduGest+
      </GText>
      <Ionicons name="school-outline" size={28} color={colors.on_primary} />
    </GHStack>
    <GText fontSize="$sm" color={colors.on_primary} mt="$1">
      {schoolCount} escola{schoolCount !== 1 ? "s" : ""} encontrada
      {schoolCount !== 1 ? "s" : ""}
    </GText>
  </GBox>
);

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchQuery,
  setSearchQuery,
}) => (
  <GBox bg="$white" pb="$2" px="$4" py="$2">
    <GInput variant="rounded" size="md" bg="$trueGray100">
      <GInputSlot pl="$3">
        <Ionicons name="search" size={18} color={colors.on_surface_muted} />
      </GInputSlot>
      <GInputField
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar escola por nome ou endereço..."
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </GInput>
  </GBox>
);

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

  return (
    <ScreenLayout
      header={
        <>
          <Header schoolCount={schools.length} insetTop={insets.top} />
          <SearchComponent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </>
      }
      fab={<FloatingActionButton onPress={() => router.push("/schools/new")} />}
    >
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
