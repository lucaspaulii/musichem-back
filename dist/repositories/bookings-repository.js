"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/database");
async function create(userId, artistId, date) {
    return await database_1.prisma.booking.create({
        data: {
            userId,
            artistPageId: artistId,
            date,
        },
    });
}
async function findByUserId(userId) {
    return await database_1.prisma.booking.findMany({
        where: {
            userId,
        },
    });
}
async function findByArtistId(artistId) {
    return await database_1.prisma.booking.findMany({
        where: {
            artistPageId: artistId,
        },
    });
}
async function findByDateAndArtistId(date, artistId) {
    return await database_1.prisma.booking.findFirst({
        where: {
            artistPageId: artistId,
            date,
        },
    });
}
const bookingsRepository = {
    create,
    findByUserId,
    findByArtistId,
    findByDateAndArtistId,
};
exports.default = bookingsRepository;
