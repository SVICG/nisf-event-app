import React from 'react'

export const FormRowSelect = ({labelText, name, value, selected, handleChange, list, tooltip}) => {
    return (
        <div className="form-row">
            <div className='label-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            {tooltip &&
            <div className="help-tip">
              <p>Please select all dates that your event will take place</p>
             </div>
}
            </div>
            <select name={name} defaultValue={value}  id={value} onChange={handleChange} className='form-select'>
                {list.map((itemValue, index) => {
                    return <option key={index} value={itemValue}>
                        {itemValue}
                    </option>
                })}
            </select>
        </div>



    )
}

export default FormRowSelect