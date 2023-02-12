const express = require("express");
const router = express.Router();

const followController = require("../controller/follow-controller")

router.get("/is-follow/:id", followController.getIsFollow);
router.post("/create-follow", followController.createFollow);
router.delete("/delete-follow/:id", followController.deleteFollow);

module.exports = router;
