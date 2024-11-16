import { Router } from 'express';
import { createUser, userDetails, userLogin,  userLogout,  userProfileUpdate, verifyUser } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.post('/user/create', createUser);
router.post('/user/verify', verifyUser);
router.post('/user/login', userLogin);

router.get('/user/details',isAuthenticated, userDetails);
router.post('/user/update',isAuthenticated, userProfileUpdate);
router.get('/user/logout',isAuthenticated, userLogout);


export default router