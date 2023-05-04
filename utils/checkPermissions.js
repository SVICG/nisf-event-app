import { UnauthenticatedError } from '../customErrors/index.js'

const checkPermissions = (requestUser, resourceUserId) => {
      

    if(requestUser.userId === resourceUserId.toString()) 
    return

    throw new UnauthenticatedError('No access')
    
}
export default checkPermissions