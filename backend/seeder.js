import mongoose     from 'mongoose'
import dotenv       from 'dotenv'
import colors       from 'colors'
import users        from './data/users.js'
import products     from './data/products.js'
import User         from './models/userModel.js'
import Product      from './models/productModel.js'
import Order        from './models/orderModel.js'
import connectDB    from './config/db.js'

dotenv.config();

connectDB();

const importData = async () => {
    try {
        //Firt we need delete the current data of the database
        await Order.deleteMany();     
        await Product.deleteMany();
        await User.deleteMany();
       


        //createUsers have the all users import data in array format
        const createUsers = await User.insertMany(users);

        const adminUser = createUsers[0]._id; //We caught the admin id user in the first position

        const sampleProducts = products.map(product => {
            //We insert the admin id user in every product
            //The productModel, need this id in every record, in the object user: in productModel
            return {...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        //Firt we need delete the current data of the database
        await Order.deleteMany();     
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

/* -------------------------------------------------------------------------
 process.argv[2] have the arguments that we pass in the npm command
 To execute this we need to create the scipts in the package.json file: 
    ---------------------------------------------
    |"data:import": "node backend/seeder",      |
    |"data:destroy": "node backend/seeder -d"   |
    ---------------------------------------------

Then, we can execute this, typing npm run data:import in the console.
Depends of the command that web typing, the if method detect if the script
contain the -d argument or not. 
--------------------------------------------------------------------------- */

if(process.argv[2] === '-d'){
    destroyData();
}else {
    importData();
}
