const express = require('express')
const taskController = require('../controllers/taskController');
const { taskValidator } = require('../helpers/validators');
const router = require('express').Router()
const verifyToken = require('../middlewares/authMiddleware');

router.get('/tasks', verifyToken, taskController.index)
router.post('/task', verifyToken, taskValidator, taskController.createTask)
router.put('/task/:id', verifyToken, taskValidator, taskController.updateTask)
router.get('/task/:id', verifyToken, taskController.getTask)
router.delete('/task/:id', verifyToken, taskController.deleteTask)

module.exports = router;