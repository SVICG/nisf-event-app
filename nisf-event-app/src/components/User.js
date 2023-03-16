import React from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Event'
import UserInfo from './UserInfo'
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai"

const User = ({_id, name, lastName, email, county}) => {

    const {setEditUser} = useAppContext()

    
  return (
    <Wrapper>
    <header>
        <div className="info">
            <h5>{name} {lastName}</h5>
        </div>
    </header>
 
    <div className="content">
        <div className="content-center">
            <UserInfo icon={<AiOutlineEnvironment/>} text={county}/>
            <UserInfo icon={<AiOutlineTag/>} text={email}/>
            
        </div>
        {/* <div className="actions">
            <Link to='/add-event' className='btn edit-btn' onClick={()=> setEditEvent(_id)}>
                Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={() => {if(window.confirm('Are you sure to delete this record?')){ deleteEvent(_id)};}}>
                Delete
            </button>
          
        </div> */}
    </div>

    </Wrapper>
  )
}

export default User