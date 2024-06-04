// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const port = 4000;
// const url = "mongodb+srv://pbkale25:Pankaj5151@cluster0.pr4uyu3.mongodb.net/Crud?retryWrites=true&w=majority&appName=Cluster0";

// // // Connect to MongoDB
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));


// // // Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// require('./routes/user.route');
// require('./routes/login.route');

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const DATABASE = "mongodb+srv://pbkale25:Pankaj5151@cluster0.pr4uyu3.mongodb.net/Crud?retryWrites=true&w=majority&appName=Cluster0";

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define another route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Define a POST route
app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  res.json({ message: 'Data received', data: receivedData });
});

// Register user
const User = mongoose.model('User', {
  name: String,
  email: String,
  username: String,
  password: String
});

app.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      username,
      password
    }, 'users');

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login User
const LoginUser = mongoose.model('LoginUser', {
  username: String,
  password: String
}, 'users');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const loginuser = await LoginUser.findOne({ username, password });

  if (loginuser) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
