import { mockSchools } from "@/infrastructure/mock/mockData";
import { v4 as uuidv4 } from "uuid";
import {
  CreateSchoolDTO,
  School,
  UpdateSchoolDTO,
} from "../../domain/entities/School";
import { apiClient } from "../../infrastructure/api/client";

let schools = [...mockSchools];
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const memoryService = {
  async getAll(search?: string): Promise<School[]> {
    await delay();
    if (!search) return schools;
    const q = search.toLowerCase();
    return schools.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q),
    );
  },

  async getById(id: string): Promise<School> {
    await delay();
    const school = schools.find((s) => s.id === id);
    if (!school) throw new Error("Escola não encontrada");
    return school;
  },

  async create(dto: CreateSchoolDTO): Promise<School> {
    await delay();
    const exists = schools.find(
      (s) => s.name.toLowerCase() === dto.name.toLowerCase(),
    );
    if (exists) throw new Error("Já existe uma escola com esse nome");
    const school: School = {
      id: uuidv4(),
      ...dto,
      classCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    schools = [school, ...schools];
    return school;
  },

  async update(id: string, dto: UpdateSchoolDTO): Promise<School> {
    await delay();
    const index = schools.findIndex((s) => s.id === id);
    if (index === -1) throw new Error("Escola não encontrada");
    schools[index] = {
      ...schools[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    return schools[index];
  },

  async remove(id: string): Promise<void> {
    await delay();
    schools = schools.filter((s) => s.id !== id);
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

export const schoolService = {
  async getAll(search?: string): Promise<School[]> {
    return withFallback(
      async () => {
        const params = search ? { search } : {};
        const { data } = await apiClient.get<School[]>("/schools", { params });
        return data;
      },
      () => memoryService.getAll(search),
    );
  },

  async getById(id: string): Promise<School> {
    return withFallback(
      async () => {
        const { data } = await apiClient.get<School>(`/schools/${id}`);
        return data;
      },
      () => memoryService.getById(id),
    );
  },

  async create(dto: CreateSchoolDTO): Promise<School> {
    return withFallback(
      async () => {
        const { data } = await apiClient.post<School>("/schools", dto);
        return data;
      },
      () => memoryService.create(dto),
    );
  },

  async update(id: string, dto: UpdateSchoolDTO): Promise<School> {
    return withFallback(
      async () => {
        const { data } = await apiClient.put<School>(`/schools/${id}`, dto);
        return data;
      },
      () => memoryService.update(id, dto),
    );
  },

  async remove(id: string): Promise<void> {
    return withFallback(
      async () => {
        await apiClient.delete(`/schools/${id}`);
      },
      () => memoryService.remove(id),
    );
  },
};
