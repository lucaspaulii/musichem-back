"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenres = void 0;
const genres_service_1 = __importDefault(require("@/services/genres-service"));
const http_status_1 = __importDefault(require("http-status"));
async function getGenres(req, res) {
    try {
        const genres = await genres_service_1.default.getAll();
        return res.status(http_status_1.default.OK).send(genres);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getGenres = getGenres;
