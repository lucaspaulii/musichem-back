import artistsService from "@/services/artists-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectId } from "mongodb";

export async function getFiveNearest(req: Request, res: Response) {
  const lat = req.params.lat;
  const lng = req.params.lng;

  if (!lat || !lng || !Number(lat) || !Number(lng)) {
    return res.status(httpStatus.BAD_REQUEST);
  }

  try {
    const nearestArtists = await artistsService.findNearestLimited(
      Number(lat),
      Number(lng)
    );
    return res.status(httpStatus.OK).send(nearestArtists);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getAllNearest(req: Request, res: Response) {
    const lat = req.params.lat;
    const lng = req.params.lng;
  
    if (!lat || !lng || !Number(lat) || !Number(lng)) {
      return res.status(httpStatus.BAD_REQUEST);
    }
  
    try {
      const nearestArtists = await artistsService.findAllNearest(
        Number(lat),
        Number(lng)
      );
      return res.status(httpStatus.OK).send(nearestArtists);
    } catch (error) {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
  }

export async function getFilteredNearest(req: Request, res: Response) {
  const lat = req.params.lat;
  const lng = req.params.lng;
  const type = req.params.type;
  const genre = req.params.genre;

  if (!lat || !lng || !Number(lat) || !Number(lng || !type || !genre)) {
    return res.status(httpStatus.BAD_REQUEST);
  }

  try {
    const nearestArtists = await artistsService.findNearestFiltered(Number(lat), Number(lng), type, genre);
    return res.status(httpStatus.OK).send(nearestArtists);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getById(req: Request, res: Response) {
    const id = req.params.id;
    const isValid = ObjectId.isValid(id)

    if (!id || !isValid ) {
        return res.status(httpStatus.BAD_REQUEST).send({});
    }

    try {
        const artist = await artistsService.findById(id);
        return res.status(httpStatus.OK).send(artist);
      } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
      }
}
