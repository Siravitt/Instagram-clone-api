const { Op } = require("sequelize");
const { User } = require("../models");
const createError = require("../utils/create-error");

exports.searchUser = async (req, res, next) => {
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
};

exports.searchIdUser = async (req, res, next) => {
  const { id } = req.body;
  const user = req.user;

  if (id === user.id) {
    createError("Cannot search this id");
  }
  const newUser = await User.findOne({
    where: { id: id },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!newUser) {
    res.status(200).json("User not found");
  }

  res.status(200).json({ newUser });
};
