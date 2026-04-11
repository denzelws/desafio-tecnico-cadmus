import type { Class } from "@/domain/entities/Class";
import type { School } from "@/domain/entities/School";

export const mockSchools: School[] = [
  {
    id: "school-1",
    name: "Escola Municipal João Pessoa",
    address: "Rua das Flores, 100 - Centro",
    classCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "school-2",
    name: "Escola Municipal Maria Silva",
    address: "Av. Brasil, 500 - Jardim América",
    classCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockClasses: Class[] = [
  {
    id: "class-1",
    schoolId: "school-1",
    name: "1º Ano A",
    shift: "morning",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
  {
    id: "class-2",
    schoolId: "school-1",
    name: "2º Ano B",
    shift: "afternoon",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
  {
    id: "class-3",
    schoolId: "school-2",
    name: "3º Ano A",
    shift: "evening",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  },
];
