import { Contact } from "../../src/domain/entities/Contact";
import { Gender } from "../../src/domain/enums/Gender";
import { DomainException } from "../../src/domain/exceptions/DomainException";

describe("Contact Entity", () => {
  describe("create", () => {
    it("should create a valid contact", () => {
      const birthDate = new Date("1995-05-15");
      const contact = Contact.create("João Silva", birthDate, Gender.Male);

      expect(contact.name).toBe("João Silva");
      expect(contact.gender).toBe(Gender.Male);
      expect(contact.isActive).toBe(true);
      expect(contact.age).toBeGreaterThanOrEqual(18);
    });

    it("should throw error for menor de idade", () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 17);

      expect(() => Contact.create("João", birthDate, Gender.Male)).toThrow(DomainException);
    });

    it("should throw error for data futura", () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() + 1);

      expect(() => Contact.create("João", birthDate, Gender.Male)).toThrow(DomainException);
    });

    it("should throw error for nome vazio", () => {
      const birthDate = new Date("1995-05-15");

      expect(() => Contact.create("", birthDate, Gender.Male)).toThrow(DomainException);
    });

    it("should throw error for nome muito longo", () => {
      const birthDate = new Date("1995-05-15");
      const longName = "A".repeat(151);

      expect(() => Contact.create(longName, birthDate, Gender.Male)).toThrow(DomainException);
    });
  });

  describe("deactivate", () => {
    it("should deactivate an active contact", () => {
      const contact = Contact.create("João", new Date("1995-05-15"), Gender.Male);
      contact.deactivate();

      expect(contact.isActive).toBe(false);
    });

    it("should throw error when deactivating an inactive contact", () => {
      const contact = Contact.create("João", new Date("1995-05-15"), Gender.Male);
      contact.deactivate();

      expect(() => contact.deactivate()).toThrow(DomainException);
    });
  });

  describe("update", () => {
    it("should update contact successfully", () => {
      const contact = Contact.create("João", new Date("1995-05-15"), Gender.Male);
      contact.update("João Silva", new Date("1990-01-01"), Gender.Male);

      expect(contact.name).toBe("João Silva");
    });
  });
});
