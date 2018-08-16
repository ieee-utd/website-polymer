import * as Joi from "joi";

export let LoginSchema = {
  body: Joi.object({
    "email": Joi.string().required(),
    "password": Joi.string().required()
  })
}

export let CreateUserSchema = {
  body: Joi.object({
    "email": Joi.string().email().trim(),
    "firstName": Joi.string().trim().min(1),
    "lastName": Joi.string().trim().min(1)
  }).unknown(false)
}

export let UpdateUserSchema = {
  body: Joi.object({
    "email": Joi.string().email().trim(),
    "firstName": Joi.string().trim().min(1),
    "lastName": Joi.string().trim().min(1)
  }).unknown(false)
}

export let SetInitialPasswordSchema = {
  body: Joi.object({
    "email": Joi.string().email().trim().required(),
    "password": Joi.string().required(),
    "newPassword": Joi.string().min(8).required()
  }).unknown(false)
}

export let ChangePasswordSchema = {
  body: Joi.object({
    "password": Joi.string().required(),
    "newPassword": Joi.string().min(8).required()
  }).unknown(false)
}
