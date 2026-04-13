import { ContactModel } from "../database/schemas/ContactSchema";
import { DomainException } from "../../domain/exceptions/DomainException";
import mongoose from "mongoose";

export class ContactRepository {
  private validateAge(birthDate: Date): void {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      throw new DomainException("O contato deve ser maior de idade.");
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new DomainException("Nome é obrigatório.");
    }
    if (name.length > 150) {
      throw new DomainException("Nome não pode ultrapassar 150 caracteres.");
    }
  }

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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    const contact = await ContactModel.findOne({ _id: id, isActive: true }).lean();
    if (!contact) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    return this.toResponseDto(contact);
  }

  public async create(data: { name: string; birthDate: Date; gender: number }): Promise<any> {
    this.validateName(data.name);
    this.validateAge(data.birthDate);

    const doc = new ContactModel({
      name: data.name.trim(),
      birthDate: data.birthDate,
      gender: data.gender,
      isActive: true,
      createdAt: new Date(),
      updatedAt: null
    });
    
    await doc.save();
    return this.toResponseDto(doc);
  }

  public async update(id: string, data: { name: string; birthDate: Date; gender: number }): Promise<any> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }
    
    this.validateName(data.name);
    this.validateAge(data.birthDate);

    const contactDoc = await ContactModel.findOne({ _id: id, isActive: true });
    if (!contactDoc) {
      throw new DomainException(`Contato ${id} não encontrado ou inativo.`);
    }

    contactDoc.name = data.name.trim();
    contactDoc.birthDate = data.birthDate;
    contactDoc.gender = data.gender;
    contactDoc.updatedAt = new Date();

    await contactDoc.save();
    return this.toResponseDto(contactDoc);
  }

  public async deactivate(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new DomainException(`Contato ${id} não encontrado.`);
    }
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
      id: doc._id.toString(),
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
