import { genresArr } from "@/utils/genresAndTypes";
import { Genre } from "@prisma/client";

async function findAll(): Promise<Genre[]> {
  
  return genresArr;
}

const genresRepository = {
  findAll,
};

export default genresRepository;
