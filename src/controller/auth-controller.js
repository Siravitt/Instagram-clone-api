const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const fs = require("fs");
const { validateEditProfile } = require("../validators/edit-validate");
const { User, Follow } = require("../models");
const cloudinary = require("../utils/cloudinary");
const createError = require("../utils/create-error");
const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validate");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: value.email,
          },
          {
            userName: value.userName,
          },
        ],
      },
    });

    if (user) {
      createError("Username or email is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);

    await User.create(value);

    res.status(201).json({ message: "Register success. Please go to login" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: { email: value.email },
    });

    if (!user) {
      createError("Invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        bio: user.bio,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;
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
        },
        {
          model: User,
          as: "follower",
        },
      ],
      exclude: ["password"],
    });

    res.status(200).json({ user: req.user, follow: follow });
  } catch (err) {
    next(err);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const profilePublicId = req.user.profileImage
      ? cloudinary.getPublicId(req.user.profileImage)
      : null;

    const value = validateEditProfile({
      userName: req.body.userName,
      bio: req.body.bio,
      image: req.file?.path,
    });

    value.userId = req.user.id;

    if (value.image) {
      value.image = await cloudinary.upload(value.image, profilePublicId);
    }
    if (!value.userName) {
      value.userName = req.user.userName;
    }
    if (!value.bio) {
      value.bio = req.user.bio;
    }

    const edit = await User.update(
      {
        profileImage: value.image,
        userName: value.userName,
        bio: value.bio,
      },
      {
        where: { email: req.user.email },
      }
    );
    res.status(200).json({ edit });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
