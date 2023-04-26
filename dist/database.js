"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = exports.sessionsCollection = exports.ratingCollection = exports.bookingCollection = exports.artistCollection = exports.userCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const mongo_uri = process.env.MONGO_URI ?? "undefined";
const mongoClient = new mongodb_1.MongoClient(mongo_uri);
try {
    const connection = async () => {
        await mongoClient.connect();
        console.log("mongodb connected");
    };
    connection();
}
catch (error) {
    console.log(error);
}
const db = mongoClient.db("musichems");
exports.userCollection = db.collection("User");
exports.artistCollection = db.collection("ArtistPage");
exports.bookingCollection = db.collection("Booking");
exports.ratingCollection = db.collection("Rating");
exports.sessionsCollection = db.collection("Sessions");
function connectDB() {
    exports.prisma = new client_1.PrismaClient();
}
exports.connectDB = connectDB;
async function disconnectDB() {
    await exports.prisma?.$disconnect();
}
exports.disconnectDB = disconnectDB;
