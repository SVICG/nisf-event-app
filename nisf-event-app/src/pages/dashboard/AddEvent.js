import React from 'react'
import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/EventFormPage.js'
import TextFormRow from '../../components/TextFormRow'
import PlacesAutocomplete from 'react-places-autocomplete'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import { format, isSameDay, setDate } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';

// function Component() {
//   return <DayPicker />;
// }


const AddEvent = () => {

  const {
    isLoading,
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
    statusOptions,
    handleChange,
    clearValues,
    createEvent,
    editEvent
  } = useAppContext()


  const [address, setLocation] = React.useState("");
  const [values, setValue] = React.useState([])

  const handleDates = (value) => {
    const name = 'date'
    
    setValue(value)
    // handleChange({ name, values })
    console.log(values)
  }

  const searchOptions = {
    componentRestrictions: { country: ['uk'] }

  }

  const handleEventInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  const handleSelect = async value => {
    const name = 'location'
    handleChange({ name, value })
    console.log(value)

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

          <PlacesAutocomplete

            value={address}
            name="location"
            onChange={setLocation}
            onSelect={handleSelect}
            searchOptions={searchOptions}

          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

              <div>
                <label htmlFor="location" className='form-label'>Search Location</label>

                <input {...getInputProps({ placeholder: "Enter the event address" })} />
                <div>
                  <p>{address.description}</p>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "fff"
                    }

                    // console.log(suggestion);

                    return <div {...getSuggestionItemProps(suggestion, { style })} key={suggestion.placeId}>
                      {suggestion.description}

                    </div>
                  })}


                </div>

              </div>)}
          </PlacesAutocomplete>
          <FormRow

            // type="text"
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
          <FormRowSelect
            name="event Type"
            value={eventType}
            handleChange={handleEventInput}
            list={eventTypeOptions}
          />
          {/* target audience*/}
          <FormRowSelect
            name="target Audience"
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

          />


          {/* date updated*/}
          <DatePicker
            multiple
            plugins={[
              <DatePanel />
             ]}
            value={values}
            name="date"
            onChange={handleDates}
            minDate="2023/02/16"
            maxDate="2023/02/26"

          />

          {/* date
          <FormRow
            type="date"
            name="date"
            value={date}
            handleChange={handleEventInput}
          /> */}
          {/* Start Time */}
          <FormRow
            type="time"
            label="Start Time"
            name="startTime"
            value={startTime}
            handleChange={handleEventInput}
          />

          {/* endTime */}
          <FormRow
            type="time"
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
          <FormRowSelect
            name="theme"
            value={theme}
            handleChange={handleEventInput}
            list={themeOptions}
          />

          {/* event status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleEventInput}
            list={statusOptions}
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

    </Wrapper>

  )


}




export default AddEvent