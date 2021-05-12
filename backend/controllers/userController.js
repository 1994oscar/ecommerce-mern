import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js' 
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body.data;

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
        } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body.data;

    const userExists = await User.findOne({email})
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists!');
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }


});


// @desc    Get User Profile
// @route   POST /api/users/profile
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
    //Access to the global authorized user data req.user._id
    const userId = req.user._id;
    //------------------------------------------------------
    const user = await User.findById(userId);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('User not found');
    }
});


// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    //Access to the global authorized user data req.user._id
    const userId = req.user._id;
   // console.log(userId);
    //-----------------------------------------
    const user = await User.findById(userId);
    console.log(req)
    if(user){
       
        user.name   = req.body.data.name    || user.name;
        user.email  = req.body.data.email   || user.email;
        
        if(req.body.password){
            user.password = req.body.data.password
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    }else{
        res.status(401);
        throw new Error('User not found');
    }
});

export {authUser, registerUser, updateUserProfile, getUserProfile}; 