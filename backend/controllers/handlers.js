const mongoose = require('mongoose');
const User = require('../models/UserModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            location
        })

        const response = {
            user,
            success: true,
        }

        console.log("User Created :", userName);
        res.status(200).json(response);
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

        const isPasswordCorrect = await bcrypt.compare(req.body.password, response.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "incorrect Password" });
        }

        const data = {
            user: {
                id: response.id
            }
        }

        const authToken = jwt.sign(data, process.env.JWTSecret)

        return res.status(200).json({ success: true, authToken: authToken });

    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = { fetchData, createUser, validateUser };
