import {
  getBookingsByArtist,
  getBookingsByUser,
  postBooking,
} from "@/controllers/bookings-controller";
import { authenticateToken } from "@/middlewares/auth-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { bookingSchema } from "@/schemas/booking-schema";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter
  .post("/", validateBody(bookingSchema), authenticateToken, postBooking)
  .get("/artist/:artistId", authenticateToken, getBookingsByArtist)
  .get("/user", authenticateToken, getBookingsByUser);

export { bookingsRouter };
