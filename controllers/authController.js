import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import attachCookie from "../utils/attachCookie.js"


//next passes error on to middleware
const register = async (req, res) => {
    //try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all the required details')
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    attachCookie({ res, token });

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            county: user.county,
            name: user.name
        },
        county: user.county
    })
    // } catch (error) {
    //     next(error)
    // pass to error handler instead
    // res.status(500).json({msg: 'There was an error'})
    // console.log(error)
    //}
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide the required info');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    console.log(user)

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    //prevent sending sensitive data
    user.password = undefined;
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user, userCounty: user.county });

    // res.send ('login')
}

const updateUser = async (req, res) => {

    const { email, name, lastName, county } = req.body
    if (!email || !name || !lastName || !county) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ _id: req.user.userId });

    user.email = email
    user.name = name
    user.lastName = lastName
    user.county = county

    await user.save()

    const token = user.createJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user, userCounty: user.county });

}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user, userCounty: user.county });
}


const logout = async (req,res) => {
    res.cookie('token', 'logout', {
        httpOnly:true,
        expires: new Date(Date.now()),
    });

    res.status(StatusCodes.OK).json({msg:'logged out'})
}

// const secure = async (req, res, next) => {
      
//     let token;
//        if(req.cookies) token = req.cookies.token
//        if(!token) {
//            return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Unauthorised'});
//        }
       
//     const user = await User.findOne({ _id: req.user.userId });
//     //    req.user = user;
//        next()
       
//    }

// const clearanceLevel = (...clearanceLevel) => {
//     return (req, res, next)=> {
//         clearanceLevel.includes(req.user.clearance)
//         ? next()
//         : res.status(StatusCodes.UNAUTHORIZED).json({msg:'Unauthorised'});
//     } 
// }


export { register, login, updateUser, getCurrentUser, logout}