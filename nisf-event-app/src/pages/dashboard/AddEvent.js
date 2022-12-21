import React from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'

const AddEvent = () => {

  const {
    isEditing,
    showAlert,
    displayAlert,
    eventTitle,
    location,
    capacity,
    eventType,
    eventTypeOptions,
    targetAudience,
    targetAudienceOptions,
    description,
    date,
    startTime,
    endTime,
    admissionPrice,
    theme,
    themeOptions,
    status,
    statusOptions
  } = useAppContext()


  const handleEventInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`${name}: ${value}`)
  }

  const handleSubmit =(e) => {
    e.preventDefault()
    if(!eventTitle || !capacity || !eventType || !description || !startTime || !admissionPrice || !theme) {
      displayAlert()
      return
    }

    console.log('create job')
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit event' : 'add event'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* event title */}
          <FormRow
            type="text"
            label="Event Title"
            name="eventTitle"
            value={eventTitle}
            handleChange={handleEventInput}
          />
          {/* location */}
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={handleEventInput}
          />
          {/* capacity */}
          <FormRow
            type="text"
            name="capacity"
            value={capacity}
            handleChange={handleEventInput}
          />
          {/* eventType */}
          <FormRow
            type="text"
            label="Event Type"
            name="eventType"
            value={eventType}
            handleChange={handleEventInput}
          />
          {/* target audience*/}
          <FormRow
            type="text"
            label="Target Audeince"
            name="targetAudience"
            value={targetAudience}
            handleChange={handleEventInput}
          />

          {/* description */}
          <FormRow
            type="text"
            name="description"
            value={description}
            handleChange={handleEventInput}
          />

          {/* date */}
          <FormRow
            type="date"
            name="date"
            value={date}
            handleChange={handleEventInput}
          />
          {/* Start Time */}
          <FormRow
            type="text"
            label="Start Time"
            name="Start Time"
            value={endTime}
            handleChange={handleEventInput}
          />

          {/* endTime */}
          <FormRow
            type="text"
            label="End Time"
            name="endTime"
            value={endTime}
            handleChange={handleEventInput}
          />

          {/* admissionPrice */}
          <FormRow
            type="text"
            name="admissionPrice"
            value={admissionPrice}
            handleChange={handleEventInput}
          />

          {/* theme */}
          <FormRow
            type="text"
            name="theme"
            value={theme}
            handleChange={handleEventInput}
          />

        </div>
      
{/* event type */}

<div class="form-row">

<label htmlFor='eventType' className='form-label'>
  event type
</label>
<select name="eventType" id={eventType} onChange ={handleEventInput} className='form-select'>
  {eventTypeOptions.map((itemValue, index) => {
    return <option key={index} value = {itemValue}>
      {itemValue}
    </option>
  })}
</select>
</div>

{/* event status */}

<div className='btn-container'>
  <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit}>
    Submit
  </button>
</div>
</form>
    </Wrapper>
  )
}

export default AddEvent