
const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { query } = require('express-validator');

router.get('/get-coordinates', [
    query('location').notEmpty().withMessage('Location name is required')
],authMiddleware.authuser,mapController.getCoordinates);

router.get("/get-distance",[
    query('origin').isString().withMessage({min:3}).withMessage('Origin must be 3 charecters'),
    query('destination').isString().withMessage({min:3}).withMessage('Destination must be 3 charecters'),
],authMiddleware.authuser,mapController.getDistanceandTime);

router.get("/get-sugesstion",[
    query('input').isString().withMessage({min:3}).withMessage('Input must be 3 charecters'),
],authMiddleware.authuser,mapController.getsuggestion);

module.exports = router;