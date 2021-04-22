import mongoose from 'mongoose'
//import dotenv from 'dotenv' 
//import colors from 'colors'
//DB Connection
//dotenv.config()
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline)
        process.exit(1)
    }
}

//connectDB()
export default connectDB