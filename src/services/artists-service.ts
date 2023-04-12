import { badRequestError } from "@/errors/bad-request-error";
import { notFoundError } from "@/errors/not-found-error";
import artistsRepository from "@/repositories/artists-repository";
import userRepository from "@/repositories/users-repository";
import capitalizeAllAndUnderscore from "@/utils/capitalizeAllAndUnderscore";
import capitalizeFirst from "@/utils/capitalizeFirst";
import { genresArr, typesArr } from "@/utils/genresAndTypes";
import { ArtistCard, CreateArtistParams } from "@/utils/types";
import { ArtistPage, Genre, Type } from "@prisma/client";

async function findNearestLimited(
  lat: number,
  lng: number
): Promise<ArtistCard[]> {
  validateLatLng(lat, lng);
  const nearestArtists = await artistsRepository.findNearestLimited(lat, lng);
  const resultArtists = nearestArtists.map((artist) => {
    artist.genre = capitalizeFirst(artist.genre as string);
    artist.type = capitalizeFirst(artist.type as string);
    return artist;
  });
  return resultArtists;
}

async function findNearestFiltered(
  lat: number,
  lng: number,
  type: string,
  genre: string
): Promise<ArtistCard[]> {
  validateLatLng(lat, lng);
  const formatType = capitalizeAllAndUnderscore(type) as Type;
  const formatGenre = capitalizeAllAndUnderscore(genre) as Genre;

  if (!genresArr.includes(formatGenre) || !typesArr.includes(formatType)) {
    throw badRequestError();
  }

  const nearestArtists = await artistsRepository.findNearestFiltered(
    lat,
    lng,
    type,
    genre
  );
  const resultArtists = nearestArtists.map((artist) => {
    artist.genre = capitalizeFirst(artist.genre as string);
    artist.type = capitalizeFirst(artist.type as string);
    return artist;
  });
  return resultArtists;
}

async function findAllNearest(lat: number, lng: number): Promise<ArtistCard[]> {
  validateLatLng(lat, lng);
  const nearestArtists = await artistsRepository.findNearestUnlimited(lat, lng);
  return nearestArtists;
}

async function findById(id: string): Promise<ArtistPage> {
  const artist = await artistsRepository.findById(id);
  if (!artist) {
    throw notFoundError();
  }
  return artist;
}

async function post(data: CreateArtistParams) {
  await validateUserExistsAndHasArtistOrFail(data.userId);
  validateLatLng(data.location.coordinates[1], data.location.coordinates[0]);

  data.price = Number(data.price);
  data.allowedArea = Number(data.allowedArea);
  data.genre = capitalizeAllAndUnderscore(data.genre) as Genre;
  data.type = capitalizeAllAndUnderscore(data.type) as Type;

  const createdArtist = await artistsRepository.create(data);
  await userRepository.updateHasArtist(data.userId);

  return createdArtist;
}

async function validateUserExistsAndHasArtistOrFail(userId: string) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw notFoundError();
  } else if (user.hasArtistPage) {
    throw badRequestError();
  }
}

const validateLatLng = (lat: number, lng: number) => {
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw badRequestError();
  }
};

const artistsService = {
  findNearestLimited,
  findNearestFiltered,
  findAllNearest,
  findById,
  post,
};

export default artistsService;
