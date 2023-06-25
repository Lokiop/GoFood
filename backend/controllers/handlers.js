const mongoose = require('mongoose');
const User = require('../models/UserModel')

const fetchData = async () => {
    try {
        const collection = mongoose.connection.db.collection('food_items');
        const data = await collection.find().toArray();
        console.log(data)
    } catch (err) {
        console.log(err);
    }
};

//Create User
const createUser = async (req, res) => {
    try {
        const { name, email, password, location, date } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            location,
            date
        })

        user.success = 'true';
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.json({ success: "false" });
    }
}

module.exports = { fetchData, createUser };
