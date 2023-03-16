import moment from 'moment/moment'
import React from 'react'
import Wrapper from '../assets/wrappers/Event'
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai"
import  EventInfo from './EventInfo'
import DateInfo from './DateInfo'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


const Event = ({_id, eventTitle, date, eventType, location, createdAt, status, theme}) => {
   
   const {setEditEvent, deleteEvent} = useAppContext()
    let dispDate = moment(date.map(x=>(x)))
    
    dispDate = dispDate.format('Do MMM, YY')

  return (
    <Wrapper>
    <header>
        <div className="info">
            <h5>{eventTitle}</h5>
            <p>{eventType}</p>
        </div>
      
    </header>
 
    <div className="content">
        <div className="content-center">
            <EventInfo icon={<AiOutlineEnvironment/>} text={location}/>
            <DateInfo icon={<AiOutlineCalendar/>} text={date}/>
            <EventInfo icon={<AiOutlineTag/>} text={theme}/>
            
        </div>
        <div className="actions">
            <div className="status"><b>Status: </b>{status}</div>
            {/* {`status ${status}`} */}
            <Link to='/add-event' className='btn edit-btn' onClick={()=> setEditEvent(_id)}>
                Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={() => {if(window.confirm('Are you sure to delete this record?')){ deleteEvent(_id)};}}>
                Delete
            </button>
          
        </div>
    </div>

    </Wrapper>
  )
}

export default Event