const express = require('express');
const { createUser, validateUser } = require('../controllers/UserHandlers');
const { userValidationRules, validate } = require('../validator/validator');
const fetchFoodItems = require('../controllers/FoodDataHandlers');
const router = express.Router();

//user Routes
router.post('/createUser', userValidationRules(), validate, createUser);
router.post('/login', validateUser)

//food Items route
router.get('/foodData', fetchFoodItems)

module.exports = router;