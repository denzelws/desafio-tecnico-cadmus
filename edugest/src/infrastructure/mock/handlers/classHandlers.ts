import { http, HttpResponse } from "msw";
import { db } from "../db";
import { serializeClass } from "../serializers/class.serializer";
import { now } from "../utils/date";
import { httpError } from "../utils/http-error";

export const classHandlers = [
  http.get("/api/schools/:schoolId/classes", ({ params, request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const shift = url.searchParams.get("shift") ?? "";

    let classes = db.class.findMany({
      where: {
        school: {
          id: {
            equals: params.schoolId as string,
          },
        },
      },
    });

    if (search) {
      classes = classes.filter((c) => c.name.toLowerCase().includes(search));
    }

    if (shift) {
      classes = classes.filter((c) => c.shift === shift);
    }

    const result = classes.map(serializeClass);
    return HttpResponse.json(result);
  }),

  http.post("/api/schools/:schoolId/classes", async ({ params, request }) => {
    const body = (await request.json().catch(() => ({}))) as {
      name?: string;
      shift?: string;
      academicYear?: number;
    };

    if (!body.name || !body.shift || !body.academicYear) {
      return httpError("Dados inválidos fornecidos", 400, "BAD_REQUEST");
    }

    const name = body.name.trim();
    const shift = body.shift.trim();
    const academicYear = body.academicYear;

    const school = db.school.findFirst({
      where: { id: { equals: params.schoolId as string } },
    });

    if (!school) {
      return httpError("Escola não encontrada", 404, "SCHOOL_NOT_FOUND");
    }

    const duplicate = db.class.findFirst({
      where: {
        school: {
          id: {
            equals: params.schoolId as string,
          },
        },
        name: { equals: name },
        academicYear: { equals: academicYear },
      },
    });

    if (duplicate) {
      return httpError(
        "Já existe uma turma com esse nome neste ano letivo",
        409,
        "CLASS_ALREADY_EXISTS",
      );
    }

    const newClass = db.class.create({
      school,
      name,
      shift,
      academicYear,
      createdAt: now(),
      updatedAt: now(),
    });

    return HttpResponse.json(serializeClass(newClass), { status: 201 });
  }),

  http.put(
    "/api/schools/:schoolId/classes/:classId",
    async ({ params, request }) => {
      const body = (await request.json().catch(() => ({}))) as Partial<{
        name: string;
        shift: string;
        academicYear: number;
      }>;

      const existing = db.class.findFirst({
        where: { id: { equals: params.classId as string } },
      });

      if (!existing) {
        return httpError("Turma não encontrada", 404, "CLASS_NOT_FOUND");
      }

      const name = body.name?.trim() ?? existing.name;
      const academicYear = body.academicYear ?? existing.academicYear;

      if (body.name || body.academicYear) {
        const duplicate = db.class.findFirst({
          where: {
            school: {
              id: { equals: params.schoolId as string },
            },
            name: { equals: name },
            academicYear: { equals: academicYear },
          },
        });

        if (duplicate && duplicate.id !== existing.id) {
          return httpError(
            "Já existe uma turma com esse nome neste ano letivo",
            409,
            "CLASS_ALREADY_EXISTS",
          );
        }
      }

      const updated = db.class.update({
        where: { id: { equals: existing.id } },
        data: {
          name,
          shift: body.shift ? body.shift.trim() : existing.shift,
          academicYear,
          updatedAt: now(),
        },
      });

      return HttpResponse.json(serializeClass(updated!));
    },
  ),

  http.delete("/api/schools/:schoolId/classes/:classId", ({ params }) => {
    const existing = db.class.findFirst({
      where: { id: { equals: params.classId as string } },
    });

    if (!existing) {
      return httpError("Turma não encontrada", 404, "CLASS_NOT_FOUND");
    }

    db.class.delete({ where: { id: { equals: params.classId as string } } });

    return new HttpResponse(null, { status: 204 });
  }),
];
