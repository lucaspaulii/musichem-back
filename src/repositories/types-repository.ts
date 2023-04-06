import { typesArr } from "@/utils/genresAndTypes";
import { Type } from "@prisma/client";


async function findAll(): Promise<Type[]> {
  
  return typesArr;
}

const typesRepository = {
  findAll,
};

export default typesRepository;
