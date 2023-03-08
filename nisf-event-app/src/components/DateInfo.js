import React from 'react'
import Wrapper from '../assets/wrappers/EventInfo'
import moment from 'moment/moment'


const DateInfo = ({icon, text}) => {
  return (
    <Wrapper>
    
    <span className='icon'>{icon} &nbsp; &nbsp; February&nbsp;</span>
    {text.map (x => <span className='date-text'> {moment(x).format('Do')} | </span> )}
    

    </Wrapper>
  )
}

export default DateInfo