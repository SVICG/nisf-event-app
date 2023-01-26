


const TextFormRow = ({type,name,value, handleChange, labelText}) => {
  return (
    <div className='form-row text-area'>
    <label htmlFor={name} className='form-label'>{labelText || name}</label>
    <textarea
    
        type={type} 
        value={value} 
        name={name}
        onChange={handleChange} 
        className='form-input' />
        

</div>
  )
}

export default TextFormRow