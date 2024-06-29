const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const DATABASE_URI = process.env.DATABASE ;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use routes
const userRoutes = require('./routes/user.route');
const loginRoutes = require('./routes/login.route');
const addEmployee = require('./routes/addEmployee');
const getEmployee = require("./routes/getEmployee");

app.use('/users', userRoutes);
app.use('/register', userRoutes);
app.use('/login', loginRoutes);
app.use('/addEmployee', addEmployee);
app.use('/api', getEmployee);
app.use('/employees', addEmployee);
app.use('/allEmployees',getEmployee);
app.use('/deleteEmployees:id',getEmployee);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
