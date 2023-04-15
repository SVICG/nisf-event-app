


const FormRow = ({ type, name, value, handleChange, labelText, tooltip, helpText }) => {
  return (
    <div className='form-row'>
      <div className='label-row'>
        <label htmlFor={labelText} className='form-label'>{labelText || name}</label>
        {tooltip &&
          <div className="help-tip">
            <p>{tooltip}</p>
          </div>
        }
      </div>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        autoComplete='on'
        className='form-input' 
      />

    </div>
  )
}

export default FormRow