const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const rideController = require('../controllers/ride.controller');
router.post('/create-ride',authMiddleware.authuser,
    body('pickup').isString().withMessage('Pickup location is required'),
    body('destination').isString().withMessage('Destination location is required'),
    body('vehicaltype').isIn(['auto','motorcycle','car']).withMessage('Invalid vehical type')
,rideController.createRidecontroller);

router.get('/get-fare',authMiddleware.authuser,rideController.getRidecontroller);

module.exports = router;