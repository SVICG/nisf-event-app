import { BadRequestError } from "../errors/index.js";


export const adminUser = (req,res,next) => {
 if(!req.user.admin) {
    throw new BadRequestError("Access Denied")
 } 

 next();
 
}

export default adminUser