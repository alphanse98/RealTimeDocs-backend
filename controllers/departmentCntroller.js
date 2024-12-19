const Department = require("../models/departmentModel");

exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newDepartment = await Department.create({
      name,
      description,
    });

    res.status(201).json({
      message: "Department created successfully.",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create department.",
      error: error.message,
    });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve departments.",
      error: error.message,
    });
  }
};

exports.updateDepartment = async (req, res) => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<< update >>> ");
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log("update >>> ", id, name, description);

    const department = await Department.findByPk(id);

    const updatedDepartment = await department.update({
      name,
      description,
    });

    res.status(200).json({
      message: "Department updated successfully.",
      department: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update department.",
      error: error.message,
    });
  }
};

exports.deleteDepartmentById = async (req, res) => {

  const departmentId = req.params.id;

  if (!departmentId) {
    return res.status(400).send({ message: "Department ID is required" });
  }

  try {
    const [updatedRowCount] = await Department.update(
      { isActive: false }, 
      { where: { id: departmentId } }
    );

    if (updatedRowCount === 0) {
      return res.status(404).send({ message: "Department not found" });
    }

    return res.status(200).send({
      message: "Department deactivated successfully",
      updatedRowCount,
    });
  } catch (error) {
    console.error("Error deactivating department:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};


  

