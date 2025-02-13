const express = require('express')
const authController = require('../controllers/authController');
const { loginValidator, registerValidator } = require('../helpers/validators');
const router = require('express').Router()

router.post('/login', loginValidator, authController.login)
router.post('/register', registerValidator, authController.register)

module.exports = router;