"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artistSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.artistSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    artistName: joi_1.default.string().required(),
    coverPicture: joi_1.default.string().uri().required(),
    description: joi_1.default.string().min(5).required(),
    pictures: joi_1.default.array().items(joi_1.default.string().uri()),
    youtubeUrl: joi_1.default.string().uri(),
    spotifyUrl: joi_1.default.string().uri(),
    instagramUrl: joi_1.default.string().uri(),
    soundCloudUrl: joi_1.default.string().uri(),
    location: joi_1.default.object()
        .keys({
        type: joi_1.default.string().valid("Point").required(),
        coordinates: joi_1.default.array().min(2).max(2).items(joi_1.default.number()).required(),
    })
        .required(),
    allowedArea: joi_1.default.number().min(10),
    genre: joi_1.default.string().required(),
    type: joi_1.default.string().required(),
    price: joi_1.default.number().min(10),
});
