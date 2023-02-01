const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const postController = require("../controller/post-controller");
const authenticate = require("../middlewares/authenticate");

router.post(
  "/editProfile",
  upload.single("image"),
  postController.editProfile
);

module.exports = router;
