const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    name:String,
    answers:[String],
    score:Number,
    submittedAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Result",resultSchema)