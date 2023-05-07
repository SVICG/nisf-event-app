import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/Event'
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTag } from "react-icons/ai"
import EventInfo from './EventInfo'
import DateInfo from './DateInfo'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'


const Event = ({ _id, eventTitle, date, eventType, eventLocation, createdAt, status, theme, createdBy }) => {

    const { setEditEvent, deleteEvent, setUpdateUser, user } = useAppContext()
    const [loading, setLoading] = useState(true);
    let dispDate = moment(date.map(x => (x)))
    dispDate = dispDate.format('Do MMM, YY')

    const address = [eventLocation.eventAddress1, eventLocation.eventAddress2, eventLocation.eventCity, eventLocation.eventCounty].filter(Boolean).join(", ");
    const userName = [createdBy.name, createdBy.lastName].filter(Boolean).join(" ")


    const handleClick = () => {
        setUpdateUser(createdBy._id);
     
    }



    return (
        <Wrapper>
            <header>
                <div className="info">
                    <h5>{eventTitle}</h5>
                    <p>{eventType}</p>
                </div>
                <div className="created-by">

                    {user.isAdmin && (
                        <Link to='/update-users' onClick={(e) => handleClick(e)}>
                            <div className="submitted-by">Submitted by:</div>
                            {userName}
                          
                        </Link>

                    )
                    }


                    <div></div>
                </div>
            </header>

            <div className="content">
                <div className="content-center">
                    <EventInfo icon={<AiOutlineEnvironment />} text={address} />
                    <DateInfo id={_id} icon={<AiOutlineCalendar />} text={date} />
                    <EventInfo icon={<AiOutlineTag />} text={theme} />

                </div>
                <div className="actions">
                    <div className="status"><b>Status: </b>{status}</div>
                    <Link to='/add-event' className='btn edit-btn' onClick={() => {setEditEvent(_id); window.scrollTo(0,0)}}>
                        Edit
                    </Link>
                    <button type='button' className='btn delete-btn' onClick={() => { if (window.confirm('Are you sure to delete this record?')) { deleteEvent(_id) }; }}>
                        Delete
                    </button>

                </div>
            </div>

        </Wrapper>
    )
}

export default Event