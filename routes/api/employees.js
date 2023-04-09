const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLE_LIST = require("../../config/roleList");

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLE_LIST.Admin), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
