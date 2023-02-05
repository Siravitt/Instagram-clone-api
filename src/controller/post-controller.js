const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const { validatePostImageSchema } = require("../validators/post-validate");
const { Post } = require("../models");

exports.postImage = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file?.path);
    const value = validatePostImageSchema({
      title: req.body.title,
      image: req.file?.path,
    });

    if (req.file?.path) {
      value.image = await cloudinary.upload(value.image, {
        width: 500,
        height: 500,
      });
    }
    value.userId = req.user.id;

    const post = await Post.create({
      title: value.title,
      image: value.image,
      userId: value.userId,
    });

    res.status(200).json({ post });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getHolderPost = async (req, res, next) => {
  try {
    const user = req.user;
    const posts = await Post.findAll({
      where: { userId: user.id },
    });
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};
