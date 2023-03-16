

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import { HiOutlineUsers } from 'react-icons/hi'
import { AdminRoute } from '../pages/dashboard'
import { useAppContext } from '../context/appContext'




export const NavLinks = ({toggleSidebar}) => {

  const {user} = useAppContext()
  return (
    <div className="nav-links">
            {links.map((link)=>{
              const{text,path,id,icon} = link
              return ( 
              <NavLink to={path} key={id} onClick={toggleSidebar} end
              className={({isActive})=>isActive ? 'nav-link active' : 'nav-link'}>
                <span className='icon'>{icon}</span>
                {text}
              </NavLink>
              
              )
            })}
           
           {user.isAdmin &&
            <NavLink to='/users' onClick={toggleSidebar} end
              className={({isActive})=>isActive ? 'nav-link active' : 'nav-link'}>
                <span className='icon'><HiOutlineUsers/></span>
                Users
            </NavLink>
           
           }

          </div>
  )
}

export default NavLinks