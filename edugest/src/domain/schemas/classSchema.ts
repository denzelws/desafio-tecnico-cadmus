import { z } from "zod";

const currentYear = new Date().getFullYear();

export const createClassSchema = z.object({
  name: z
    .string()
    .min(2, "Nome da turma deve ter ao menos 2 caracteres")
    .max(50, "Nome muito longo")
    .transform((v) => v.trim()),
  shift: z.enum(["morning", "afternoon", "evening", "full"], {
    error: "Selecione um turno válido",
  }),
  academicYear: z.coerce
    .number()
    .int()
    .min(2000, "Ano letivo inválido")
    .max(currentYear + 1, `Ano letivo não pode ultrapassar ${currentYear + 1}`),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type CreateClassOutput = z.output<typeof createClassSchema>;
