import { prisma } from "@/database";
import { ArtistCard, CreateArtistParams } from "@/utils/types";
import { ArtistPage } from "@prisma/client";

async function findNearestLimited(
  lat: number,
  lng: number
): Promise<ArtistCard[]> {
  const nearest = (await prisma.artistPage.aggregateRaw({
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
  })) as unknown;

  return nearest as ArtistCard[];
}

async function findNearestUnlimited(
  lat: number,
  lng: number
): Promise<ArtistCard[]> {
  const nearest = (await prisma.artistPage.aggregateRaw({
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
  })) as unknown;

  return nearest as ArtistCard[];
}

async function findNearestFiltered(
  lat: number,
  lng: number,
  type: string,
  genre: string
): Promise<ArtistCard[]> {
  const nearest = (await prisma.artistPage.aggregateRaw({
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
  })) as unknown;

  return nearest as ArtistCard[];
}

async function findById(id: string): Promise<ArtistPage> {
  const artist = await prisma.artistPage.findUnique({
    where: {
      id,
    },
  });
  return artist;
}

async function create(data: CreateArtistParams) {
  return await prisma.artistPage.create({
    data: {
      ...data,
      bookedDates: [],
      ratings: [],
    },
  });
}

const artistsRepository = {
  findNearestLimited,
  findNearestUnlimited,
  findNearestFiltered,
  findById,
  create,
};

export default artistsRepository;
