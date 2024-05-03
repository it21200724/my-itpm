const router = require('express').Router();
const Employee = require('../models/Employee');

// Add a new employee
router.route('/add').post(async (req, res) => {
  const { fname, lname, position, gender, age, contact } = req.body;

  const newEmployee = new Employee({
    fname,
    lname,
    position,
    gender,
    age,
    contact,
  });

  try {
    await newEmployee.save();
    res.json({ message: 'Employee added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding employee' });
  }
});

// Get all employees
router.route('/').get((req, res) => {
  Employee.find()
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// Get an employee by ID
router.route('/get/:id').get(async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      res.status(404).json({ status: 'Employee not found' });
    } else {
      res.json(employee);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Error in Fetching', error: err.message });
  }
});

// Update an employee by ID
router.route('/update/:id').put(async (req, res) => {
  const employeeId = req.params.id;
  const { fname, lname, position, gender, age, contact } = req.body;

  const updateEmployee = {
    fname,
    lname,
    position,
    gender,
    age,
    contact,
  };
  try {
    await Employee.findByIdAndUpdate(employeeId, updateEmployee);
    res.status(200).json({ status: 'Employee Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Error in Updating', error: err.message });
  }
});

// Delete an employee by ID
router.route('/delete/:id').delete(async (req, res) => {
  const employeeId = req.params.id;

  try {
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json({ status: 'Employee Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Error in Deleting', error: err.message });
  }
});

module.exports = router;
