const express = require('express');
const router = express.Router();
const {body} = require('express-validator'); // npm i express-validator
const usercontroller = require('../controllers/user.controller');
const authmiddleware = require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 charecters'),
    body('password').isLength({min:6}).withMessage("Password must be 6 charecterss long")
],usercontroller.registerUser);


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage("Password must be 6 charecterss long")
],usercontroller.loginUser);

router.get('/profile',authmiddleware.authuser,usercontroller.getUserProfile)

router.get('/logout',authmiddleware.authuser,usercontroller.logoutUser)
module.exports = router;