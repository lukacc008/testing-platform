const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  correctAnswersShare: { type: Number, required: true },
  skippedAnswersShare: { type: Number, required: true },
  wrongAnswersShare: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = TestResult;
