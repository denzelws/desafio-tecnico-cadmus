import { Request, Response } from "express";
import { ContactService } from "../../application/services/ContactService";
import { CreateContactDto, UpdateContactDto } from "../../application/dtos/ContactDto";

export class ContactsController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const result = await this.contactService.getAll(page, pageSize);
    res.status(200).json(result);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const contact = await this.contactService.getById(id);
    res.status(200).json(contact);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const dto: CreateContactDto = req.body;
    const contact = await this.contactService.create(dto);
    res.status(201).json(contact);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const dto: UpdateContactDto = req.body;
    const contact = await this.contactService.update(id, dto);
    res.status(200).json(contact);
  }

  public async deactivate(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.contactService.deactivate(id);
    res.status(204).send();
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.contactService.delete(id);
    res.status(204).send();
  }
}
