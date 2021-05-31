import Joi from "joi"
import { invalidParmaterException } from "../exception";
import { BusinessLogic } from "../interface";

type ValidationRequest = <T>(schema: Joi.ObjectSchema<T>, type: "params" | "body") => BusinessLogic;

const validationRequest: ValidationRequest = <T>(schema: Joi.ObjectSchema<T>, type: "params" | "body") => (req, res, next) => {
  const { error } = schema.validate(req[type]);
  error ? next(invalidParmaterException) : next();
}

export default validationRequest;
