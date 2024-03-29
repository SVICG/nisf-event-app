import {StatusCodes} from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {

    //if there is no error message will use a generic one
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Opps! Please try again later'
    }
    
    if(err.name === 'ValidationError'){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        //iterate over error messages
        defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join (',')
    }
    if(err.code && err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `${Object.keys(err.keyValue)} has been used already`

    }
  
    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}


export default errorHandlerMiddleware