
import { useState, useEffect } from "react"
import { Logo, FormRow, Alert } from "../components"
import Wrapper from "../assets/wrappers/Register"
import { useAppContext } from "../context/appContext"
import { useNavigate } from 'react-router-dom'


const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    isMember: true,
    isAdmin: false,
    // userCounty: ''

}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()
    const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, lastName, email, password, isMember, isAdmin } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return
        }

        const currentUser = { name, lastName, email, password, isAdmin }
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Great! Logging in...'
            });
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'Great! Your account has been created..'
            });
        }
    }

    //navigates user to homescreen after login
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return <Wrapper className='full-page'>

        <form className='form' onSubmit={onSubmit}>
            <h3>{values.isMember ? 'Login' : 'Register'}</h3>
            {showAlert && <Alert />}
            {/* name input */}
            {!values.isMember &&
                (
                    <FormRow
                        type='text'
                        label='First Name'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />                           
                
                )
            }
                    {!values.isMember &&
                (
                    <FormRow
                    type='text'
                    name='lastName'
                    value={values.lastName}
                    handleChange={handleChange}
                />                         
                
                )
            }
        
          
            {/* email input */}
            <FormRow
                type='email'
                name='email'
                value={values.email}
                handleChange={handleChange}
            />
            {/* password input */}
            <FormRow
                type='password'
                name='password'
                value={values.password}
                handleChange={handleChange}
            />
            <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
            <p>
                {values.isMember ? 'Not a member?' : 'Already a member?'}
                <button type='button' onClick={toggleMember} className='btn light-button'>{values.isMember ? 'Register' : 'Login'}</button>
            </p>
        </form>

    </Wrapper>

}

export default Register