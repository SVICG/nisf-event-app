import styled from 'styled-components';


const Wrapper = styled.section `

margin-top: 4rem;

.events {
    display:grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
}


@media (min-width: 992px) {
    .events {
    display:grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
}
}


`
 export default Wrapper;