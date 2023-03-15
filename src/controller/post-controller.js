const fs = require("fs");
const { Op } = require("sequelize");
const cloudinary = require("../utils/cloudinary");
const { validatePostImageSchema } = require("../validators/post-validate");
const { Post, Follow, User, Like, Comment } = require("../models");
const createError = require("../utils/create-error");

exports.createPost = async (req, res, next) => {
  try {
    const value = validatePostImageSchema({
      title: req.body.title,
      image: req.file?.path,
    });

    if (req.file?.path) {
      value.image = await cloudinary.upload(value.image);
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

exports.getAllPostByFollowing = async (req, res, next) => {
  try {
    const user = req.user;
    const following = await Follow.findAll({
      where: { followerId: user.id },
    });
    const friendId = following.map((el) => el.followingId);

    const allPosts = await Post.findAll({
      where: {
        userId: {
          [Op.or]: [user.id, ...friendId],
        },
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Like,
        },
      ],
    });
    res.status(200).json({ allPosts });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: {
        id: postId,
      },
      include: [
        {
          model: Like,
        },
        {
          model: User,
        },
      ],
    });

    if (!post) {
      createError("Not found", 400);
    }

    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.getProfilePost = async (req, res, next) => {
  try {
    const user = req.user;

    const posts = await Post.findAll({
      where: {
        userId: user.id,
      },
    });

    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    const { userId } = req.params;

    console.log(userId, user.id);

    if (+userId !== +user.id) {
      createError("Cannot delete this post", 400);
    }

    await Post.destroy({
      where: {
        id: postId,
      },
    });

    res.status(200).json({ message: "Delete complete" });
  } catch (err) {
    next(err);
  }
};
