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
                <Logo />
            </nav>
            <div className="container page">
                <div className="intro">
                    <h1>NISF <span>Event</span> Manager</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lectus diam, ultricies in mattis sollicitudin, tincidunt a nisi. 
                        Donec id quam cursus, cursus nisl at, vehicula justo. Morbi dictum a metus quis tincidunt. 
                        Sed non ornare purus. Morbi vel tristique lacus. Donec eget nunc nunc. Sed vitae finibus neque. 
                        Nam ut sapien consequat, maximus orci ut, luctus est.
                    </p>
                    <Link to="/register" className='btn btn-hero'>Login or Register</Link>
                    <p></p>
                    {/* <Link to="/register" className='btn btn-hero'>Submit an Event</Link> */}
                </div>
                <img src={main} alt='adventure' className='img main-img'/>
            </div>
        </Wrapper>
        </React.Fragment>
    )
}

export default Welcome