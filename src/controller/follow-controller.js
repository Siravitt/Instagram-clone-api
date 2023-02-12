const { Follow } = require("../models");
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
