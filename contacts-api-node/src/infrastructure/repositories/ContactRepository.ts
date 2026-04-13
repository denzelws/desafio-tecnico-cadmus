import { ContactModel, IContactDocument } from "../database/schemas/ContactSchema";
import { Contact } from "../../domain/entities/Contact";
import { Gender } from "../../domain/enums/Gender";
import { DomainException } from "../../domain/exceptions/DomainException";

export class ContactRepository {
  public async getAll(page: number = 1, pageSize: number = 10): Promise<{ items: any[]; totalCount: number }> {
    const skip = (page - 1) * pageSize;
    
    const [items, totalCount] = await Promise.all([
      ContactModel.find({ isActive: true }).skip(skip).limit(pageSize).lean(),
      ContactModel.countDocuments({ isActive: true })
    ]);

    return {
      items: items.map(this.toResponseDto),
      totalCount
    };
  }

  public async getById(id: string): Promise<any> {
    const contact = await ContactModel.findOne({ _id: id, isActive: true }).lean();
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    return this.toResponseDto(contact);
  }

  public async create(data: { name: string; birthDate: Date; gender: Gender }): Promise<any> {
    const contact = Contact.create(data.name, data.birthDate, data.gender);
    
    const doc = new ContactModel({
      _id: contact.id,
      name: contact.name,
      birthDate: contact.birthDate,
      gender: contact.gender,
      isActive: contact.isActive,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt
    });
    
    await doc.save();
    return this.toResponseDto(doc);
  }

  public async update(id: string, data: { name: string; birthDate: Date; gender: Gender }): Promise<any> {
    const contactDoc = await ContactModel.findOne({ _id: id, isActive: true });
    if (!contactDoc) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }

    const contact = Contact.create(contactDoc.name, contactDoc.birthDate, contactDoc.gender as Gender);
    contact.update(data.name, data.birthDate, data.gender);

    contactDoc.name = data.name;
    contactDoc.birthDate = data.birthDate;
    contactDoc.gender = data.gender;
    contactDoc.updatedAt = new Date();

    await contactDoc.save();
    return this.toResponseDto(contactDoc);
  }

  public async deactivate(id: string): Promise<void> {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }

    if (!contact.isActive) {
      throw new DomainException("Contato já está inativo.");
    }

    contact.isActive = false;
    contact.updatedAt = new Date();
    await contact.save();
  }

  public async delete(id: string): Promise<void> {
    const contact = await ContactModel.findById(id);
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }
    await ContactModel.deleteOne({ _id: id });
  }

  private toResponseDto(doc: any): any {
    const birthDate = new Date(doc.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return {
      id: doc._id,
      name: doc.name,
      birthDate: doc.birthDate.toISOString(),
      age,
      gender: doc.gender,
      isActive: doc.isActive,
      createdAt: doc.createdAt?.toISOString() || doc.createdAt,
      updatedAt: doc.updatedAt?.toISOString() || null
    };
  }
}
