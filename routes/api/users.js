const express = require("express");
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const {
  getAllUsers,
  deleteUser,
  getUser,
} = require("../../controllers/userController");
const ROLE_LIST = require("../../config/roleList");

router
  .route("/")
  .get(verifyRoles(ROLE_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLE_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLE_LIST.Admin), getUser);

module.exports = router;
