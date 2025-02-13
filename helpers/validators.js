const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

const loginValidator = [
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.')
]

const registerValidator = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid Email.').custom(async value => {
        const users = await User.find({email : value});
        if (users.length > 0) {
            throw new Error('E-mail already in use');
        }
    }),
    body('username').notEmpty().withMessage('Username is required.')
        .isLength({ min: 6 }).withMessage('Username must be at least 6 characters long.').custom(async value => {
            const users = await User.find({username : value});
            if (users.length > 0) {
                throw new Error('Username already in use');
            }
        }),
    body('password').notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('confirm_password').notEmpty().withMessage('Confirm Password is required.').custom(async (value, {req}) => {
        if (req.body.password !== value) {
            throw new Error('Confirm password and password do not match.');
        }
    }),
]

const taskValidator = [
    body('title').notEmpty().withMessage('Title is required.'),
    body('description').notEmpty().withMessage('Description is required.'),
    body('due_date').notEmpty().withMessage('Date is required.'),
    body('user_id').notEmpty().withMessage('User is required.'),
    body('status').notEmpty().withMessage('Status is required.'),
    body('priority').notEmpty().withMessage('Priority is required.'),
]

module.exports = { loginValidator, registerValidator, taskValidator }