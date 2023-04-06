import { notFoundError } from "@/errors/not-found-error";
import typesRepository from "@/repositories/types-repository";
import capitalizeFirst from "@/utils/capitalizeFirst";

async function getAll(): Promise<string[]> {
  const types = await typesRepository.findAll();
  if (!types) throw notFoundError();

  const treatedTypes = types.map((type) => {
    const newType = type
      .split("_")
      .map((c) => capitalizeFirst(c))
      .join(" ");
    return newType;
  });

  return treatedTypes;
}

const typesService = {
  getAll,
};

export default typesService;
