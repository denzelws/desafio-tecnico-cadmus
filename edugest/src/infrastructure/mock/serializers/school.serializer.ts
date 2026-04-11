import { db } from "../db";

export const getClassCount = (schoolId: string) =>
  db.class.count({
    where: {
      school: {
        id: { equals: schoolId },
      },
    },
  });

export const serializeSchool = (school: any) => ({
  ...school,
  classCount: getClassCount(school.id),
});
