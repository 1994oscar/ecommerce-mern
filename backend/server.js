import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import {notFound, errorHandler} from './middleware/middlewareHandler.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

connectDB();

const app = express();

/**  Acept Json Data in the body Request */ 
app.use(express.json());

/** ---       Routes              --- */
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes); 
app.use('/api/users', userRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


if(process.env.NODE_ENV === 'production'){
    /** ---      Production Route       --- */
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 
        'frontend', 'build', 'index.html')));
} else{
    /** ---      Develop Route          --- */
        app.get('/', (req, res) => {
            res.send('API is running...');
        });
}
 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold.underline));