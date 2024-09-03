// controllers/testResultsController.js
const TestResult = require('../model/TestResult');

// Define the function as a const
const saveTestResult = async (req, res) => {
  const { username, email, correctAnswersShare, skippedAnswersShare, wrongAnswersShare } = req.body;

  try {
    const newTestResult = new TestResult({
      username,
      email,
      correctAnswersShare,
      skippedAnswersShare,
      wrongAnswersShare
    });

    await newTestResult.save();

    res.status(200).json({ message: 'Test results saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving test results', error });
  }
};

// Export the function at the bottom
module.exports = { saveTestResult };
