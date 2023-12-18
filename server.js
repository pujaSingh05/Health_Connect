const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const  connectDB  = require('./config/Db');
const path = require('path');

//dotenv congit

dotenv.config();

//mongodb connection
connectDB();

//rest object
const app= express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))


//rotes
app.use('/api/v1/user', require('./routes/userRoute'));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})
//listen port
const port = process.env.PORT || 8050
app.listen(port , () => {
    console.log(`Server is running  on ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
});