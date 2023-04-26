"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/database");
async function create(token, userId) {
    return database_1.prisma.sessions.create({
        data: {
            token,
            userId,
        },
    });
}
async function deleteSessions(userId) {
    return await database_1.prisma.sessions.deleteMany({
        where: {
            userId,
        },
    });
}
async function getByToken(token) {
    return await database_1.prisma.sessions.findFirst({
        where: {
            token,
        },
    });
}
const authRepository = {
    create,
    deleteSessions,
    getByToken,
};
exports.default = authRepository;
