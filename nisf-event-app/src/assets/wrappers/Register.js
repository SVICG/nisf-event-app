import styled from 'styled-components';


const Wrapper = styled.section`

display:grid;
align-items: center;

.light-button {
    color: var(--main-color);
    background: transparent;
}

p{
    text-align: center;
}

.displayErrors input:invalid {
  border-color: red;
  border-style: solid;
  border-width: 5px;
}



`

export default Wrapper;