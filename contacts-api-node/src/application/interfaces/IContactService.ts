import { CreateContactDto, UpdateContactDto, ContactResponseDto, PagedResultDto } from "../dtos/ContactDto";

export interface IContactService {
  getAll(page: number, pageSize: number): Promise<PagedResultDto>;
  getById(id: string): Promise<ContactResponseDto>;
  create(dto: CreateContactDto): Promise<ContactResponseDto>;
  update(id: string, dto: UpdateContactDto): Promise<ContactResponseDto>;
  deactivate(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
