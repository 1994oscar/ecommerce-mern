import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/middlewareHandler.js'
import connectDB from './config/db.js'

//We need to import the Routes App, to bring access to the backend
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

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

//--- Index Route -------------------
app.get('/', (req, res) => {
    res.send('API is running...');
});
//-----------------------------------

//--- Routes by Module ------------------ 

//--- Products Routes ------------
app.use('/api/products', productRoutes); // -> Products Module.

//--- Users & Auth Routes ------------
app.use('/api/users', userRoutes); // Auth & User Module. 
//--- End Routes by Modules ----------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold.underline));