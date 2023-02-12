const express = require("express");
const router = express.Router();

const likeController = require("../controller/like-controller");

router.post("/create-like", likeController.createLike);
router.delete("/delete-like/:postId", likeController.deleteLike);
router.get("/get-all-like/:postId", likeController.getAllLike);

module.exports = router;
