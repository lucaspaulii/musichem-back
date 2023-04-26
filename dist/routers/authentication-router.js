"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const authentication_controller_1 = require("@/controllers/authentication-controller");
const auth_middleware_1 = require("@/middlewares/auth-middleware");
const validation_middleware_1 = require("@/middlewares/validation-middleware");
const sign_in_schema_1 = require("@/schemas/sign-in-schema");
const express_1 = require("express");
const authenticationRouter = (0, express_1.Router)();
exports.authenticationRouter = authenticationRouter;
authenticationRouter.post("/sign-in", (0, validation_middleware_1.validateBody)(sign_in_schema_1.signInSchema), authentication_controller_1.singIn)
    .post("/sign-out", auth_middleware_1.authenticateToken, authentication_controller_1.signOut);
