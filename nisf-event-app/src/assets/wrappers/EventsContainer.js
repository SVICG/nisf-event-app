import styled from 'styled-components';


const Wrapper = styled.section`

margin-top: 4rem;

.events {
    /* display:grid; 
    grid-template-columns: 1fr;
    row-gap: 2rem; */
    justify-content:center;
    align-items:center;
    max-width: 800px;
 
}


@media (min-width: 992px) {
    .events {

   
    display: block;
    justify-content:center;
    align-items:center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
   
}
}


`
export default Wrapper;