const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected ${mongoose.connection.host}`.bgGreen.white);
    }catch{
        console.log(`Mongodb server Issue ${error}`.bgRed.white);
    }
};

module.exports = connectDB;