import { Logo } from "../components"
import Wrapper from '../assets/wrappers/WelcomePage'
import main from '../assets/images/main.svg'
import {Link, Navigate} from 'react-router-dom'
import { useAppContext } from "../context/appContext"
import React from "react"


const Welcome = () => {
    const {user} = useAppContext()
    return(
        <React.Fragment>
            {user && <Navigate to ='/'/>}
        <Wrapper>
            <nav>
                
            </nav>
            <div className="container page">
                <div className="intro">
                <Logo />
                    <h1>NISF <span>Event</span> Manager</h1>
                    <p>Established in 2014, NI Science Festival has grown to become the largest celebration of its kind on the 
                        island of Ireland and in its relatively short lifespan became one of the leading Science Festivals in the 
                        whole of Europe. We wouldn'nt be able to do that without our fanastic partners and we are so excited that you
                         would like to host an event.  You can register below to submit a new event or login to submit or amend a submission.
                    </p>
                    <Link to="/register" id = 'reg-btn' className='btn btn-hero'>Login or Register</Link>
                    <p></p>
                </div>
                <img src={main} alt='adventure' className='img main-img'/>
            </div>
        </Wrapper>
        </React.Fragment>
    )
}

export default Welcome