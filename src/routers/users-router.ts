import { Router } from "express";
import { signUpSchema } from "@/schemas/sign-up-schema";
import { validateBody } from "@/middlewares/validation-middleware";
import { signUp } from "@/controllers/users-controller";

const usersRouter = Router();

usersRouter.post("/", validateBody(signUpSchema), signUp);

export { usersRouter };