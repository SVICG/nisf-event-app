import React from 'react'
import Wrapper from '../assets/wrappers/EventInfo'
import moment from 'moment'


const DateInfo = ({icon, text, id}) => {

  return (
    <Wrapper>
   
    <span className='icon'>{icon} &nbsp; &nbsp; February&nbsp;</span>
    {text.map (x => <span key ={id+1} className='date-text'> {moment(x).format('Do')} | </span> )}
    

    </Wrapper>
  )
}

export default DateInfo