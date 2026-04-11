export type School = {
  id: string;
  name: string;
  address: string;
  classCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateSchoolDTO = Pick<School, "name" | "address">;
export type UpdateSchoolDTO = Partial<CreateSchoolDTO>;
