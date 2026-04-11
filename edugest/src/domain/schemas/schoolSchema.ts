import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .max(100, "Nome muito longo")
    .transform((v) => v.trim()),
  address: z
    .string()
    .min(5, "Endereço deve ter ao menos 5 caracteres")
    .max(200, "Endereço muito longo")
    .transform((v) => v.trim()),
});

export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
