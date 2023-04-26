"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_credentials_error_1 = require("@/errors/invalid-credentials-error");
const authentication_repository_1 = __importDefault(require("@/repositories/authentication-repository"));
const users_repository_1 = __importDefault(require("@/repositories/users-repository"));
const prisma_utils_1 = require("@/utils/prisma-utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function signIn(params) {
    const { email, password } = params;
    const user = await getUserOrFail(email);
    await validatePasswordOrFail(password, user.password);
    const token = await createSession(user.id);
    return {
        user: (0, prisma_utils_1.exclude)(user, "password"),
        token,
    };
}
async function signOut(userId) {
    const user = await getUserOrFailById(userId);
    return await authentication_repository_1.default.deleteSessions(userId);
}
async function getUserOrFail(email) {
    const user = await users_repository_1.default.findByEmail(email, {
        id: true,
        email: true,
        name: true,
        password: true,
        hasArtistPage: true,
        businessName: true,
        pictures: true,
        description: true,
        address: true,
        ratings: true,
    });
    if (!user)
        throw (0, invalid_credentials_error_1.invalidCredentialsError)();
    return user;
}
async function getUserOrFailById(userId) {
    const user = await users_repository_1.default.findById(userId);
    if (!user)
        throw (0, invalid_credentials_error_1.invalidCredentialsError)();
    return user;
}
async function validatePasswordOrFail(password, userPassword) {
    const isPasswordValid = await bcrypt_1.default.compare(password, userPassword);
    if (!isPasswordValid)
        throw (0, invalid_credentials_error_1.invalidCredentialsError)();
}
async function createSession(userId) {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
    await authentication_repository_1.default.create(token, userId);
    return token;
}
const authenticationService = {
    signIn,
    signOut,
};
exports.default = authenticationService;
