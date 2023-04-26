"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookingSchema = joi_1.default.object({
    artistPageId: joi_1.default.string(),
    date: joi_1.default.string().isoDate()
});
