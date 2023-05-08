import User from "../models/User.js"
import Event from "../models/Event.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../customErrors/index.js'
import attachCookie from "../utils/attachCookie.js"

//Register a user
const register = async (req, res) => {
    const { name, lastName, email, password } = req.body;
    //Check for any blank inputs
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all the required details')
    }
    //check if email exists in database
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }
    //creates a user and token
    const user = await User.create({ name, lastName, email, password })
    const token = user.generateJWT()
    //Attaches token to a cookie
    attachCookie({ res, token });
    //Returns user details 
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            orgAddress: {
            address: user.orgAddress.address,
            city: user.orgAddress.city,
            county: user.orgAddress.county,
            postalCode: user.orgAddress.postalCode,
            country: user.orgAddress.country
            }
        },
    })
}

//Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    //Check for blank inputs
    if (!email || !password) {
        throw new BadRequestError('Please provide the required info');
    }
    //Searches for user in the db
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    //Confirms password is correct
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    //Generates a token
    const token = user.generateJWT();
    //prevent sending sensitive data
    user.password = undefined;
    //Attaches token to cookies
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user });
}


//Function to update a user
const updateUser = async (req, res) => {
    //Check for blank inputs
    const { email, name, lastName, organisation, address, city, postalCode, country, county } = req.body
    if (!email || !name || !lastName || !county) {
        throw new BadRequestError('Please provide all required values')
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.email = email
    user.name = name
    user.lastName = lastName
    user.organisation = organisation
    user.orgAddress.address = address
    user.orgAddress.city = city
    user.orgAddress.postalCode = postalCode
    user.orgAddress.county = county
    user.orgAddress.country = country

    await user.save()

    const token = user.generateJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user });

}

//Function for admin to dit a user
const editUser = async (req, res) => {

    const { email, name, lastName } = req.body
    const { id: editUserId } = req.params

    if (!email || !name || !lastName) {
        throw new BadRequestError('Please provide all required values')
    }
    const updatedUser = await User.findOneAndUpdate({ _id: editUserId }, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({ updatedUser })

}

//Function to make a user an admin
const makeAdmin = async (req, res) => {

    const { id: editUserId } = req.params

    const updatedAdmin = await User.findOneAndUpdate({ _id: editUserId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!updatedAdmin) {
        throw new NotFoundError(`Cannot find user`)
    }

    res.status(StatusCodes.OK).json({ msg: 'User Updated' })
}


//Function to delete a user
const deleteUser = async (req, res) => {
    const { id: editUserId } = req.params
    const user = await User.findOne({ _id: editUserId });
    if (!user) {
        throw new NotFoundError(`Cannot find user ${editUserId}`)
    }

    await user.remove()
    await Event.deleteMany({createdBy: editUserId })

    res.status(StatusCodes.OK).json({ msg: 'User has been deleted' })
}

//Retrieves users details on refresh
const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user });
}

//Function to logout a user
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.status(StatusCodes.OK).json({ msg: 'logged out' })
}

//Function to return all users
const getAllUsers = async (req, res) => {
    const users = await User.find()

    res.status(StatusCodes.OK).json({ users })
}

export { register, login, updateUser, editUser, getCurrentUser, getAllUsers, makeAdmin, deleteUser, logout }