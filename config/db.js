const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db);

        console.log("MongoDB connected...");
    } catch(err) {
        console.log(err.message);
        // Exit process with failure
        process.exit();
    }
}

module.exports = connectDB;