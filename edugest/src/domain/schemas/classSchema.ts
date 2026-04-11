import { z } from "zod";
import { db } from "../../infrastructure/mock/db";

const currentYear = new Date().getFullYear();

export const createClassSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nome da turma deve ter ao menos 2 caracteres")
      .max(50, "Nome muito longo")
      .transform((v) => v.trim()),
    shift: z
      .enum(["morning", "afternoon", "evening", "full"])
      .refine((val) => !!val, {
        message: "Selecione um turno válido",
      }),
    academicYear: z.coerce
      .number()
      .int()
      .min(2000, "Ano letivo inválido")
      .max(
        currentYear + 1,
        `Ano letivo não pode ultrapassar ${currentYear + 1}`,
      ),

    schoolId: z.string().min(1, "Escola é obrigatória"),
  })
  .refine(
    (data) => {
      const school = db.school.findFirst({
        where: { id: { equals: data.schoolId } },
      });

      return !!school;
    },
    {
      message: "Escola não encontrada",
      path: ["schoolId"],
    },
  );

export type CreateClassInput = z.infer<typeof createClassSchema>;
