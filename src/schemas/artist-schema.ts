import Joi from "joi";

export const artistSchema = Joi.object({
  userId: Joi.string().required(),
  artistName: Joi.string().required(),
  coverPicture: Joi.string().uri().required(),
  description: Joi.string().min(5).required(),
  pictures: Joi.array().items(Joi.string().uri()),
  youtubeUrl: Joi.string().uri(),
  spotifyUrl: Joi.string().uri(),
  instagramUrl: Joi.string().uri(),
  soundCloudUrl: Joi.string().uri(),
  location: Joi.object()
    .keys({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array().min(2).max(2).items(Joi.number()).required(),
    })
    .required(),
  allowedArea: Joi.number().min(10),
  genre: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().min(10),
});