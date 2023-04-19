import express, { Express } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./database";
import {
  typesRouter,
  genresRouter,
  artistsRouter,
  authenticationRouter,
  usersRouter,
  bookingsRouter
} from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/types", typesRouter)
  .use("/genres", genresRouter)
  .use("/artists", artistsRouter)
  .use("/auth", authenticationRouter)
  .use("/user", usersRouter)
  .use("/booking", bookingsRouter);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
