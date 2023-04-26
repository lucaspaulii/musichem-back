"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistsRouter = void 0;
const artists_controller_1 = require("@/controllers/artists-controller");
const auth_middleware_1 = require("@/middlewares/auth-middleware");
const validation_middleware_1 = require("@/middlewares/validation-middleware");
const artist_schema_1 = require("@/schemas/artist-schema");
const express_1 = require("express");
const artistsRouter = (0, express_1.Router)();
exports.artistsRouter = artistsRouter;
artistsRouter
    .get("/main/:lat&:lng/:userId?", artists_controller_1.getFiveNearest)
    .get("/:lat&:lng&:type&:genre", artists_controller_1.getFilteredNearest)
    .get("/all/:lat&:lng", artists_controller_1.getAllNearest)
    .get("/id/:id", artists_controller_1.getById)
    .get("/user", auth_middleware_1.authenticateToken, artists_controller_1.getByUserId)
    .post("/", (0, validation_middleware_1.validateBody)(artist_schema_1.artistSchema), artists_controller_1.postArtist)
    .put("/rate")
    .delete("/:id", auth_middleware_1.authenticateToken, artists_controller_1.deleteArtist);
