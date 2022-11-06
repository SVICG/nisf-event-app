
import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'


//next passes error on to middleware
const register = async (req, res) => {
    //try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            throw new BadRequestError('Please provide all the required details')
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            throw new BadRequestError('Email already in use')
        }
        const user = await User.create({name, email, password})
        res.status(StatusCodes.CREATED).json({ user })
    // } catch (error) {
    //     next(error)
        // pass to error handler instead
        // res.status(500).json({msg: 'There was an error'})
        // console.log(error)
    //}
}

const login = async (req, res) => {
    res.send ('login')
}

const updateUser = async (req, res) => {
    res.send ('update user')
}

export {register, login, updateUser}