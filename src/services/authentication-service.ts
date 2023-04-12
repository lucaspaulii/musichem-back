import { invalidCredentialsError } from "@/errors/invalid-credentials-error";
import authRepository from "@/repositories/authentication-repository";
import userRepository from "@/repositories/users-repository";
import { exclude } from "@/utils/prisma-utils";
import { SignInParams, SignInResult } from "@/utils/types";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
    hasArtistPage: true,
  });
  console.log(user);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await authRepository.create(token, userId);

  return token;
}

type GetUserOrFailResult = Pick<User, "id" | "email" | "password" | "hasArtistPage">;

const authenticationService = {
  signIn,
};

export default authenticationService;
