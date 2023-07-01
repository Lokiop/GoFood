const mongoose = require('mongoose');

const fetchFoodItems = async (req, res) => {
    try {
        let collection = mongoose.connection.db.collection('food_items');
        const foodItems = await collection.find().toArray();
        collection = mongoose.connection.db.collection('foodCategory');
        const foodCategory = await collection.find().toArray();
        res.send([foodItems, foodCategory])
    } catch (err) {
        console.log(err);
    }
};

module.exports = fetchFoodItems;