const mongoose = require('mongoose');

const addEmployeeSchema = new mongoose.Schema({
    fname: { type: String, required: [true, 'First name is required'] },
    lname: { type: String, required: [true, 'Last name is required'] },
    mobile: { type: Number, required: [true, 'Mobile number is required'] },
    email: { type: String, required: [true, 'Email address is required'] },
    address: { type: String, required: [true, 'Address is required'] },
    age: { type: Number, required: [true, 'Age is required'], min: [18, 'Age must be at least 18'] },
    salary: { type: Number, required: [true, 'Salary is required'] },
    joining_date: { type: String, required: [true, 'Joining date is required'] },
    retired_date: { type: String, required: [true, 'Retired date is required'] },
    status: { type: String, required: [true, 'Status is required'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User reference is required'] }
}, { collection: 'employees' });

const AddEmployee = mongoose.model('AddEmployee', addEmployeeSchema);

module.exports = AddEmployee;
