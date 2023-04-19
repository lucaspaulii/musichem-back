import { prisma } from "@/database";

async function create(token: string, userId: string) {
  return prisma.sessions.create({
    data: {
      token,
      userId,
    },
  });
}

async function deleteSessions(userId: string) {
  return await prisma.sessions.deleteMany({
    where: {
      userId,
    },
  });
}

async function getByToken(token: string) {
  return await prisma.sessions.findFirst({
    where: {
      token,
    },
  });
}

const authRepository = {
  create,
  deleteSessions,
  getByToken,
};

export default authRepository;
