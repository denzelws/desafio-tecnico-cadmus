import { Request, Response } from "express";
import { ContactService } from "../../application/services/ContactService";
import { CreateContactDto, UpdateContactDto } from "../../application/dtos/ContactDto";
import { asyncHandler } from "../../middleware/asyncHandler";

const contactService = new ContactService();

export const getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const result = await contactService.getAll(page, pageSize);
  res.status(200).json(result);
});

export const getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const contact = await contactService.getById(id);
  res.status(200).json(contact);
});

export const create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const dto: CreateContactDto = req.body;
  const contact = await contactService.create(dto);
  res.status(201).json(contact);
});

export const update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const dto: UpdateContactDto = req.body;
  const contact = await contactService.update(id, dto);
  res.status(200).json(contact);
});

export const deactivate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await contactService.deactivate(id);
  res.status(204).send();
});

export const deleteContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await contactService.delete(id);
  res.status(204).send();
});
