const mongoose = require('mongoose');

const addEmployeeSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },  
    age: { type: Number, required: true },
    salary: { type: Number, required: true },
    joining_date: { type: String, required: true },
    retired_date: { type: String, required: true }, 
    status: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { collection: 'employees' });

const AddEmployee = mongoose.model('AddEmployee', addEmployeeSchema);

module.exports = AddEmployee;
