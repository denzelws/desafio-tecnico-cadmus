import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { School } from "../../domain/entities/School";

interface SchoolState {
  schools: School[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

interface SchoolActions {
  setSchools: (schools: School[]) => void;
  addSchool: (school: School) => void;
  updateSchool: (school: School) => void;
  removeSchool: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
}

type SchoolStore = SchoolState & SchoolActions;

export const useSchoolStore = create<SchoolStore>()(
  devtools(
    (set) => ({
      schools: [],
      isLoading: false,
      error: null,
      searchQuery: "",

      setSchools: (schools) => set({ schools }, false, "school/setSchools"),

      addSchool: (school) =>
        set(
          (state) => ({ schools: [school, ...state.schools] }),
          false,
          "school/addSchool",
        ),

      updateSchool: (school) =>
        set(
          (state) => ({
            schools: state.schools.map((s) =>
              s.id === school.id ? school : s,
            ),
          }),
          false,
          "school/updateSchool",
        ),

      removeSchool: (id) =>
        set(
          (state) => ({ schools: state.schools.filter((s) => s.id !== id) }),
          false,
          "school/removeSchool",
        ),

      setLoading: (isLoading) => set({ isLoading }, false, "school/setLoading"),

      setError: (error) => set({ error }, false, "school/setError"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "school/setSearchQuery"),
    }),
    { name: "SchoolStore" },
  ),
);

export const selectFilteredSchools = (state: SchoolStore) => {
  const { schools, searchQuery } = state;

  if (!searchQuery.trim()) return schools;

  const q = searchQuery.toLowerCase();
  return schools.filter(
    (s) =>
      s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q),
  );
};
