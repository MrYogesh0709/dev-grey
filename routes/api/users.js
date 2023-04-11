const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const {
  getAllUsers,
  deleteUser,
  getUser,
} = require("../../controllers/userController");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
