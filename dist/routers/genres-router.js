"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRouter = void 0;
const genres_controller_1 = require("@/controllers/genres-controller");
const express_1 = require("express");
const genresRouter = (0, express_1.Router)();
exports.genresRouter = genresRouter;
genresRouter.get("/", genres_controller_1.getGenres);
