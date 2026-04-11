import { setupServer } from "msw/native";
import { classHandlers } from "./handlers/classHandlers";
import { schoolHandlers } from "./handlers/schoolHandlers";

export const server = setupServer(...schoolHandlers, ...classHandlers);
