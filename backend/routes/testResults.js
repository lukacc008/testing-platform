const express = require("express");
const router = express.Router();
const testResultsController = require("../controllers/testResultsController");
const verifyJWT = require("../middleware/verifyJWT");

// Routes that do not require authentication
router.post("/", testResultsController.saveTestResult);
router.get("/", testResultsController.getTestResults);

// Route to delete a test result by ID
router.delete("/:id", testResultsController.deleteTestResult);

// Routes that require authentication
router.get(
  "/completed-tests/:username",
  testResultsController.getCompletedTestIds
);

module.exports = router;
