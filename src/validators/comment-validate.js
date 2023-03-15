const Joi = require("joi");
const validate = require("./validate");

const commentSchema = Joi.object({
  comment: Joi.string().trim().required().messages({
    "any.required": "Comment is required",
    "string.empty": "Comment is required",
    "string.base": "Comment must be a string",
  }),
});

exports.validateComment = validate(commentSchema);
