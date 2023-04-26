"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByArtist = exports.getBookingsByUser = exports.postBooking = void 0;
const bookings_service_1 = __importDefault(require("@/services/bookings-service"));
const http_status_1 = __importDefault(require("http-status"));
async function postBooking(req, res) {
    const insertedBooking = req.body;
    const { userId } = req;
    try {
        const booking = bookings_service_1.default.post({ ...insertedBooking, userId });
        return res.status(http_status_1.default.CREATED).send(booking);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.postBooking = postBooking;
async function getBookingsByUser(req, res) {
    const { userId } = req;
    try {
        const bookings = {};
        return res.status(http_status_1.default.CREATED).send(bookings);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.getBookingsByUser = getBookingsByUser;
async function getBookingsByArtist(req, res) {
    const artistId = req.params.artistId;
    const { userId } = req;
    try {
        const bookings = await bookings_service_1.default.findByArtist(artistId, userId);
        return res.status(http_status_1.default.CREATED).send(bookings);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.getBookingsByArtist = getBookingsByArtist;
