import { Gender } from "../enums/Gender";
import { DomainException } from "../exceptions/DomainException";
import crypto from "crypto";

export interface IContact {
  id: string;
  name: string;
  birthDate: Date;
  gender: Gender;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  age: number;
}

export class Contact implements IContact {
  public readonly id: string;
  public name: string;
  public birthDate: Date;
  public gender: Gender;
  public isActive: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date | null;

  private constructor(
    id: string,
    name: string,
    birthDate: Date,
    gender: Gender,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public get age(): number {
    return this.calculateAge();
  }

  public static create(name: string, birthDate: Date, gender: Gender): Contact {
    const contact = new Contact(
      crypto.randomUUID(),
      name,
      birthDate,
      gender,
      true,
      new Date(),
      null
    );

    contact.validateName();
    contact.validateBirthDate();

    return contact;
  }

  public update(name: string, birthDate: Date, gender: Gender): void {
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.updatedAt = new Date();

    this.validateName();
    this.validateBirthDate();
  }

  public deactivate(): void {
    if (!this.isActive) {
      throw new DomainException("Contato já está inativo.");
    }
    this.isActive = false;
    this.updatedAt = new Date();
  }

  private validateName(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new DomainException("Nome é obrigatório.");
    }
    if (this.name.length > 150) {
      throw new DomainException("Nome não pode ultrapassar 150 caracteres.");
    }
    this.name = this.name.trim();
  }

  private validateBirthDate(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const birthDateOnly = new Date(this.birthDate);
    birthDateOnly.setHours(0, 0, 0, 0);

    if (birthDateOnly >= today) {
      throw new DomainException("Data de nascimento não pode ser maior ou igual à data de hoje.");
    }

    const age = this.calculateAge();

    if (age < 0) {
      throw new DomainException("Idade não pode ser menor que 0.");
    }

    if (age < 18) {
      throw new DomainException("O contato deve ser maior de idade.");
    }
  }

  private calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
