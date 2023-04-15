import React from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/EventFormPage.js'
import TextFormRow from '../../components/TextFormRow'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"



const AddEvent = () => {

  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    eventTitle,
    eventAddress1,
    eventAddress2,
    eventCity,
    eventCounty,
    eventPostalCode,
    eventCountyOptions,
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
    statusOptions,
    handleChange,
    clearValues,
    createEvent,
    editEvent,
    editStatus,
    user
  } = useAppContext()


  const [value, setValue] = React.useState([])


  const handleDates = (value) => {
    const name = 'date'
    setValue([...value, value]);

    handleChange({ name, value })
  }

  const handleEventInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!eventTitle || !capacity || !eventType || !description || !startTime || !admissionPrice || !theme) {
      displayAlert()
      return
    }
    if (isEditing) {
      editEvent()
      return
    }
    createEvent()
  }

  const handleStatus = (e) => {
    editStatus();
  }


  return (


    <Wrapper>

      <form noValidate className='form'>

        <h3>{isEditing ? 'edit event' : 'add event'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* event title */}
          <FormRow
            type="text"
            labelText="Event Title"
            name="eventTitle"
            value={eventTitle}
            handleChange={handleEventInput}
            required
          />

          <h5>Event Location</h5>
          <FormRow
            labelText="Address Line 1"
            name="eventAddress1"
            value={eventAddress1}
            handleChange={handleEventInput}
          />
          <FormRow
            labelText="Address Line 2"
            name="eventAddress2"
            value={eventAddress2}
            handleChange={handleEventInput}
          />
          <FormRow
            labelText="City"
            name="eventCity"
            value={eventCity}
            handleChange={handleEventInput}
          />
          <FormRowSelect
            labelText="County"
            name="eventCounty"
            value={eventCounty}
            list={eventCountyOptions}
            handleChange={handleEventInput}
          />
          <FormRow
            labelText="Post Code"
            name="eventPostalCode"
            value={eventPostalCode}
            handleChange={handleEventInput}
          />
          <h5>Event Details</h5>

          {/* capacity */}
          <FormRow
            type="text"
            name="capacity"
            value={capacity}
            handleChange={handleEventInput}
            tooltip="This is the total amount tickets that are available to the public for your event.  Please do not include complmentary or guest tickets in this total, but be sure to subtract them from your total capacity"
          />
          {/* eventType */}
          <FormRowSelect
            name="event Type"
            value={eventType}
            handleChange={handleEventInput}
            list={eventTypeOptions}
          />
          {/* target audience*/}
          <FormRowSelect
            labelText='Target Audience'
            name="targetAudience"
            value={targetAudience}
            handleChange={handleEventInput}
            list={targetAudienceOptions}
          />

          {/* description */}
          <TextFormRow
            type="text"
            name="description"
            value={description}
            handleChange={handleEventInput}
            tooltip="This will be the description that is included in the printed programme and on the website. Try to include what makes your event interesting, unique, and what would make audiences want to attend.  Please do not include any information that is not relevant to the public"

          />

          {/* date updated*/}
          <div className="date-row">
            <label htmlFor="date" className='form-label'>Date</label>
            <div className="help-tip">
              <p>Please select all dates that your event will take place</p>
            </div>
          </div>
          <DatePicker
            multiple
            plugins={[
              <DatePanel />
            ]}
            value={date}
            label="Date"
            name="date"
            onChange={handleDates}
            minDate="2023/02/16"
            maxDate="2023/02/26"

          />

          {/* Start Time */}
          <FormRow
            type="time"
            labelText="Start Time"
            name="startTime"
            value={startTime}
            handleChange={handleEventInput}
          />

          {/* endTime */}
          <FormRow
            type="time"
            labelText="End Time"
            name="endTime"
            value={endTime}
            handleChange={handleEventInput}
          />

          {/* admissionPrice */}
          <FormRow
            type="text"
            labelText='Admission Price'
            name="admissionPrice"
            value={admissionPrice}
            handleChange={handleEventInput}
          />

          {/* theme */}
          <FormRowSelect
            name="theme"
            value={theme}
            handleChange={handleEventInput}
            list={themeOptions}
          />


        </div>



        <div className='btn-container'>
          <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>
            Submit
          </button>
          <button className='btn btn-block clear-btn' onClick={(e) => {
            e.preventDefault()
            clearValues()
          }}>
            Clear
          </button>
        </div>
      </form>

      <form className='form'>
        <h3>Update Event Status</h3>
        {/* event status */}
        {user.isAdmin && (
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleEventInput}
            list={statusOptions}
          />)}

        <div className='btn-container'>
          <button type='submit' className='btn btn-block submit-btn' onClick={handleStatus} disabled={isLoading}>
            Submit
          </button>
        </div>
      </form>

    </Wrapper>

  )


}




export default AddEvent