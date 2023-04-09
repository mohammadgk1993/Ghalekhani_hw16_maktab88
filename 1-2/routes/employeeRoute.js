const express = require("express");
const router = express.Router();
// controllers
const { 
    createEmployee,
    getAllEmployees,
    readEmployee,
    updateEmployee,
    removeEmployee,
    filterEmployee,
    page
 } = require("../controllers/employeeController")

// validators
const { createEmployeeValidator } = require("../middlewares/validators/employeeValidators")

router.get("/page", page);

router.post("/", createEmployeeValidator, createEmployee);
router.get("/all", getAllEmployees);

router.post("/read", readEmployee)

router.patch("/", updateEmployee)

router.delete("/", removeEmployee)

router.get('/:filter', filterEmployee)

module.exports = router;