import  jwt  from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/index.js"

const auth = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        //userId to be used for other controllers such as updateUsers to access it 
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
}

export default auth 