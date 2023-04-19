import {
  deleteArtist,
  getAllNearest,
  getById,
  getByUserId,
  getFilteredNearest,
  getFiveNearest,
  postArtist,
} from "@/controllers/artists-controller";
import { authenticateToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { artistSchema } from "@/schemas/artist-schema";
import { Router } from "express";

const artistsRouter = Router();
artistsRouter
  .get("/main/:lat&:lng/:userId?", getFiveNearest)
  .get("/:lat&:lng&:type&:genre", getFilteredNearest)
  .get("/all/:lat&:lng", getAllNearest)
  .get("/id/:id", getById)
  .get("/user", authenticateToken, getByUserId)
  .post("/", validateBody(artistSchema), postArtist)
  .put("/rate")
  .delete("/:id", authenticateToken, deleteArtist);

export { artistsRouter };
