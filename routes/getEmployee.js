const express = require('express');
const AddEmployee = require('../models/addEmployee.model');
const router = express.Router();
const authMiddleware = require("../middleware/auth")


router.get('/', async (req, res) => {
    try {
        const employees = await AddEmployee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

router.get('/count', authMiddleware, async (req, res) => {
    try {
        const count = await AddEmployee.countDocuments({ user: req.user._id });
        res.status(200).json({ count });
        console.log(count);
    } catch (error) {
        console.error('Error getting employees count:', error);
        res.status(500).json({ error: 'Error getting employees count' });
    }
});

module.exports = router;
