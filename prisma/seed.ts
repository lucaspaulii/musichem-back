import { ArtistPage, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { ObjectId, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongo_uri: string = process.env.MONGO_URI ?? "undefined";

const prisma = new PrismaClient();

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

const artistCollection = db.collection("ArtistPage");

async function main() {
  const users: User[] = [
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
    {
      id: new ObjectId().toString(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      businessName: faker.random.word(),
      password: faker.internet.password(),
      hasArtistPage: true,
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      description: faker.lorem.paragraph(),
      bookedDates: [],
      address: `${faker.address.streetAddress()} ${faker.address.city()}`,
    },
  ];
  const artistPages: ArtistPage[] = [
    {
      id: new ObjectId().toString(),
      userId: users[0].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      ratings: [],
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[1].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[2].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[3].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[4].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[5].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[6].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[7].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
    {
      id: new ObjectId().toString(),
      userId: users[8].id,
      artistName: faker.music.songName(),
      coverPicture: faker.image.people(640, 480, true),
      description: faker.lorem.text(),
      bookedDates: [],
      pictures: [
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
        faker.image.nightlife(640, 480, true),
      ],
      ratings: [],
      location: {
        type: "Point",
        coordinates: [
          Number(faker.finance.amount(-48.7, -48.4, 6)),
          Number(faker.finance.amount(-27.7, -27.5, 6)),
        ],
      },
      allowedArea: 500000,
      genre: "ROCK",
      type: "BAND",
      price: Number(faker.commerce.price(500, 2000, 0)),
      youtubeUrl: "https://www.youtube.com/coldplay",
      spotifyUrl: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      soundCloudUrl: "https://soundcloud.com/coldplay",
      instagramUrl: "https://www.instagram.com/coldplay/",
    },
  ];
  await prisma.user.createMany({
    data: users,
  });
  await prisma.artistPage.createMany({
    data: artistPages,
  });
  artistCollection.createIndex({ location: "2dsphere" });

  console.log("Seeding finished");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await mongoClient.close();
  });
