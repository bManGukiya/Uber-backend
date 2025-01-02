const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            min:[3, 'Too short, min is 3 characters'],
        },
        lastname: {
            type: String,
            min:[3, 'Too short, min is 3 characters'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:[6, 'Too short, min is 6 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateJwtToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password); 
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('User', userSchema);