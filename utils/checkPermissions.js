import { UnauthenticatedError } from '../errors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
      
    // if(requestUser.isAdmin === true ){
    //     return true;
    // }

    // if(requestUser.isAdmin === false ){
    //     return false;
    // }

    if(requestUser.userId === resourceUserId.toString()) 
    return

    throw new UnauthenticatedError('No access')
    
}
export default checkPermissions