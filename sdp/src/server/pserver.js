const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update this with your React app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb+srv://Hrushikesh:Hemakumari9@cluster0.lp4reap.mongodb.net/Learnathon?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model for your data
const YourDataModel = mongoose.model('YourData', {
  title: String,
  preview: String,
  content: String,
  websiteLink: String,
  companyName: String,
  category: String,
  imagePath: String,
  views: { type: Number, default: 0 }, // Add a views field with default value 0
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Choose a destination for uploaded files
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Route to handle saving data
app.post('/api/saveData', upload.single('image'), async (req, res) => {
  try {
    const newData = new YourDataModel({
      title: req.body.title,
      preview: req.body.preview,
      content: req.body.content,
      websiteLink: req.body.websiteLink,
      companyName: req.body.companyName,
      category: req.body.category,
      imagePath: req.file ? req.file.path.replace(/\\/g, '/') : null,
    });

    await newData.save();
    res.status(201).send('Data successfully saved to the database!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle retrieving data
app.get('/api/getData', async (req, res) => {
  try {
    const data = await YourDataModel.find();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle updating view count
app.put('/increaseView/:id', async (req, res) => {
  try {
    const user = await YourDataModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Increment the view count
    user.views += 1;

    // Save the updated user with the incremented view count
    await user.save();

    res.json({ views: user.views });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/getUsers', (req, res)=>{
  YourDataModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

// Serve React build/static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
