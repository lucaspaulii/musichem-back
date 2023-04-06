import { notFoundError } from "@/errors/not-found-error";
import genresRepository from "@/repositories/genres-repository";
import capitalizeFirst from "@/utils/capitalizeFirst";

async function getAll(): Promise<string[]> {
  const genres = await genresRepository.findAll();
  if (!genres) throw notFoundError();

  const treatedGenres = genres.map((genre) => {
    const newGenre = genre
      .split("_")
      .map((c) => capitalizeFirst(c))
      .join(" ");
    return newGenre;
  });

  return treatedGenres;
}

const genresService = {
  getAll,
};

export default genresService;