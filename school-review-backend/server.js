const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/school-review', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema and Model
const reviewSchema = new mongoose.Schema({
  userId: String,
  occupation: String,
  school: String,
  data: {
    ratings: [Number],
    comments: [String],
    averageRating: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// Routes
app.post('/api/reviews', async (req, res) => {
  const { userId, occupation, school, ratings, comments, averageRating } = req.body;
  const newReview = new Review({ userId, occupation, school, data: { ratings, comments, averageRating } });
  await newReview.save();
  res.status(201).send(newReview);
});

app.get('/api/reviews', async (req, res) => {
  const reviews = await Review.find();
  res.status(200).send(reviews);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
