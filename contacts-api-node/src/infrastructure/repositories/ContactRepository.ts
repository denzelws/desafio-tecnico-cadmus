import { Contact } from "../../domain/entities/Contact";
import { IContactService } from "../../application/interfaces/IContactService";
import { CreateContactDto, UpdateContactDto, ContactResponseDto, PagedResultDto } from "../../application/dtos/ContactDto";

export class ContactRepository implements IContactService {
  private contacts: Contact[] = [];

  async getAll(page: number, pageSize: number): Promise<PagedResultDto> {
    const activeContacts = this.contacts.filter(c => c.isActive);
    const totalCount = activeContacts.length;

    const items = activeContacts
      .slice((page - 1) * pageSize, page * pageSize)
      .map(this.toResponseDto);

    return { items, totalCount, page, pageSize };
  }

  async getById(id: string): Promise<ContactResponseDto> {
    const contact = this.contacts.find(c => c.id === id && c.isActive);
    if (!contact) {
      throw new Error(`Contato ${id} não encontrado ou inativo.`);
    }
    return this.toResponseDto(contact);
  }

  async create(dto: CreateContactDto): Promise<ContactResponseDto> {
    const birthDate = new Date(dto.birthDate);
    const contact = Contact.create(dto.name, birthDate, dto.gender);
    this.contacts.push(contact);
    return this.toResponseDto(contact);
  }

  async update(id: string, dto: UpdateContactDto): Promise<ContactResponseDto> {
    const contact = this.contacts.find(c => c.id === id && c.isActive);
    if (!contact) {
      throw new Error(`Contato ${id} não encontrado ou inativo.`);
    }
    const birthDate = new Date(dto.birthDate);
    contact.update(dto.name, birthDate, dto.gender);
    return this.toResponseDto(contact);
  }

  async deactivate(id: string): Promise<void> {
    const contact = this.contacts.find(c => c.id === id);
    if (!contact) {
      throw new Error(`Contato ${id} não encontrado.`);
    }
    contact.deactivate();
  }

  async delete(id: string): Promise<void> {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Contato ${id} não encontrado.`);
    }
    this.contacts.splice(index, 1);
  }

  private toResponseDto(contact: Contact): ContactResponseDto {
    return {
      id: contact.id,
      name: contact.name,
      birthDate: contact.birthDate.toISOString(),
      age: contact.age,
      gender: contact.gender,
      isActive: contact.isActive,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt?.toISOString() || null
    };
  }
}
