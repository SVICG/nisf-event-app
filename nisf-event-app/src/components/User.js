import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Event'
import UserInfo from './UserInfo'
import { AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai"
import { Link } from 'react-router-dom'
import ToggleSwitch from './ToggleSwitch'

const User = ({_id, name, lastName, email, orgAddress, isAdmin}) => {
    
    const {setUpdateUser, toggleAdmin, deleteUser} = useAppContext()
    const [isOn, setIsOn] = useState(isAdmin)

    const handleToggle = async () => {
        setIsOn(prev => !prev)
        toggleAdmin(_id, isOn)
    }
    
  return (
    <Wrapper>
        
    <header className='content'>
        <div className="info">
            <h5>{name} {lastName}</h5>
        </div>
        <div >
           <div className='admin'>Admin:</div>
           <div className="toggle">
        <ToggleSwitch  name="Admin" isOn={isOn} id={_id} handle={handleToggle}/>
            </div>
        </div>
    </header>
 
    <div className="content">
        <div className="content-center">
            <UserInfo icon={<AiOutlineEnvironment/>} text={orgAddress.county}/>
            <UserInfo icon={<AiOutlineTag/>} text={email}/>
          
        </div>
        <div className="actions">
           
        
           <Link to='/update-users' className='btn edit-btn'  onClick={()=> setUpdateUser(_id)}>
               Edit
           </Link>
           <button type='button' className='btn delete-btn' onClick={() => {if(window.confirm('Are you sure to delete this user?')){ deleteUser(_id)};}}>
               Delete
           </button>
           
       </div>
    </div>

    </Wrapper>
  )
}

export default User