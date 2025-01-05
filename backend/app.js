const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectTodb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/map.routes');
const rideRoutes = require('./routes/ride.routes');
const cookieparser = require('cookie-parser');

connectTodb();
app.use(cors()); // get some perticular domain which is given in cors and other domains are blocked
app.use(express.json()); // work with json data
app.use(express.urlencoded({extended:true})); // to get the data from the form
app.use(cookieparser()); // to get the cookie from the browser

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/map', mapRoutes);
app.use('/rides', rideRoutes);
module.exports = app;