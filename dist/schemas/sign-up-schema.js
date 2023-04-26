"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(5).required(),
    name: joi_1.default.string().min(4).required(),
    businessName: joi_1.default.string().min(4).required(),
    pictures: joi_1.default.array().items(joi_1.default.string().uri()),
    description: joi_1.default.string().min(5).required(),
    address: joi_1.default.string().min(5).required(),
});
