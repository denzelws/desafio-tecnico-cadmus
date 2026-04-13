import * as yup from "yup";

export const createContactSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .max(150, "Nome não pode ultrapassar 150 caracteres"),
  birthDate: yup
    .string()
    .required("Data de nascimento é obrigatória")
    .test("is-past-date", "Data de nascimento não pode ser futura", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date < new Date();
    }),
  gender: yup
    .number()
    .required("Sexo é obrigatório")
    .oneOf([1, 2, 3], "Sexo inválido"),
});

export const updateContactSchema = createContactSchema;
