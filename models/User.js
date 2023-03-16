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
        select: false
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

    isAdmin: {
        type: Boolean,
        required:true,
        default: false

    }

})

//hash user password
UserSchema.pre('save', async function(){
//console.log(this.modifiedPaths())
if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, admin:this.isAdmin}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      })
}
//compare password instance method
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

export default mongoose.model('User', UserSchema)