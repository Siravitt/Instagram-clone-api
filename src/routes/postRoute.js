const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const postController = require("../controller/post-controller");

router.post("/post-image", upload.single("image"), postController.postImage);
router.get("/holder-image", postController.getHolderPost);

module.exports = router;
