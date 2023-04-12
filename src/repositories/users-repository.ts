import { prisma } from "@/database";
import { CreateUserParams } from "@/utils/types";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function create(params: CreateUserParams) {
  return await prisma.user.create({
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

async function updateHasArtist(id: string) {
  return await prisma.user.update({
    data: {
      hasArtistPage: true,
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

export default userRepository;
