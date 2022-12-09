
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useState } from 'react'

const Profile = () => {
  const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [county, setCounty] = useState(user?.county)

  const handleSubmit = (e) => {
    e.preventDefault()
    //comment out while testing
    if(!name || !email || !lastName || !county) {
      displayAlert()
      return
    }
    updateUser({name, email, lastName, county})
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow 
            type='text' 
            name= 'name' 
            value = {name} 
            handleChange={(e)=> setName(e.target.value)}
          />
          <FormRow 
            type='text' 
            labelText='Last Name'
            name= 'lastName' 
            value = {lastName} 
            handleChange={(e)=> setLastName(e.target.value)}
          />
          <FormRow 
            type='email' 
            name= 'email' 
            value = {email} 
            handleChange={(e)=> setEmail(e.target.value)}
          />
          <FormRow 
            type='text' 
            name= 'county' 
            value = {county} 
            handleChange={(e)=> setCounty(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading?'Please wait..':'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile