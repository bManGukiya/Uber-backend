const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // get some perticular domain which is given in cors and other domains are blocked


module.exports = app;