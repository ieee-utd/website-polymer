import * as Joi from "joi";

export let LoginSchema = {
  body: Joi.object({
    "email": Joi.string().required(),
    "password": Joi.string().required()
  })
}

export let CreateOfficerUserSchema = {
  body: Joi.object({
    "email": Joi.string().email().trim(),
    "firstName": Joi.string().trim().min(1),
    "lastName": Joi.string().trim().min(1),
    "password": Joi.string().min(8).required(),
    "memberSince": Joi.number().integer().min(1900).max(2100),
    "bioMarkdown": Joi.string(),
    "position": Joi.string()
  }).unknown(false)
}

export let UpdateOfficerUserSchema = {
  body: Joi.object({
    "firstName": Joi.string().trim().min(1),
    "lastName": Joi.string().trim().min(1),
    "bioMarkdown": Joi.string(),
    "position": Joi.string(),
    "memberSince": Joi.number().integer().min(1900).max(2100),
    "permissionLevel": Joi.number().integer().min(1).max(5)
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
