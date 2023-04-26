"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/database");
async function findNearestLimited(lat, lng) {
    const nearest = (await database_1.prisma.artistPage.aggregateRaw({
        pipeline: [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "distance",
                    spherical: true,
                },
            },
            { $match: {} },
            {
                $project: {
                    _id: 1,
                    //userId: 0,
                    artistName: 1,
                    coverPicture: 1,
                    //description: 0,
                    //bookedDates: 0,
                    //pictures: 0,
                    //ratings: 0,
                    //location: 0,
                    //allowedArea: 0,
                    genre: 1,
                    type: 1,
                    price: 1,
                    distance: { $round: [{ $divide: ["$distance", 1000] }, 1] },
                    rating: {
                        $cond: {
                            if: { $eq: [{ $size: "$ratings" }, 0] },
                            then: 5.0,
                            else: { $round: [{ $avg: "$ratings.value" }, 1] },
                        },
                    },
                },
            },
            {
                $sort: {
                    distance: 1,
                },
            },
            {
                $limit: 5,
            },
        ],
    }));
    return nearest;
}
async function findNearestUnlimited(lat, lng) {
    const nearest = (await database_1.prisma.artistPage.aggregateRaw({
        pipeline: [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "distance",
                    spherical: true,
                },
            },
            { $match: {} },
            {
                $project: {
                    _id: 1,
                    artistName: 1,
                    coverPicture: 1,
                    genre: 1,
                    type: 1,
                    price: 1,
                    distance: { $round: [{ $divide: ["$distance", 1000] }, 1] },
                    rating: {
                        $cond: {
                            if: { $eq: [{ $size: "$ratings" }, 0] },
                            then: 5.0,
                            else: { $round: [{ $avg: "$ratings.value" }, 1] },
                        },
                    },
                },
            },
            {
                $sort: {
                    distance: 1,
                },
            },
        ],
    }));
    return nearest;
}
async function findNearestFiltered(lat, lng, type, genre) {
    const nearest = (await database_1.prisma.artistPage.aggregateRaw({
        pipeline: [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [lng, lat] },
                    distanceField: "distance",
                    spherical: true,
                },
            },
            {
                $match: {
                    genre: genre,
                    type: type,
                },
            },
            {
                $project: {
                    _id: 1,
                    artistName: 1,
                    coverPicture: 1,
                    allowedArea: { $round: [{ $divide: ["$allowedArea", 1000] }, 1] },
                    genre: 1,
                    type: 1,
                    price: 1,
                    distance: { $round: [{ $divide: ["$distance", 1000] }, 1] },
                    difference: { $lte: ["$distance", "$allowedArea"] },
                    rating: {
                        $cond: {
                            if: { $eq: [{ $size: "$ratings" }, 0] },
                            then: 5.0,
                            else: { $round: [{ $avg: "$ratings.value" }, 1] },
                        },
                    },
                },
            },
            {
                $sort: {
                    distance: 1,
                },
            },
            {
                $match: {
                    difference: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    artistName: 1,
                    coverPicture: 1,
                    genre: 1,
                    type: 1,
                    price: 1,
                    distance: 1,
                    rating: 1,
                },
            },
        ],
    }));
    return nearest;
}
async function findById(id) {
    const artist = await database_1.prisma.artistPage.findUnique({
        where: {
            id,
        },
    });
    return artist;
}
async function findByUserId(userId) {
    const artist = await database_1.prisma.artistPage.findUnique({
        where: {
            userId,
        },
    });
    return artist;
}
async function create(data) {
    return await database_1.prisma.artistPage.create({
        data: {
            ...data,
            bookedDates: [],
            ratings: [],
        },
    });
}
async function deleteArtist(artistId) {
    return await database_1.prisma.artistPage.delete({
        where: {
            id: artistId,
        },
    });
}
async function updateBookedDates(artistId, bookedDates) {
    return await database_1.prisma.artistPage.update({
        data: {
            bookedDates
        },
        where: {
            id: artistId
        }
    });
}
const artistsRepository = {
    findNearestLimited,
    findNearestUnlimited,
    findNearestFiltered,
    findById,
    findByUserId,
    create,
    deleteArtist,
    updateBookedDates
};
exports.default = artistsRepository;
