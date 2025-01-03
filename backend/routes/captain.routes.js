const express = require('express');
const router = express.Router();
const captaincontroller = require('../controllers/captain.controller');
const {body} = require('express-validator');
const authmiddleware = require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 charecters'),
    body('password').isLength({min:6}).withMessage("Password must be 6 charecterss long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be 3 charecterss long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be 3 charecterss long"),
    body('vehicle.capacity').isLength({min:1}).withMessage("Capacity must be 1 charecterss long")
],captaincontroller.registerCaptain);

router.post('/login',[body('email').isEmail().withMessage("Invalid Email and Password"),
    body('password').isLength({min:6}).withMessage("Password must be 6 character")
],captaincontroller.loginCaptain);

router.get('/profile',authmiddleware.authcaptain,captaincontroller.getCaptainProfile);

router.get('/logout',authmiddleware.authcaptain,captaincontroller.logoutCaptainProfile);

module.exports = router;
