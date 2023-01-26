import moment from 'moment/moment'
import React from 'react'
import Wrapper from '../assets/wrappers/Event'
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai"
import EventInfo from './EventInfo'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


const Event = ({_id, eventTitle, date, eventType, location, createdAt, status}) => {
   
   const {setEditEvent, deleteEvent} = useAppContext()
    let dispDate = moment(date)
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
            <EventInfo icon={<AiOutlineCalendar/>} text={dispDate}/>
            <EventInfo icon={<AiOutlineTag/>} text={eventType}/>
            <div className={`status ${status}`}>{status}</div>
        </div>
    </div>
    <footer>
        <div className="actions">
            <Link to='/add-event' className='btn edit-btn' onClick={()=> setEditEvent(_id)}>
                Edit
            </Link>
            <button type='button' className='btn delete-btn' onClick={()=> deleteEvent(_id)}>
                Delete
            </button>
        </div>
    </footer>
    </Wrapper>
  )
}

export default Event