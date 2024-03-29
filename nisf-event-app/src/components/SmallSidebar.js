import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { AiOutlineClose } from 'react-icons/ai'
import { useAppContext } from '../context/appContext'
import Logo from "./logo"
import NavLinks from './NavLinks'


const SmallSidebar = () => {

  const {showSidebar, toggleSidebar} = useAppContext()

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type= "button" className='close-btn' onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
          <header><Logo /></header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>

      </div>
    </Wrapper>
  )
}

export default SmallSidebar