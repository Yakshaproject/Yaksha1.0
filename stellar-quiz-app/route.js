const express = require('express');
const { checkQuizAndReward } = require('./quizController');

const router = express.Router();

router.post('/submit-quiz', checkQuizAndReward);

module.exports = router;