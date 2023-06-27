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
        const { userName, email, password, location } = req.body;
        const user = await User.create({
            userName,
            email,
            password,
            location
        })

        console.log("User Created :", userName);
        res.status(200).json({ ...user, success: true });
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false });
    }
}

//Validate User
const validateUser = async (req, res) => {
    try {
        let email = req.body.email;
        let response = await User.findOne({ email });
        if (!response) {
            return res.status(400).json({ msg: "Email not Registered" });
        }

        if (req.body.password !== response.password) {
            return res.status(400).json({ msg: "incorrect Password" });
        }

        return res.status(200).json({ success: true });

    } catch (err) {

    }
}

module.exports = { fetchData, createUser, validateUser };
