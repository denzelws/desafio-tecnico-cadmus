import { belongsTo, createServer, hasMany, Model, Response } from "miragejs";

const now = () => new Date().toISOString();

export function makeServer() {
  if ((global as any).mirageServer) {
    (global as any).mirageServer.shutdown();
  }

  const server = createServer({
    logging: true,
    models: {
      school: Model.extend({
        classes: hasMany("class"),
      }),
      class: Model.extend({
        school: belongsTo("school"),
      }),
    },

    seeds(server) {
      const shifts = ["morning", "afternoon", "evening", "full"] as const;
      const currentYear = 2025;

      const schoolA = server.create("school", {
        name: "Escola Municipal João Pessoa",
        address: "Rua das Flores, 100 - Centro",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolB = server.create("school", {
        name: "Escola Municipal Maria Silva",
        address: "Av. Brasil, 500 - Jardim América",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolC = server.create("school", {
        name: "Escola Municipal Carlos Drummond",
        address: "Rua das Palmeiras, 250 - Vila Nova",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolD = server.create("school", {
        name: "Escola Estadual Rui Barbosa",
        address: "Av. Getúlio Vargas, 800 - Centro",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolE = server.create("school", {
        name: "Escola Estadual Santos Dumont",
        address: "Rua dos Ipês, 320 - Jardim Bela Vista",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolF = server.create("school", {
        name: "Escola Municipal Monteiro Lobato",
        address: "Rua Sete de Setembro, 150 - Vila Esperança",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolG = server.create("school", {
        name: "Escola Estadual Cecília Meireles",
        address: "Av. das Acácias, 670 - Jardim das Flores",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolH = server.create("school", {
        name: "Escola Municipal Machado de Assis",
        address: "Rua XV de Novembro, 210 - Centro",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolI = server.create("school", {
        name: "Escola Estadual Clarice Lispector",
        address: "Rua das Orquídeas, 90 - Jardim Primavera",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schoolJ = server.create("school", {
        name: "Escola Municipal Graciliano Ramos",
        address: "Av. Independência, 430 - Vila Nova",
        createdAt: now(),
        updatedAt: now(),
      } as any);

      const schools = [
        schoolA,
        schoolB,
        schoolC,
        schoolD,
        schoolE,
        schoolF,
        schoolG,
        schoolH,
        schoolI,
        schoolJ,
      ];

      const classTemplates = [
        { name: "1º Ano A", shift: "morning", academicYear: currentYear },
        { name: "1º Ano B", shift: "afternoon", academicYear: currentYear },
        { name: "2º Ano A", shift: "morning", academicYear: currentYear },
        { name: "2º Ano B", shift: "evening", academicYear: currentYear },
        { name: "3º Ano A", shift: "afternoon", academicYear: currentYear },
        { name: "3º Ano B", shift: "full", academicYear: currentYear },
      ];

      schools.forEach((school) => {
        classTemplates.forEach((template) => {
          server.create("class", {
            ...template,
            school,
            createdAt: now(),
            updatedAt: now(),
          } as any);
        });
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "/api";
      this.timing = 300;

      // Schools
      this.get("/schools", (schema, request) => {
        const search =
          (request.queryParams.search as string)?.toLowerCase() ?? "";
        let schools = schema.all("school").models;

        if (search) {
          schools = schools.filter(
            (s: any) =>
              s.name.toLowerCase().includes(search) ||
              s.address.toLowerCase().includes(search),
          );
        }

        return schools.map((s: any) => ({
          id: s.id,
          name: s.name,
          address: s.address,
          classCount: schema.where("class", { schoolId: s.id } as any).length,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        }));
      });

      this.get("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);
        if (!school) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Escola não encontrada",
                code: "SCHOOL_NOT_FOUND",
              },
            },
          );
        }

        return {
          id: school.id,
          name: (school as any).name,
          address: (school as any).address,
          classCount: schema.where("class", { schoolId: school.id } as any)
            .length,
          createdAt: (school as any).createdAt,
          updatedAt: (school as any).updatedAt,
        };
      });

      this.post("/schools", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const name = body.name?.trim();
        const address = body.address?.trim();

        if (!name || !address) {
          return new Response(
            400,
            {},
            {
              error: { message: "Dados inválidos", code: "BAD_REQUEST" },
            },
          );
        }

        const existing = schema.findBy("school", { name } as any);
        if (existing) {
          return new Response(
            409,
            {},
            {
              error: {
                message: "Já existe uma escola com esse nome",
                code: "SCHOOL_ALREADY_EXISTS",
              },
            },
          );
        }

        const school = schema.create("school", {
          name,
          address,
          createdAt: now(),
          updatedAt: now(),
        } as any);

        return new Response(
          201,
          {},
          {
            id: school.id,
            name: (school as any).name,
            address: (school as any).address,
            classCount: 0,
            createdAt: (school as any).createdAt,
            updatedAt: (school as any).updatedAt,
          },
        );
      });

      this.put("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);
        if (!school) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Escola não encontrada",
                code: "SCHOOL_NOT_FOUND",
              },
            },
          );
        }

        const body = JSON.parse(request.requestBody);
        const name = body.name?.trim();

        if (name && name !== (school as any).name) {
          const duplicate = schema.findBy("school", { name } as any);
          if (duplicate) {
            return new Response(
              409,
              {},
              {
                error: {
                  message: "Já existe uma escola com esse nome",
                  code: "SCHOOL_ALREADY_EXISTS",
                },
              },
            );
          }
        }

        school.update({
          ...(name ? { name } : {}),
          ...(body.address ? { address: body.address.trim() } : {}),
          updatedAt: now(),
        });

        return {
          id: school.id,
          name: (school as any).name,
          address: (school as any).address,
          classCount: schema.where("class", { schoolId: school.id } as any)
            .length,
          createdAt: (school as any).createdAt,
          updatedAt: (school as any).updatedAt,
        };
      });

      this.del("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);
        if (!school) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Escola não encontrada",
                code: "SCHOOL_NOT_FOUND",
              },
            },
          );
        }

        schema.where("class", { schoolId: school.id } as any).destroy();
        school.destroy();

        return new Response(204);
      });

      // Classes
      this.get("/schools/:schoolId/classes", (schema, request) => {
        const search =
          (request.queryParams.search as string)?.toLowerCase() ?? "";
        const shift = (request.queryParams.shift as string) ?? "";

        let classes = schema.where("class", {
          schoolId: request.params.schoolId,
        } as any).models;

        if (search) {
          classes = classes.filter((c: any) =>
            c.name.toLowerCase().includes(search),
          );
        }

        if (shift) {
          classes = classes.filter((c: any) => c.shift === shift);
        }

        return classes.map((c: any) => ({
          id: c.id,
          schoolId: c.schoolId,
          name: c.name,
          shift: c.shift,
          academicYear: c.academicYear,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }));
      });

      this.post("/schools/:schoolId/classes", (schema, request) => {
        const body = JSON.parse(request.requestBody);
        const { schoolId } = request.params;

        const school = schema.find("school", schoolId);
        if (!school) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Escola não encontrada",
                code: "SCHOOL_NOT_FOUND",
              },
            },
          );
        }

        const { name, shift, academicYear } = body;
        if (!name || !shift || !academicYear) {
          return new Response(
            400,
            {},
            {
              error: { message: "Dados inválidos", code: "BAD_REQUEST" },
            },
          );
        }

        const duplicate = schema.where("class", {
          schoolId,
          name: name.trim(),
          academicYear,
        } as any).length;

        if (duplicate) {
          return new Response(
            409,
            {},
            {
              error: {
                message: "Já existe uma turma com esse nome neste ano letivo",
                code: "CLASS_ALREADY_EXISTS",
              },
            },
          );
        }

        const cls = schema.create("class", {
          schoolId,
          name: name.trim(),
          shift,
          academicYear,
          createdAt: now(),
          updatedAt: now(),
        } as any);

        return new Response(
          201,
          {},
          {
            id: cls.id,
            schoolId: (cls as any).schoolId,
            name: (cls as any).name,
            shift: (cls as any).shift,
            academicYear: (cls as any).academicYear,
            createdAt: (cls as any).createdAt,
            updatedAt: (cls as any).updatedAt,
          },
        );
      });

      this.put("/schools/:schoolId/classes/:classId", (schema, request) => {
        const cls = schema.find("class", request.params.classId);
        if (!cls) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Turma não encontrada",
                code: "CLASS_NOT_FOUND",
              },
            },
          );
        }

        const body = JSON.parse(request.requestBody);
        const name = body.name?.trim() ?? (cls as any).name;
        const academicYear = body.academicYear ?? (cls as any).academicYear;

        const duplicate = schema
          .where("class", {
            schoolId: request.params.schoolId,
            name,
            academicYear,
          } as any)
          .models.filter((c: any) => c.id !== cls.id);

        if (duplicate.length) {
          return new Response(
            409,
            {},
            {
              error: {
                message: "Já existe uma turma com esse nome neste ano letivo",
                code: "CLASS_ALREADY_EXISTS",
              },
            },
          );
        }

        cls.update({
          name,
          academicYear,
          ...(body.shift ? { shift: body.shift } : {}),
          updatedAt: now(),
        });

        return {
          id: cls.id,
          schoolId: (cls as any).schoolId,
          name: (cls as any).name,
          shift: (cls as any).shift,
          academicYear: (cls as any).academicYear,
          createdAt: (cls as any).createdAt,
          updatedAt: (cls as any).updatedAt,
        };
      });

      this.del("/schools/:schoolId/classes/:classId", (schema, request) => {
        const cls = schema.find("class", request.params.classId);
        if (!cls) {
          return new Response(
            404,
            {},
            {
              error: {
                message: "Turma não encontrada",
                code: "CLASS_NOT_FOUND",
              },
            },
          );
        }

        cls.destroy();
        return new Response(204);
      });
    },
  });

  (global as any).mirageServer = server;
  console.log("[Mirage] Servidor iniciado ✓");
  return server;
}
