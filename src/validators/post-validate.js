const Joi = require("joi");

const validate = require("./validate");

const postImageSchema = Joi.object({
  title: Joi.string().trim(),
  image: Joi.string().trim(),
}).or("title", "image");

exports.validatePostImageSchema = validate(postImageSchema);
