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
    "position": Joi.string(),
    "permissionLevel": Joi.number().integer().min(1).max(5).required()
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

export let CreateAnnouncementSchema = {
  body: Joi.object({
    "title": Joi.string().required().min(1).max(64),
    "content": Joi.string(),
    "visibleUntil": Joi.date().required()
  }).unknown(false)
}

export let UpdateAnnouncementSchema = {
  body: Joi.object({
    "title": Joi.string().min(1).max(64),
    "content": Joi.string(),
    "visibleUntil": Joi.date()
  }).unknown(false)
}

export let CreateEventSchema = {
  body: Joi.object({
    "title": Joi.string().required().min(1).max(64),
    "content": Joi.string(),
    "startTime": Joi.date().required(),
    "endTime": Joi.date().required(),
    "locationName": Joi.string(),
    "locationUrl": Joi.string(),
    "reservationLink": Joi.string(),
    "reservationRequired": Joi.boolean().required()
  }).unknown(false)
}

export let UpdateEventSchema = {
  body: Joi.object({
    "title": Joi.string(),
    "content": Joi.string(),
    "startTime": Joi.date(),
    "endTime": Joi.date(),
    "locationName": Joi.string(),
    "locationUrl": Joi.string(),
    "reservationLink": Joi.string(),
    "reservationRequired": Joi.boolean()
  }).unknown(false)
}
