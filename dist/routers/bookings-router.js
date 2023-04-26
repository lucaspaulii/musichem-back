"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const bookings_controller_1 = require("@/controllers/bookings-controller");
const auth_middleware_1 = require("@/middlewares/auth-middleware");
const validation_middleware_1 = require("@/middlewares/validation-middleware");
const booking_schema_1 = require("@/schemas/booking-schema");
const express_1 = require("express");
const bookingsRouter = (0, express_1.Router)();
exports.bookingsRouter = bookingsRouter;
bookingsRouter
    .post("/", (0, validation_middleware_1.validateBody)(booking_schema_1.bookingSchema), auth_middleware_1.authenticateToken, bookings_controller_1.postBooking)
    .get("/artist/:artistId", auth_middleware_1.authenticateToken, bookings_controller_1.getBookingsByArtist)
    .get("/user", auth_middleware_1.authenticateToken, bookings_controller_1.getBookingsByUser);
