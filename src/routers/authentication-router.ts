import { signOut, singIn } from "@/controllers/authentication-controller";
import { authenticateToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { signInSchema } from "@/schemas/sign-in-schema";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singIn)
.post("/sign-out", authenticateToken, signOut);

export { authenticationRouter };