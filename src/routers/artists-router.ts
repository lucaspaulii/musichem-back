import { getAllNearest, getById, getFilteredNearest, getFiveNearest } from "@/controllers/artists-controller";
import { Router } from "express";

const artistsRouter = Router();
artistsRouter
.get("/main/:lat&:lng", getFiveNearest)
.get("/:lat&:lng&:type&:genre", getFilteredNearest)
.get("/all/:lat&:lng", getAllNearest)
.get("/id/:id", getById);

export { artistsRouter };
