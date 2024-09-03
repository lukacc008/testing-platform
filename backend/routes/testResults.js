const express = require('express');
const router = express.Router();
const testResultsController = require('../controllers/testResultsController');

router.post('/', testResultsController.saveTestResult);

module.exports = router;