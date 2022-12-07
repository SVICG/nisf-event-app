import Wrapper from "../assets/wrappers/Navbar"
import { AiTwotoneHome, AiOutlineAlignLeft, AiOutlineUser, AiFillCaretDown } from "react-icons/ai"
import { useAppContext } from "../context/appContext"
import Logo from "./logo"
import { useState } from "react"

const Navbar = () => {

  //grab function from useApp
  const { toggleSidebar, logoutUser, user } = useAppContext()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <AiOutlineAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          {/* invoke setshow logout */}
          <button 
            type='button' 
            className='btn' 
            onClick={() => setShowLogout(!showLogout)}>
            <AiOutlineUser />
            {user?.name}
            <AiFillCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown' }>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
            logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar