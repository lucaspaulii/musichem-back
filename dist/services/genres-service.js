"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_error_1 = require("@/errors/not-found-error");
const genres_repository_1 = __importDefault(require("@/repositories/genres-repository"));
const capitalizeFirst_1 = __importDefault(require("@/utils/capitalizeFirst"));
async function getAll() {
    const genres = await genres_repository_1.default.findAll();
    if (!genres)
        throw (0, not_found_error_1.notFoundError)();
    const treatedGenres = genres.map((genre) => {
        const newGenre = genre
            .split("_")
            .map((c) => (0, capitalizeFirst_1.default)(c))
            .join(" ");
        return newGenre;
    });
    return treatedGenres;
}
const genresService = {
    getAll,
};
exports.default = genresService;
