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

export const classService = {
  async getBySchool(
    schoolId: string,
    params?: GetClassesParams,
  ): Promise<Class[]> {
    const { data } = await apiClient.get<Class[]>(
      `/schools/${schoolId}/classes`,
      { params },
    );
    return data;
  },

  async create(schoolId: string, dto: CreateClassDTO): Promise<Class> {
    const { data } = await apiClient.post<Class>(
      `/schools/${schoolId}/classes`,
      dto,
    );
    return data;
  },

  async update(
    schoolId: string,
    classId: string,
    dto: UpdateClassDTO,
  ): Promise<Class> {
    const { data } = await apiClient.put<Class>(
      `/schools/${schoolId}/classes/${classId}`,
      dto,
    );
    return data;
  },

  async remove(schoolId: string, classId: string): Promise<void> {
    await apiClient.delete(`/schools/${schoolId}/classes/${classId}`);
  },
};
