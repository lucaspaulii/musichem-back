import { ArtistPage, Booking, User } from "@prisma/client";

export type ArtistCard = {
  _id: String;
  artistName: String;
  coverPicture: String;
  genre: String;
  type: String;
  price: Number;
  distance: Number;
  rating: Number;
};

export type SignInParams = Pick<User, "email" | "password">;

export type CreateArtistParams = Omit<ArtistPage, "id" | "ratings" | "bookedDates">

export type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

export type CreateUserParams = Pick<
  User,
  | "email"
  | "password"
  | "address"
  | "businessName"
  | "name"
  | "pictures"
  | "description"
>;

export type CreateBookingParams = Pick<Booking, "artistPageId" | "date">;

export type BookingServiceParams = Pick<Booking, "artistPageId" | "date" | "userId">