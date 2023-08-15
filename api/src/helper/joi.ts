import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).max(45).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
export const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(45).required(),
  name: Joi.string().alphanum().min(3).max(45).required(),
  profilePic: Joi.string().alphanum().min(3).max(300).required(),
  coverPic: Joi.string().alphanum().min(3).max(100).required(),
  website: Joi.string().alphanum().min(3).max(45).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
export const loginSchema = Joi.object({
  password: Joi.string().min(8).max(45).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
});
export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(8).max(45).required(),
  token: Joi.any(),
});
export const addCommentSchema = Joi.object({
  postId: Joi.string().min(1).required(),
  desc: Joi.string().min(1).max(200).required(),
});
