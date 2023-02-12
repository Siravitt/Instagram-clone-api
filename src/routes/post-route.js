const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const postController = require("../controller/post-controller");

router.post("/post-image", upload.single("image"), postController.createPost);
router.get("/get-all-post", postController.getAllPostByFollowing);
router.get("/get-profile-post", postController.getProfilePost);
router.get("/get-post-id/:postId", postController.getPostById);
router.delete("/delete-post/:postId")

module.exports = router;
