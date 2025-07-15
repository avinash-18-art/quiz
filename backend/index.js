const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mcq-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const ResultSchema = new mongoose.Schema({
  name: String,
  answers: [String],
  score: Number,
});

const Result = mongoose.model('Result', ResultSchema);


const correctAnswers = [
  'C', 'B', 'C', 'C', 'B',
  'B', 'B', 'B', 'B', 'C',
  'C', 'C', 'C', 'C', 'B',
  'C', 'C', 'D', 'C', 'C'
];


app.post('/submit', async (req, res) => {
  const { name, answers } = req.body;

  if (!name || !answers || answers.length !== 20) {
    return res.status(400).json({ message: 'Invalid submission data' });
  }

  let score = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      score += 5;
    }
  }

  const result = new Result({ name, answers, score });
  await result.save();

  const message = score >= 80
    ? `Congratulations ${name}, You are selected for the next round! Please come for an interview. (Score: ${score})`
    : `Sorry ${name}, you are not selected. Better luck next time. (Score: ${score})`;

  res.json({ message });
});

app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false
  })
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
