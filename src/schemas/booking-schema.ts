import Joi from "joi";

export const bookingSchema = Joi.object({
    artistPageId: Joi.string(),
    date: Joi.string().isoDate()
})