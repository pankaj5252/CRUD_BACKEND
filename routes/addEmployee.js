const express = require('express');
const AddEmployee = require('../models/addEmployee.model');
const authMiddleware = require("../middleware/auth")
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/', authMiddleware, [
    body('fname').notEmpty().withMessage('Please enter first name'),
    body('lname').notEmpty().withMessage('Please enter last name'),
    body('mobile').notEmpty().isNumeric().withMessage('Please enter a valid mobile number'),
    body('email').notEmpty().isEmail().withMessage('Please enter a valid email address'),
    body('address').notEmpty().withMessage('Please enter address'),
    body('age').notEmpty().isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('salary').notEmpty().isNumeric().withMessage('Please enter salary'),
    body('joining_date').notEmpty().withMessage('Please enter joining date'),
    body('retired_date').notEmpty().withMessage('Please enter retired date'),
    body('status').notEmpty().withMessage('Please enter status')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fname, lname, mobile, email, address, age, salary, joining_date, retired_date, status } = req.body;
    const user = req.user;
    try {
        const newEmployee = new AddEmployee({
            fname,
            lname,
            mobile,
            email,
            address,
            age,
            salary,
            joining_date,
            retired_date,
            status,
            user: user._id
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// get employee information with login user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const employees = await AddEmployee.find({ user: req.user._id });
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});


module.exports = router;
