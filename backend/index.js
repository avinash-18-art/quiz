// server.js (complete backend code)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mcq-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("\u2705 MongoDB Connected"))
.catch(err => console.error("\u274C MongoDB connection error:", err));

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Schema
const candidateSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  resumePath: String,
  score: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});
const Candidate = mongoose.model('Candidate', candidateSchema);

// Register Route
app.post('/register', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password || !req.file) {
      return res.status(400).json({ message: "All fields including resume are required." });
    }

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      password,
      resumePath: req.file.path
    });

    await newCandidate.save();
    console.log("\u2705 Registered:", newCandidate);

    res.json({ message: "Registered successfully!", email });
  } catch (err) {
    console.error("\u274C Error in /register:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Correct answers
const correctAnswers = [
  'C', 'B', 'C', 'C', 'B',
  'B', 'B', 'B', 'B', 'C',
  'C', 'C', 'C', 'C', 'B',
  'C', 'C', 'D', 'C', 'C'
];

// Submit Quiz Route
app.post('/submit-quiz', async (req, res) => {
  const { email, answers } = req.body;

  if (!email || !answers || answers.length !== 20) {
    return res.status(400).json({ message: 'Email and 20 answers required' });
  }

  let score = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      score += 5;
    }
  }

  try {
    const candidate = await Candidate.findOneAndUpdate(
      { email },
      { $set: { score: score } },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found by email' });
    }

    console.log("\u2705 Score updated for:", email, "Score:", score);

    const message = score >= 80
      ? `\ud83c\udf89 Congratulations ${candidate.name}, you're selected! (Score: ${score})`
      : `\ud83d\ude22 Sorry ${candidate.name}, you are not selected. (Score: ${score})`;

    res.json({ message, score });
  } catch (err) {
    console.error("\u274C Error in /submit-quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send({ status: "Backend running" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\ud83d\ude80 Server running at http://localhost:${PORT}`);
});
