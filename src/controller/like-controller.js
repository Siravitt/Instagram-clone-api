const { Like, User } = require("../models");

exports.createLike = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.body;
    const existLike = await Like.findOne({
      where: {
        userId: user.id,
        postId: postId,
      },
    });

    if (existLike) {
      createError("you've already liked this post", 400);
    }

    const newLike = await Like.create({
      userId: user.id,
      postId: postId,
    });

    res.status(200).json({ newLike });
  } catch (err) {
    next(err);
  }
};

exports.deleteLike = async (req, res, next) => {
  try {
    const user = req.user;
    const { postId } = req.params;
    await Like.destroy({
      where: {
        userId: user.id,
        postId: postId,
      },
    });
    res.status(200).json({ message: "Unlike complete" });
  } catch (err) {
    next(err);
  }
};

exports.getAllLike = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const allLike = await Like.findAll({
      where: { postId: postId },
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "password",
              "firstName",
              "lastName",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });

    res.status(200).json({ allLike });
  } catch (err) {
    next(err);
  }
};

