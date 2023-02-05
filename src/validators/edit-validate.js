const Joi = require("joi");

const validate = require("./validate");

const editProfileSchema = Joi.object({
  userName: Joi.string().trim(),
  image: Joi.string().trim(),
}).or("userName", "image");

exports.validateEditProfile = validate(editProfileSchema);
