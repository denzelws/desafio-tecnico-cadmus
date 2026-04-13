import { ContactRepository } from "../../infrastructure/repositories/ContactRepository";
import { CreateContactDto, UpdateContactDto, ContactResponseDto, PagedResultDto } from "../dtos/ContactDto";
import { Gender } from "../../domain/enums/Gender";

export class ContactService {
  private repository: ContactRepository;

  constructor() {
    this.repository = new ContactRepository();
  }

  public async getAll(page: number = 1, pageSize: number = 10): Promise<PagedResultDto> {
    const result = await this.repository.getAll(page, pageSize);
    return {
      items: result.items,
      totalCount: result.totalCount,
      page,
      pageSize
    };
  }

  public async getById(id: string): Promise<ContactResponseDto> {
    return await this.repository.getById(id);
  }

  public async create(dto: CreateContactDto): Promise<ContactResponseDto> {
    const birthDate = new Date(dto.birthDate);
    return await this.repository.create({
      name: dto.name,
      birthDate,
      gender: dto.gender
    });
  }

  public async update(id: string, dto: UpdateContactDto): Promise<ContactResponseDto> {
    const birthDate = new Date(dto.birthDate);
    return await this.repository.update(id, {
      name: dto.name,
      birthDate,
      gender: dto.gender
    });
  }

  public async deactivate(id: string): Promise<void> {
    await this.repository.deactivate(id);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
