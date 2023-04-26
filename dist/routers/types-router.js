"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typesRouter = void 0;
const types_controller_1 = require("@/controllers/types-controller");
const express_1 = require("express");
const typesRouter = (0, express_1.Router)();
exports.typesRouter = typesRouter;
typesRouter.get("/", types_controller_1.getTypes);
