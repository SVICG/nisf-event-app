
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useState } from 'react'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastName, setLastName] = useState(user?.lastName)
  const [organisation, setOrganisation] = useState(user?.organisation)
  const [county, setCounty] = useState(user?.orgAddress.county)
  const [address, setAddress] = useState(user?.orgAddress.address)
  const [city, setCity] = useState(user?.orgAddress.city)
  const [postalCode, setpostalCode] = useState(user?.orgAddress.postalCode)
  const [country, setCountry] = useState(user?.orgAddress.country)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !county) {
      displayAlert()
      return
    }
    updateUser({ name, email, organisation, lastName, county, address, city, postalCode, country })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText='Last Name'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='organisation name'
            value={organisation}
            handleChange={(e) => setOrganisation(e.target.value)}
          />
          <FormRow
            type='text'
            name='address'
            value={address}
            handleChange={(e) => setAddress(e.target.value)}
          />
          <FormRow
            type='text'
            name='city'
            value={city}
            handleChange={(e) => setCity(e.target.value)}
          />
          <FormRow
            type='text'
            name='postal code'
            value={postalCode}
            handleChange={(e) => setpostalCode(e.target.value)}
          />
          <FormRow
            type='text'
            name='county'
            value={county}
            handleChange={(e) => setCounty(e.target.value)}
          />
          <FormRow
            type='text'
            name='country'
            value={country}
            handleChange={(e) => setCountry(e.target.value)}
          />


          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait..' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile