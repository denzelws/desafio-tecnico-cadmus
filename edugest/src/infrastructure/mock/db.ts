import { factory, manyOf, oneOf, primaryKey } from "@mswjs/data";
import { v4 as uuidv4 } from "uuid";

export const db = factory({
  school: {
    id: primaryKey(uuidv4),
    name: String,
    address: String,
    createdAt: String,
    updatedAt: String,

    classes: manyOf("class"),
  },
  class: {
    id: primaryKey(uuidv4),
    name: String,
    shift: String,
    academicYear: Number,
    createdAt: String,
    updatedAt: String,

    school: oneOf("school"),
  },
});

const now = () => new Date().toISOString();

const seed = () => {
  const schoolA = db.school.create({
    name: "Escola Municipal João Pessoa",
    address: "Rua das Flores, 100 - Centro",
    createdAt: now(),
    updatedAt: now(),
  });

  const schoolB = db.school.create({
    name: "Escola Municipal Maria Silva",
    address: "Av. Brasil, 500 - Jardim América",
    createdAt: now(),
    updatedAt: now(),
  });

  const schoolC = db.school.create({
    name: "Escola Municipal Carlos Drummond",
    address: "Rua das Palmeiras, 250 - Vila Nova",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  db.class.create({
    name: "1º Ano A",
    shift: "morning",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    school: schoolA,
  });

  db.class.create({
    name: "2º Ano B",
    shift: "afternoon",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    school: schoolB,
  });

  db.class.create({
    name: "3º Ano B",
    shift: "afternoon",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    school: schoolB,
  });

  db.class.create({
    name: "2º Ano C",
    shift: "afternoon",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    school: schoolC,
  });

  db.class.create({
    name: "3º Ano C",
    shift: "afternoon",
    academicYear: 2025,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    school: schoolC,
  });
};

seed();
