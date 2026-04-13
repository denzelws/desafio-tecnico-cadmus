import { Request, Response, NextFunction } from "express";
import { DomainException } from "../domain/exceptions/DomainException";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  if (err instanceof DomainException) {
    return res.status(422).json({
      error: err.message,
    });
  }

  if (err.message.includes("não encontrado")) {
    return res.status(404).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor",
  });
};
