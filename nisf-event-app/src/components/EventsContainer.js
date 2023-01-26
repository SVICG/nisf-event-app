import { useEffect } from "react"
import Wrapper from "../assets/wrappers/EventsContainer"
import { useAppContext } from "../context/appContext"
import Event from "./Event"
import Loading from "./Loading"


const EventsContainer = () => {
const {getEvents, events, isLoading, page, totalEvents} = useAppContext()

useEffect(() => {

    getEvents()
}, [])

if(isLoading){
  return (
    <Loading center />
  )
}

if (events.length === 10) {
    return (
    
        <h2>No events</h2>
   
    )
}

return ( 

<Wrapper>

<h5>
    {totalEvents} event{events.length >1 && 's'} found
</h5>

<div className="events">
    {events.map((event) => {

        return <Event key={event._id} {...event} />
    })}


</div>

</Wrapper>
)

}

export default EventsContainer