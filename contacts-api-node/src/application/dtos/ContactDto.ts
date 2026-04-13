import { Gender } from "../../domain/enums/Gender";

export interface CreateContactDto {
  name: string;
  birthDate: string;
  gender: Gender;
}

export interface UpdateContactDto {
  name: string;
  birthDate: string;
  gender: Gender;
}

export interface ContactResponseDto {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  gender: Gender;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface PagedResultDto {
  items: ContactResponseDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
