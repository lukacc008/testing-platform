const TestResult = require("../model/TestResult");

// Function to check if a test result exists for a user
const checkTestResultExists = async (req, res) => {
  const { username, testId } = req.body;

  try {
    const testResult = await TestResult.findOne({ username, testId });
    if (testResult) {
      return res.status(200).json({ message: "Test already completed", exists: true });
    }

    res.status(200).json({ message: "No test result found", exists: false });
  } catch (error) {
    res.status(500).json({ message: "Error checking test result", error });
  }
};

// Function to save test results
const saveTestResult = async (req, res) => {
  const { username, email, correctAnswersShare, skippedAnswersShare, wrongAnswersShare, testId } = req.body;

  try {
    const newTestResult = new TestResult({ username, email, correctAnswersShare, skippedAnswersShare, wrongAnswersShare, testId });
    await newTestResult.save();
    res.status(200).json({ message: "Test results saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving test results", error });
  }
};

// Fetch all test results function
const getTestResults = async (req, res) => {
  try {
    const testResults = await TestResult.find({});
    res.status(200).json(testResults);
  } catch (error) {
    res.status(500).json({ message: "Error fetching test results", error });
  }
};

// Delete test result by ID
const deleteTestResult = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Test result ID is required." });
  }

  try {
    const result = await TestResult.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Test result not found." });
    }

    res.status(200).json({ message: "Test result deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting test result", error });
  }
};

// New function to get all completed test IDs for a user
const getCompletedTestIds = async (req, res) => {
  const { username } = req.params;

  try {
    const completedTests = await TestResult.find({ username }, "testId");
    const testIds = completedTests.map(result => result.testId);
    res.status(200).json(testIds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching completed test IDs", error });
  }
};

module.exports = { saveTestResult, getTestResults, checkTestResultExists, getCompletedTestIds, deleteTestResult };
