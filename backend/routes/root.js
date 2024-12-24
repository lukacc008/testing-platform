const express = require('express');
const router = express.Router();
const path = require('path');

// Serve the quiz-logo.png image from the 'public' directory
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'quiz-logo.png'));
});

module.exports = router;
