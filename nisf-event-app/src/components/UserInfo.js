import React from 'react'
import Wrapper from '../assets/wrappers/EventInfo'


const UserInfo = ({icon, text}) => {
  return (
    <Wrapper>
    <span className='icon'>{icon}</span>
    <span className='icon'>{text}</span>
    </Wrapper>
  )
}

export default UserInfo