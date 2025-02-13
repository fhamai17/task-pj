const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

router.get('/profile', (req, res) => {
    res.render('profile');
})

module.exports = router;