const express = require('express');
const router = express.Router();
const {body} = require('express-validator'); // npm i express-validator
const usercontroller = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 charecters'),
    body('password').isLength({min:6}).withMessage("Password must be 6 charecterss long")
],usercontroller.registerUser);


module.exports = router;