const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected...${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB