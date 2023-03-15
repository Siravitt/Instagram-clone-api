const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const authController = require("../controller/auth-controller");
const authenticate = require("../middlewares/authenticate");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticate, authController.getMe);
router.patch(
  "/edit-profile",
  authenticate,
  upload.single("profileImage"),
  authController.editProfile
);

module.exports = router;
