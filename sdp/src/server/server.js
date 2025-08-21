const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const UserModel = require('./Userschema.js');

const port = 4000;
const Uri =
  'mongodb+srv://Hrushikesh:Hemakumari9@cluster0.lp4reap.mongodb.net/SDP?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
mongoose.connect(Uri, { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Error while connecting database'));
conn.once('open', function () {
  console.log('Connected to database......');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, PATCH, DELETE');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return response.json({ success: false, message: 'User already exists.' });
    }

    const newUser = new UserModel({ email, password: password });

    await newUser.save();
    response.json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.json({ success: false, message: 'User not found.' });
    }

    const isPasswordValid = password === user.password;


    if (isPasswordValid) {
      return response.json({ success: true, message: 'Signin successful.' });
    } else {
      return response.json({ success: false, message: 'Invalid password.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.get('/check-user', async (request, response) => {
  try {
    const { email } = request.body;
    const existingUser = await UserModel.findOne({ email });

    response.json({ userExists: !!existingUser });
  } catch (error) {
    console.error(error);
    response.status(500).json({ userExists: false, error: 'Internal server error.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is started at ${port}`);
});
