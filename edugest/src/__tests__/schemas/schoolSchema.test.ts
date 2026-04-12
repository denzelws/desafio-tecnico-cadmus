import { createSchoolSchema } from "../../domain/schemas/schoolSchema";

describe("createSchoolSchema", () => {
  it("should validate correct school data", () => {
    const validData = {
      name: "Escola Municipal Teste",
      address: "Rua das Flores, 100",
    };

    const result = createSchoolSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject short name", () => {
    const invalidData = {
      name: "Ab",
      address: "Rua das Flores, 100",
    };

    const result = createSchoolSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject short address", () => {
    const invalidData = {
      name: "Escola Municipal Teste",
      address: "Abc",
    };

    const result = createSchoolSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should trim whitespace from inputs", () => {
    const data = {
      name: "  Escola Municipal Teste  ",
      address: "  Rua das Flores, 100  ",
    };

    const result = createSchoolSchema.parse(data);
    expect(result.name).toBe("Escola Municipal Teste");
    expect(result.address).toBe("Rua das Flores, 100");
  });

  it("should reject empty name", () => {
    const invalidData = {
      name: "",
      address: "Rua das Flores, 100",
    };

    const result = createSchoolSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject name exceeding max length", () => {
    const invalidData = {
      name: "A".repeat(101),
      address: "Rua das Flores, 100",
    };

    const result = createSchoolSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject empty address", () => {
    const invalidData = {
      name: "Escola Teste",
      address: "",
    };

    const result = createSchoolSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
