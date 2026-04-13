import { Router } from "express";
import { getAll, getById, create, update, deactivate, deleteContact } from "../controllers/ContactsController";
import { validate } from "../../middleware/validateMiddleware";
import { createContactSchema, updateContactSchema } from "../../application/validators/contactValidator";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", validate(createContactSchema), create);
router.put("/:id", validate(updateContactSchema), update);
router.patch("/:id/deactivate", deactivate);
router.delete("/:id", deleteContact);

export default router;
