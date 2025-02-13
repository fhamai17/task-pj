const express = require('express')
const userController = require('../controllers/userController');
const router = require('express').Router()
const verifyToken = require('../middlewares/authMiddleware');

router.get('/users', verifyToken, userController.index)
router.get('/profile', verifyToken, userController.profile)

module.exports = router;