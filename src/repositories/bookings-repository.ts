import { prisma } from "@/database";

async function create(userId: string, artistId: string, date: Date) {
  return await prisma.booking.create({
    data: {
      userId,
      artistPageId: artistId,
      date,
    },
  });
}

async function findByUserId(userId: string) {
  return await prisma.booking.findMany({
    where: {
      userId,
    },
  });
}

async function findByArtistId(artistId: string) {
  return await prisma.booking.findMany({
    where: {
      artistPageId: artistId,
    },
  });
}

async function findByDateAndArtistId(date: Date, artistId: string) {
  return await prisma.booking.findFirst({
    where: {
      artistPageId: artistId,
      date,
    },
  });
}

const bookingsRepository = {
  create,
  findByUserId,
  findByArtistId,
  findByDateAndArtistId,
};

export default bookingsRepository;
