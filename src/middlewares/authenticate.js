const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");
const { User,Follow } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("You are unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      createError("You are unauthorized", 401);
    }

    // const follow = await Follow.findAll({
    //   where: [{ followingId: user.id, followerId: user.id }],
    // });

    req.user = user;
    // req.follow = follows
    next();
  } catch (err) {
    next(err);
  }
};
