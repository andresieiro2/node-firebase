import Joi from 'joi';

export const createUserSchema = {
  email: Joi.string()
    .email()
    .required(),
  full_name: Joi.string()
    .required()
    .min(3),
};
