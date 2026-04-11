export type Shift = "morning" | "afternoon" | "evening" | "full";

export type Class = {
  id: string;
  schoolId: string;
  name: string;
  shift: Shift;
  academicYear: number;
  createdAt: string;
  updateAt: string;
};

export type CreateClassDTO = Pick<Class, "name" | "shift" | "academicYear">;
export type UpdateClassDTO = Partial<
  Pick<Class, "name" | "shift" | "academicYear">
>;

export const SHIFT_LABELS: Record<Shift, string> = {
  morning: "Matutino",
  afternoon: "Vespertino",
  evening: "Noturno",
  full: "Integral",
};

export const SHIFT_COLORS: Record<Shift, string> = {
  morning: "warning",
  afternoon: "success",
  evening: "info",
  full: "muted",
};
