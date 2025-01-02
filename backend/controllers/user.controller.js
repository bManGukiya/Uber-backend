const { validationResult } = require('express-validator');
const usermodel = require('../models/user.model');
const userservice = require('../services/user.service');


module.exports.registerUser = async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     const {fullname,email,password} = req.body;

     const hashPassword = await usermodel.hashPassword(password);

     const user =await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
     });


     const token = user.generateJwtToken();

     res.status(201).json({token, user});
}