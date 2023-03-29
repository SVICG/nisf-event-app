import User from "../models/User.js"
import React, { useState } from 'react'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import attachCookie from "../utils/attachCookie.js"


//next passes error on to middleware
const register = async (req, res) => {
    //try {
    const { name, lastName, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all the required details')
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({ name, lastName, email, password })
    const token = user.createJWT()
    attachCookie({ res, token });

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            county: user.county,
            name: user.name
        },
        // county: user.county
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

    const { email, name, lastName, organisation, address, city, postalCode, country, county } = req.body
    if (!email || !name || !lastName || !county) {
        throw new BadRequestError('Please provide all required values')
    }

    const user = await User.findOne({ _id: req.user.userId });
   
    // const user = editUserId
    user.email = email
    user.name = name
    user.lastName = lastName
    user.organisation = organisation
    user.orgAddress.address = address
    user.orgAddress.city = city
    user.orgAddress.postalCode = postalCode
    user.orgAddress.county = county
    user.orgAddress.country = country
    // user.county = county

    await user.save()

    const token = user.createJWT()
    attachCookie({ res, token });
    res.status(StatusCodes.OK).json({ user, userCounty: user.county });

}

const editUser = async (req, res) => {

    const { email, name, lastName, organisation, address, city, postalCode, country, county } = req.body
    
    const {id: editUserId} = req.params
    // throw new BadRequestError(`this is ${editUserId}`);
    if (!email || !name || !lastName ) {
        throw new BadRequestError('Please provide all required values')
    }
 
    // const user = await User.findOne({ editUserId });
    
    const updatedUser = await User.findOneAndUpdate({ _id: editUserId }, req.body, {
        
        new: true,
        runValidators: true,
    })
    
    res.status(StatusCodes.OK).json({ updatedUser })

}

const makeAdmin = async (req, res) =>{
    
    const {id: editUserId} = req.params
       
    const user = await User.findOne({ _id: editUserId});
   
    const updatedAdmin = await User.findOneAndUpdate({ _id: editUserId }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({msg:'User Updated'})
}

const deleteUser = async (req,res) => {
    const {id: editUserId} = req.params
    const user = await User.findOne({ _id: editUserId});
    if (!user) {
        throw new NotFoundError(`Cannot find event ${eventId}`)
    }

    await user.remove()

    res.status(StatusCodes.OK).json({ msg: 'User has been deleted' })
}


const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user});
}


const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()+1000),
    });

    res.status(StatusCodes.OK).json({msg:'logged out'})
}

const getAllUsers = async (req, res) => {
    const users = await User.find()

    res.status(StatusCodes.OK).json({users})
}


export { register, login, updateUser, editUser, getCurrentUser, getAllUsers, makeAdmin, deleteUser, logout}