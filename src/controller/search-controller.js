const { Op } = require("sequelize");
const { User } = require("../models");

exports.searchUser = async (req, res, next) => {
  const { search } = req.body;
  console.log(search);
  const user = req.user;
  const newUser = await User.findAll({
    where: {
      userName: {
        [Op.like]: `%${search}%`,
      },
      id: { [Op.not]: user.id },
    },
    attributes: {
      exclude: ["password"],
    },
  });

  if (!newUser) {
    res.status(200).json({ message: "No result" });
  }

  res.status(200).json({ newUser });
};
