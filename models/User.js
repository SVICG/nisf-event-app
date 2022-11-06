import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
//vclidation library - better tested and reliable
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Please provde a name'],
        minlength: 2,
        maxlength: 20,
        trim:true,
    },

    email: { 
        type: String,
        required: [true, 'Please provde an email address'],
        validate:{
            validator:validator.isEmail,
            message:'Please provide a valid email'
        },
        unique: true,
    },

    password: { 
        type: String,
        required: [true, 'Please provde a password'],
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

export default mongoose.model('User', UserSchema)