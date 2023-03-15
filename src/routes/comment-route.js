const express = require("express");
const router = express.Router();

const commentController = require("../controller/comment-controller");

router.get("/get-comment/:postId", commentController.getCommentByPostId);
router.post("/create-comment", commentController.createComment);

module.exports = router;
