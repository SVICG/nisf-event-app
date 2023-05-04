import styled from 'styled-components';


const Wrapper = styled.section `

margin: 25px 25px 25px 25px;
display:grid;
row-gap: 2rem;

@media (min-width: 768px) {
    display:grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
}

@media (min-width: 1120px) {
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1.5rem;
    
}


`
 export default Wrapper;