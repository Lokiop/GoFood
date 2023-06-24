const mongoose = require('mongoose')

const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, options);
        console.log("Database Connected :", connect.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;