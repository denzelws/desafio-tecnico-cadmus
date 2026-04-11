import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { CreateSchoolDTO, UpdateSchoolDTO } from "../../domain/entities/School";
import { schoolService } from "../services/schoolService";
import { useSchoolStore } from "../store/schoolStore";

export function useSchools() {
  const {
    schools,
    isLoading,
    error,
    searchQuery,
    setSchools,
    addSchool,
    updateSchool,
    removeSchool,
    setLoading,
    setError,
    setSearchQuery,
  } = useSchoolStore(
    useShallow((state) => ({
      schools: state.schools,
      isLoading: state.isLoading,
      error: state.error,
      searchQuery: state.searchQuery,
      setSchools: state.setSchools,
      addSchool: state.addSchool,
      updateSchool: state.updateSchool,
      removeSchool: state.removeSchool,
      setLoading: state.setLoading,
      setError: state.setError,
      setSearchQuery: state.setSearchQuery,
    })),
  );

  const filteredSchools = schools.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
    );
  });

  const fetchSchools = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schoolService.getAll();
      setSchools(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar escolas");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setSchools]);

  useEffect(() => {
    if (schools.length === 0) {
      fetchSchools();
    }
  }, [fetchSchools]);

  const createSchool = useCallback(
    async (dto: CreateSchoolDTO) => {
      const school = await schoolService.create(dto);
      addSchool(school);
      return school;
    },
    [addSchool],
  );

  const editSchool = useCallback(
    async (id: string, dto: UpdateSchoolDTO) => {
      const school = await schoolService.update(id, dto);
      updateSchool(school);
      return school;
    },
    [updateSchool],
  );

  const deleteSchool = useCallback(
    async (id: string) => {
      await schoolService.remove(id);
      removeSchool(id);
    },
    [removeSchool],
  );

  return {
    schools: filteredSchools,
    allSchools: schools,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    fetchSchools,
    createSchool,
    editSchool,
    deleteSchool,
  };
}
