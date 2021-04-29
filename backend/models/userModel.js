import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

//We create the Schema caracterist
const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamp: true
});

userSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password)
}
//We build the User model
const User = mongoose.model('User', userSchema);

export default User; 