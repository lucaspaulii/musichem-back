import { AuthenticatedRequest } from "@/middlewares/auth-middleware";
import bookingService from "@/services/bookings-service";
import { CreateBookingParams } from "@/utils/types";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const insertedBooking = req.body as CreateBookingParams;
  const { userId } = req;

  try {
    const booking = bookingService.post({ ...insertedBooking, userId });
    return res.status(httpStatus.CREATED).send(booking);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getBookingsByUser(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req;

  try {
    const bookings = {};
    return res.status(httpStatus.CREATED).send(bookings);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getBookingsByArtist(
  req: AuthenticatedRequest,
  res: Response
) {
  const artistId = req.params.artistId;
  const { userId } = req;

  try {
    const bookings = await bookingService.findByArtist(artistId, userId);
    return res.status(httpStatus.CREATED).send(bookings);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
