"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conflict_error_1 = require("@/errors/conflict-error");
const not_found_error_1 = require("@/errors/not-found-error");
const unauthorized_error_1 = require("@/errors/unauthorized-error");
const artists_repository_1 = __importDefault(require("@/repositories/artists-repository"));
const bookings_repository_1 = __importDefault(require("@/repositories/bookings-repository"));
async function post(data) {
    const artist = await artists_repository_1.default.findById(data.artistPageId);
    if (!artist)
        throw (0, not_found_error_1.notFoundError)();
    const bookingExists = await bookings_repository_1.default.findByDateAndArtistId(data.date, data.artistPageId);
    if (bookingExists)
        throw (0, conflict_error_1.conflictError)();
    if (artist.bookedDates.includes(data.date))
        throw (0, conflict_error_1.conflictError)();
    const createBooking = await bookings_repository_1.default.create(data.userId, data.artistPageId, data.date);
    const bookedDates = [...artist.bookedDates, data.date];
    await artists_repository_1.default.updateBookedDates(artist.id, bookedDates);
    return createBooking;
}
async function findByUser(userId) {
    return await bookings_repository_1.default.findByUserId(userId);
}
async function findByArtist(artistId, userId) {
    const artist = await artists_repository_1.default.findById(artistId);
    if (!artist)
        throw (0, not_found_error_1.notFoundError)();
    if (artist.userId !== userId)
        throw (0, unauthorized_error_1.unauthorizedError)();
    return await bookings_repository_1.default.findByArtistId(artistId);
}
const bookingService = {
    post,
    findByUser,
    findByArtist
};
exports.default = bookingService;
