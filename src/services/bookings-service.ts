import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";
import { unauthorizedError } from "@/errors/unauthorized-error";
import artistsRepository from "@/repositories/artists-repository";
import bookingsRepository from "@/repositories/bookings-repository";
import { BookingServiceParams } from "@/utils/types";

async function post(data: BookingServiceParams) {
  const artist = await artistsRepository.findById(data.artistPageId);
  if (!artist) throw notFoundError();
  const bookingExists = await bookingsRepository.findByDateAndArtistId(
    data.date,
    data.artistPageId
  );
  if (bookingExists) throw conflictError();
  if (artist.bookedDates.includes(data.date)) throw conflictError();

  const createBooking = await bookingsRepository.create(
    data.userId,
    data.artistPageId,
    data.date
  );
  const bookedDates = [...artist.bookedDates, data.date];
  await artistsRepository.updateBookedDates(artist.id, bookedDates);

  return createBooking;
}

async function findByUser(userId: string) {
  return await bookingsRepository.findByUserId(userId);
}

async function findByArtist(artistId: string, userId: string) {
  const artist = await artistsRepository.findById(artistId);
  if (!artist) throw notFoundError();
  if (artist.userId !== userId) throw unauthorizedError();

  return await bookingsRepository.findByArtistId(artistId);
}

const bookingService = {
  post,
  findByUser,
  findByArtist
};

export default bookingService;
