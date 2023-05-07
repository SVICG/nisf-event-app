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
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        
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
        trim: true,
        default: 'Last name'
    },

    organisation: {
        type: String,
        default:'organisation name',
        maxlength: 100,
        trim: true,
    },

    orgAddress: {
        address: { type: String, default: 'address' },
        city: { type: String, default: 'city' },
        county: { type: String, default: 'county' },
        postalCode: { type: String, default: 'postal code'},
        country: { type: String, default: 'country' },
    },

    isAdmin: {
        type: Boolean,
        
        default: false
    }

})

//hash user password when 'save' method is called
UserSchema.pre('save', async function () {
    //check for modified paths
    if (!this.isModified('password')) return
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    this.password = await bcrypt.hash(this.password, salt)
})

//Use custom instance method
UserSchema.methods.generateJWT = function () {
    return jwt.sign({ userId: this._id, admin: this.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    })
}
//compare password instance method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

export default mongoose.model('User', UserSchema)