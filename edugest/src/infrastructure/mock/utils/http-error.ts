import { HttpResponse } from "msw";

export const httpError = (message: string, status: number, code: string) => {
  return HttpResponse.json(
    {
      error: {
        message,
        code,
      },
    },
    { status },
  );
};
