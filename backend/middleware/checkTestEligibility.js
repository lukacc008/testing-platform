const TestResult = require("../model/TestResult");

// Middleware to check if user can start the test
const checkTestEligibility = async (req, res, next) => {
  const { username, testId } = req.body;
  const { roles } = req.user;

  try {
    // Check if user is admin, allow bypass
    if (roles.includes("admin")) {
      return next(); // Admins can take the test anytime
    }

    // Check if the user has already completed the test
    const testResult = await TestResult.findOne({ username, testId });

    if (testResult) {
      return res.status(403).json({ message: "You have already taken this test." });
    }

    // If no test result, allow user to proceed
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking test eligibility", error });
  }
};

module.exports = { checkTestEligibility };
