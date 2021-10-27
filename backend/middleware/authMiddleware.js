import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler( async (req, res, next) => {
    let token;

    //Verify ih the Header request has the Authorization token and start with Bearer
    let requestHeaderToken = req.headers.authorization ?  
                             req.headers.authorization.startsWith('Bearer') ?
                             req.headers.authorization.split(' ')[1] : '' : '';
    
    
    if(requestHeaderToken){
        try {
            token = requestHeaderToken;

            //Verify the Header request token with the Secret key in .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //We pass all the user data to the request.
            //This bring to all the protected routes, the user information.
            //We can acces to this information by req.user._id for example
            req.user = await User.findById(decoded.id).select('-passwaord');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized, token fail');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}); 

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export default protect;