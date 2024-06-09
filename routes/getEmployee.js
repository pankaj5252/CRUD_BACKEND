const express = require('express');
const AddEmployee = require('../models/addEmployee.model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await AddEmployee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

module.exports = router;
