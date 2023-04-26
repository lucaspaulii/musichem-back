"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArtist = exports.postArtist = exports.getByUserId = exports.getById = exports.getFilteredNearest = exports.getAllNearest = exports.getFiveNearest = void 0;
const artists_service_1 = __importDefault(require("@/services/artists-service"));
const http_status_1 = __importDefault(require("http-status"));
const mongodb_1 = require("mongodb");
async function getFiveNearest(req, res) {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const userId = req.params.userId;
    if (!lat || !lng || !Number(lat) || !Number(lng)) {
        return res.status(http_status_1.default.BAD_REQUEST);
    }
    try {
        const nearestArtists = await artists_service_1.default.findNearestLimited(Number(lat), Number(lng));
        return res.status(http_status_1.default.OK).send(nearestArtists);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getFiveNearest = getFiveNearest;
async function getAllNearest(req, res) {
    const lat = req.params.lat;
    const lng = req.params.lng;
    if (!lat || !lng || !Number(lat) || !Number(lng)) {
        return res.status(http_status_1.default.BAD_REQUEST);
    }
    try {
        const nearestArtists = await artists_service_1.default.findAllNearest(Number(lat), Number(lng));
        return res.status(http_status_1.default.OK).send(nearestArtists);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getAllNearest = getAllNearest;
async function getFilteredNearest(req, res) {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const type = req.params.type;
    const genre = req.params.genre;
    if (!lat || !lng || !Number(lat) || !Number(lng || !type || !genre)) {
        return res.status(http_status_1.default.BAD_REQUEST);
    }
    try {
        const nearestArtists = await artists_service_1.default.findNearestFiltered(Number(lat), Number(lng), type, genre);
        return res.status(http_status_1.default.OK).send(nearestArtists);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getFilteredNearest = getFilteredNearest;
async function getById(req, res) {
    const id = req.params.id;
    const isValid = mongodb_1.ObjectId.isValid(id);
    if (!id || !isValid) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
    try {
        const artist = await artists_service_1.default.findById(id);
        return res.status(http_status_1.default.OK).send(artist);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getById = getById;
async function getByUserId(req, res) {
    const { userId } = req;
    try {
        const artist = await artists_service_1.default.findByUserId(userId);
        return res.status(http_status_1.default.OK).send(artist);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getByUserId = getByUserId;
async function postArtist(req, res) {
    const insertedArtist = req.body;
    try {
        const artist = await artists_service_1.default.post(insertedArtist);
        return res.status(http_status_1.default.CREATED).send(artist);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.postArtist = postArtist;
async function deleteArtist(req, res) {
    const artistId = req.query.id;
    const { userId } = req;
    try {
        await artists_service_1.default.deleteOne(artistId, userId);
        return res.status(http_status_1.default.OK).send('deleted successfuly');
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
}
exports.deleteArtist = deleteArtist;
