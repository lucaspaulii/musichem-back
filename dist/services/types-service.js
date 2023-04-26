"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_error_1 = require("@/errors/not-found-error");
const types_repository_1 = __importDefault(require("@/repositories/types-repository"));
const capitalizeFirst_1 = __importDefault(require("@/utils/capitalizeFirst"));
async function getAll() {
    const types = await types_repository_1.default.findAll();
    if (!types)
        throw (0, not_found_error_1.notFoundError)();
    const treatedTypes = types.map((type) => {
        const newType = type
            .split("_")
            .map((c) => (0, capitalizeFirst_1.default)(c))
            .join(" ");
        return newType;
    });
    return treatedTypes;
}
const typesService = {
    getAll,
};
exports.default = typesService;
