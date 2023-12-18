import express from 'express';
import  Colors  from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/Db.js'
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';

//config
dotenv.config();

//db config
connectDb();


//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('api/v1/category', categoryRoutes);


//rest api
app.get('/', (req, res) => {
    res.send({
        message : 'Welcome',
    });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);
});