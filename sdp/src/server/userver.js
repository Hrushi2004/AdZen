const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3002; // You can change this to your desired port

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'YOUR_CONNECTION_STRING' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://Hrushikesh:Hemakumari9@cluster0.lp4reap.mongodb.net/Learnathon?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for your data
const cardSchema = new mongoose.Schema({
    title: String,
    preview: String,
    content: String,
    websiteLink: String,
    companyName: String,
    catogary: String,
});

// Create a model based on the schema
const Card = mongoose.model('Card', cardSchema);

// API endpoint to get cards data
app.get('/api/getCardsData', async (req, res) => {
    try {
      const cardsData = await Card.find();
      res.json(cardsData);
    } catch (error) {
      console.error('Error fetching cards data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
