const db = require("../config/connectDb");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await db("employees").select("*");
    res.json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving employees" });
  }
};

exports.createEmployee = async (req, res) => {
  const { emp_id, first_name, last_name, gender } = req.body;
  try {
    const newEmployee = await db("employees").insert({
      emp_id,
      first_name,
      last_name,
      gender,
    });
    res.json(newEmployee);
  } catch (err) {
    console.error("Error creating employee:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the employee" });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await db("employees")
      .where("emp_id", id)
      .select("*")
      .first();
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error retrieving employee:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the employee" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, gender } = req.body;
  try {
    const updatedEmployee = await db("employees")
      .where("emp_id", id)
      .update({ first_name, last_name, gender });

    if (updatedEmployee === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the employee" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await db("employees").where("emp_id", id).del();

    if (deletedEmployee === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the employee" });
  }
};
