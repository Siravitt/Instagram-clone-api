const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const profileController = require("../controller/profile-controller");

router.patch(
  "/edit-profile",
  upload.single("profileImage"),
  profileController.editProfile
);

module.exports = router;
