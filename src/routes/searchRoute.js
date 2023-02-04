const express = require("express");
const router = express.Router();

const friendController = require("../controller/friend-controller")

router.post("/search-users", friendController.searchFriend)

module.exports = router;
