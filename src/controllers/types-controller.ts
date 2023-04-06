import typesService from "@/services/types-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTypes(req: Request, res: Response) {
  try {
    const types = await typesService.getAll();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
