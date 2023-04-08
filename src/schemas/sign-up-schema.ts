import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().min(4).required(),
  businessName: Joi.string().min(4).required(),
  pictures: Joi.array().items(Joi.string().uri()),
  description: Joi.string().min(5).required(),
  address: Joi.string().min(5).required(),
});
