import express from 'express'
import {    authUser, 
            registerUser, 
            updateUserProfile, 
            getUserProfile, 
            getUsers,
            deleteUser,
            getUserById,
            updateUser } from '../controllers/userController.js'
import protect, {isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
      .post(registerUser)
      .get(protect, isAdmin, getUsers);
router.route('/login').post(authUser);
router.route('/profile')
      .get(protect, getUserProfile)
      .put(protect, updateUserProfile);
router.route('/:id')
            .get(protect, isAdmin, getUserById)
            .put(protect, isAdmin, updateUser)
            .delete(protect, isAdmin, deleteUser);

export default router