const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentCntroller");

router.get("/all", departmentController.getAllDepartments);
router.post("/create", departmentController.createDepartment);
router.post("/delete/:id", departmentController.deleteDepartmentById);
router.put("/update/:id",departmentController.updateDepartment );

module.exports = router;

