const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectTodb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieparser = require('cookie-parser');

connectTodb();
app.use(cors()); // get some perticular domain which is given in cors and other domains are blocked
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser()); // to get the cookie from the browser

app.use('/users',userRoutes);
module.exports = app;