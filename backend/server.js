import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'
import {notFound, errorHandler} from './middleware/middlewareHandler.js'
import connectDB from './config/db.js'

//We need to import the Routes App, to bring access to the backend
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

//We call the .env file, to access to all the enviroment variables
//--- Database Connection -----------
dotenv.config();
connectDB();
//-----------------------------------  

//--- Express Framework Init --------
const app = express();
//-----------------------------------

//--- Acept Json Data in the body Request --
app.use(express.json());
//------------------------------------------


//--- Routes by Module ------------------ 

//--- Products Routes ------------
app.use('/api/products', productRoutes); // -> Products Module.

//--- Order Routes ------------
app.use('/api/orders', orderRoutes); // -> Order Module.

//--- Users & Auth Routes ------------
app.use('/api/users', userRoutes); // Auth & User Module. 
//--- End Routes by Modules ----------------

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 
        'frontend', 'build', 'index.html')));
} else{
    //--- Index Route -------------------
        app.get('/', (req, res) => {
            res.send('API is running...');
        });
    //-----------------------------------
}
 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold.underline));