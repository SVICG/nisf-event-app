
import { useState, useEffect } from "react"
import { FormRow, Alert } from "../components"
import Wrapper from "../assets/wrappers/Register"
import { useAppContext } from "../context/appContext"
import { useNavigate } from 'react-router-dom'


const initialState = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    isMember: true,
    isAdmin: false
}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const [error, setError] = useState({
        password: '',
        confirmPassword: ''
      })


    const navigate = useNavigate()
    const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        validateInput(e)
    }

    // validate password on registrartion
    const validateInput = (e) => {
        const { name, value } = e.target
        setError(prev => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter a password";
                    } else if (values.confirmPassword && value !== values.confirmPassword) {
                        stateObj["confirmPassword"] = "Passwords do not match.";
                    } else {
                        stateObj["confirmPassword"] = values.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;
                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please confirm your Password.";
                    } else if (values.password && value !== values.password) {
                        stateObj[name] = "Passwords do not match.";
                    }
                    break;

                default:
                    break;
            }
            return stateObj;
        })
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

    //navigates user to all-evvents or stats page (if admin) after login
    useEffect(() => {
        if (user && user.isAdmin) {
            setTimeout(() => {
                navigate('/stats')
            }, 3000)
        } else if (user) {
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
                onBlur={validateInput}
            />
            {error.password && <span className='err'>{error.password}</span>}
              
            {!values.isMember &&
                <FormRow
                    type='password'
                    labelText='Confirm Password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    handleChange={handleChange}
                    onBlur={validateInput}
                />
            }
             {error.confirmPassword && <span className='err'>{error.confirmPassword}</span>}
            <button type='submit' className='btn btn-block' disabled={isLoading}>Submit</button>
            <p>
                {values.isMember ? 'Not a member?' : 'Already a member?'}
                <button id='reg-btn' type='button' onClick={toggleMember} className='btn light-button'>{values.isMember ? 'Register' : 'Login'}</button>
            </p>
        </form>

    </Wrapper>

}

export default Register