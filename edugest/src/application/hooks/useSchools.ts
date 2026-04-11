import { useCallback, useEffect } from "react";
import { CreateSchoolDTO, UpdateSchoolDTO } from "../../domain/entities/School";
import { schoolService } from "../services/schoolService";
import { selectFilteredSchools, useSchoolStore } from "../store/schoolStore";

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
  } = useSchoolStore();

  const filteredSchools = useSchoolStore(selectFilteredSchools);

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
    fetchSchools();
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
