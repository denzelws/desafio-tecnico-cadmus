import { Router } from "express";
import { ContactsController } from "../controllers/ContactsController";

const router = Router();
const controller = new ContactsController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.patch("/:id/deactivate", controller.deactivate.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
