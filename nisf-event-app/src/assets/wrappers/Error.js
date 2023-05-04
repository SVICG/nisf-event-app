import styled from 'styled-components'

//Wrapper for error page. Currently used as styling for 404 error page. 

const Wrapper = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: green;
  }
  a {
    color: darkgray;
    text-decoration: underline;
    text-transform: capitalize;
  }
`

export default Wrapper