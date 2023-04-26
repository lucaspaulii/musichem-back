"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_error_1 = require("@/errors/bad-request-error");
const not_found_error_1 = require("@/errors/not-found-error");
const unauthorized_error_1 = require("@/errors/unauthorized-error");
const artists_repository_1 = __importDefault(require("@/repositories/artists-repository"));
const users_repository_1 = __importDefault(require("@/repositories/users-repository"));
const capitalizeAllAndUnderscore_1 = __importDefault(require("@/utils/capitalizeAllAndUnderscore"));
const capitalizeFirst_1 = __importDefault(require("@/utils/capitalizeFirst"));
const genresAndTypes_1 = require("@/utils/genresAndTypes");
async function findNearestLimited(lat, lng) {
    validateLatLng(lat, lng);
    const nearestArtists = await artists_repository_1.default.findNearestLimited(lat, lng);
    const resultArtists = nearestArtists.map((artist) => {
        artist.genre = (0, capitalizeFirst_1.default)(artist.genre);
        artist.type = (0, capitalizeFirst_1.default)(artist.type);
        return artist;
    });
    return resultArtists;
}
async function findNearestFiltered(lat, lng, type, genre) {
    validateLatLng(lat, lng);
    const formatType = (0, capitalizeAllAndUnderscore_1.default)(type);
    const formatGenre = (0, capitalizeAllAndUnderscore_1.default)(genre);
    if (!genresAndTypes_1.genresArr.includes(formatGenre) || !genresAndTypes_1.typesArr.includes(formatType)) {
        throw (0, bad_request_error_1.badRequestError)();
    }
    const nearestArtists = await artists_repository_1.default.findNearestFiltered(lat, lng, type, genre);
    const resultArtists = nearestArtists.map((artist) => {
        artist.genre = (0, capitalizeFirst_1.default)(artist.genre);
        artist.type = (0, capitalizeFirst_1.default)(artist.type);
        return artist;
    });
    return resultArtists;
}
async function findAllNearest(lat, lng) {
    validateLatLng(lat, lng);
    const nearestArtists = await artists_repository_1.default.findNearestUnlimited(lat, lng);
    return nearestArtists;
}
async function findById(id) {
    const artist = await artists_repository_1.default.findById(id);
    if (!artist) {
        throw (0, not_found_error_1.notFoundError)();
    }
    return artist;
}
async function findByUserId(userId) {
    const artist = await artists_repository_1.default.findByUserId(userId);
    if (!artist) {
        throw (0, not_found_error_1.notFoundError)();
    }
    return artist;
}
async function post(data) {
    await validateUserExistsAndHasArtistOrFail(data.userId);
    validateLatLng(data.location.coordinates[1], data.location.coordinates[0]);
    data.price = Number(data.price);
    data.allowedArea = Number(data.allowedArea);
    data.genre = (0, capitalizeAllAndUnderscore_1.default)(data.genre);
    data.type = (0, capitalizeAllAndUnderscore_1.default)(data.type);
    const createdArtist = await artists_repository_1.default.create(data);
    await users_repository_1.default.updateHasArtist(data.userId, true);
    return createdArtist;
}
async function deleteOne(artistId, userId) {
    const artist = await artists_repository_1.default.findById(artistId);
    if (!artist)
        throw (0, not_found_error_1.notFoundError)();
    if (artist.userId !== userId) {
        throw (0, unauthorized_error_1.unauthorizedError)();
    }
    await users_repository_1.default.updateHasArtist(userId, false);
    return await artists_repository_1.default.deleteArtist(artistId);
}
async function validateUserExistsAndHasArtistOrFail(userId) {
    const user = await users_repository_1.default.findById(userId);
    if (!user) {
        throw (0, not_found_error_1.notFoundError)();
    }
    else if (user.hasArtistPage) {
        throw (0, bad_request_error_1.badRequestError)();
    }
}
const validateLatLng = (lat, lng) => {
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw (0, bad_request_error_1.badRequestError)();
    }
};
const artistsService = {
    findNearestLimited,
    findNearestFiltered,
    findAllNearest,
    findById,
    findByUserId,
    post,
    deleteOne,
};
exports.default = artistsService;
