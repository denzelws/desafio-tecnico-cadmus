import { useCallback, useEffect } from "react";
import { CreateClassDTO, UpdateClassDTO } from "../../domain/entities/Class";
import { classService } from "../services/classService";
import { selectFilteredClasses, useClassStore } from "../store/classStore";

export function useClasses(schoolId: string) {
  const {
    isLoading,
    error,
    searchQuery,
    shiftFilter,
    setClasses,
    addClass,
    updateClass,
    removeClass,
    setLoading,
    setError,
    setSearchQuery,
    setShiftFilter,
  } = useClassStore();

  const filteredClasses = useClassStore(selectFilteredClasses(schoolId));

  const fetchClasses = useCallback(async () => {
    if (!schoolId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await classService.getBySchool(schoolId);
      setClasses(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar turmas");
    } finally {
      setLoading(false);
    }
  }, [schoolId, setLoading, setError, setClasses]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const createClass = useCallback(
    async (dto: CreateClassDTO) => {
      const cls = await classService.create(schoolId, dto);
      addClass(cls);
      return cls;
    },
    [schoolId, addClass],
  );

  const editClass = useCallback(
    async (classId: string, dto: UpdateClassDTO) => {
      const cls = await classService.update(schoolId, classId, dto);
      updateClass(cls);
      return cls;
    },
    [schoolId, updateClass],
  );

  const deleteClass = useCallback(
    async (classId: string) => {
      await classService.remove(schoolId, classId);
      removeClass(schoolId, classId);
    },
    [schoolId, removeClass],
  );

  return {
    classes: filteredClasses,
    isLoading,
    error,
    searchQuery,
    shiftFilter,
    setSearchQuery,
    setShiftFilter,
    fetchClasses,
    createClass,
    editClass,
    deleteClass,
  };
}
