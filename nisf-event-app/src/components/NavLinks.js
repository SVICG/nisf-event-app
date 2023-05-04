import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'


export const NavLinks = ({ toggleSidebar }) => {

  const userLinks = links.filter(obj => [2, 3, 4].indexOf(obj.id) != -1)
  const linkOptions = (user) => {
    return user.isAdmin ? links : userLinks
  }
  const { user } = useAppContext()
  return (
    <div className="nav-links">
      {linkOptions(user).map((link) => {
        let { text, path, id, icon } = link
        if (!user.isAdmin && id === 2) {
          text = 'your events'
        }
        return (
          <NavLink to={path} key={id} onClick={toggleSidebar} end
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default NavLinks