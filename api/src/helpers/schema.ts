import * as Joi from "joi";

export let LoginSchema = {
  body: Joi.object({
    "email": Joi.string().required(),
    "password": Joi.string().required()
  })
}

export let CreateMemberUserSchema = {
  body: Joi.object({
    "email": Joi.string().email().trim().lowercase().required(),
    "firstName": Joi.string().trim().min(1).required(),
    "lastName": Joi.string().trim().min(1).required(),
    "memberSince": Joi.number().integer().min(1900).max(2100).required(),
    "bioMarkdown": Joi.string().trim().allow(""),
    "position": Joi.string().allow(""),
    "group": Joi.string().required()
  }).unknown(false)
}

export let UpdateMemberUserSchema = {
  body: Joi.object({
    "firstName": Joi.string().trim().min(1),
    "lastName": Joi.string().trim().min(1),
    "bioMarkdown": Joi.string().trim().allow(""),
    "position": Joi.string().trim().allow(""),
    "memberSince": Joi.number().integer().min(1900).max(2100),
    "group": Joi.string()
  }).unknown(false)
}

export let SetInitialPasswordSchema = {
  body: Joi.object({
    "email": Joi.string().lowercase().email().trim().required(),
    "password": Joi.string().min(8).required()
  }).unknown(false)
}

export let RequestPasswordResetSchema = {
  body: Joi.object({
    "email": Joi.string().lowercase().email().trim().required()
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
    "content": Joi.string().trim().min(1).required(),
    "visibleUntil": Joi.date().required(),
    "visibleFrom": Joi.date().required(),
    "tags": Joi.array().items(Joi.string().min(1).lowercase()).required()
  }).unknown(false)
}

export let UpdateAnnouncementSchema = {
  body: Joi.object({
    "title": Joi.string().min(1).max(64),
    "content": Joi.string().trim().min(1),
    "visibleUntil": Joi.date(),
    "visibleFrom": Joi.date(),
    "tags": Joi.array().items(Joi.string().min(1).lowercase())
  }).unknown(false)
}

export let CreateEventSchema = {
  body: Joi.object({
    "title": Joi.string().required().min(1).max(64),
    "content": Joi.string().required(),
    "startTime": Joi.date().required(),
    "endTime": Joi.date().required(),
    "locationName": Joi.string().required(),
    "locationUrl": Joi.string().allow(""),
    "reservationUrl": Joi.string().allow(""),
    "reservationRequired": Joi.boolean().required(),
    "tags": Joi.array().items(Joi.string().min(1)).required(),
    "recurrenceRule": Joi.string().allow(null),
    "recurrenceExceptions": Joi.array().items(Joi.date())
  }).unknown(false)
}

export let UpdateEventSchema = {
  body: Joi.object({
    "title": Joi.string(),
    "content": Joi.string(),
    "startTime": Joi.date(),
    "endTime": Joi.date(),
    "locationName": Joi.string(),
    "locationUrl": Joi.string().allow(""),
    "reservationUrl": Joi.string().allow(""),
    "reservationRequired": Joi.boolean(),
    "tags": Joi.array().items(Joi.string().min(1)),
    "recurrenceRule": Joi.string().allow(null),
    "recurrenceExceptions": Joi.array().items(Joi.date())
  }).unknown(false)
}
