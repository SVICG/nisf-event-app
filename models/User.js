import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
//validation library - better tested and reliable
import validator from "validator";
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 2,
        maxlength: 20,
        trim:true,
    },

    email: { 
        type: String,
        required: [true, 'Please provide an email address'],
        validate:{
            validator:validator.isEmail,
            message:'Please provide a valid email'
        },
        unique: true,
    },

    password: { 
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
       
    },

    lastName: { 
        type: String,
        minlength: 2,
        maxlength: 20,
        trim:true,
        default: 'Last name'
    },

    //add address & organisation
    county: { 
        type: String,
        maxlength: 20,
        trim:true,
        default: 'County'
    },

})

//hash user password
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      })
}

export default mongoose.model('User', UserSchema)