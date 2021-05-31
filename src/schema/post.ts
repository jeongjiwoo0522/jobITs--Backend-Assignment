import Joi from "joi";

export const UploadPostSchema = Joi.object().keys({
  title: Joi.string().required().min(1).max(255),
  content: Joi.string().required().min(1).max(255),
});

export const PatchPostSchema = Joi.object().keys({
  title: Joi.string().optional().min(1).max(255),
  content: Joi.string().optional().min(1).max(255),
})
.or("title", "content");

export const PathParamSchema = Joi.object().keys({
  postId: Joi.string().required().min(1).max(255),
});