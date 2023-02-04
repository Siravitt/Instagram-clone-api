const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const postController = require("../controller/post-controller");

router.patch(
  "/edit-profile",
  upload.single("profileImage"),
  postController.editProfile
);

module.exports = router;
