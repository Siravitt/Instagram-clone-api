const { Op } = require("sequelize");
const createError = require("../utils/create-error");
const { User, Post, Follow } = require("../models");

exports.searchUser = async (req, res, next) => {
  try {
    const { search } = req.body;
    const user = req.user;
    const newUser = await User.findAll({
      where: {
        userName: {
          [Op.like]: `%${search}%`,
        },
        id: { [Op.ne]: user.id },
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!newUser) {
      res.status(200).json({ message: "User not found" });
    }

    res.status(200).json({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.searchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = await User.findOne({
      where: { id: id },
    });

    if (!newUser) {
      createError("Not found user", 400);
    }

    res.status(200).json({ newUser });
  } catch (err) {
    next(err);
  }
};

exports.searchUserData = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.body.id },
      order: [["createdAt", "DESC"]],
    });
    const follow = await Follow.findAll({
      where: {
        [Op.or]: [
          {
            followingId: req.body.id,
          },
          {
            followerId: req.body.id,
          },
        ],
      },
      include: [
        {
          model: User,
          as: "following",
        },
        {
          model: User,
          as: "follower",
        },
      ],
    });
    res.status(200).json({ posts, follow });
  } catch (err) {
    next(err);
  }
};
