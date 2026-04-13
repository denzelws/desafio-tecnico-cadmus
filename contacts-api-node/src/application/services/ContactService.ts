import { IContactService } from "../interfaces/IContactService";
import { CreateContactDto, UpdateContactDto, ContactResponseDto, PagedResultDto } from "../dtos/ContactDto";
import { Contact } from "../../domain/entities/Contact";
import { Gender } from "../../domain/enums/Gender";
import { DomainException } from "../../domain/exceptions/DomainException";

export class ContactService implements IContactService {
  private contacts: Contact[] = [];

  public async getAll(page: number = 1, pageSize: number = 10): Promise<PagedResultDto> {
    const activeContacts = this.contacts.filter(c => c.isActive);
    const totalCount = activeContacts.length;

    const items = activeContacts
      .slice((page - 1) * pageSize, page * pageSize)
      .map(this.toResponseDto);

    return {
      items,
      totalCount,
      page,
      pageSize
    };
  }

  public async getById(id: string): Promise<ContactResponseDto> {
    const contact = this.contacts.find(c => c.id === id && c.isActive);
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    return this.toResponseDto(contact);
  }

  public async create(dto: CreateContactDto): Promise<ContactResponseDto> {
    const birthDate = new Date(dto.birthDate);
    const contact = Contact.create(dto.name, birthDate, dto.gender);
    this.contacts.push(contact);
    return this.toResponseDto(contact);
  }

  public async update(id: string, dto: UpdateContactDto): Promise<ContactResponseDto> {
    const contact = this.contacts.find(c => c.id === id && c.isActive);
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    const birthDate = new Date(dto.birthDate);
    contact.update(dto.name, birthDate, dto.gender);
    return this.toResponseDto(contact);
  }

  public async deactivate(id: string): Promise<void> {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }
    contact.deactivate();
  }

  public async delete(id: string): Promise<void> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }
    this.contacts.splice(index, 1);
  }

  private toResponseDto(contact: Contact): ContactResponseDto {
    return {
      id: contact.id,
      name: contact.name,
      birthDate: contact.birthDate.toISOString(),
      age: contact.age,
      gender: contact.gender as Gender,
      isActive: contact.isActive,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt?.toISOString() || null
    };
  }
}
