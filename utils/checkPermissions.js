import { UnauthenticatedError } from '../customErrors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
      
    if(requestUser.userId === resourceUserId.toString() || requestUser.admin ) 
    return

    throw new UnauthenticatedError('No access')
    
}
export default checkPermissions