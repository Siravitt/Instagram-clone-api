const Joi = require("joi");

const validate = require("./validate");

const editProfileSchema = Joi.object({
  userName: Joi.string().trim(),
  bio: Joi.string().trim(),
  image: Joi.string().trim(),
}).or("userName", "image","bio");

exports.validateEditProfile = validate(editProfileSchema);
