import {
  getAllNearest,
  getById,
  getFilteredNearest,
  getFiveNearest,
  postArtist,
} from "@/controllers/artists-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { artistSchema } from "@/schemas/artist-schema";
import { Router } from "express";

const artistsRouter = Router();
artistsRouter
  .get("/main/:lat&:lng", getFiveNearest)
  .get("/:lat&:lng&:type&:genre", getFilteredNearest)
  .get("/all/:lat&:lng", getAllNearest)
  .get("/id/:id", getById)
  .post("/", validateBody(artistSchema), postArtist)
  .put("/rate");

export { artistsRouter };
