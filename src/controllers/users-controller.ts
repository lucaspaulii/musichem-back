import usersService from "../services/users-service";
import { CreateUserParams } from "@/utils/types";

import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signUp(req: Request, res: Response) {
  const {
    email,
    password,
    name,
    businessName,
    pictures,
    description,
    address,
  } = req.body;

  const userParams: CreateUserParams = {
    email,
    password,
    name,
    businessName,
    pictures,
    description,
    address,
  };

  try {
    const user = await usersService.create(userParams);
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      name: user.name,
      businessName: user.businessName,
      pictures: user.pictures,
      description: user.description,
      address: user.address,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
