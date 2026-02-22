const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')

router.get('/', taskController.getTasks);
router.post('/simulate', taskController.simulateTasks);

module.exports = router;