import Joi from "joi";

export const SignUpUserSchema = Joi.object().keys({
  id: Joi.string().required().min(5).max(255),
  password: Joi.string().required().min(5).max(255),
  name: Joi.string().required().min(5).max(255),
});

export const LoginUserSchema = Joi.object().keys({
  id: Joi.string().required().min(5).max(255),
  password: Joi.string().required().min(5).max(255),
});