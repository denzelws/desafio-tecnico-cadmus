import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import contactsRoutes from "./presentation/routes/contactsRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { connect } from "./infrastructure/database";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/contacts", contactsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();

export default app;
