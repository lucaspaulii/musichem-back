import { singIn } from "@/controllers/authentication-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { signInSchema } from "@/schemas/sign-in-schema";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singIn);

export { authenticationRouter };