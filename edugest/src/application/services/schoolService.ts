import {
  CreateSchoolDTO,
  School,
  UpdateSchoolDTO,
} from "../../domain/entities/School";
import { apiClient } from "../../infrastructure/api/client";

export const schoolService = {
  async getAll(search?: string): Promise<School[]> {
    const params = search ? { search } : {};
    const { data } = await apiClient.get<School[]>("/schools", { params });
    return data;
  },

  async getById(id: string): Promise<School> {
    const { data } = await apiClient.get<School>(`/schools/${id}`);
    return data;
  },

  async create(dto: CreateSchoolDTO): Promise<School> {
    const { data } = await apiClient.post<School>("/schools", dto);
    return data;
  },

  async update(id: string, dto: UpdateSchoolDTO): Promise<School> {
    const { data } = await apiClient.put<School>(`/schools/${id}`, dto);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/schools/${id}`);
  },
};
