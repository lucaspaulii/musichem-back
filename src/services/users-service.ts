import { duplicatedEmailError } from "@/errors/duplicated-email-error";
import userRepository from "@/repositories/users-repository";
import { CreateUserParams } from "@/utils/types";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

async function create(params: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(params.email);

  const hashedPassword = await bcrypt.hash(params.password, 12);
  params.password = hashedPassword;
  return userRepository.create(params);
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const usersService = {
  create,
};

export default usersService;
