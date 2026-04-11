import { http, HttpResponse } from "msw";
import { db } from "../db";
import { serializeSchool } from "../serializers/school.serializer";
import { now } from "../utils/date";
import { httpError } from "../utils/http-error";

export const schoolHandlers = [
  http.get("/api/schools", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    const schools = db.school.getAll();

    const filtered = search
      ? schools.filter(
          (s) =>
            s.name.toLowerCase().includes(search) ||
            s.address.toLowerCase().includes(search),
        )
      : schools;

    const result = filtered.map(serializeSchool);
    return HttpResponse.json(result);
  }),

  http.get("/api/schools/:id", ({ params }) => {
    const school = db.school.findFirst({
      where: { id: { equals: params.id as string } },
    });

    if (!school) {
      return httpError("Escola não encontrada", 404, "SCHOOL_NOT_FOUND");
    }

    return HttpResponse.json(serializeSchool(school));
  }),

  http.post("/api/schools", async ({ request }) => {
    const body = (await request.json()) as { name: string; address: string };

    const name = body.name.trim();
    const address = body.address.trim();

    const existing = db.school.findFirst({
      where: { name: { equals: name } },
    });

    if (existing) {
      return httpError(
        "Já existe uma escola com esse nome",
        409,
        "SCHOOL_ALREADY_EXISTS",
      );
    }

    const school = db.school.create({
      name,
      address,
      createdAt: now(),
      updatedAt: now(),
    });

    return HttpResponse.json(serializeSchool(school), { status: 201 });
  }),

  http.put("/api/schools/:id", async ({ params, request }) => {
    const body = (await request.json()) as { name?: string; address?: string };

    const existing = db.school.findFirst({
      where: { id: { equals: params.id as string } },
    });

    if (!existing) {
      return httpError("Escola não encontrada", 404, "SCHOOL_NOT_FOUND");
    }

    if (body.name) {
      const name = body.name.trim();

      const duplicate = db.school.findFirst({
        where: { name: { equals: name } },
      });

      if (duplicate && duplicate.id !== existing.id) {
        return httpError(
          "Já existe uma escola com esse nome",
          409,
          "SCHOOL_ALREADY_EXISTS",
        );
      }
    }

    const updated = db.school.update({
      where: { id: { equals: existing.id } },
      data: {
        name: body.name?.trim(),
        address: body.address?.trim(),
        updatedAt: now(),
      },
    });

    return HttpResponse.json(serializeSchool(updated!));
  }),

  http.delete("/api/schools/:id", ({ params }) => {
    const school = db.school.findFirst({
      where: { id: { equals: params.id as string } },
    });

    if (!school) {
      return httpError("Escola não encontrada", 404, "SCHOOL_NOT_FOUND");
    }

    db.class.deleteMany({
      where: {
        school: {
          id: {
            equals: school.id,
          },
        },
      },
    });
    db.school.delete({ where: { id: { equals: school.id } } });

    return new HttpResponse(null, { status: 204 });
  }),
];
