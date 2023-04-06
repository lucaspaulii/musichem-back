import genresService from "@/services/genres-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getGenres(req: Request, res: Response) {
    try {
      const genres = await genresService.getAll();
      return res.status(httpStatus.OK).send(genres);
    } catch (error) {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
  }