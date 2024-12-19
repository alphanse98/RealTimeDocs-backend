const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/all", employeeController.getAllEmployees);
router.post("/create", employeeController.createEmployee);
router.post("/delete/:id", employeeController.deactivateEmployee);
router.put("/update/:id", employeeController.updateEmployee);

module.exports = router;
