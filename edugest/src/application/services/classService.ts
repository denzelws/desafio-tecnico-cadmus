import { mockClasses } from "@/infrastructure/mock/mockData";
import { v4 as uuidv4 } from "uuid";
import {
  Class,
  CreateClassDTO,
  UpdateClassDTO,
} from "../../domain/entities/Class";
import { apiClient } from "../../infrastructure/api/client";

export interface GetClassesParams {
  search?: string;
  shift?: string;
}

let classes = [...mockClasses];
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const memoryService = {
  async getBySchool(
    schoolId: string,
    params?: GetClassesParams,
  ): Promise<Class[]> {
    await delay();
    let result = classes.filter((c) => c.schoolId === schoolId);
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (params?.shift) {
      result = result.filter((c) => c.shift === params.shift);
    }
    return result;
  },

  async create(schoolId: string, dto: CreateClassDTO): Promise<Class> {
    await delay();
    const duplicate = classes.find(
      (c) =>
        c.schoolId === schoolId &&
        c.name.toLowerCase() === dto.name.toLowerCase() &&
        c.academicYear === dto.academicYear,
    );
    if (duplicate)
      throw new Error("Já existe uma turma com esse nome neste ano letivo");

    const newClass: Class = {
      id: uuidv4(),
      schoolId,
      ...dto,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    classes = [newClass, ...classes];
    return newClass;
  },

  async update(
    schoolId: string,
    classId: string,
    dto: UpdateClassDTO,
  ): Promise<Class> {
    await delay();
    const index = classes.findIndex((c) => c.id === classId);
    if (index === -1) throw new Error("Turma não encontrada");
    classes[index] = {
      ...classes[index],
      ...dto,
      updateAt: new Date().toISOString(),
    };
    return classes[index];
  },

  async remove(schoolId: string, classId: string): Promise<void> {
    await delay();
    classes = classes.filter((c) => c.id !== classId);
  },
};

const withFallback = async <T>(
  axiosFn: () => Promise<T>,
  memoryFn: () => Promise<T>,
): Promise<T> => {
  try {
    return await axiosFn();
  } catch {
    console.warn("[Service] MSW indisponível, usando mock em memória");
    return memoryFn();
  }
};

export const classService = {
  async getBySchool(
    schoolId: string,
    params?: GetClassesParams,
  ): Promise<Class[]> {
    return withFallback(
      async () => {
        const { data } = await apiClient.get<Class[]>(
          `/schools/${schoolId}/classes`,
          { params },
        );
        return data;
      },
      () => memoryService.getBySchool(schoolId, params),
    );
  },

  async create(schoolId: string, dto: CreateClassDTO): Promise<Class> {
    return withFallback(
      async () => {
        const { data } = await apiClient.post<Class>(
          `/schools/${schoolId}/classes`,
          dto,
        );
        return data;
      },
      () => memoryService.create(schoolId, dto),
    );
  },

  async update(
    schoolId: string,
    classId: string,
    dto: UpdateClassDTO,
  ): Promise<Class> {
    return withFallback(
      async () => {
        const { data } = await apiClient.put<Class>(
          `/schools/${schoolId}/classes/${classId}`,
          dto,
        );
        return data;
      },
      () => memoryService.update(schoolId, classId, dto),
    );
  },

  async remove(schoolId: string, classId: string): Promise<void> {
    return withFallback(
      async () => {
        await apiClient.delete(`/schools/${schoolId}/classes/${classId}`);
      },
      () => memoryService.remove(schoolId, classId),
    );
  },
};
