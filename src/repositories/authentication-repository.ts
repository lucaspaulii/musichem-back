import { prisma } from "@/database";

async function create(token: string, userId: string) {
  return prisma.sessions.create({
    data: {
      token,
      userId,
    },
  });
}

const authRepository = {
  create,
};

export default authRepository;
