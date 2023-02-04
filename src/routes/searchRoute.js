const express = require("express");
const router = express.Router();

const searchController = require("../controller/search-controller")

router.post("/search-users", searchController.searchUser)

module.exports = router;
