const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

login = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validator Unprocessable Entity!',
            errors: errors.array()
        });
    }

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid user or password.' });
        }

        const result = bcrypt.compareSync(password, user.password);
        if (!result) {
            return res.status(400).json({ success: false, message: 'Invalid user or password.' });
        }

        const token = jwt.sign({ id: user._id, username }, process.env.SECRET_KEY, { expiresIn: '2h' });
        return res.cookie('access_token', token).json({
            success: true,
            message: 'Login Successfully.',
            access_token: token
          });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

register = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: 'Validator Unprocessable Entity!',
            errors: errors.array()
        });
    }

    try {
        const { name, email, username, password } = req.body;
        const hash = bcrypt.hashSync(password, salt);
        const user = await User.create({
            name,
            email,
            username,
            password: hash
        })

        return res.status(201).json({ success: true, message: 'Registered successfully.', data: user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = { login, register }