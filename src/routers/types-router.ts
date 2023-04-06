import { getTypes } from "@/controllers/types-controller";
import { Router } from "express";

const typesRouter = Router();

typesRouter.get("/", getTypes);

export { typesRouter };