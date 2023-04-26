"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const duplicated_email_error_1 = require("@/errors/duplicated-email-error");
const users_repository_1 = __importDefault(require("@/repositories/users-repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function create(params) {
    await validateUniqueEmailOrFail(params.email);
    const hashedPassword = await bcrypt_1.default.hash(params.password, 12);
    params.password = hashedPassword;
    return users_repository_1.default.create(params);
}
async function validateUniqueEmailOrFail(email) {
    const userWithSameEmail = await users_repository_1.default.findByEmail(email);
    if (userWithSameEmail) {
        throw (0, duplicated_email_error_1.duplicatedEmailError)();
    }
}
const usersService = {
    create,
};
exports.default = usersService;
