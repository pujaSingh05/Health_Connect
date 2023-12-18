import express from 'express';
import authController, {RegisterController, LoginController, TestController,forgotPasswordController} from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//routing
//register || post
router.post('/register', RegisterController);

//login || psot
router.post('/login',authController, LoginController);

//test || get
router.get('/test', requireSignIn, isAdmin, TestController );

//forget password || post
router.post('/forgot-password', forgotPasswordController);

//protected user route auth 
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok : true});
});

//protected admin route auth 
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok : true});
});

export default router;