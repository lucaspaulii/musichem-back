import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import authenticationService from "@/services/authentication-service";
import { SignInParams } from "@/utils/types";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signOut(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    await authenticationService.signOut(userId);
    return res.status(httpStatus.OK).send('logged out successfuly');
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}