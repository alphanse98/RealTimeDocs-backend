const Employee = require("../models/employeeModel");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees", details: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, age, departmentId, isActive, gender, nationality } = req.body;
    const newEmployee = await Employee.create({ name, age, departmentId, isActive, gender, nationality });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: "Failed to create employee", details: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, departmentId, isActive, gender, nationality } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await employee.update({ name, age, departmentId, isActive, gender, nationality });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: "Failed to update employee", details: error.message });
  }
};

exports.deactivateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      const employee = await Employee.findByPk(id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      // Update the isActive field to false
      employee.isActive = false;
      await employee.save(); // Save the updated record
  
      res.status(200).json({ message: "Employee deactivated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to deactivate employee", details: error.message });
    }
  };
  

