const express = require('express');
const router = express.Router();
const testResultsController = require('../controllers/testResultsController');
const verifyJWT = require('../middleware/verifyJWT'); // Import verifyJWT

// Routes that do not require authentication
router.post('/', testResultsController.saveTestResult);
router.get('/', testResultsController.getTestResults);

// Routes that require authentication
router.get('/completed-tests/:username', verifyJWT, testResultsController.getCompletedTestIds);

module.exports = router;
