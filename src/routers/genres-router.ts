import { getGenres } from "@/controllers/genres-controller";
import { Router } from "express";

const genresRouter = Router();

genresRouter.get("/", getGenres);

export { genresRouter };
