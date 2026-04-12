import { createClassSchema } from "../../domain/schemas/classSchema";

describe("createClassSchema", () => {
  it("should validate correct class data", () => {
    const validData = {
      name: "1º Ano A",
      shift: "morning",
      academicYear: 2025,
    };

    const result = createClassSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject invalid shift", () => {
    const invalidData = {
      name: "1º Ano A",
      shift: "invalid",
      academicYear: 2025,
    };

    const result = createClassSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should reject past year", () => {
    const invalidData = {
      name: "1º Ano A",
      shift: "morning",
      academicYear: 1999,
    };

    const result = createClassSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
