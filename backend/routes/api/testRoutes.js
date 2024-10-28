const express = require("express");
const { checkTestEligibility } = require("../controllers/testResultsController");

const router = express.Router();

// Route to start a test
router.post("/start-test", checkTestEligibility, (req, res) => {
  // Test initiation logic
  res.status(200).json({ message: "Test started!" });
});

module.exports = router;
