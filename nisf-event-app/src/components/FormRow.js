


const FormRow = ({ type, name, value, handleChange, labelText, tooltip, helpText, required }) => {
  let requiredInput = false;
  if(required === false || !required) {
    
  } else{
    requiredInput = true;
  }

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
        required ={requiredInput}
      />

    </div>
  )
}

export default FormRow