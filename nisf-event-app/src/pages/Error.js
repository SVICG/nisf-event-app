import Wrapper from '../assets/wrappers/Error'
import notfound from '../assets/images/notfound.svg'
import {Link} from 'react-router-dom'

const Error = () => {
  return (

    <Wrapper className='full-page'>
        <div>
        <img src={notfound} className='img main-img' alt='not found'/>
            <h1>Opps. Page Not Found</h1>
            <Link to='/' >Return Home</Link>
        </div>
        
    </Wrapper>

  
  )
}

export default Error