const { Op } = require("sequelize");
const { Follow, User } = require("../models");
const createError = require("../utils/create-error");

exports.createFollow = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.body;
    const isFollow = await Follow.findOne({
      where: { followingId: id, followerId: user.id },
    });
    if (isFollow) {
      createError("You're already follow this user", 400);
    }
    const result = await Follow.create({
      followingId: id,
      followerId: user.id,
    });
    if (!result) {
      createError("Cannot follow this user", 400);
    }
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getIsFollow = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const isFollow = await Follow.findOne({
      where: { followingId: id, followerId: user.id },
    });
    res.status(200).json({ isFollow });
  } catch (err) {
    next(err);
  }
};

exports.deleteFollow = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await Follow.destroy({
      where: {
        followingId: id,
        followerId: user.id,
      },
    });

    res.status(200).json({ message: "Unfollow complete" });
  } catch (err) {
    next(err);
  }
};

exports.getAllFollow = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      createError("Not found", 400);
    }

    const follow = await Follow.findAll({
      where: {
        [Op.or]: [
          {
            followingId: user.id,
          },
          {
            followerId: user.id,
          },
        ],
      },
      include: [
        {
          model: User,
          as: "following",
          attributes: { exclude: ["password"] },
        },
        {
          model: User,
          as: "follower",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({ follow });
  } catch (err) {
    next(err);
  }
};
