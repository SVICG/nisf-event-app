
import Wrapper from '../assets/wrappers/StatItem'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'


const StatItem = ({ count, title, icon, color, bcg }) => {

  const { updateSearch } = useAppContext();
  const statusType = title

  const updateStatus = (status) => {
    updateSearch({ name: 'searchStatus', value: status })
   
  }


  return (
    //pass prop to styled component instead of dynamic class
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'> {count} </span>
        <span className='icon'> {icon} </span>

      </header>

      <NavLink to={`/`} end className='title' onClick={() => updateStatus(statusType)}>{title}</NavLink>


    </Wrapper>
  )
}

export default StatItem