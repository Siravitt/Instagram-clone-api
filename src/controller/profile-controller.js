const fs = require("fs");
const { validateEditProfile } = require("../validators/post-validate");
const cloudinary = require("../utils/cloudinary");
const { User } = require("../models");

exports.editProfile = async (req, res, next) => {
  try {
    const value = validateEditProfile({
      userName: req.body.userName,
      image: req.file?.path,
    });

    if (req.file?.path) {
      value.image = await cloudinary.upload(value.image, {
        width: 500,
        height: 500,
      });
    }
    value.userId = req.user.id;

    const edit = await User.update(
      { profileImage: value.image, userName: value.userName },
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
