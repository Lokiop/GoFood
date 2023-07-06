const express = require('express');
const { createUser, validateUser } = require('../controllers/UserHandlers');
const { userValidationRules, validate } = require('../validator/validator');
const fetchFoodItems = require('../controllers/FoodDataHandlers');
const createOrder = require('../controllers/OrdersHandler');
const router = express.Router();

//user Routes
router.post('/createUser', userValidationRules(), validate, createUser);
router.post('/login', validateUser)

//food Items route
router.get('/foodData', fetchFoodItems)

//Orders Route
router.post('/order', createOrder);

module.exports = router;