"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/database");
async function findByEmail(email, select) {
    const params = {
        where: {
            email,
        },
    };
    if (select) {
        params.select = select;
    }
    return database_1.prisma.user.findUnique(params);
}
async function findById(id) {
    return database_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
}
async function create(params) {
    return await database_1.prisma.user.create({
        data: {
            email: params.email,
            name: params.name,
            businessName: params.businessName,
            password: params.password,
            hasArtistPage: false,
            pictures: params.pictures,
            description: params.description,
            bookedDates: [],
            address: params.address,
        },
    });
}
async function updateHasArtist(id, value) {
    return await database_1.prisma.user.update({
        data: {
            hasArtistPage: value,
        },
        where: {
            id,
        },
    });
}
const userRepository = {
    findByEmail,
    findById,
    create,
    updateHasArtist,
};
exports.default = userRepository;
