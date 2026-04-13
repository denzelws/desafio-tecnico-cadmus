import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import contactsRoutes from "./presentation/routes/contactsRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/contacts", contactsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
