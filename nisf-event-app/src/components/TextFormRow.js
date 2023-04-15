


const TextFormRow = ({ type, name, value, handleChange, labelText, tooltip }) => {
  return (
    <div className='form-row text-area'>
      <div className="label-row">
        <label htmlFor={name} className='form-label'>{labelText || name}</label>
        {tooltip &&
          <div className="help-tip">
            <p>{tooltip}</p>
          </div>
        }
      </div>
      <textarea

        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />


    </div>
  )
}

export default TextFormRow