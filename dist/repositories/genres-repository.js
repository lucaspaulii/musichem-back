"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genresAndTypes_1 = require("@/utils/genresAndTypes");
async function findAll() {
    return genresAndTypes_1.genresArr;
}
const genresRepository = {
    findAll,
};
exports.default = genresRepository;
