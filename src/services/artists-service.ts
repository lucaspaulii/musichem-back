import { badRequestError } from "@/errors/bad-request-error";
import { notFoundError } from "@/errors/not-found-error";
import artistsRepository from "@/repositories/artists-repository";
import capitalizeAllAndUnderscore from "@/utils/capitalizeAllAndUnderscore";
import { genresArr, typesArr } from "@/utils/genresAndTypes";
import { ArtistCard } from "@/utils/types";
import { ArtistPage, Genre, Type } from "@prisma/client";

async function findNearestLimited(
  lat: number,
  lng: number
): Promise<ArtistCard[]> {
  validateLatLng(lat, lng);
  const nearestArtists = await artistsRepository.findNearestLimited(lat, lng);
  return nearestArtists;
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
  return nearestArtists;
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
};

export default artistsService;
