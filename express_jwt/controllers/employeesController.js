const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const data = await Employee.find();
  res.status(200).json(data);
};

const createNewEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }
  const data = await Employee.create({
    firstname: firstname,
    lastname: lastname,
  });
  res.status(201).json(data);
};

const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  const employee = await Employee.findOne({ _id: id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  employee.firstname = firstname;
  employee.lastname = lastname;
  await employee.save();
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  await Employee.findOneAndDelete({ _id: id }).exec();
  res.status(200).json({ msg: "Employee deleted successfully" });
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.status(200).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
