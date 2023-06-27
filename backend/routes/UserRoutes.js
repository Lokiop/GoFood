const express = require('express');
const { createUser, validateUser } = require('../controllers/handlers');
const { userValidationRules, validate } = require('../validator/validator');
const router = express.Router();

router.post('/createUser', userValidationRules(), validate, createUser);
router.post('/login', validateUser)

module.exports = router;