const express = require("express");
const router = express.Router();

const searchController = require("../controller/search-controller");

router.post("/search-users", searchController.searchUser);
router.post("/search-user-posts", searchController.searchUserData);
router.get("/search-user-id/:id", searchController.searchById);


module.exports = router;
