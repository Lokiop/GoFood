const mongoose = require('mongoose');
const User = require('../models/UserModel')
const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('email', "Invalid Email").isEmail(),
        body('userName', "Min length should be 5").isLength({ min: 5 }),
        body('password', "Min length should be 5").isLength({ min: 5 }),
        body('email').custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error("Email Already in Use");
            }
        })
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const Errors = [];
    errors.array().map(err => {
        Errors.push({ [err.path]: err.msg });
    })

    // Send a response indicating validation errors
    return res.status(422).json({ errors: Errors });
};

module.exports = { userValidationRules, validate };
