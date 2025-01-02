const mongoose = require('mongoose');
const token = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            min:[3,'Too short, min is 3 characters'],
        },
        lastname:{
            type:String,
            min:[3,'Too short, min is 3 characters'],
        }},
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            match:[/^\S+@\S+\.\S+$/,'Please enter a valid email'],
        },
        password:{
            type:String,
            required:true,
            select:false,
        },
        status:{
            type:String,
            enum:['active','inactive'],
            default:'inactive',
        },
        vehicle:{
            color:{
                type:String,
                required:true,
                min:[3,'Too short, min is 3 characters'],
            },
            plate:{
                type:String,
                required:true,
                min:[3,'Too short, min is 3 characters'],
            },
            capacity:{
                type:Number,
                required:true,
                min:[1,'min is 1 characters'],
            },
            vehicaltype:{
                type:String,
                enum:['car','bike','auto'],
                required:true,
            },
        },
        location:{
            latitute    :{
                type:Number,
            },
            longitude:{
                type:Number,
            },
        }
    });


captainSchema.methods.generateJwtToken = function(){
    return token.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:24*60*60});
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);}

module.exports = mongoose.model('Captain',captainSchema);