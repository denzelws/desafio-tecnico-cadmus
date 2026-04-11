import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Class } from "../../domain/entities/Class";

interface ClassState {
  classesBySchool: Record<string, Class[]>;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  shiftFilter: string;
}

interface ClassActions {
  setClasses: (schoolId: string, classes: Class[]) => void;
  addClass: (cls: Class) => void;
  updateClass: (cls: Class) => void;
  removeClass: (schoolId: string, classId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setShiftFilter: (shift: string) => void;
}

type ClassStore = ClassState & ClassActions;

export const useClassStore = create<ClassStore>()(
  devtools(
    (set) => ({
      classesBySchool: {},
      isLoading: false,
      error: null,
      searchQuery: "",
      shiftFilter: "",

      setClasses: (schoolId, classes) =>
        set(
          (state) => ({
            classesBySchool: { ...state.classesBySchool, [schoolId]: classes },
          }),
          false,
          "class/setClasses",
        ),

      addClass: (cls) =>
        set(
          (state) => {
            const existing = state.classesBySchool[cls.schoolId] ?? [];
            return {
              classesBySchool: {
                ...state.classesBySchool,
                [cls.schoolId]: [cls, ...existing],
              },
            };
          },
          false,
          "class/addClass",
        ),

      updateClass: (cls) =>
        set(
          (state) => ({
            classesBySchool: {
              ...state.classesBySchool,
              [cls.schoolId]: (state.classesBySchool[cls.schoolId] ?? []).map(
                (c) => (c.id === cls.id ? cls : c),
              ),
            },
          }),
          false,
          "class/updateClass",
        ),

      removeClass: (schoolId, classId) =>
        set(
          (state) => ({
            classesBySchool: {
              ...state.classesBySchool,
              [schoolId]: (state.classesBySchool[schoolId] ?? []).filter(
                (c) => c.id !== classId,
              ),
            },
          }),
          false,
          "class/removeClass",
        ),

      setLoading: (isLoading) => set({ isLoading }, false, "class/setLoading"),

      setError: (error) => set({ error }, false, "class/setError"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "class/setSearchQuery"),

      setShiftFilter: (shiftFilter) =>
        set({ shiftFilter }, false, "class/setShiftFilter"),
    }),
    { name: "ClassStore" },
  ),
);

export const selectFilteredClasses =
  (schoolId: string) => (state: ClassStore) => {
    const { classesBySchool, searchQuery, shiftFilter } = state;
    let classes = classesBySchool[schoolId] ?? [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      classes = classes.filter((c) => c.name.toLowerCase().includes(q));
    }

    if (shiftFilter) {
      classes = classes.filter((c) => c.shift === shiftFilter);
    }

    return classes;
  };
