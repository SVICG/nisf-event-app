
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useState } from 'react'

const UpdateUsers = () => {
  const { 
    users,
    name,
    email,
    lastName,
    organisation,
    address,
    city,
    postalCode,
    country,
    county,
    handleChange,
    showAlert,
    displayAlert,
    editUser, 
    isLoading,
    isEditing 
  } = useAppContext()



  // const [name, setName] = useState(users?.name)
  // const [email, setEmail] = useState(users?.email)
  // const [lastName, setLastName] = useState(users?.lastName)
  // const [organisation, setOrganisation] = useState(users?.organisation)
  // const [county, setCounty] = useState(users?.orgAddress.county)
  // const [address, setAddress] = useState(users?.orgAddress.address)
  // const [city, setCity] = useState(users?.orgAddress.city)
  // const [postalCode, setpostalCode] = useState(users?.orgAddress.postalCode)
  // const [country, setCountry] = useState(users?.orgAddress.country)

  const handleEventInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !county) {
      displayAlert()
      return
    }
    editUser({ name, email, organisation, lastName, county, address, city, postalCode, country })
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
            // valueName='name'
            value={name}
            handleChange={handleEventInput}
          />

          <FormRow
            type='text'
            labelText='Last Name'
            name='lastName'
            value={lastName}
            handleChange={handleEventInput}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='organisation'
            value={organisation}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='address'
            // valueName='orgAddress.address'
            value={address}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='city'
            value={city}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='postalCode'
            value={postalCode}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='county'
            value={county}
            handleChange={handleEventInput}
          />
          <FormRow
            type='text'
            name='country'
            value={country}
            handleChange={handleEventInput}
          />


          <button className='btn btn-block' type='submit' onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Please wait..' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default UpdateUsers