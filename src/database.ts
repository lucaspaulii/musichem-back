import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const mongo_uri: string = process.env.MONGO_URI ?? "undefined";

const mongoClient = new MongoClient(mongo_uri);

try {
  const connection = async () => {
    await mongoClient.connect();
    console.log("mongodb connected");
  };
  connection();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("musichems");
export const userCollection = db.collection("User");
export const artistCollection = db.collection("ArtistPage");
export const bookingCollection = db.collection("Booking");
export const ratingCollection = db.collection("Rating");
export const sessionsCollection = db.collection("Sessions");

export let prisma: PrismaClient;
export function connectDB(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
