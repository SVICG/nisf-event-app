import  jwt  from "jsonwebtoken"
import { UnauthenticatedError } from "../errors/index.js"

const auth = async (req, res, next) => {
      
    console.log(req.cookies)
    const token = req.cookies.token
   

    if(!token) {
        throw new UnauthenticatedError('Authentification Invalid')
    }
   
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const admin = payload.admin
        //userId to be used for other controllers such as updateUsers to access it 
        req.user = { userId: payload.userId, admin};
    
        next();
    } catch (error) {
        console.log(error);
        throw new UnauthenticatedError('Authentication Invalid')
    }
    
}

export default auth 