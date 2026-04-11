export const serializeClass = (classRecord: any) => {
  return {
    ...classRecord,
    createdAt: new Date(classRecord.createdAt).toISOString(),
    updatedAt: new Date(classRecord.updatedAt).toISOString(),
  };
};
